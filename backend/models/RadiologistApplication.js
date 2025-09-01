const { DataTypes, Model, Op } = require('sequelize');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');

class RadiologistApplication extends Model {
  // Virtual getter for fullName
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Virtual getter for application age (time since creation)
  get applicationAge() {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // in days
  }

  // Static method to find by status
  static findByStatus(status) {
    return this.findAll({ where: { status } });
  }

  // Static method to find pending applications
  static findPending() {
    return this.findAll({
      where: {
        status: 'pending'
      },
      order: [['createdAt', 'ASC']]
    });
  }

  // Static method to find applications by specialization
  static findBySpecialization(specialization) {
    return this.findAll({ where: { specialization } });
  }

  // Static method to get application statistics
  static async getStats(startDate, endDate) {
    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [startDate, endDate]
      };
    }

    const [total, pending, approved, rejected] = await Promise.all([
      this.count({ where: whereClause }),
      this.count({ where: { ...whereClause, status: 'pending' } }),
      this.count({ where: { ...whereClause, status: 'approved' } }),
      this.count({ where: { ...whereClause, status: 'rejected' } })
    ]);

    return {
      total,
      pending,
      approved,
      rejected,
      approvalRate: total > 0 ? ((approved / total) * 100).toFixed(2) : 0
    };
  }

  // Instance method to approve application
  async approve(reviewedBy, notes = null) {
    this.status = 'approved';
    this.reviewedBy = reviewedBy;
    this.reviewedAt = new Date();
    if (notes) this.reviewNotes = notes;
    return this.save();
  }

  // Instance method to reject application
  async reject(reviewedBy, notes = null) {
    this.status = 'rejected';
    this.reviewedBy = reviewedBy;
    this.reviewedAt = new Date();
    if (notes) this.reviewNotes = notes;
    return this.save();
  }
}

RadiologistApplication.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
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
    unique: true,
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
  licenseNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Medical license number is required' },
      len: { args: [1, 50], msg: 'License number cannot exceed 50 characters' }
    }
  },
  specialization: {
    type: DataTypes.ENUM(
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
      'other'
    ),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Specialization is required' }
    }
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: 0, msg: 'Experience cannot be negative' },
      max: { args: 50, msg: 'Experience cannot exceed 50 years' }
    }
  },
  education: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: { args: [0, 1000], msg: 'Education details cannot exceed 1000 characters' }
    }
  },
  currentEmployer: {
    type: DataTypes.STRING(200),
    allowNull: true,
    validate: {
      len: { args: [0, 200], msg: 'Current employer cannot exceed 200 characters' }
    }
  },
  currentPosition: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: { args: [0, 100], msg: 'Current position cannot exceed 100 characters' }
    }
  },
  availability: {
    type: DataTypes.ENUM('full_time', 'part_time', 'contract', 'per_case', 'flexible'),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Availability preference is required' }
    }
  },
  preferredShifts: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('preferredShifts');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('preferredShifts', JSON.stringify(value || []));
    }
  },
  certifications: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('certifications');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('certifications', JSON.stringify(value || []));
    }
  },
  languages: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('languages');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('languages', JSON.stringify(value || []));
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: { args: [0, 2000], msg: 'Message cannot exceed 2000 characters' }
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'on_hold'),
    defaultValue: 'pending'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  reviewedBy: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reviewNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: { args: [0, 1000], msg: 'Review notes cannot exceed 1000 characters' }
    }
  },
  resumeUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: 'Please provide a valid URL for resume' }
    }
  },
  portfolioUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: 'Please provide a valid URL for portfolio' }
    }
  },
  linkedinUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: 'Please provide a valid LinkedIn URL' }
    }
  },
  expectedSalary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: { args: 0, msg: 'Expected salary cannot be negative' }
    }
  },
  salaryType: {
    type: DataTypes.ENUM('hourly', 'daily', 'monthly', 'yearly', 'per_case'),
    defaultValue: 'yearly'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  references: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('references');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('references', JSON.stringify(value || []));
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
  modelName: 'RadiologistApplication',
  tableName: 'radiologist_applications',
  timestamps: true,
  indexes: [
    { fields: ['status', 'createdAt'] },
    { fields: ['specialization', 'status'] },
    { fields: ['priority', 'createdAt'] },
    { fields: ['reviewedBy', 'status'] },
    { fields: ['email'], unique: true },
    { fields: ['licenseNumber'] },
    { fields: ['experience'] },
    { fields: ['availability'] }
  ],
  hooks: {
    beforeSave: async (application) => {
      // Auto-set review date when status changes to approved/rejected
      if (application.changed('status') && ['approved', 'rejected'].includes(application.status)) {
        if (!application.reviewedAt) {
          application.reviewedAt = new Date();
        }
      }
    }
  }
});

module.exports = RadiologistApplication;