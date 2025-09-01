const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const SalesLead = require('../models/SalesLead');
const { authenticate, authorize, optionalAuth } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Rate limiting for lead form submissions
const leadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many lead submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Validation rules
const leadValidation = [
  body('companyName')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Company name must be between 2 and 200 characters'),
  body('contactName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Contact name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
  body('jobTitle')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Job title cannot exceed 100 characters'),
  body('industry')
    .isIn([
      'healthcare',
      'hospital',
      'clinic',
      'imaging_center',
      'telehealth',
      'medical_device',
      'pharmaceutical',
      'insurance',
      'government',
      'research',
      'education',
      'other'
    ])
    .withMessage('Invalid industry'),
  body('companySize')
    .optional()
    .isIn(['startup', 'small_1_50', 'medium_51_200', 'large_201_1000', 'enterprise_1000_plus'])
    .withMessage('Invalid company size'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Location cannot exceed 200 characters'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('source')
    .optional()
    .isIn([
      'website',
      'referral',
      'cold_call',
      'email_campaign',
      'social_media',
      'trade_show',
      'webinar',
      'content_marketing',
      'partner',
      'other'
    ])
    .withMessage('Invalid source'),
  body('servicesOfInterest')
    .optional()
    .isArray()
    .withMessage('Services of interest must be an array'),
  body('painPoints')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Pain points cannot exceed 1000 characters'),
  body('currentSolution')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Current solution cannot exceed 500 characters'),
  body('budget')
    .optional()
    .isIn(['under_10k', '10k_50k', '50k_100k', '100k_500k', '500k_1m', 'over_1m', 'not_specified'])
    .withMessage('Invalid budget range'),
  body('timeline')
    .optional()
    .isIn(['immediate', 'within_month', 'within_quarter', 'within_6_months', 'within_year', 'not_specified'])
    .withMessage('Invalid timeline'),
  body('estimatedValue')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Estimated value must be a positive number'),
  body('expectedCloseDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid expected close date format'),
  body('consentGiven')
    .isBoolean()
    .withMessage('Consent is required'),
  body('marketingConsent')
    .optional()
    .isBoolean()
    .withMessage('Marketing consent must be a boolean')
];

const searchValidation = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  query('status')
    .optional()
    .isIn(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost', 'on-hold'])
    .withMessage('Invalid status filter'),
  query('industry')
    .optional()
    .isIn([
      'healthcare',
      'hospital',
      'clinic',
      'imaging_center',
      'telehealth',
      'medical_device',
      'pharmaceutical',
      'insurance',
      'government',
      'research',
      'education',
      'other'
    ])
    .withMessage('Invalid industry filter'),
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority filter'),
  query('source')
    .optional()
    .isIn([
      'website',
      'referral',
      'cold_call',
      'email_campaign',
      'social_media',
      'trade_show',
      'webinar',
      'content_marketing',
      'partner',
      'other'
    ])
    .withMessage('Invalid source filter'),
  query('assignedTo')
    .optional()
    .isUUID()
    .withMessage('Invalid assigned user ID'),
  query('valueMin')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum value must be a positive number'),
  query('valueMax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum value must be a positive number'),
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
    .isIn(['createdAt', '-createdAt', 'updatedAt', '-updatedAt', 'estimatedValue', '-estimatedValue', 'leadScore', '-leadScore', 'status', '-status'])
    .withMessage('Invalid sort field'),
  query('dateFrom')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format for dateFrom'),
  query('dateTo')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format for dateTo')
];

const updateLeadValidation = [
  body('status')
    .optional()
    .isIn(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost', 'on-hold'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority'),
  body('assignedTo')
    .optional()
    .isUUID()
    .withMessage('Invalid assigned user ID'),
  body('estimatedValue')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Estimated value must be a positive number'),
  body('finalValue')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Final value must be a positive number'),
  body('expectedCloseDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid expected close date format'),
  body('nextFollowUpDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid next follow-up date format'),
  body('painPoints')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Pain points cannot exceed 1000 characters'),
  body('currentSolution')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Current solution cannot exceed 500 characters')
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Build query filters
const buildQueryFilters = (req) => {
  const filters = {};
  const { q, status, industry, priority, source, assignedTo, valueMin, valueMax, dateFrom, dateTo } = req.query;

  if (q) {
    filters[Op.or] = [
      { companyName: { [Op.iLike]: `%${q}%` } },
      { contactName: { [Op.iLike]: `%${q}%` } },
      { email: { [Op.iLike]: `%${q}%` } }
    ];
  }

  if (status) filters.status = status;
  if (industry) filters.industry = industry;
  if (priority) filters.priority = priority;
  if (source) filters.source = source;
  if (assignedTo) filters.assignedTo = assignedTo;
  
  if (valueMin || valueMax) {
    filters.estimatedValue = {};
    if (valueMin) filters.estimatedValue[Op.gte] = parseFloat(valueMin);
    if (valueMax) filters.estimatedValue[Op.lte] = parseFloat(valueMax);
  }

  if (dateFrom || dateTo) {
    filters.createdAt = {};
    if (dateFrom) filters.createdAt[Op.gte] = new Date(dateFrom);
    if (dateTo) filters.createdAt[Op.lte] = new Date(dateTo);
  }

  return filters;
};

// POST /api/sales-leads - Create new lead
router.post('/', leadRateLimit, optionalAuth, leadValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    const lead = await SalesLead.create(leadData);

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: {
        id: lead.id,
        status: lead.status,
        leadScore: lead.leadScore,
        createdAt: lead.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/sales-leads - Get all leads (admin only)
router.get('/', authenticate, authorize('admin', 'cms_editor'), searchValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = '-createdAt' } = req.query;
    const offset = (page - 1) * limit;
    
    const filters = buildQueryFilters(req);
    
    // Parse sort parameter
    const [sortField, sortDirection] = sort.startsWith('-') 
      ? [sort.substring(1), 'DESC'] 
      : [sort, 'ASC'];

    const { count, rows: leads } = await SalesLead.findAndCountAll({
      where: filters,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortField, sortDirection]],
      include: [
        {
          model: require('../models/User'),
          as: 'assignee',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: require('../models/User'),
          as: 'qualifier',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: require('../models/User'),
          as: 'closer',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        leads,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/sales-leads/:id - Get specific lead
router.get('/:id', authenticate, authorize('admin', 'cms_editor'), 
  param('id').isUUID().withMessage('Invalid lead ID'), 
  handleValidationErrors, 
  async (req, res, next) => {
    try {
      const lead = await SalesLead.findByPk(req.params.id, {
        include: [
          {
            model: require('../models/User'),
            as: 'assignee',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: require('../models/User'),
            as: 'qualifier',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: require('../models/User'),
            as: 'closer',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found'
        });
      }

      res.json({
        success: true,
        data: lead
      });
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/sales-leads/:id - Update lead
router.put('/:id', authenticate, authorize('admin', 'cms_editor'),
  param('id').isUUID().withMessage('Invalid lead ID'),
  updateLeadValidation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const lead = await SalesLead.findByPk(req.params.id);

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found'
        });
      }

      const updateData = { ...req.body };
      
      // Set assignment date if assignedTo is being changed
      if (req.body.assignedTo && req.body.assignedTo !== lead.assignedTo) {
        updateData.assignedAt = new Date();
      }

      await lead.update(updateData);

      const updatedLead = await SalesLead.findByPk(req.params.id, {
        include: [
          {
            model: require('../models/User'),
            as: 'assignee',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: require('../models/User'),
            as: 'qualifier',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: require('../models/User'),
            as: 'closer',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });

      res.json({
        success: true,
        message: 'Lead updated successfully',
        data: updatedLead
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/sales-leads/:id/contact - Update last contact date
router.post('/:id/contact', authenticate, authorize('admin', 'cms_editor'),
  param('id').isUUID().withMessage('Invalid lead ID'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters'),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const lead = await SalesLead.findByPk(req.params.id);

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found'
        });
      }

      await lead.updateLastContact(req.body.notes);

      res.json({
        success: true,
        message: 'Contact date updated successfully',
        data: lead
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/sales-leads/:id/qualify - Qualify lead
router.post('/:id/qualify', authenticate, authorize('admin', 'cms_editor'),
  param('id').isUUID().withMessage('Invalid lead ID'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters'),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const lead = await SalesLead.findByPk(req.params.id);

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found'
        });
      }

      await lead.qualify(req.user.id, req.body.notes);

      res.json({
        success: true,
        message: 'Lead qualified successfully',
        data: lead
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/sales-leads/:id/close - Close lead
router.post('/:id/close', authenticate, authorize('admin', 'cms_editor'),
  param('id').isUUID().withMessage('Invalid lead ID'),
  body('status').isIn(['closed-won', 'closed-lost']).withMessage('Status must be closed-won or closed-lost'),
  body('finalValue').optional().isFloat({ min: 0 }).withMessage('Final value must be a positive number'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters'),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const lead = await SalesLead.findByPk(req.params.id);

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found'
        });
      }

      await lead.close(req.body.status, req.user.id, req.body.notes, req.body.finalValue);

      res.json({
        success: true,
        message: `Lead ${req.body.status === 'closed-won' ? 'won' : 'lost'} successfully`,
        data: lead
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/sales-leads/:id - Delete lead (admin only)
router.delete('/:id', authenticate, authorize('admin'),
  param('id').isUUID().withMessage('Invalid lead ID'),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const lead = await SalesLead.findByPk(req.params.id);

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found'
        });
      }

      await lead.destroy();

      res.json({
        success: true,
        message: 'Lead deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/sales-leads/stats/overview - Get lead statistics
router.get('/stats/overview', authenticate, authorize('admin', 'cms_editor'), async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const stats = await SalesLead.getStats(startDate, endDate);
    const hotLeads = await SalesLead.findHotLeads();
    const needingFollowUp = await SalesLead.findNeedingFollowUp();
    const recentLeads = await SalesLead.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'companyName', 'contactName', 'industry', 'status', 'leadScore', 'createdAt']
    });

    res.json({
      success: true,
      data: {
        overview: stats,
        hotLeads: hotLeads.slice(0, 10), // Top 10 hot leads
        needingFollowUp: needingFollowUp.slice(0, 10), // Top 10 needing follow-up
        recentLeads
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;