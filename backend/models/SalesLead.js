const { DataTypes, Model, Op } = require('sequelize');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');

class SalesLead extends Model {
  // Virtual getter for lead age (time since creation)
  get leadAge() {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // in days
  }

  // Virtual getter for days since last contact
  get daysSinceLastContact() {
    if (!this.lastContactDate) return null;
    return Math.floor((Date.now() - this.lastContactDate) / (1000 * 60 * 60 * 24));
  }

  // Static method to find by status
  static findByStatus(status) {
    return this.findAll({ where: { status } });
  }

  // Static method to find hot leads
  static findHotLeads() {
    return this.findAll({
      where: {
        priority: 'high',
        status: { [Op.in]: ['new', 'contacted', 'qualified'] }
      },
      order: [['createdAt', 'DESC']]
    });
  }

  // Static method to find leads needing follow-up
  static findNeedingFollowUp() {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    return this.findAll({
      where: {
        status: { [Op.in]: ['contacted', 'qualified'] },
        [Op.or]: [
          { lastContactDate: { [Op.lt]: threeDaysAgo } },
          { lastContactDate: { [Op.is]: null } }
        ]
      }
    });
  }

  // Static method to get lead statistics
  static async getStats(startDate, endDate) {
    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [startDate, endDate]
      };
    }

    const [total, newLeads, qualified, proposals, closedWon, closedLost] = await Promise.all([
      this.count({ where: whereClause }),
      this.count({ where: { ...whereClause, status: 'new' } }),
      this.count({ where: { ...whereClause, status: 'qualified' } }),
      this.count({ where: { ...whereClause, status: 'proposal' } }),
      this.count({ where: { ...whereClause, status: 'closed-won' } }),
      this.count({ where: { ...whereClause, status: 'closed-lost' } })
    ]);

    const totalValue = await this.sum('estimatedValue', { where: whereClause }) || 0;
    const wonValue = await this.sum('estimatedValue', { 
      where: { ...whereClause, status: 'closed-won' } 
    }) || 0;

    return {
      total,
      newLeads,
      qualified,
      proposals,
      closedWon,
      closedLost,
      conversionRate: total > 0 ? ((closedWon / total) * 100).toFixed(2) : 0,
      totalValue,
      wonValue,
      averageValue: total > 0 ? (totalValue / total).toFixed(2) : 0
    };
  }

  // Instance method to update contact date
  async updateLastContact(notes = null) {
    this.lastContactDate = new Date();
    if (notes) {
      const currentNotes = this.notes || [];
      currentNotes.push({
        id: uuidv4(),
        note: notes,
        createdAt: new Date(),
        type: 'contact'
      });
      this.notes = currentNotes;
    }
    return this.save();
  }

  // Instance method to qualify lead
  async qualify(qualifiedBy, notes = null) {
    this.status = 'qualified';
    this.qualifiedBy = qualifiedBy;
    this.qualifiedAt = new Date();
    if (notes) {
      const currentNotes = this.notes || [];
      currentNotes.push({
        id: uuidv4(),
        note: notes,
        createdAt: new Date(),
        type: 'qualification'
      });
      this.notes = currentNotes;
    }
    return this.save();
  }

  // Instance method to close lead
  async close(status, closedBy, notes = null, finalValue = null) {
    this.status = status; // 'closed-won' or 'closed-lost'
    this.closedBy = closedBy;
    this.closedAt = new Date();
    if (finalValue !== null) this.finalValue = finalValue;
    if (notes) {
      const currentNotes = this.notes || [];
      currentNotes.push({
        id: uuidv4(),
        note: notes,
        createdAt: new Date(),
        type: 'closure'
      });
      this.notes = currentNotes;
    }
    return this.save();
  }
}

SalesLead.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  companyName: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Company name is required' },
      len: { args: [1, 200], msg: 'Company name cannot exceed 200 characters' }
    }
  },
  contactName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Contact name is required' },
      len: { args: [1, 100], msg: 'Contact name cannot exceed 100 characters' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: 'Please enter a valid email' },
      notEmpty: { msg: 'Email is required' }
    },
    set(value) {
      this.setDataValue('email', value.toLowerCase().trim());
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: { args: /^[\+]?[1-9][\d]{0,15}$/, msg: 'Please enter a valid phone number' }
    }
  },
  jobTitle: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: { args: [0, 100], msg: 'Job title cannot exceed 100 characters' }
    }
  },
  industry: {
    type: DataTypes.ENUM(
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
    ),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Industry is required' }
    }
  },
  companySize: {
    type: DataTypes.ENUM(
      'startup',
      'small_1_50',
      'medium_51_200',
      'large_201_1000',
      'enterprise_1000_plus'
    ),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: true,
    validate: {
      len: { args: [0, 200], msg: 'Location cannot exceed 200 characters' }
    }
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: 'Please provide a valid website URL' }
    }
  },
  source: {
    type: DataTypes.ENUM(
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
    ),
    defaultValue: 'website'
  },
  status: {
    type: DataTypes.ENUM(
      'new',
      'contacted',
      'qualified',
      'proposal',
      'negotiation',
      'closed-won',
      'closed-lost',
      'on-hold'
    ),
    defaultValue: 'new'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  estimatedValue: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    validate: {
      min: { args: 0, msg: 'Estimated value cannot be negative' }
    }
  },
  finalValue: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    validate: {
      min: { args: 0, msg: 'Final value cannot be negative' }
    }
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'USD',
    validate: {
      len: { args: [3, 3], msg: 'Currency must be 3 characters' }
    }
  },
  expectedCloseDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  servicesOfInterest: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('servicesOfInterest');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('servicesOfInterest', JSON.stringify(value || []));
    }
  },
  painPoints: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: { args: [0, 1000], msg: 'Pain points cannot exceed 1000 characters' }
    }
  },
  currentSolution: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: { args: [0, 500], msg: 'Current solution cannot exceed 500 characters' }
    }
  },
  decisionMakers: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('decisionMakers');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('decisionMakers', JSON.stringify(value || []));
    }
  },
  budget: {
    type: DataTypes.ENUM(
      'under_10k',
      '10k_50k',
      '50k_100k',
      '100k_500k',
      '500k_1m',
      'over_1m',
      'not_specified'
    ),
    defaultValue: 'not_specified'
  },
  timeline: {
    type: DataTypes.ENUM(
      'immediate',
      'within_month',
      'within_quarter',
      'within_6_months',
      'within_year',
      'not_specified'
    ),
    defaultValue: 'not_specified'
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  assignedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  qualifiedBy: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  qualifiedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  closedBy: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  closedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lastContactDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nextFollowUpDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('notes');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('notes', JSON.stringify(value || []));
    }
  },
  tags: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('tags');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(value || []));
    }
  },
  attachments: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('attachments');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('attachments', JSON.stringify(value || []));
    }
  },
  leadScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  consentGiven: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  consentDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  marketingConsent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'SalesLead',
  tableName: 'sales_leads',
  timestamps: true,
  indexes: [
    { fields: ['status', 'createdAt'] },
    { fields: ['industry', 'status'] },
    { fields: ['priority', 'createdAt'] },
    { fields: ['assignedTo', 'status'] },
    { fields: ['email'] },
    { fields: ['companyName'] },
    { fields: ['source'] },
    { fields: ['leadScore'] },
    { fields: ['expectedCloseDate'] },
    { fields: ['nextFollowUpDate'] }
  ],
  hooks: {
    beforeSave: async (lead) => {
      // Auto-calculate lead score based on various factors
      let score = 0;
      
      // Industry scoring
      if (['healthcare', 'hospital', 'clinic', 'imaging_center'].includes(lead.industry)) {
        score += 20;
      }
      
      // Company size scoring
      if (lead.companySize === 'enterprise_1000_plus') score += 15;
      else if (lead.companySize === 'large_201_1000') score += 10;
      else if (lead.companySize === 'medium_51_200') score += 5;
      
      // Budget scoring
      if (['500k_1m', 'over_1m'].includes(lead.budget)) score += 20;
      else if (['100k_500k'].includes(lead.budget)) score += 15;
      else if (['50k_100k'].includes(lead.budget)) score += 10;
      
      // Timeline scoring
      if (['immediate', 'within_month'].includes(lead.timeline)) score += 15;
      else if (['within_quarter'].includes(lead.timeline)) score += 10;
      
      // Source scoring
      if (['referral', 'partner'].includes(lead.source)) score += 10;
      
      // Contact information completeness
      if (lead.phone) score += 5;
      if (lead.website) score += 5;
      
      lead.leadScore = Math.min(score, 100);
    }
  }
});

module.exports = SalesLead;