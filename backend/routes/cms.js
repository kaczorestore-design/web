const express = require('express')
const { body, query, param, validationResult } = require('express-validator')
const { Op, fn, col, literal } = require('sequelize')
const Content = require('../models/Content')
const { authenticate, authorize, checkPermission } = require('../middleware/auth')
const router = express.Router()

// Validation rules
const contentValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('type')
    .isIn(['page', 'blog_post', 'service', 'case_study', 'news', 'faq', 'testimonial'])
    .withMessage('Invalid content type'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  body('slug')
    .optional()
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  body('excerpt')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category cannot exceed 50 characters'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Each tag cannot exceed 30 characters'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('priority')
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage('Priority must be between 0 and 10'),
  body('seo.metaTitle')
    .optional()
    .isLength({ max: 60 })
    .withMessage('Meta title cannot exceed 60 characters'),
  body('seo.metaDescription')
    .optional()
    .isLength({ max: 160 })
    .withMessage('Meta description cannot exceed 160 characters'),
  body('seo.keywords')
    .optional()
    .isArray()
    .withMessage('SEO keywords must be an array'),
  body('scheduledAt')
    .optional()
    .isISO8601()
    .withMessage('Scheduled date must be a valid ISO 8601 date')
]

const searchValidation = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  query('type')
    .optional()
    .isIn(['page', 'blog_post', 'service', 'case_study', 'news', 'faq', 'testimonial'])
    .withMessage('Invalid content type'),
  query('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  query('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category cannot exceed 50 characters'),
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
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
    .isIn(['createdAt', '-createdAt', 'updatedAt', '-updatedAt', 'publishedAt', '-publishedAt', 'title', '-title', 'viewCount', '-viewCount'])
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
  
  if (req.query.type) filters.type = req.query.type
  if (req.query.status) filters.status = req.query.status
  if (req.query.category) filters.category = { [Op.iLike]: `%${req.query.category}%` }
  if (req.query.featured !== undefined) filters.featured = req.query.featured === 'true'
  if (req.query.author) filters.author = req.query.author
  if (req.query.tags) {
    const tags = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags]
    filters.tags = { [Op.overlap]: tags }
  }
  
  return filters
}

// @route   GET /api/cms/content
// @desc    Get all content with filtering, pagination, and search
// @access  Private (CMS Editor, Admin)
router.get('/content', authenticate, authorize('cms_editor', 'admin'), searchValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const sort = req.query.sort || '-createdAt'
    
    let whereClause = buildQueryFilters(req)
    
    // Search functionality
    if (req.query.q) {
      const searchConditions = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${req.query.q}%` } },
          { content: { [Op.iLike]: `%${req.query.q}%` } },
          { excerpt: { [Op.iLike]: `%${req.query.q}%` } }
        ]
      }
      whereClause = req.query.type ? { [Op.and]: [whereClause, searchConditions, { type: req.query.type }] } : { [Op.and]: [whereClause, searchConditions] }
    }
    
    // Convert sort format
    let order = [['createdAt', 'DESC']]
    if (sort) {
      const isDesc = sort.startsWith('-')
      const field = isDesc ? sort.substring(1) : sort
      order = [[field, isDesc ? 'DESC' : 'ASC']]
    }
    
    // Apply pagination and sorting
    const content = await Content.findAll({
      where: whereClause,
      include: [{
        association: 'author',
        attributes: ['firstName', 'lastName', 'email']
      }],
      order,
      offset,
      limit
    })
    
    // Get total count for pagination
    const total = await Content.count({ where: whereClause })
    
    res.json({
      success: true,
      data: {
        content,
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

// @route   GET /api/cms/content/published
// @desc    Get published content (public endpoint)
// @access  Public
router.get('/content/published', searchValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const sort = req.query.sort || '-publishedAt'
    
    let whereClause = {
      ...buildQueryFilters(req),
      status: 'published',
      publishedAt: { [Op.lte]: new Date() }
    }
    
    // Search functionality
    if (req.query.q) {
      const searchConditions = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${req.query.q}%` } },
          { content: { [Op.iLike]: `%${req.query.q}%` } },
          { excerpt: { [Op.iLike]: `%${req.query.q}%` } }
        ]
      }
      whereClause = {
        [Op.and]: [
          whereClause,
          searchConditions,
          { status: 'published' },
          { publishedAt: { [Op.lte]: new Date() } }
        ]
      }
      if (req.query.type) {
        whereClause[Op.and].push({ type: req.query.type })
      }
    }
    
    // Convert sort format
    let order = [['publishedAt', 'DESC']]
    if (sort) {
      const isDesc = sort.startsWith('-')
      const field = isDesc ? sort.substring(1) : sort
      order = [[field, isDesc ? 'DESC' : 'ASC']]
    }
    
    const content = await Content.findAll({
      where: whereClause,
      include: [{
        association: 'author',
        attributes: ['firstName', 'lastName']
      }],
      order,
      offset,
      limit
    })
    
    const total = await Content.count({ where: whereClause })
    
    res.json({
      success: true,
      data: {
        content,
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

// @route   GET /api/cms/content/featured
// @desc    Get featured content
// @access  Public
router.get('/content/featured', async (req, res, next) => {
  try {
    const type = req.query.type
    const limit = parseInt(req.query.limit) || 5
    
    let whereClause = {
      featured: true,
      status: 'published',
      publishedAt: { [Op.lte]: new Date() }
    }
    
    if (type) {
      whereClause.type = type
    }
    
    const content = await Content.findAll({
      where: whereClause,
      include: [{
        association: 'author',
        attributes: ['firstName', 'lastName']
      }],
      order: [['priority', 'DESC'], ['publishedAt', 'DESC']],
      limit
    })
    
    res.json({
      success: true,
      data: { content }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/cms/content/:id
// @desc    Get content by ID
// @access  Private (CMS Editor, Admin) or Public for published content
router.get('/content/:id', param('id').isUUID().withMessage('Invalid content ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const content = await Content.findByPk(req.params.id, {
      include: [
        {
          association: 'author',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    })
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      })
    }
    
    // Check if user can access this content
    const isPublished = content.status === 'published' && content.publishedAt <= new Date()
    const hasAccess = req.user && ['cms_editor', 'admin'].includes(req.user.role)
    
    if (!isPublished && !hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      })
    }
    
    // Increment view count for published content
    if (isPublished) {
      await content.increment('viewCount')
    }
    
    res.json({
      success: true,
      data: { content }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/cms/content/slug/:slug
// @desc    Get content by slug
// @access  Public for published content
router.get('/content/slug/:slug', param('slug').matches(/^[a-z0-9-]+$/).withMessage('Invalid slug format'), handleValidationErrors, async (req, res, next) => {
  try {
    const content = await Content.findOne({ 
      where: {
        slug: req.params.slug,
        status: 'published',
        publishedAt: { [Op.lte]: new Date() }
      },
      include: [{
        model: require('../models/User'),
        as: 'author',
        attributes: ['firstName', 'lastName']
      }]
    })
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      })
    }
    
    // Increment view count
    await content.increment('viewCount')
    
    res.json({
      success: true,
      data: { content }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/cms/content
// @desc    Create new content
// @access  Private (CMS Editor, Admin)
router.post('/content', authenticate, authorize('cms_editor', 'admin'), contentValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const contentData = {
      ...req.body,
      author: req.user.id
    }
    
    // Handle scheduled publishing
    if (contentData.scheduledAt && new Date(contentData.scheduledAt) > new Date()) {
      contentData.status = 'draft'
    }
    
    const content = await Content.create(contentData)
    
    const contentWithAuthor = await Content.findByPk(content.id, {
      include: [{
        model: require('../models/User'),
        as: 'author',
        attributes: ['firstName', 'lastName', 'email']
      }]
    })
    
    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: { content: contentWithAuthor }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   PUT /api/cms/content/:id
// @desc    Update content
// @access  Private (CMS Editor, Admin)
router.put('/content/:id', authenticate, authorize('cms_editor', 'admin'), param('id').isUUID().withMessage('Invalid content ID'), contentValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const content = await Content.findByPk(req.params.id)
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      })
    }
    
    // Create version before updating (if this method exists in Sequelize model)
    if (content.createVersion) {
      content.createVersion()
    }
    
    // Prepare update data
    const updateData = { ...req.body }
    
    // Handle scheduled publishing
    if (req.body.scheduledAt && new Date(req.body.scheduledAt) > new Date()) {
      updateData.status = 'draft'
    }
    
    await content.update(updateData)
    
    const updatedContent = await Content.findByPk(content.id, {
      include: [{
        model: require('../models/User'),
        as: 'author',
        attributes: ['firstName', 'lastName', 'email']
      }]
    })
    
    res.json({
      success: true,
      message: 'Content updated successfully',
      data: { content: updatedContent }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   DELETE /api/cms/content/:id
// @desc    Delete content
// @access  Private (Admin only)
router.delete('/content/:id', authenticate, authorize('admin'), param('id').isUUID().withMessage('Invalid content ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const content = await Content.findByPk(req.params.id)
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      })
    }
    
    await content.destroy()
    
    res.json({
      success: true,
      message: 'Content deleted successfully'
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/cms/content/:id/publish
// @desc    Publish content
// @access  Private (CMS Editor, Admin)
router.post('/content/:id/publish', authenticate, authorize('cms_editor', 'admin'), param('id').isUUID().withMessage('Invalid content ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const content = await Content.findByPk(req.params.id)
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      })
    }
    
    const updateData = {
      status: 'published'
    }
    
    if (!content.publishedAt) {
      updateData.publishedAt = new Date()
    }
    
    await content.update(updateData)
    
    res.json({
      success: true,
      message: 'Content published successfully',
      data: { content }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   POST /api/cms/content/:id/unpublish
// @desc    Unpublish content
// @access  Private (CMS Editor, Admin)
router.post('/content/:id/unpublish', authenticate, authorize('cms_editor', 'admin'), param('id').isUUID().withMessage('Invalid content ID'), handleValidationErrors, async (req, res, next) => {
  try {
    const content = await Content.findByPk(req.params.id)
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      })
    }
    
    await content.update({ status: 'draft' })
    
    res.json({
      success: true,
      message: 'Content unpublished successfully',
      data: { content }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/cms/analytics
// @desc    Get content analytics
// @access  Private (CMS Editor, Admin)
router.get('/analytics', authenticate, authorize('cms_editor', 'admin'), async (req, res, next) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date()
    
    const dateFilter = {
      createdAt: { [Op.between]: [startDate, endDate] }
    }
    
    // Get overview analytics
    const [totalContent, publishedContent, draftContent, featuredContent] = await Promise.all([
      Content.count({ where: dateFilter }),
      Content.count({ where: { ...dateFilter, status: 'published' } }),
      Content.count({ where: { ...dateFilter, status: 'draft' } }),
      Content.count({ where: { ...dateFilter, featured: true } })
    ])
    
    // Get view statistics
    const viewStats = await Content.findAll({
      where: dateFilter,
      attributes: [
        [fn('SUM', col('viewCount')), 'totalViews'],
        [fn('AVG', col('viewCount')), 'avgViews']
      ],
      raw: true
    })
    
    const totalViews = viewStats[0]?.totalViews || 0
    const avgViews = viewStats[0]?.avgViews || 0
    
    // Get content by type
    const contentByType = await Content.findAll({
      where: dateFilter,
      attributes: [
        'type',
        [fn('COUNT', col('id')), 'count'],
        [fn('SUM', col('viewCount')), 'views']
      ],
      group: ['type'],
      order: [[literal('count'), 'DESC']],
      raw: true
    })
    
    // Get top performing content
    const topContent = await Content.findAll({
      where: {
        status: 'published',
        createdAt: { [Op.between]: [startDate, endDate] }
      },
      attributes: ['title', 'slug', 'type', 'viewCount', 'publishedAt'],
      include: [{
        model: require('../models/User'),
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
          totalContent,
          publishedContent,
          draftContent,
          totalViews: parseInt(totalViews),
          avgViews: parseFloat(avgViews).toFixed(2),
          featuredContent
        },
        contentByType,
        topContent,
        dateRange: { startDate, endDate }
      }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/cms/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', async (req, res, next) => {
  try {
    const categoryResults = await Content.findAll({
      where: {
        status: 'published',
        category: { [Op.ne]: null, [Op.ne]: '' }
      },
      attributes: ['category'],
      group: ['category'],
      raw: true
    })
    
    const categories = categoryResults.map(result => result.category)
    
    res.json({
      success: true,
      data: { categories }
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/cms/tags
// @desc    Get all tags
// @access  Public
router.get('/tags', async (req, res, next) => {
  try {
    const tagResults = await Content.findAll({
      where: {
        status: 'published',
        tags: { [Op.ne]: null, [Op.ne]: [] }
      },
      attributes: ['tags'],
      raw: true
    })
    
    // Flatten and deduplicate tags array
    const allTags = tagResults.reduce((acc, result) => {
      if (result.tags && Array.isArray(result.tags)) {
        acc.push(...result.tags)
      }
      return acc
    }, [])
    
    const tags = [...new Set(allTags)]
    
    res.json({
      success: true,
      data: { tags }
    })
    
  } catch (error) {
    next(error)
  }
})

module.exports = router