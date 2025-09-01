const express = require('express')
const { body, query, param, validationResult } = require('express-validator')
const { Op } = require('sequelize')
const Contact = require('../models/Contact')
const { authenticate, authorize, optionalAuth } = require('../middleware/auth')
const rateLimit = require('express-rate-limit')
const router = express.Router()

// Rate limiting for contact form submissions
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs (increased for testing)
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Validation rules
const contactValidation = [
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
    .withMessage('Please provide a valid email address'),
  body('phone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),
  body('position')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Position cannot exceed 100 characters'),
  body('inquiryType')
    .isIn(['general', 'service_inquiry', 'partnership', 'support', 'demo_request', 'pricing', 'technical'])
    .withMessage('Invalid inquiry type'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  body('servicesInterested')
    .optional()
    .isArray()
    .withMessage('Services interested must be an array'),
  body('servicesInterested.*')
    .optional()
    .isIn(['teleradiology', 'ai_reporting', 'pacs_integration', 'coverage_24x7', 'quality_assurance', 'consultation'])
    .withMessage('Invalid service type'),
  body('preferredContact')
    .optional()
    .isIn(['email', 'phone', 'both'])
    .withMessage('Invalid preferred contact method'),
  body('budget')
    .optional()
    .isIn(['under_10k', '10k_50k', '50k_100k', '100k_plus', 'not_specified'])
    .withMessage('Invalid budget range'),
  body('timeline')
    .optional()
    .isIn(['immediate', 'within_month', 'within_quarter', 'within_year', 'not_specified'])
    .withMessage('Invalid timeline'),
  body('marketingConsent')
    .optional()
    .isBoolean()
    .withMessage('Marketing consent must be a boolean'),
  body('gdprConsent')
    .isBoolean()
    .withMessage('GDPR consent is required')
]

const searchValidation = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  query('status')
    .optional()
    .isIn(['new', 'in_progress', 'resolved', 'closed'])
    .withMessage('Invalid status filter'),
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority filter'),
  query('inquiryType')
    .optional()
    .isIn(['general', 'service_inquiry', 'partnership', 'support', 'demo_request', 'pricing', 'technical'])
    .withMessage('Invalid inquiry type filter'),
  query('assignedTo')
    .optional()
    .isUUID()
    .withMessage('Invalid assigned user ID'),
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
    .isIn(['createdAt', '-createdAt', 'updatedAt', '-updatedAt', 'priority', '-priority', 'status', '-status'])
    .withMessage('Invalid sort field'),
  query('dateFrom')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format for dateFrom'),
  query('dateTo')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format for dateTo')
]

const updateContactValidation = [
  body('status')
    .optional()
    .isIn(['new', 'in_progress', 'resolved', 'closed'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority'),
  body('assignedTo')
    .optional()
    .isUUID()
    .withMessage('Invalid assigned user ID'),
  body('internalNotes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Internal notes cannot exceed 2000 characters'),
  body('resolution')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Resolution cannot exceed 2000 characters')
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
  
  if (req.query.status) filters.status = req.query.status
  if (req.query.priority) filters.priority = req.query.priority
  if (req.query.inquiryType) filters.inquiryType = req.query.inquiryType
  if (req.query.assignedTo) filters.assignedTo = req.query.assignedTo
  if (req.query.source) filters.source = req.query.source
  
  // Date range filter
  if (req.query.dateFrom || req.query.dateTo) {
    filters.createdAt = {}
    if (req.query.dateFrom) filters.createdAt[Op.gte] = new Date(req.query.dateFrom)
    if (req.query.dateTo) filters.createdAt[Op.lte] = new Date(req.query.dateTo)
  }
  
  return filters
}

// Simple spam detection
const detectSpam = (contactData) => {
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money']
  const text = `${contactData.subject} ${contactData.message}`.toLowerCase()
  
  const hasSpamKeywords = spamKeywords.some(keyword => text.includes(keyword))
  const hasExcessiveLinks = (text.match(/http/g) || []).length > 3
  const hasExcessiveCaps = text.replace(/[^A-Z]/g, '').length > text.length * 0.5
  
  return hasSpamKeywords || hasExcessiveLinks || hasExcessiveCaps
}

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public (with rate limiting)
router.post('/', contactRateLimit, optionalAuth, contactValidation, handleValidationErrors, async (req, res, next) => {
  try {
    // Check GDPR consent
    if (!req.body.gdprConsent) {
      return res.status(400).json({
        success: false,
        message: 'GDPR consent is required to process your request'
      })
    }
    
    // Prepare contact data
    const contactData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      source: req.body.source || 'website'
    }
    
    // Add user ID if authenticated
    if (req.user) {
      contactData.userId = req.user.id
    }
    
    // Spam detection
    contactData.isSpam = detectSpam(contactData)
    
    // Set initial priority based on inquiry type
    if (!contactData.priority) {
      const priorityMap = {
        'support': 'high',
        'technical': 'high',
        'demo_request': 'medium',
        'service_inquiry': 'medium',
        'partnership': 'medium',
        'pricing': 'low',
        'general': 'low'
      }
      contactData.priority = priorityMap[contactData.inquiryType] || 'low'
    }
    
    const contact = await Contact.create(contactData)
    
    // TODO: Send notification email to admin
    // TODO: Send confirmation email to user
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry. We will get back to you soon.',
      data: {
        id: contact.id,
        status: contact.status,
        priority: contact.priority
      }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/contact
// @desc    Get all contact submissions with filtering
// @access  Private (Admin, CMS Editor)
router.get('/', authenticate, authorize('admin', 'cms_editor'), searchValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const sort = req.query.sort || '-createdAt'
    
    const whereClause = buildQueryFilters(req)
    
    // Search functionality
    if (req.query.q) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${req.query.q}%` } },
        { lastName: { [Op.iLike]: `%${req.query.q}%` } },
        { email: { [Op.iLike]: `%${req.query.q}%` } },
        { company: { [Op.iLike]: `%${req.query.q}%` } },
        { subject: { [Op.iLike]: `%${req.query.q}%` } },
        { message: { [Op.iLike]: `%${req.query.q}%` } }
      ]
    }
    
    // Parse sort parameter
    const orderBy = []
    if (sort.startsWith('-')) {
      orderBy.push([sort.substring(1), 'DESC'])
    } else {
      orderBy.push([sort, 'ASC'])
    }
    
    const contacts = await Contact.findAll({
      where: whereClause,
      include: [
        {
          model: require('../models/User'),
          as: 'assignedTo',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: require('../models/User'),
          as: 'user',
          attributes: ['firstName', 'lastName', 'email']
        }
      ],
      order: orderBy,
      offset,
      limit
    })
    
    const total = await Contact.count({ where: whereClause })
    
    res.json({
      success: true,
      data: {
        contacts,
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

// @route   GET /api/contact/:id
// @desc    Get contact submission by ID
// @access  Private (Admin, CMS Editor)
router.get('/:id', authenticate, authorize('admin', 'cms_editor'), param('id').isUUID().withMessage('Invalid contact ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id, {
      include: [
        {
          model: require('../models/User'),
          as: 'assignedTo',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: require('../models/User'),
          as: 'user',
          attributes: ['firstName', 'lastName', 'email', 'role']
        }
      ]
    })
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      })
    }
    
    res.json({
      success: true,
      data: { contact }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   PUT /api/contact/:id
// @desc    Update contact submission
// @access  Private (Admin, CMS Editor)
router.put('/:id', authenticate, authorize('admin', 'cms_editor'), param('id').isUUID().withMessage('Invalid contact ID'), updateContactValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const allowedUpdates = ['status', 'priority', 'assignedTo', 'internalNotes', 'resolution']
    
    const updates = {}
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    })
    
    // Set resolution date if status is resolved or closed
    if (updates.status && ['resolved', 'closed'].includes(updates.status)) {
      updates.resolvedAt = new Date()
      updates.resolvedBy = req.user.id
    }
    
    const [updatedRowsCount] = await Contact.update(updates, {
      where: { id: req.params.id },
      returning: true
    })
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      })
    }
    
    const contact = await Contact.findByPk(req.params.id, {
      include: [
        {
          model: require('../models/User'),
          as: 'assignedTo',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: require('../models/User'),
          as: 'resolvedBy',
          attributes: ['firstName', 'lastName']
        }
      ]
    })
    
    res.json({
      success: true,
      message: 'Contact submission updated successfully',
      data: { contact }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/contact/:id/follow-up
// @desc    Add follow-up to contact submission
// @access  Private (Admin, CMS Editor)
router.post('/:id/follow-up', authenticate, authorize('admin', 'cms_editor'), [
  param('id').isUUID().withMessage('Invalid contact ID'),
  body('type')
    .isIn(['email', 'phone', 'meeting', 'note'])
    .withMessage('Invalid follow-up type'),
  body('notes')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Notes must be between 1 and 1000 characters'),
  body('scheduledFor')
    .optional()
    .isISO8601()
    .withMessage('Invalid scheduled date format')
], handleValidationErrors, async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id)
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      })
    }
    
    const followUp = {
      type: req.body.type,
      notes: req.body.notes,
      createdBy: req.user.id,
      scheduledFor: req.body.scheduledFor
    }
    
    // Add follow-up to contact
    if (!contact.followUps) {
      contact.followUps = []
    }
    contact.followUps.push(followUp)
    contact.lastFollowUp = new Date()
    
    await contact.save()
    
    // Reload contact with associations
    const updatedContact = await Contact.findByPk(contact.id, {
      include: [
        {
          model: require('../models/User'),
          as: 'assignedTo',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: require('../models/User'),
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    })
    
    res.json({
      success: true,
      message: 'Follow-up added successfully',
      data: { contact: updatedContact }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   DELETE /api/contact/:id
// @desc    Delete contact submission
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), param('id').isUUID().withMessage('Invalid contact ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const contact = await Contact.findByPk(req.params.id)
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      })
    }
    
    await contact.destroy()
    
    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/contact/stats/overview
// @desc    Get contact statistics
// @access  Private (Admin, CMS Editor)
router.get('/stats/overview', authenticate, authorize('admin', 'cms_editor'), async (req, res, next) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date()
    
    // Get contact statistics
    const totalContacts = await Contact.count({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        }
      }
    })
    
    const newContacts = await Contact.count({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        },
        status: 'new'
      }
    })
    
    const inProgressContacts = await Contact.count({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        },
        status: 'in_progress'
      }
    })
    
    const resolvedContacts = await Contact.count({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        },
        status: 'resolved'
      }
    })
    
    const spamContacts = await Contact.count({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        },
        isSpam: true
      }
    })
    
    // Calculate average response time
    const contactsWithResponse = await Contact.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        },
        firstResponseAt: {
          [Op.ne]: null
        }
      },
      attributes: ['createdAt', 'firstResponseAt']
    })
    
    let avgResponseTime = 0
    if (contactsWithResponse.length > 0) {
      const totalResponseTime = contactsWithResponse.reduce((sum, contact) => {
        const responseTime = new Date(contact.firstResponseAt) - new Date(contact.createdAt)
        return sum + (responseTime / (1000 * 60 * 60)) // Convert to hours
      }, 0)
      avgResponseTime = totalResponseTime / contactsWithResponse.length
    }
    
    const stats = {
      totalContacts,
      newContacts,
      inProgressContacts,
      resolvedContacts,
      spamContacts,
      avgResponseTime
    }
    
    // Get contacts by inquiry type
    const contactsByType = await Contact.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        }
      },
      attributes: [
        'inquiryType',
        [require('sequelize').fn('COUNT', '*'), 'count']
      ],
      group: ['inquiryType'],
      order: [[require('sequelize').literal('count'), 'DESC']],
      raw: true
    })
    
    // Get contacts by priority
    const contactsByPriority = await Contact.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        }
      },
      attributes: [
        'priority',
        [require('sequelize').fn('COUNT', '*'), 'count']
      ],
      group: ['priority'],
      raw: true
    })
    
    res.json({
      success: true,
      data: {
        overview: stats,
        contactsByType,
        contactsByPriority,
        dateRange: { startDate, endDate }
      }
    })
    
  } catch (error) {
    next(error)
  }
})

module.exports = router