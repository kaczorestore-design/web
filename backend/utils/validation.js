const { body, query, param } = require('express-validator')
const { Op } = require('sequelize')

// Common validation rules
const commonValidations = {
  // Email validation
  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  // Password validation
  password: body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'i')
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  // Name validation
  firstName: body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  // Phone validation
  phone: body('phone')
    .optional()
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Please provide a valid phone number'),
  
  // UUID validation for PostgreSQL
  uuid: (field = 'id') => param(field)
    .isUUID()
    .withMessage(`Invalid ${field} format`),
  
  // URL validation
  url: (field) => body(field)
    .optional()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage(`${field} must be a valid URL`),
  
  // Date validation
  date: (field) => body(field)
    .optional()
    .isISO8601()
    .withMessage(`${field} must be a valid date`),
  
  // Pagination validation
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ],
  
  // Search validation
  search: query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  
  // Sort validation
  sort: (allowedFields) => query('sort')
    .optional()
    .custom((value) => {
      const sortField = value.startsWith('-') ? value.slice(1) : value
      if (!allowedFields.includes(sortField)) {
        throw new Error(`Invalid sort field. Allowed: ${allowedFields.join(', ')}`)
      }
      return true
    })
}

// User-specific validations
const userValidations = {
  register: [
    commonValidations.firstName,
    commonValidations.lastName,
    commonValidations.email,
    commonValidations.password,
    body('role')
      .optional()
      .isIn(['user', 'radiologist', 'admin', 'cms_editor'])
      .withMessage('Invalid role'),
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
    commonValidations.phone
  ],
  
  login: [
    commonValidations.email,
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ],
  
  updateProfile: [
    body('firstName')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('First name must be between 1 and 50 characters'),
    body('lastName')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Last name must be between 1 and 50 characters'),
    body('specialization')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Specialization cannot exceed 100 characters'),
    body('institution')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Institution cannot exceed 200 characters'),
    commonValidations.phone,
    body('preferences.notifications')
      .optional()
      .isBoolean()
      .withMessage('Notifications preference must be a boolean'),
    body('preferences.theme')
      .optional()
      .isIn(['light', 'dark', 'auto'])
      .withMessage('Invalid theme preference'),
    body('preferences.language')
      .optional()
      .isIn(['en', 'es', 'fr', 'de', 'it', 'pt'])
      .withMessage('Invalid language preference')
  ],
  
  changePassword: [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8, max: 128 })
      .withMessage('New password must be between 8 and 128 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'i')
      .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Password confirmation does not match new password')
        }
        return true
      })
  ]
}

// Content validations
const contentValidations = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Title must be between 1 and 200 characters'),
    body('content')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Content is required'),
    body('type')
      .isIn(['page', 'blog', 'service', 'testimonial', 'case_study', 'faq'])
      .withMessage('Invalid content type'),
    body('status')
      .optional()
      .isIn(['draft', 'published', 'archived'])
      .withMessage('Invalid status'),
    body('excerpt')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Excerpt cannot exceed 500 characters'),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Tags must be an array'),
    body('tags.*')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Each tag cannot exceed 50 characters'),
    body('category')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Category cannot exceed 100 characters'),
    body('featured')
      .optional()
      .isBoolean()
      .withMessage('Featured must be a boolean'),
    body('seo.metaTitle')
      .optional()
      .trim()
      .isLength({ max: 60 })
      .withMessage('Meta title cannot exceed 60 characters'),
    body('seo.metaDescription')
      .optional()
      .trim()
      .isLength({ max: 160 })
      .withMessage('Meta description cannot exceed 160 characters'),
    body('seo.keywords')
      .optional()
      .isArray()
      .withMessage('SEO keywords must be an array')
  ]
}

// Contact form validations
const contactValidations = {
  submit: [
    commonValidations.firstName,
    commonValidations.lastName,
    commonValidations.email,
    body('subject')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Subject must be between 1 and 200 characters'),
    body('message')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Message must be between 10 and 2000 characters'),
    body('phone')
      .optional()
      .isMobilePhone('any', { strictMode: false })
      .withMessage('Please provide a valid phone number'),
    body('organization')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Organization cannot exceed 200 characters'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high', 'urgent'])
      .withMessage('Invalid priority level'),
    body('servicesInterested')
      .optional()
      .isArray()
      .withMessage('Services interested must be an array'),
    body('budgetRange')
      .optional()
      .isIn(['under_10k', '10k_25k', '25k_50k', '50k_100k', 'over_100k', 'not_specified'])
      .withMessage('Invalid budget range'),
    body('timeline')
      .optional()
      .isIn(['immediate', 'within_month', 'within_quarter', 'within_year', 'not_specified'])
      .withMessage('Invalid timeline'),
    body('source')
      .optional()
      .isIn(['website', 'referral', 'search', 'social_media', 'advertisement', 'other'])
      .withMessage('Invalid source'),
    body('marketingConsent')
      .optional()
      .isBoolean()
      .withMessage('Marketing consent must be a boolean')
  ]
}

// Custom validation functions
const customValidations = {
  // Check if email exists in database
  emailExists: (Model, field = 'email') => {
    return body(field).custom(async (email) => {
      const existingUser = await Model.findOne({ where: { [field]: email } })
      if (existingUser) {
        throw new Error('Email already exists')
      }
      return true
    })
  },
  
  // Check if slug is unique
  uniqueSlug: (Model, excludeId = null) => {
    return body('slug').custom(async (slug, { req }) => {
      const where = { slug }
      if (excludeId && req.params.id) {
        where.id = { [Op.ne]: req.params.id }
      }
      
      const existing = await Model.findOne({ where })
      if (existing) {
        throw new Error('Slug already exists')
      }
      return true
    })
  },
  
  // Validate array of UUIDs
  uuidArray: (field) => {
    return body(field)
      .optional()
      .isArray()
      .withMessage(`${field} must be an array`)
      .custom((arr) => {
        if (!Array.isArray(arr)) return true
        
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        for (const id of arr) {
          if (!uuidRegex.test(id)) {
            throw new Error(`Invalid UUID in ${field}`)
          }
        }
        return true
      })
  },
  
  // Validate file upload
  fileUpload: (allowedTypes, maxSize) => {
    return (req, res, next) => {
      if (!req.file) {
        return next()
      }
      
      // Check file type
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`
        })
      }
      
      // Check file size
      if (req.file.size > maxSize) {
        return res.status(400).json({
          success: false,
          message: `File too large. Maximum size: ${(maxSize / (1024 * 1024)).toFixed(1)}MB`
        })
      }
      
      next()
    }
  },
  
  // Validate date range
  dateRange: (startField, endField) => {
    return body(endField).custom((endDate, { req }) => {
      const startDate = req.body[startField]
      if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
        throw new Error(`${endField} must be after ${startField}`)
      }
      return true
    })
  },
  
  // Validate password strength
  passwordStrength: body('password').custom((password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[@$!%*?&]/.test(password)
    
    const errors = []
    
    if (password.length < minLength) {
      errors.push(`at least ${minLength} characters`)
    }
    if (!hasUpperCase) {
      errors.push('one uppercase letter')
    }
    if (!hasLowerCase) {
      errors.push('one lowercase letter')
    }
    if (!hasNumbers) {
      errors.push('one number')
    }
    if (!hasSpecialChar) {
      errors.push('one special character (@$!%*?&)')
    }
    
    if (errors.length > 0) {
      throw new Error(`Password must contain ${errors.join(', ')}`)
    }
    
    return true
  })
}

// Sanitization functions
const sanitizers = {
  // Remove HTML tags
  stripHtml: (field) => body(field).customSanitizer((value) => {
    if (typeof value !== 'string') return value
    return value.replace(/<[^>]*>/g, '')
  }),
  
  // Normalize whitespace
  normalizeWhitespace: (field) => body(field).customSanitizer((value) => {
    if (typeof value !== 'string') return value
    return value.replace(/\s+/g, ' ').trim()
  }),
  
  // Convert to lowercase
  toLowerCase: (field) => body(field).customSanitizer((value) => {
    if (typeof value !== 'string') return value
    return value.toLowerCase()
  }),
  
  // Generate slug from title
  generateSlug: (sourceField = 'title', targetField = 'slug') => {
    return body(targetField).customSanitizer((value, { req }) => {
      if (value) return value
      
      const source = req.body[sourceField]
      if (!source) return value
      
      return source
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')
    })
  }
}

module.exports = {
  commonValidations,
  userValidations,
  contentValidations,
  contactValidations,
  customValidations,
  sanitizers
}