const express = require('express')
const { Op, fn, col, literal } = require('sequelize')
const { body, query, validationResult } = require('express-validator')
const rateLimit = require('express-rate-limit')

// Import models
const { User, Contact, Content, RadiologistApplication, SalesLead } = require('../models')

// Import middleware
const { authenticate, authorize } = require('../middleware/auth')

const router = express.Router()

// Rate limiting
const dashboardLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 requests per windowMs
  message: {
    success: false,
    message: 'Too many dashboard requests, please try again later.'
  }
})

router.use(dashboardLimiter)

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

// @route   GET /api/dashboard/stats
// @desc    Get overall dashboard statistics
// @access  Private (Admin, CMS Editor)
router.get('/stats', authenticate, authorize('admin', 'cms_editor'), async (req, res, next) => {
  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Get user statistics
    const [totalUsers, activeUsers, newUsersThisMonth, newUsersThisWeek] = await Promise.all([
      User.count(),
      User.count({ where: { isActive: true } }),
      User.count({ where: { createdAt: { [Op.gte]: thirtyDaysAgo } } }),
      User.count({ where: { createdAt: { [Op.gte]: sevenDaysAgo } } })
    ])

    // Get sales leads statistics
    const [totalLeads, hotLeads, newLeadsThisMonth, qualifiedLeads, closedLeads] = await Promise.all([
      SalesLead.count(),
      SalesLead.count({ where: { priority: 'high', status: { [Op.in]: ['new', 'contacted', 'qualified'] } } }),
      SalesLead.count({ where: { createdAt: { [Op.gte]: thirtyDaysAgo } } }),
      SalesLead.count({ where: { status: 'qualified' } }),
      SalesLead.count({ where: { status: 'closed_won' } })
    ])

    // Get radiologist applications statistics
    const [totalApplications, pendingApplications, approvedApplications, newApplicationsThisMonth] = await Promise.all([
      RadiologistApplication.count(),
      RadiologistApplication.count({ where: { status: 'pending' } }),
      RadiologistApplication.count({ where: { status: 'approved' } }),
      RadiologistApplication.count({ where: { createdAt: { [Op.gte]: thirtyDaysAgo } } })
    ])

    // Get contact statistics
    const [totalContacts, newContacts, resolvedContacts] = await Promise.all([
      Contact.count(),
      Contact.count({ where: { status: 'new' } }),
      Contact.count({ where: { status: 'resolved' } })
    ])

    // Calculate revenue from closed leads
    const revenueStats = await SalesLead.findAll({
      where: { status: 'closed_won' },
      attributes: [
        [fn('SUM', col('estimatedValue')), 'totalRevenue'],
        [fn('AVG', col('estimatedValue')), 'avgDealSize'],
        [fn('COUNT', col('id')), 'closedDeals']
      ],
      raw: true
    })

    const totalRevenue = revenueStats[0]?.totalRevenue || 0
    const avgDealSize = revenueStats[0]?.avgDealSize || 0
    const closedDeals = revenueStats[0]?.closedDeals || 0

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          newThisMonth: newUsersThisMonth,
          newThisWeek: newUsersThisWeek,
          change: newUsersThisWeek > 0 ? ((newUsersThisWeek / Math.max(newUsersThisMonth - newUsersThisWeek, 1)) * 100).toFixed(1) : 0
        },
        salesLeads: {
          total: totalLeads,
          hot: hotLeads,
          newThisMonth: newLeadsThisMonth,
          qualified: qualifiedLeads,
          closed: closedLeads,
          conversionRate: totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(1) : 0
        },
        radiologistApplications: {
          total: totalApplications,
          pending: pendingApplications,
          approved: approvedApplications,
          newThisMonth: newApplicationsThisMonth,
          approvalRate: totalApplications > 0 ? ((approvedApplications / totalApplications) * 100).toFixed(1) : 0
        },
        contacts: {
          total: totalContacts,
          new: newContacts,
          resolved: resolvedContacts,
          resolutionRate: totalContacts > 0 ? ((resolvedContacts / totalContacts) * 100).toFixed(1) : 0
        },
        revenue: {
          total: parseFloat(totalRevenue || 0),
          avgDealSize: parseFloat(avgDealSize || 0),
          closedDeals: parseInt(closedDeals || 0)
        }
      }
    })

  } catch (error) {
    next(error)
  }
})

// @route   GET /api/dashboard/analytics
// @desc    Get analytics data with time range
// @access  Private (Admin, CMS Editor)
router.get('/analytics', 
  authenticate, 
  authorize('admin', 'cms_editor'),
  [
    query('timeRange')
      .optional()
      .isIn(['7d', '30d', '90d', '1y'])
      .withMessage('Invalid time range'),
    query('startDate')
      .optional()
      .isISO8601()
      .withMessage('Invalid start date'),
    query('endDate')
      .optional()
      .isISO8601()
      .withMessage('Invalid end date')
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { timeRange = '30d', startDate, endDate } = req.query
      
      let start, end
      if (startDate && endDate) {
        start = new Date(startDate)
        end = new Date(endDate)
      } else {
        end = new Date()
        switch (timeRange) {
          case '7d':
            start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
            break
          case '30d':
            start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000)
            break
          case '90d':
            start = new Date(end.getTime() - 90 * 24 * 60 * 60 * 1000)
            break
          case '1y':
            start = new Date(end.getTime() - 365 * 24 * 60 * 60 * 1000)
            break
          default:
            start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000)
        }
      }

      const dateFilter = {
        createdAt: { [Op.between]: [start, end] }
      }

      // Get daily user registrations
      const userRegistrations = await User.findAll({
        where: dateFilter,
        attributes: [
          [fn('DATE', col('createdAt')), 'date'],
          [fn('COUNT', col('id')), 'count']
        ],
        group: [fn('DATE', col('createdAt'))],
        order: [[fn('DATE', col('createdAt')), 'ASC']],
        raw: true
      })

      // Get daily sales leads
      const salesLeadsDaily = await SalesLead.findAll({
        where: dateFilter,
        attributes: [
          [fn('DATE', col('createdAt')), 'date'],
          [fn('COUNT', col('id')), 'count'],
          [fn('SUM', col('estimatedValue')), 'value']
        ],
        group: [fn('DATE', col('createdAt'))],
        order: [[fn('DATE', col('createdAt')), 'ASC']],
        raw: true
      })

      // Get daily radiologist applications
      const radiologistApplicationsDaily = await RadiologistApplication.findAll({
        where: dateFilter,
        attributes: [
          [fn('DATE', col('createdAt')), 'date'],
          [fn('COUNT', col('id')), 'count']
        ],
        group: [fn('DATE', col('createdAt'))],
        order: [[fn('DATE', col('createdAt')), 'ASC']],
        raw: true
      })

      // Get sales leads by status
      const leadsByStatus = await SalesLead.findAll({
        where: dateFilter,
        attributes: [
          'status',
          [fn('COUNT', col('id')), 'count'],
          [fn('SUM', col('estimatedValue')), 'value']
        ],
        group: ['status'],
        raw: true
      })

      // Get radiologist applications by specialization
      const applicationsBySpecialization = await RadiologistApplication.findAll({
        where: dateFilter,
        attributes: [
          'specialization',
          [fn('COUNT', col('id')), 'count']
        ],
        group: ['specialization'],
        order: [[literal('count'), 'DESC']],
        raw: true
      })

      // Get users by role
      const usersByRole = await User.findAll({
        where: dateFilter,
        attributes: [
          'role',
          [fn('COUNT', col('id')), 'count']
        ],
        group: ['role'],
        raw: true
      })

      res.json({
        success: true,
        data: {
          timeRange: { start, end },
          userRegistrations,
          salesLeadsDaily,
          radiologistApplicationsDaily,
          leadsByStatus,
          applicationsBySpecialization,
          usersByRole
        }
      })

    } catch (error) {
      next(error)
    }
  }
)

// @route   GET /api/dashboard/activity
// @desc    Get recent activity across all modules
// @access  Private (Admin, CMS Editor)
router.get('/activity',
  authenticate,
  authorize('admin', 'cms_editor'),
  [
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be between 1 and 50')
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 20

      // Get recent users
      const recentUsers = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: Math.ceil(limit / 4)
      })

      // Get recent sales leads
      const recentLeads = await SalesLead.findAll({
        attributes: ['id', 'companyName', 'contactName', 'status', 'priority', 'estimatedValue', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: Math.ceil(limit / 4)
      })

      // Get recent radiologist applications
      const recentApplications = await RadiologistApplication.findAll({
        attributes: ['id', 'firstName', 'lastName', 'specialization', 'status', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: Math.ceil(limit / 4)
      })

      // Get recent contacts
      const recentContacts = await Contact.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'inquiryType', 'status', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: Math.ceil(limit / 4)
      })

      // Combine and format activities
      const activities = []

      recentUsers.forEach(user => {
        activities.push({
          id: `user-${user.id}`,
          type: 'user_registration',
          title: `New user registered: ${user.firstName} ${user.lastName}`,
          description: `Role: ${user.role}`,
          timestamp: user.createdAt,
          data: user
        })
      })

      recentLeads.forEach(lead => {
        activities.push({
          id: `lead-${lead.id}`,
          type: 'sales_lead',
          title: `New sales lead: ${lead.companyName}`,
          description: `Contact: ${lead.contactName} | Value: $${lead.estimatedValue || 0}`,
          timestamp: lead.createdAt,
          data: lead
        })
      })

      recentApplications.forEach(app => {
        activities.push({
          id: `application-${app.id}`,
          type: 'radiologist_application',
          title: `New radiologist application: Dr. ${app.firstName} ${app.lastName}`,
          description: `Specialization: ${app.specialization}`,
          timestamp: app.createdAt,
          data: app
        })
      })

      recentContacts.forEach(contact => {
        activities.push({
          id: `contact-${contact.id}`,
          type: 'contact_inquiry',
          title: `New contact inquiry: ${contact.firstName} ${contact.lastName}`,
          description: `Type: ${contact.inquiryType}`,
          timestamp: contact.createdAt,
          data: contact
        })
      })

      // Sort by timestamp and limit
      activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      const limitedActivities = activities.slice(0, limit)

      res.json({
        success: true,
        data: {
          activities: limitedActivities,
          total: activities.length
        }
      })

    } catch (error) {
      next(error)
    }
  }
)

// @route   GET /api/dashboard/performance
// @desc    Get performance metrics
// @access  Private (Admin)
router.get('/performance', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Calculate average response time for contacts
    const contactResponseTimes = await Contact.findAll({
      where: {
        respondedAt: { [Op.ne]: null },
        createdAt: { [Op.gte]: thirtyDaysAgo }
      },
      attributes: [
        [fn('AVG', literal('TIMESTAMPDIFF(HOUR, createdAt, respondedAt)')), 'avgResponseHours']
      ],
      raw: true
    })

    // Calculate lead conversion metrics
    const leadMetrics = await SalesLead.findAll({
      where: { createdAt: { [Op.gte]: thirtyDaysAgo } },
      attributes: [
        [fn('COUNT', col('id')), 'totalLeads'],
        [fn('SUM', literal('CASE WHEN status = "qualified" THEN 1 ELSE 0 END')), 'qualifiedLeads'],
        [fn('SUM', literal('CASE WHEN status = "closed_won" THEN 1 ELSE 0 END')), 'closedLeads'],
        [fn('AVG', literal('DATEDIFF(COALESCE(qualifiedAt, NOW()), createdAt)')), 'avgQualificationDays']
      ],
      raw: true
    })

    // Calculate application processing metrics
    const applicationMetrics = await RadiologistApplication.findAll({
      where: { createdAt: { [Op.gte]: thirtyDaysAgo } },
      attributes: [
        [fn('COUNT', col('id')), 'totalApplications'],
        [fn('SUM', literal('CASE WHEN status = "approved" THEN 1 ELSE 0 END')), 'approvedApplications'],
        [fn('AVG', literal('DATEDIFF(COALESCE(reviewedAt, NOW()), createdAt)')), 'avgProcessingDays']
      ],
      raw: true
    })

    const avgResponseHours = contactResponseTimes[0]?.avgResponseHours || 0
    const leadStats = leadMetrics[0] || {}
    const appStats = applicationMetrics[0] || {}

    res.json({
      success: true,
      data: {
        contactPerformance: {
          avgResponseTime: parseFloat(avgResponseHours).toFixed(1),
          unit: 'hours'
        },
        leadPerformance: {
          totalLeads: parseInt(leadStats.totalLeads || 0),
          qualificationRate: leadStats.totalLeads > 0 ? ((leadStats.qualifiedLeads / leadStats.totalLeads) * 100).toFixed(1) : 0,
          conversionRate: leadStats.totalLeads > 0 ? ((leadStats.closedLeads / leadStats.totalLeads) * 100).toFixed(1) : 0,
          avgQualificationTime: parseFloat(leadStats.avgQualificationDays || 0).toFixed(1),
          timeUnit: 'days'
        },
        applicationPerformance: {
          totalApplications: parseInt(appStats.totalApplications || 0),
          approvalRate: appStats.totalApplications > 0 ? ((appStats.approvedApplications / appStats.totalApplications) * 100).toFixed(1) : 0,
          avgProcessingTime: parseFloat(appStats.avgProcessingDays || 0).toFixed(1),
          timeUnit: 'days'
        }
      }
    })

  } catch (error) {
    next(error)
  }
})

module.exports = router