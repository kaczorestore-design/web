const { DataTypes, Model, Op } = require('sequelize');
const sequelize = require('../config/sequelize');

class Contact extends Model {
  // Virtual getter for fullName
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Virtual getter for age (time since creation)
  get age() {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // in days
  }

  // Virtual getter for response time
  get responseTime() {
    if (!this.respondedAt) return null;
    return Math.floor((this.respondedAt - this.createdAt) / (1000 * 60)); // in minutes
  }

  // Static method to find by status
  static findByStatus(status) {
    return this.findAll({ where: { status } });
  }

  // Static method to find pending contacts
  static findPending() {
    return this.findAll({
      where: {
        status: { [Op.in]: ['new', 'in_progress'] }
      }
    });
  }

  // Static method to find overdue contacts
  static findOverdue() {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    return this.findAll({
      where: {
        status: { [Op.in]: ['new', 'in_progress'] },
        createdAt: { [Op.lt]: threeDaysAgo }
      }
    });
  }

  // Static method to find contacts for follow-up
  static findForFollowUp() {
    return this.findAll({
      where: {
        followUpRequired: true,
        followUpDate: { [Op.lte]: new Date() }
      }
    });
  }

  // Static method to get statistics
  static async getStats(startDate, endDate) {
    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [startDate, endDate]
      };
    }

    const [total, byStatus, byType, byPriority] = await Promise.all([
      this.count({ where: whereClause }),
      this.findAll({
        where: whereClause,
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status'],
        raw: true
      }),
      this.findAll({
        where: whereClause,
        attributes: [
          'inquiryType',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['inquiryType'],
        raw: true
      }),
      this.findAll({
        where: whereClause,
        attributes: [
          'priority',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['priority'],
        raw: true
      })
    ]);

    return {
      total,
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = parseInt(item.count);
        return acc;
      }, {}),
      byType: byType.reduce((acc, item) => {
        acc[item.inquiryType] = parseInt(item.count);
        return acc;
      }, {}),
      byPriority: byPriority.reduce((acc, item) => {
        acc[item.priority] = parseInt(item.count);
        return acc;
      }, {})
    };
  }

  // Instance method to add note
  async addNote(note, userId, isPrivate = true) {
    const notes = this.internalNotes || [];
    notes.push({
      note,
      addedBy: userId,
      addedAt: new Date(),
      isPrivate
    });
    return this.update({ internalNotes: notes });
  }

  // Instance method to assign contact
  async assign(userId) {
    return this.update({
      assignedTo: userId,
      assignedAt: new Date(),
      status: this.status === 'new' ? 'in_progress' : this.status
    });
  }

  // Instance method to mark as spam
  async markAsSpam() {
    return this.update({ isSpam: true, status: 'spam' });
  }

  // Instance method to schedule follow-up
  async scheduleFollowUp(date, notes) {
    return this.update({
      followUpRequired: true,
      followUpDate: date,
      followUpNotes: notes
    });
  }
}

Contact.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: () => require('crypto').randomUUID(),
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'First name is required' },
      len: { args: [1, 50], msg: 'First name cannot exceed 50 characters' }
    }
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Last name is required' },
      len: { args: [1, 50], msg: 'Last name cannot exceed 50 characters' }
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
      this.setDataValue('email', value.toLowerCase());
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: { args: /^[\+]?[1-9][\d]{0,15}$/, msg: 'Please enter a valid phone number' }
    }
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: { args: [0, 100], msg: 'Company name cannot exceed 100 characters' }
    }
  },
  jobTitle: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: { args: [0, 100], msg: 'Job title cannot exceed 100 characters' }
    }
  },
  inquiryType: {
    type: DataTypes.ENUM(
      'general_inquiry',
      'service_request',
      'technical_support',
      'partnership',
      'pricing',
      'demo_request',
      'complaint',
      'feedback',
      'media_inquiry',
      'career_inquiry'
    ),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Inquiry type is required' }
    }
  },
  subject: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Subject is required' },
      len: { args: [1, 200], msg: 'Subject cannot exceed 200 characters' }
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Message is required' },
      len: { args: [1, 2000], msg: 'Message cannot exceed 2000 characters' }
    }
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('new', 'in_progress', 'resolved', 'closed', 'spam'),
    defaultValue: 'new'
  },
  source: {
    type: DataTypes.ENUM('website', 'email', 'phone', 'social_media', 'referral', 'other'),
    defaultValue: 'website'
  },
  servicesOfInterest: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('servicesOfInterest');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('servicesOfInterest', JSON.stringify(value));
      } else {
        this.setDataValue('servicesOfInterest', '[]');
      }
    }
  },
  preferredContact: {
    type: DataTypes.ENUM('email', 'phone', 'video_call', 'in_person'),
    defaultValue: 'email'
  },
  bestTimeToContact: {
    type: DataTypes.ENUM('morning', 'afternoon', 'evening', 'anytime'),
    defaultValue: 'anytime'
  },
  timezone: {
    type: DataTypes.STRING,
    defaultValue: 'UTC'
  },
  budgetRange: {
    type: DataTypes.ENUM('under_10k', '10k_50k', '50k_100k', '100k_500k', 'over_500k', 'not_specified'),
    defaultValue: 'not_specified'
  },
  timeline: {
    type: DataTypes.ENUM('immediate', 'within_month', 'within_quarter', 'within_year', 'not_specified'),
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
  responseRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  respondedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  respondedBy: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  followUpRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  followUpDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  followUpNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  internalNotes: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('internalNotes');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('internalNotes', JSON.stringify(value || []));
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
  spamScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  isSpam: {
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
  },
  consentGiven: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  consentDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dataRetentionDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  marketingConsent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  resolution: {
    type: DataTypes.TEXT,
    defaultValue: '{}',
    get() {
      const value = this.getDataValue('resolution');
      return value ? JSON.parse(value) : {};
    },
    set(value) {
      this.setDataValue('resolution', JSON.stringify(value || {}));
    }
  }
}, {
  sequelize,
  modelName: 'Contact',
  tableName: 'contacts',
  timestamps: true,
  indexes: [
    { fields: ['status', 'createdAt'] },
    { fields: ['inquiryType', 'status'] },
    { fields: ['priority', 'createdAt'] },
    { fields: ['assignedTo', 'status'] },
    { fields: ['email'] },
    { fields: ['followUpDate', 'followUpRequired'] },
    { fields: ['isSpam'] },
    { fields: ['inquiryType'] },
    { fields: ['priority'] }
  ],
  hooks: {
    beforeSave: async (contact) => {
      // Auto-calculate data retention date (2 years from creation)
      if (!contact.dataRetentionDate && contact.consentGiven) {
        const retentionDate = new Date();
        retentionDate.setFullYear(retentionDate.getFullYear() + 2);
        contact.dataRetentionDate = retentionDate;
      }
      
      // Auto-detect potential spam
      if (contact.message) {
        const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations'];
        const messageWords = contact.message.toLowerCase().split(' ');
        const spamCount = spamKeywords.filter(keyword => 
          messageWords.some(word => word.includes(keyword))
        ).length;
        
        contact.spamScore = Math.min((spamCount / spamKeywords.length) * 100, 100);
        
        if (contact.spamScore > 50) {
          contact.isSpam = true;
          contact.status = 'spam';
        }
      }
    }
  }
});

module.exports = Contact;