const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/sequelize');

class User extends Model {
  // Virtual getter for fullName
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Virtual getter for isLocked
  get isLocked() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
  }

  // Instance method to compare password
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Instance method to generate auth token
  generateAuthToken() {
    return jwt.sign(
      { 
        id: this.id, 
        email: this.email, 
        role: this.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
  }

  // Instance method to generate refresh token
  generateRefreshToken() {
    return jwt.sign(
      { id: this.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRE }
    );
  }

  // Instance method to increment login attempts
  async incLoginAttempts() {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
      return this.update({
        loginAttempts: 1,
        lockUntil: null
      });
    }
    
    const updates = { loginAttempts: this.loginAttempts + 1 };
    
    // If we have max attempts and no lock, lock the account
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
      updates.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
    }
    
    return this.update(updates);
  }

  // Instance method to reset login attempts
  async resetLoginAttempts() {
    return this.update({
      loginAttempts: 0,
      lockUntil: null
    });
  }

  // Static method to find by credentials
  static async findByCredentials(email, password) {
    const user = await User.findOne({ 
      where: { email: email.toLowerCase() },
      attributes: { include: ['password'] }
    });
    
    if (!user) {
      throw new Error('Invalid login credentials');
    }
    
    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }
    
    if (user.isLocked) {
      throw new Error('Account is temporarily locked due to too many failed login attempts');
    }
    
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      await user.incLoginAttempts();
      throw new Error('Invalid login credentials');
    }
    
    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }
    
    // Update last login
    await user.update({ lastLogin: new Date() });
    
    return user;
  }
}

User.init({
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
    unique: true,
    validate: {
      isEmail: { msg: 'Please enter a valid email' },
      notEmpty: { msg: 'Email is required' }
    },
    set(value) {
      this.setDataValue('email', value.toLowerCase());
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [8, 255], msg: 'Password must be at least 8 characters' },
      notEmpty: { msg: 'Password is required' }
    }
  },
  role: {
    type: DataTypes.ENUM('user', 'radiologist', 'admin', 'cms_editor', 'sales_agent', 'hr', 'accountant'),
    defaultValue: 'user'
  },
  specialization: {
    type: DataTypes.ENUM('general', 'neuro', 'cardiac', 'musculoskeletal', 'chest', 'abdominal', 'pediatric', 'emergency'),
    defaultValue: 'general'
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  institution: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: { args: [0, 100], msg: 'Institution name cannot exceed 100 characters' }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: { args: /^[\+]?[1-9][\d]{0,15}$/, msg: 'Please enter a valid phone number' }
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  verificationTokenExpire: {
    type: DataTypes.DATE,
    allowNull: true
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetPasswordExpire: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lockUntil: {
    type: DataTypes.DATE,
    allowNull: true
  },
  preferences: {
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify({
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      theme: 'light',
      language: 'en'
    }),
    get() {
      const value = this.getDataValue('preferences');
      return value ? JSON.parse(value) : {
        notifications: {
          email: true,
          sms: false,
          push: true
        },
        theme: 'light',
        language: 'en'
      };
    },
    set(value) {
      this.setDataValue('preferences', JSON.stringify(value || {
        notifications: {
          email: true,
          sms: false,
          push: true
        },
        theme: 'light',
        language: 'en'
      }));
    }
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  indexes: [
    { fields: ['email'] },
    { fields: ['role'] },
    { fields: ['isActive'] }
  ],
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }
    }
  },
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    }
  }
});

module.exports = User;