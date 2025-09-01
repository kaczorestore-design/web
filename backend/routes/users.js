const express = require('express')
const { body, query, param, validationResult } = require('express-validator')
const { Op } = require('sequelize')
const User = require('../models/User')
const { authenticate, authorize, ownerOrAdmin } = require('../middleware/auth')
const router = express.Router()

// Validation rules
const updateProfileValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
  body('specialization')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Specialization cannot exceed 100 characters'),
  body('licenseNumber')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('License number cannot exceed 50 characters'),
  body('institution')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Institution cannot exceed 200 characters'),
  body('preferences.notifications')
    .optional()
    .isBoolean()
    .withMessage('Notifications preference must be a boolean'),
  body('preferences.theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Theme must be light, dark, or auto'),
  body('preferences.language')
    .optional()
    .isIn(['en', 'es', 'fr', 'de', 'zh', 'ja'])
    .withMessage('Invalid language selection')
]

const adminUpdateValidation = [
  ...updateProfileValidation,
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('role')
    .optional()
    .isIn(['patient', 'radiologist', 'referring_physician', 'admin', 'cms_editor', 'sales_agent', 'hr', 'accountant'])
    .withMessage('Invalid role'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Active status must be a boolean'),
  body('isVerified')
    .optional()
    .isBoolean()
    .withMessage('Verified status must be a boolean')
]

const searchValidation = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  query('role')
    .optional()
    .isIn(['patient', 'radiologist', 'referring_physician', 'admin', 'cms_editor', 'sales_agent', 'hr', 'accountant'])
    .withMessage('Invalid role filter'),
  query('isActive')
    .optional()
    .isBoolean()
    .withMessage('Active filter must be a boolean'),
  query('isVerified')
    .optional()
    .isBoolean()
    .withMessage('Verified filter must be a boolean'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sort')
    .optional()
    .isIn(['createdAt', '-createdAt', 'lastName', '-lastName', 'email', '-email', 'lastLogin', '-lastLogin'])
    .withMessage('Invalid sort field')
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

// Helper function to build query filters
const buildQueryFilters = (req) => {
  const filters = {}
  
  if (req.query.role) filters.role = req.query.role
  if (req.query.isActive !== undefined) filters.isActive = req.query.isActive === 'true'
  if (req.query.isVerified !== undefined) filters.isVerified = req.query.isVerified === 'true'
  if (req.query.specialization) filters.specialization = { [Op.iLike]: `%${req.query.specialization}%` }
  if (req.query.institution) filters.institution = { [Op.iLike]: `%${req.query.institution}%` }
  
  return filters
}

// @route   GET /api/users
// @desc    Get all users with filtering and pagination
// @access  Private (Admin only)
router.get('/', authenticate, authorize('admin'), searchValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const sort = req.query.sort || '-createdAt'
    
    const whereClause = buildQueryFilters(req)
    
    // Search functionality
    if (req.query.q) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${req.query.q}%` } },
        { lastName: { [Op.iLike]: `%${req.query.q}%` } },
        { email: { [Op.iLike]: `%${req.query.q}%` } },
        { institution: { [Op.iLike]: `%${req.query.q}%` } },
        { specialization: { [Op.iLike]: `%${req.query.q}%` } }
      ]
    }
    
    // Parse sort parameter
    const order = []
    if (sort.startsWith('-')) {
      order.push([sort.substring(1), 'DESC'])
    } else {
      order.push([sort, 'ASC'])
    }
    
    const users = await User.findAll({
      where: whereClause,
      attributes: { exclude: ['password', 'verificationToken', 'passwordResetToken', 'refreshTokens'] },
      order,
      offset: skip,
      limit
    })
    
    const total = await User.count({ where: whereClause })
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'verificationToken', 'passwordResetToken', 'refreshTokens'] }
    })
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    res.json({
      success: true,
      data: { user }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private (Admin or own profile)
router.get('/:id', authenticate, param('id').isUUID().withMessage('Invalid user ID'), handleValidationErrors, ownerOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'verificationToken', 'passwordResetToken', 'refreshTokens'] }
    })
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    res.json({
      success: true,
      data: { user }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put('/profile', authenticate, updateProfileValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const allowedUpdates = [
      'firstName', 'lastName', 'phone', 'specialization', 
      'licenseNumber', 'institution', 'preferences'
    ]
    
    const updates = {}
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    })
    
    const [updatedRowsCount, [user]] = await User.update(updates, {
      where: { id: req.user.id },
      returning: true,
      individualHooks: true
    })
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    // Remove sensitive fields
    const userResponse = user.toJSON()
    delete userResponse.password
    delete userResponse.verificationToken
    delete userResponse.passwordResetToken
    delete userResponse.refreshTokens
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: userResponse }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   PUT /api/users/:id
// @desc    Update user by ID (Admin only)
// @access  Private (Admin only)
router.put('/:id', authenticate, authorize('admin'), param('id').isUUID().withMessage('Invalid user ID'), adminUpdateValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const allowedUpdates = [
      'firstName', 'lastName', 'email', 'phone', 'role',
      'specialization', 'licenseNumber', 'institution',
      'isActive', 'isVerified', 'preferences'
    ]
    
    const updates = {}
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    })
    
    // Check if email is being updated and if it's already taken
    if (updates.email) {
      const existingUser = await User.findOne({ 
        where: {
          email: updates.email, 
          id: { [Op.ne]: req.params.id }
        }
      })
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        })
      }
    }
    
    const [updatedRowsCount, [user]] = await User.update(updates, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true
    })
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    // Remove sensitive fields
    const userResponse = user.toJSON()
    delete userResponse.password
    delete userResponse.verificationToken
    delete userResponse.passwordResetToken
    delete userResponse.refreshTokens
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: { user: userResponse }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   DELETE /api/users/:id
// @desc    Delete user (Admin only)
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), param('id').isUUID().withMessage('Invalid user ID'), handleValidationErrors, async (req, res, next) => {
  try {
    // Prevent admin from deleting themselves
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      })
    }
    
    const user = await User.findByPk(req.params.id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    await user.destroy()
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/users/:id/activate
// @desc    Activate user account
// @access  Private (Admin only)
router.post('/:id/activate', authenticate, authorize('admin'), param('id').isUUID().withMessage('Invalid user ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const [updatedRowsCount, [user]] = await User.update(
      { isActive: true },
      {
        where: { id: req.params.id },
        returning: true
      }
    )
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    // Remove sensitive fields
    const userResponse = user.toJSON()
    delete userResponse.password
    delete userResponse.verificationToken
    delete userResponse.passwordResetToken
    delete userResponse.refreshTokens

    res.json({
      success: true,
      message: 'User activated successfully',
      data: { user: userResponse }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/users/:id/deactivate
// @desc    Deactivate user account
// @access  Private (Admin only)
router.post('/:id/deactivate', authenticate, authorize('admin'), param('id').isUUID().withMessage('Invalid user ID'), handleValidationErrors, async (req, res, next) => {
  try {
    // Prevent admin from deactivating themselves
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate your own account'
      })
    }
    
    const [updatedRowsCount, [user]] = await User.update(
      { isActive: false },
      {
        where: { id: req.params.id },
        returning: true
      }
    )
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    // Remove sensitive fields
    const userResponse = user.toJSON()
    delete userResponse.password
    delete userResponse.verificationToken
    delete userResponse.passwordResetToken
    delete userResponse.refreshTokens

    res.json({
      success: true,
      message: 'User deactivated successfully',
      data: { user: userResponse }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/users/:id/verify
// @desc    Manually verify user email
// @access  Private (Admin only)
router.post('/:id/verify', authenticate, authorize('admin'), param('id').isUUID().withMessage('Invalid user ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const [updatedRowsCount, [user]] = await User.update(
      { 
        isVerified: true,
        verificationToken: null,
        verificationTokenExpires: null
      },
      {
        where: { id: req.params.id },
        returning: true
      }
    )
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    // Remove sensitive fields
    const userResponse = user.toJSON()
    delete userResponse.password
    delete userResponse.verificationToken
    delete userResponse.passwordResetToken
    delete userResponse.refreshTokens

    res.json({
      success: true,
      message: 'User verified successfully',
      data: { user: userResponse }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/users/stats/overview
// @desc    Get user statistics overview
// @access  Private (Admin only)
router.get('/stats/overview', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const totalUsers = await User.count()
    const activeUsers = await User.count({ where: { isActive: true } })
    const verifiedUsers = await User.count({ where: { isVerified: true } })
    
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const newUsersThisMonth = await User.count({
      where: {
        createdAt: {
          [Op.gte]: startOfMonth
        }
      }
    })
    
    const stats = {
      totalUsers,
      activeUsers,
      verifiedUsers,
      newUsersThisMonth
    }
    
    // Get users by role
    const usersByRole = await User.findAll({
      attributes: [
        'role',
        [User.sequelize.fn('COUNT', User.sequelize.col('id')), 'count']
      ],
      group: ['role'],
      order: [[User.sequelize.literal('count'), 'DESC']]
    })
    
    // Get recent registrations
    const recentUsers = await User.findAll({
      attributes: ['firstName', 'lastName', 'email', 'role', 'createdAt', 'isActive', 'isVerified'],
      order: [['createdAt', 'DESC']],
      limit: 10
    })
    
    res.json({
      success: true,
      data: {
        overview: stats,
        usersByRole,
        recentUsers
      }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/users/:id/reset-login-attempts
// @desc    Reset user login attempts
// @access  Private (Admin only)
router.post('/:id/reset-login-attempts', authenticate, authorize('admin'), param('id').isUUID().withMessage('Invalid user ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const [updatedRowsCount, [user]] = await User.update(
      {
        loginAttempts: 0,
        lockUntil: null
      },
      {
        where: { id: req.params.id },
        returning: true
      }
    )
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    // Remove sensitive fields
    const userResponse = user.toJSON()
    delete userResponse.password
    delete userResponse.verificationToken
    delete userResponse.passwordResetToken
    delete userResponse.refreshTokens

    res.json({
      success: true,
      message: 'Login attempts reset successfully',
      data: { user: userResponse }
    })
    
  } catch (error) {
    next(error)
  }
})

module.exports = router