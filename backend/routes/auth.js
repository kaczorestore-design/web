const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { body, validationResult } = require('express-validator')
const { Op } = require('sequelize')
const User = require('../models/User')
const { authenticate, authorize } = require('../middleware/auth')
const rateLimit = require('express-rate-limit')

const router = express.Router()

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Validation rules
const registerValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  body('role')
    .optional()
    .isIn(['user', 'radiologist'])
    .withMessage('Invalid role specified'),
  body('specialization')
    .optional()
    .isIn(['general', 'neuro', 'cardiac', 'musculoskeletal', 'chest', 'abdominal', 'pediatric', 'emergency'])
    .withMessage('Invalid specialization'),
  body('licenseNumber')
    .optional()
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('License number must be between 5 and 20 characters'),
  body('institution')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Institution name cannot exceed 100 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number')
]

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
]

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
]

const resetPasswordValidation = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
]

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
]

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    })
  }
  next()
}

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authLimiter, registerValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role = 'user',
      specialization,
      licenseNumber,
      institution,
      phone
    } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      })
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpire = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      specialization,
      licenseNumber,
      institution,
      phone,
      verificationToken,
      verificationTokenExpire
    })

    // Generate tokens
    const token = user.generateAuthToken()
    const refreshToken = user.generateRefreshToken()

    // Remove password from response
    const userResponse = user.toJSON()
    delete userResponse.password
    delete userResponse.verificationToken

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email for verification.',
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    })

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, verificationToken)

  } catch (error) {
    next(error)
  }
})

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authLimiter, loginValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user and include password
    const user = await User.findByCredentials(email, password)

    // Generate tokens
    const token = user.generateAuthToken()
    const refreshToken = user.generateRefreshToken()

    // Remove sensitive data from response
    const userResponse = user.get({ plain: true })
    delete userResponse.password
    delete userResponse.verificationToken
    delete userResponse.resetPasswordToken

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    })

  } catch (error) {
    if (error.message === 'Invalid credentials' || error.message.includes('locked')) {
      return res.status(401).json({
        success: false,
        message: error.message
      })
    }
    next(error)
  }
})

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const user = await User.findByPk(decoded.id)

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      })
    }

    // Generate new tokens
    const newToken = user.generateAuthToken()
    const newRefreshToken = user.generateRefreshToken()

    res.json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    })

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      })
    }
    next(error)
  }
})

// @route   POST /api/auth/logout
// @desc    Logout user (invalidate token)
// @access  Private
router.post('/logout', authenticate, async (req, res) => {
  // In a production app, you might want to maintain a blacklist of tokens
  // or store tokens in Redis with expiration
  res.json({
    success: true,
    message: 'Logged out successfully'
  })
})

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticate, async (req, res) => {
  const userResponse = req.user.toJSON()
  delete userResponse.password
  delete userResponse.verificationToken
  delete userResponse.resetPasswordToken

  res.json({
    success: true,
    data: {
      user: userResponse
    }
  })
})

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', authLimiter, forgotPasswordValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ where: { email, isActive: true } })
    if (!user) {
      // Don't reveal if email exists or not
      return res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    await user.save()

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    })

    // TODO: Send password reset email
    // await sendPasswordResetEmail(user.email, resetToken)

  } catch (error) {
    next(error)
  }
})

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', authLimiter, resetPasswordValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const { token, password } = req.body

    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { [Op.gt]: new Date() },
        isActive: true
      }
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      })
    }

    // Set new password
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    user.loginAttempts = 0
    user.lockUntil = undefined

    await user.save()

    res.json({
      success: true,
      message: 'Password reset successful'
    })

  } catch (error) {
    next(error)
  }
})

// @route   POST /api/auth/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', authenticate, changePasswordValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Get user with password
    const user = await User.findByPk(req.user.id)

    // Check current password
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    // Set new password
    user.password = newPassword
    await user.save()

    res.json({
      success: true,
      message: 'Password changed successfully'
    })

  } catch (error) {
    next(error)
  }
})

// @route   POST /api/auth/verify-email
// @desc    Verify email address
// @access  Public
router.post('/verify-email', async (req, res, next) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required'
      })
    }

    const user = await User.findOne({
      where: {
        verificationToken: token,
        verificationTokenExpire: { [Op.gt]: new Date() }
      }
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpire = undefined

    await user.save()

    res.json({
      success: true,
      message: 'Email verified successfully'
    })

  } catch (error) {
    next(error)
  }
})

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
// @access  Private
router.post('/resend-verification', authenticate, async (req, res, next) => {
  try {
    if (req.user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      })
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    req.user.verificationToken = verificationToken
    req.user.verificationTokenExpire = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await req.user.save()

    res.json({
      success: true,
      message: 'Verification email sent'
    })

    // TODO: Send verification email
    // await sendVerificationEmail(req.user.email, verificationToken)

  } catch (error) {
    next(error)
  }
})

module.exports = router