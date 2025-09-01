const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Middleware to authenticate JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    })
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      })
    }
    
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated.'
      })
    }
    
    if (user.isLocked) {
      return res.status(401).json({
        success: false,
        message: 'Account is temporarily locked.'
      })
    }
    
    req.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      })
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired.'
      })
    }
    
    console.error('Authentication error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    })
  }
}

// Middleware to authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      })
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`
      })
    }
    
    next()
  }
}

// Middleware for optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      })
      
      if (user && user.isActive && !user.isLocked) {
        req.user = user
      }
    }
    
    next()
  } catch (error) {
    // Silently continue without user if token is invalid
    next()
  }
}

// Middleware to check if user owns the resource or is admin
const ownerOrAdmin = (resourceUserField = 'user') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      })
    }
    
    // Admin can access everything
    if (req.user.role === 'admin') {
      return next()
    }
    
    // Check if user owns the resource
    const resourceUserId = req.resource?.[resourceUserField] || req.params.userId
    
    if (req.user._id.toString() !== resourceUserId?.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      })
    }
    
    next()
  }
}

// Middleware to check if user is verified
const requireVerified = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    })
  }
  
  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Email verification required.'
    })
  }
  
  next()
}

// Middleware to check API key for external services
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.header('X-API-Key')
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key required.'
    })
  }
  
  // In production, store API keys in database with proper hashing
  const validApiKeys = process.env.VALID_API_KEYS?.split(',') || []
  
  if (!validApiKeys.includes(apiKey)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid API key.'
    })
  }
  
  req.apiKeyAuth = true
  next()
}

// Middleware to rate limit by user
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map()
  
  return (req, res, next) => {
    if (!req.user) {
      return next()
    }
    
    const userId = req.user._id.toString()
    const now = Date.now()
    const windowStart = now - windowMs
    
    // Clean old entries
    if (requests.has(userId)) {
      const userRequests = requests.get(userId).filter(time => time > windowStart)
      requests.set(userId, userRequests)
    }
    
    const userRequests = requests.get(userId) || []
    
    if (userRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      })
    }
    
    userRequests.push(now)
    requests.set(userId, userRequests)
    
    next()
  }
}

// Middleware to log user activity
const logActivity = (action) => {
  return (req, res, next) => {
    if (req.user) {
      // In production, you might want to store this in a separate ActivityLog model
      // console.log(`User ${req.user._id} performed action: ${action} at ${new Date().toISOString()}`)
    }
    next()
  }
}

// Middleware to check user permissions for specific resources
const checkPermission = (resource, action) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      })
    }
    
    // Define role-based permissions
    const permissions = {
      admin: ['*'], // Admin can do everything
      cms_editor: ['content:read', 'content:write', 'content:update', 'content:delete'],
      radiologist: ['content:read', 'user:read', 'user:update_own'],
      user: ['content:read', 'user:read_own', 'user:update_own']
    }
    
    const userPermissions = permissions[req.user.role] || []
    const requiredPermission = `${resource}:${action}`
    
    const hasPermission = userPermissions.includes('*') || 
                         userPermissions.includes(requiredPermission) ||
                         userPermissions.includes(`${resource}:*`)
    
    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required permission: ${requiredPermission}`
      })
    }
    
    next()
  }
}

module.exports = {
  authenticate,
  authorize,
  optionalAuth,
  ownerOrAdmin,
  requireVerified,
  apiKeyAuth,
  userRateLimit,
  logActivity,
  checkPermission
}