const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const RadiologistApplication = require('../models/RadiologistApplication');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

// Validation rules
const applicationValidation = [
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
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
  body('licenseNumber')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('License number must be between 5 and 50 characters'),
  body('licenseState')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('License state is required'),
  body('licenseCountry')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('License country is required'),
  body('specialization')
    .isIn([
      'diagnostic_radiology',
      'interventional_radiology',
      'nuclear_medicine',
      'radiation_oncology',
      'neuroradiology',
      'musculoskeletal_radiology',
      'chest_radiology',
      'abdominal_radiology',
      'pediatric_radiology',
      'breast_imaging',
      'emergency_radiology',
      'general_radiology'
    ])
    .withMessage('Invalid specialization'),
  body('experience')
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  body('currentEmployer')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Current employer cannot exceed 200 characters'),
  body('availability')
    .isIn(['full_time', 'part_time', 'weekends', 'nights', 'on_call', 'flexible'])
    .withMessage('Invalid availability option'),
  body('preferredShifts')
    .optional()
    .isArray()
    .withMessage('Preferred shifts must be an array'),
  body('preferredShifts.*')
    .optional()
    .isIn(['day', 'evening', 'night', 'weekend'])
    .withMessage('Invalid shift preference'),
  body('hourlyRate')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Hourly rate must be a positive number'),
  body('cv')
    .optional()
    .isURL()
    .withMessage('CV must be a valid URL'),
  body('coverLetter')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Cover letter cannot exceed 2000 characters'),
  body('references')
    .optional()
    .isArray()
    .withMessage('References must be an array'),
  body('certifications')
    .optional()
    .isArray()
    .withMessage('Certifications must be an array'),
  body('languages')
    .optional()
    .isArray()
    .withMessage('Languages must be an array'),
  body('consentGiven')
    .isBoolean()
    .withMessage('Consent is required')
];

const searchValidation = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  query('status')
    .optional()
    .isIn(['pending', 'under_review', 'approved', 'rejected', 'on_hold'])
    .withMessage('Invalid status filter'),
  query('specialization')
    .optional()
    .isIn([
      'diagnostic_radiology',
      'interventional_radiology',
      'nuclear_medicine',
      'radiation_oncology',
      'neuroradiology',
      'musculoskeletal_radiology',
      'chest_radiology',
      'abdominal_radiology',
      'pediatric_radiology',
      'breast_imaging',
      'emergency_radiology',
      'general_radiology'
    ])
    .withMessage('Invalid specialization filter'),
  query('availability')
    .optional()
    .isIn(['full_time', 'part_time', 'weekends', 'nights', 'on_call', 'flexible'])
    .withMessage('Invalid availability filter'),
  query('experienceMin')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum experience must be a positive integer'),
  query('experienceMax')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum experience must be a positive integer'),
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
    .isIn(['createdAt', '-createdAt', 'updatedAt', '-updatedAt', 'experience', '-experience', 'status', '-status'])
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

const updateApplicationValidation = [
  body('status')
    .optional()
    .isIn(['pending', 'under_review', 'approved', 'rejected', 'on_hold'])
    .withMessage('Invalid status'),
  body('reviewNotes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Review notes cannot exceed 2000 characters'),
  body('rejectionReason')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Rejection reason cannot exceed 500 characters')
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
  const { q, status, specialization, availability, experienceMin, experienceMax, dateFrom, dateTo } = req.query;

  if (q) {
    filters[Op.or] = [
      { firstName: { [Op.iLike]: `%${q}%` } },
      { lastName: { [Op.iLike]: `%${q}%` } },
      { email: { [Op.iLike]: `%${q}%` } },
      { licenseNumber: { [Op.iLike]: `%${q}%` } }
    ];
  }

  if (status) filters.status = status;
  if (specialization) filters.specialization = specialization;
  if (availability) filters.availability = availability;
  
  if (experienceMin || experienceMax) {
    filters.experience = {};
    if (experienceMin) filters.experience[Op.gte] = parseInt(experienceMin);
    if (experienceMax) filters.experience[Op.lte] = parseInt(experienceMax);
  }

  if (dateFrom || dateTo) {
    filters.createdAt = {};
    if (dateFrom) filters.createdAt[Op.gte] = new Date(dateFrom);
    if (dateTo) filters.createdAt[Op.lte] = new Date(dateTo);
  }

  return filters;
};

// POST /api/radiologist-applications - Create new application
router.post('/', applicationValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const applicationData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    const application = await RadiologistApplication.create(applicationData);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        id: application.id,
        status: application.status,
        submittedAt: application.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/radiologist-applications - Get all applications (admin only)
router.get('/', authenticate, authorize('admin', 'cms_editor'), searchValidation, handleValidationErrors, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = '-createdAt' } = req.query;
    const offset = (page - 1) * limit;
    
    const filters = buildQueryFilters(req);
    
    // Parse sort parameter
    const [sortField, sortDirection] = sort.startsWith('-') 
      ? [sort.substring(1), 'DESC'] 
      : [sort, 'ASC'];

    const { count, rows: applications } = await RadiologistApplication.findAndCountAll({
      where: filters,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortField, sortDirection]],
      include: [
        {
          model: require('../models/User'),
          as: 'reviewer',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        applications,
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

// GET /api/radiologist-applications/:id - Get specific application
router.get('/:id', authenticate, authorize('admin', 'cms_editor'), 
  param('id').isUUID().withMessage('Invalid application ID'), 
  handleValidationErrors, 
  async (req, res, next) => {
    try {
      const application = await RadiologistApplication.findByPk(req.params.id, {
        include: [
          {
            model: require('../models/User'),
            as: 'reviewer',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });

      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Application not found'
        });
      }

      res.json({
        success: true,
        data: application
      });
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/radiologist-applications/:id - Update application status
router.put('/:id', authenticate, authorize('admin', 'cms_editor'),
  param('id').isUUID().withMessage('Invalid application ID'),
  updateApplicationValidation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const application = await RadiologistApplication.findByPk(req.params.id);

      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Application not found'
        });
      }

      const updateData = { ...req.body };
      
      // Set reviewer if status is being changed
      if (req.body.status && req.body.status !== application.status) {
        updateData.reviewedBy = req.user.id;
        updateData.reviewedAt = new Date();
      }

      await application.update(updateData);

      const updatedApplication = await RadiologistApplication.findByPk(req.params.id, {
        include: [
          {
            model: require('../models/User'),
            as: 'reviewer',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });

      res.json({
        success: true,
        message: 'Application updated successfully',
        data: updatedApplication
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/radiologist-applications/:id/approve - Approve application
router.post('/:id/approve', authenticate, authorize('admin'),
  param('id').isUUID().withMessage('Invalid application ID'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters'),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const application = await RadiologistApplication.findByPk(req.params.id);

      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Application not found'
        });
      }

      await application.approve(req.user.id, req.body.notes);

      res.json({
        success: true,
        message: 'Application approved successfully',
        data: application
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/radiologist-applications/:id/reject - Reject application
router.post('/:id/reject', authenticate, authorize('admin'),
  param('id').isUUID().withMessage('Invalid application ID'),
  body('reason').trim().isLength({ min: 1, max: 500 }).withMessage('Rejection reason is required and cannot exceed 500 characters'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters'),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const application = await RadiologistApplication.findByPk(req.params.id);

      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Application not found'
        });
      }

      await application.reject(req.user.id, req.body.reason, req.body.notes);

      res.json({
        success: true,
        message: 'Application rejected',
        data: application
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/radiologist-applications/:id - Delete application (admin only)
router.delete('/:id', authenticate, authorize('admin'),
  param('id').isUUID().withMessage('Invalid application ID'),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const application = await RadiologistApplication.findByPk(req.params.id);

      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Application not found'
        });
      }

      await application.destroy();

      res.json({
        success: true,
        message: 'Application deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/radiologist-applications/stats/overview - Get application statistics
router.get('/stats/overview', authenticate, authorize('admin', 'cms_editor'), async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const stats = await RadiologistApplication.getStats(startDate, endDate);
    const specializationStats = await RadiologistApplication.getSpecializationStats(startDate, endDate);
    const recentApplications = await RadiologistApplication.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'firstName', 'lastName', 'specialization', 'status', 'createdAt']
    });

    res.json({
      success: true,
      data: {
        overview: stats,
        specializationBreakdown: specializationStats,
        recentApplications
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;