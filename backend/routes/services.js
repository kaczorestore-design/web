const express = require('express')
const { body, query, param, validationResult } = require('express-validator')
const { Content, User } = require('../models')
const { Op, fn, col, literal } = require('sequelize')
const { authenticate, authorize, optionalAuth } = require('../middleware/auth')
const router = express.Router()

// Validation rules
const serviceValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  body('serviceType')
    .isIn(['teleradiology', 'ai_reporting', 'pacs_integration', 'coverage_24x7', 'quality_assurance', 'consultation'])
    .withMessage('Invalid service type'),
  body('pricing.type')
    .optional()
    .isIn(['fixed', 'per_study', 'subscription', 'custom'])
    .withMessage('Invalid pricing type'),
  body('pricing.amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Pricing amount must be a positive number'),
  body('pricing.currency')
    .optional()
    .isIn(['USD', 'EUR', 'GBP', 'CAD', 'AUD'])
    .withMessage('Invalid currency'),
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  body('features.*')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Each feature cannot exceed 200 characters'),
  body('benefits')
    .optional()
    .isArray()
    .withMessage('Benefits must be an array'),
  body('benefits.*')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Each benefit cannot exceed 200 characters'),
  body('technicalSpecs')
    .optional()
    .isObject()
    .withMessage('Technical specs must be an object'),
  body('availability.hours')
    .optional()
    .isIn(['24x7', 'business_hours', 'custom'])
    .withMessage('Invalid availability hours'),
  body('availability.timezone')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Timezone cannot exceed 50 characters'),
  body('turnaroundTime.routine')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Routine turnaround time must be a positive integer'),
  body('turnaroundTime.urgent')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Urgent turnaround time must be a positive integer'),
  body('turnaroundTime.stat')
    .optional()
    .isInt({ min: 1 })
    .withMessage('STAT turnaround time must be a positive integer'),
  body('certifications')
    .optional()
    .isArray()
    .withMessage('Certifications must be an array'),
  body('certifications.*')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Each certification cannot exceed 100 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('featured must be a boolean')
]

const searchValidation = [
  query('serviceType')
    .optional()
    .isIn(['teleradiology', 'ai_reporting', 'pacs_integration', 'coverage_24x7', 'quality_assurance', 'consultation'])
    .withMessage('Invalid service type'),
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  query('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  query('priceRange')
    .optional()
    .isIn(['free', 'low', 'medium', 'high', 'enterprise'])
    .withMessage('Invalid price range'),
  query('availability')
    .optional()
    .isIn(['24x7', 'business_hours', 'custom'])
    .withMessage('Invalid availability filter'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('sort')
    .optional()
    .isIn(['createdAt', '-createdAt', 'title', '-title', 'pricing.amount', '-pricing.amount', 'featured', '-featured'])
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
  const where = {
    type: 'service',
    status: 'published'
  }
  
  if (req.query.serviceType) {
    where['serviceDetails.serviceType'] = req.query.serviceType
  }
  
  if (req.query.featured !== undefined) {
    where.featured = req.query.featured === 'true'
  }
  
  if (req.query.isActive !== undefined) {
    where['serviceDetails.isActive'] = req.query.isActive === 'true'
  }
  
  if (req.query.availability) {
    where['serviceDetails.availability.hours'] = req.query.availability
  }
  
  if (req.query.priceRange) {
    const priceRanges = {
      'free': { min: 0, max: 0 },
      'low': { min: 0.01, max: 100 },
      'medium': { min: 100.01, max: 500 },
      'high': { min: 500.01, max: 2000 },
      'enterprise': { min: 2000.01, max: Infinity }
    }
    
    const range = priceRanges[req.query.priceRange]
    if (range) {
      where['serviceDetails.pricing.amount'] = {
        [Op.gte]: range.min,
        ...(range.max !== Infinity && { [Op.lte]: range.max })
      }
    }
  }
  
  return where
}

// @route   GET /api/services
// @desc    Get all services with filtering
// @access  Public
router.get('/', optionalAuth, searchValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const sort = req.query.sort || '-createdAt'
    
    const where = buildQueryFilters(req)
    
    // Search functionality
    if (req.query.q) {
      const searchTerm = `%${req.query.q}%`
      where[Op.or] = [
        { title: { [Op.iLike]: searchTerm } },
        { excerpt: { [Op.iLike]: searchTerm } },
        { 'serviceDetails.description': { [Op.iLike]: searchTerm } },
        literal(`"serviceDetails"->>'features' ILIKE '%${req.query.q}%'`),
        literal(`"serviceDetails"->>'benefits' ILIKE '%${req.query.q}%'`)
      ]
    }
    
    // Convert sort format
    let order = [['createdAt', 'DESC']]
    if (sort) {
      const isDesc = sort.startsWith('-')
      const field = isDesc ? sort.substring(1) : sort
      const direction = isDesc ? 'DESC' : 'ASC'
      
      if (field.includes('.')) {
        // Handle nested fields like 'pricing.amount'
        order = [literal(`"serviceDetails"->>'${field.replace('.', '.')}' ${direction}`)]
      } else {
        order = [[field, direction]]
      }
    }
    
    const { count, rows: services } = await Content.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName']
      }],
      order,
      offset,
      limit
    })
    
    res.json({
      success: true,
      data: {
        services,
        pagination: {
          current: page,
          pages: Math.ceil(count / limit),
          total: count,
          limit
        }
      }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/services/featured
// @desc    Get featured services
// @access  Public
router.get('/featured', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6
    
    const services = await Content.findAll({
      where: {
        type: 'service',
        status: 'published',
        featured: true,
        'serviceDetails.isActive': true
      },
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName']
      }],
      order: [['priority', 'DESC'], ['createdAt', 'DESC']],
      limit
    })
    
    res.json({
      success: true,
      data: { services }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/services/types
// @desc    Get all service types with counts
// @access  Public
router.get('/types', async (req, res, next) => {
  try {
    const types = await Content.findAll({
      where: {
        type: 'service',
        status: 'published',
        'serviceDetails.isActive': true
      },
      attributes: [
        [literal(`"serviceDetails"->>'serviceType'`), 'serviceType'],
        [fn('COUNT', col('id')), 'count'],
        [fn('AVG', literal(`CAST("serviceDetails"->>'pricing.amount' AS DECIMAL)`)), 'avgPrice'],
        [fn('MIN', literal(`CAST("serviceDetails"->>'pricing.amount' AS DECIMAL)`)), 'minPrice'],
        [fn('MAX', literal(`CAST("serviceDetails"->>'pricing.amount' AS DECIMAL)`)), 'maxPrice']
      ],
      group: [literal(`"serviceDetails"->>'serviceType'`)],
      order: [[fn('COUNT', col('id')), 'DESC']],
      raw: true
    })
    
    res.json({
      success: true,
      data: { types }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/services/:id
// @desc    Get service by ID
// @access  Public
router.get('/:id', optionalAuth, param('id').isUUID().withMessage('Invalid service ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const service = await Content.findOne({
      where: {
        id: req.params.id,
        type: 'service',
        status: 'published'
      },
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName']
      }]
    })
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }
    
    // Increment view count
    await service.increment('viewCount')
    
    // Get related services
    const relatedServices = await Content.findAll({
      where: {
        type: 'service',
        status: 'published',
        'serviceDetails.serviceType': service.serviceDetails?.serviceType,
        id: { [Op.ne]: service.id }
      },
      attributes: ['title', 'slug', 'excerpt', 'serviceDetails', 'featuredImage'],
      limit: 4
    })
    
    res.json({
      success: true,
      data: {
        service,
        relatedServices
      }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/services/slug/:slug
// @desc    Get service by slug
// @access  Public
router.get('/slug/:slug', async (req, res, next) => {
  try {
    const service = await Content.findOne({
      where: {
        slug: req.params.slug,
        type: 'service',
        status: 'published'
      },
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName']
      }]
    })
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }
    
    // Increment view count
    await service.increment('viewCount')
    
    // Get related services
    const relatedServices = await Content.findAll({
      where: {
        type: 'service',
        status: 'published',
        'serviceDetails.serviceType': service.serviceDetails?.serviceType,
        id: { [Op.ne]: service.id }
      },
      attributes: ['title', 'slug', 'excerpt', 'serviceDetails', 'featuredImage'],
      limit: 4
    })
    
    res.json({
      success: true,
      data: { 
        service,
        relatedServices
      }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/services
// @desc    Create new service
// @access  Private (Admin, CMS Editor)
router.post('/', authenticate, authorize('admin', 'cms_editor'), serviceValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const serviceData = {
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.description,
      type: 'service',
      status: 'published',
      authorId: req.user.id,
      featured: req.body.featured || false,
      serviceDetails: {
        serviceType: req.body.serviceType,
        description: req.body.description,
        features: req.body.features || [],
        benefits: req.body.benefits || [],
        pricing: req.body.pricing || {},
        technicalSpecs: req.body.technicalSpecs || {},
        availability: req.body.availability || {},
        turnaroundTime: req.body.turnaroundTime || {},
        certifications: req.body.certifications || [],
        isActive: req.body.isActive !== false
      }
    }
    
    const service = await Content.create(serviceData)
    
    const populatedService = await Content.findByPk(service.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName', 'email']
      }]
    })
    
    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { service: populatedService }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Private (Admin, CMS Editor)
router.put('/:id', authenticate, authorize('admin', 'cms_editor'), param('id').isUUID().withMessage('Invalid service ID'), serviceValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const service = await Content.findOne({
      where: {
        id: req.params.id,
        type: 'service'
      }
    })
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }
    
    // Update service data
    const updateData = {
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.description,
      featured: req.body.featured,
      serviceDetails: {
        serviceType: req.body.serviceType,
        description: req.body.description,
        features: req.body.features || [],
        benefits: req.body.benefits || [],
        pricing: req.body.pricing || {},
        technicalSpecs: req.body.technicalSpecs || {},
        availability: req.body.availability || {},
        turnaroundTime: req.body.turnaroundTime || {},
        certifications: req.body.certifications || [],
        isActive: req.body.isActive !== false
      }
    }
    
    await service.update(updateData)
    
    const updatedService = await Content.findByPk(service.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName', 'email']
      }]
    })
    
    res.json({
      success: true,
      message: 'Service updated successfully',
      data: { service: updatedService }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   DELETE /api/services/:id
// @desc    Delete service
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), param('id').isUUID().withMessage('Invalid service ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const service = await Content.findOne({
      where: {
        id: req.params.id,
        type: 'service'
      }
    })
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }
    
    await service.destroy()
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/services/:id/toggle-active
// @desc    Toggle service active status
// @access  Private (Admin, CMS Editor)
router.post('/:id/toggle-active', authenticate, authorize('admin', 'cms_editor'), param('id').isUUID().withMessage('Invalid service ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const service = await Content.findOne({
      where: {
        id: req.params.id,
        type: 'service'
      }
    })
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }
    
    // Check ownership or admin role
    if (service.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this service'
      })
    }
    
    // Toggle active status
    const currentServiceDetails = service.serviceDetails || {}
    const newServiceDetails = {
      ...currentServiceDetails,
      isActive: !currentServiceDetails.isActive
    }
    
    await service.update({ serviceDetails: newServiceDetails })
    
    res.json({
      success: true,
      message: `Service ${newServiceDetails.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { 
        service: {
          id: service.id,
          title: service.title,
          isActive: newServiceDetails.isActive
        }
      }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/services/stats/overview
// @desc    Get service statistics
// @access  Private (Admin, CMS Editor)
router.get('/stats/overview', authenticate, authorize('admin', 'cms_editor'), async (req, res, next) => {
  try {
    // Get overall stats
    const totalServices = await Content.count({ where: { type: 'service' } })
    const activeServices = await Content.count({ 
      where: { 
        type: 'service',
        'serviceDetails.isActive': true 
      } 
    })
    const featuredServices = await Content.count({ 
      where: { 
        type: 'service',
        featured: true 
      } 
    })
    const publishedServices = await Content.count({ 
      where: { 
        type: 'service',
        status: 'published' 
      } 
    })
    
    const viewStats = await Content.findAll({
      where: { type: 'service' },
      attributes: [
        [fn('SUM', col('viewCount')), 'totalViews'],
        [fn('AVG', col('viewCount')), 'avgViews']
      ],
      raw: true
    })
    
    // Get services by type
    const servicesByType = await Content.findAll({
      where: {
        type: 'service',
        status: 'published'
      },
      attributes: [
        [literal(`"serviceDetails"->>'serviceType'`), 'serviceType'],
        [fn('COUNT', col('id')), 'count'],
        [fn('SUM', col('viewCount')), 'views'],
        [fn('AVG', literal(`CAST("serviceDetails"->>'pricing.amount' AS DECIMAL)`)), 'avgPrice']
      ],
      group: [literal(`"serviceDetails"->>'serviceType'`)],
      order: [[fn('COUNT', col('id')), 'DESC']],
      raw: true
    })
    
    // Get top performing services
    const topServices = await Content.findAll({
      where: {
        type: 'service',
        status: 'published'
      },
      attributes: ['title', 'slug', 'serviceDetails', 'viewCount', 'createdAt'],
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName']
      }],
      order: [['viewCount', 'DESC']],
      limit: 10
    })
    
    res.json({
      success: true,
      data: {
        overview: {
          totalServices,
          activeServices,
          featuredServices,
          publishedServices,
          totalViews: parseInt(viewStats[0]?.totalViews) || 0,
          avgViews: parseFloat(viewStats[0]?.avgViews) || 0
        },
        servicesByType,
        topServices
      }
    })
    
  } catch (error) {
    next(error)
  }
})

module.exports = router