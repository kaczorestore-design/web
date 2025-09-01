const { DataTypes, Model, Op } = require('sequelize');
const sequelize = require('../config/sequelize');

class Content extends Model {
  // Virtual getter for reading time
  get readingTime() {
    if (!this.content) return 0;
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Virtual getter for URL
  get url() {
    const baseUrls = {
      page: '/',
      blog_post: '/blog/',
      service: '/services/',
      case_study: '/case-studies/',
      news: '/news/',
      faq: '/faq/',
      testimonial: '/testimonials/'
    };
    return `${baseUrls[this.type] || '/'}${this.slug}`;
  }

  // Static method to find published content
  static findPublished(type = null) {
    const where = { status: 'published' };
    if (type) where.type = type;
    return this.findAll({ where, order: [['publishedAt', 'DESC']] });
  }

  // Static method to find featured content
  static findFeatured(type = null, limit = 5) {
    const where = {
      status: 'published',
      featured: true
    };
    if (type) where.type = type;
    return this.findAll({
      where,
      order: [['priority', 'DESC'], ['publishedAt', 'DESC']],
      limit
    });
  }

  // Static method to search content
  static search(searchTerm, type = null) {
    const where = {
      status: 'published',
      [Op.or]: [
        { title: { [Op.iLike]: `%${searchTerm}%` } },
        { content: { [Op.iLike]: `%${searchTerm}%` } },
        { excerpt: { [Op.iLike]: `%${searchTerm}%` } }
      ]
    };
    if (type) where.type = type;
    return this.findAll({ where, order: [['publishedAt', 'DESC']] });
  }

  // Instance method to increment view count
  async incrementView() {
    this.viewCount += 1;
    this.analytics.impressions += 1;
    return this.save();
  }

  // Instance method to create version
  async createVersion() {
    const versions = this.previousVersions || [];
    versions.push({
      version: this.version,
      content: this.content,
      modifiedAt: new Date(),
      modifiedBy: this.author
    });
    this.version += 1;
    return this.update({ previousVersions: versions, version: this.version });
  }
}

Content.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: () => require('crypto').randomUUID(),
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title is required' },
      len: { args: [1, 200], msg: 'Title cannot exceed 200 characters' }
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Slug is required' },
      is: { args: /^[a-z0-9-]+$/, msg: 'Slug can only contain lowercase letters, numbers, and hyphens' }
    },
    set(value) {
      this.setDataValue('slug', value.toLowerCase().trim());
    }
  },
  type: {
    type: DataTypes.ENUM('page', 'blog_post', 'service', 'case_study', 'news', 'faq', 'testimonial'),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Content type is required' }
    }
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Content is required' }
    }
  },
  excerpt: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      len: { args: [0, 500], msg: 'Excerpt cannot exceed 500 characters' }
    }
  },
  featuredImage: {
    type: DataTypes.TEXT,
    defaultValue: '{}',
    get() {
      const value = this.getDataValue('featuredImage');
      return value ? JSON.parse(value) : {};
    },
    set(value) {
      this.setDataValue('featuredImage', JSON.stringify(value || {}));
    }
  },
  gallery: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('gallery');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('gallery', JSON.stringify(value || []));
    }
  },
  seo: {
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify({
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      canonicalUrl: '',
      noIndex: false
    }),
    get() {
      const value = this.getDataValue('seo');
      return value ? JSON.parse(value) : {
        metaTitle: '',
        metaDescription: '',
        keywords: [],
        canonicalUrl: '',
        noIndex: false
      };
    },
    set(value) {
      this.setDataValue('seo', JSON.stringify(value || {
        metaTitle: '',
        metaDescription: '',
        keywords: [],
        canonicalUrl: '',
        noIndex: false
      }));
    },
    validate: {
      metaTitleLength(value) {
        if (value && value.metaTitle && value.metaTitle.length > 60) {
          throw new Error('Meta title cannot exceed 60 characters');
        }
      },
      metaDescriptionLength(value) {
        if (value && value.metaDescription && value.metaDescription.length > 160) {
          throw new Error('Meta description cannot exceed 160 characters');
        }
      }
    }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tags: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('tags');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('tags', JSON.stringify(value.map(tag => tag.toLowerCase().trim())));
      } else {
        this.setDataValue('tags', '[]');
      }
    }
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  scheduledAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10
    }
  },
  serviceDetails: {
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify({
      price: null,
      duration: '',
      availability: null,
      features: [],
      benefits: [],
      requirements: []
    }),
    get() {
      const value = this.getDataValue('serviceDetails');
      return value ? JSON.parse(value) : {
        price: null,
        duration: '',
        availability: null,
        features: [],
        benefits: [],
        requirements: []
      };
    },
    set(value) {
      this.setDataValue('serviceDetails', JSON.stringify(value || {
        price: null,
        duration: '',
        availability: null,
        features: [],
        benefits: [],
        requirements: []
      }));
    }
  },
  testimonial: {
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify({
      rating: null,
      clientName: '',
      clientTitle: '',
      clientCompany: '',
      clientImage: ''
    }),
    get() {
      const value = this.getDataValue('testimonial');
      return value ? JSON.parse(value) : {
        rating: null,
        clientName: '',
        clientTitle: '',
        clientCompany: '',
        clientImage: ''
      };
    },
    set(value) {
      this.setDataValue('testimonial', JSON.stringify(value || {
        rating: null,
        clientName: '',
        clientTitle: '',
        clientCompany: '',
        clientImage: ''
      }));
    },
    validate: {
      ratingRange(value) {
        if (value && value.rating && (value.rating < 1 || value.rating > 5)) {
          throw new Error('Rating must be between 1 and 5');
        }
      }
    }
  },
  caseStudy: {
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify({
      challenge: '',
      solution: '',
      results: '',
      metrics: [],
      technologies: [],
      timeline: ''
    }),
    get() {
      const value = this.getDataValue('caseStudy');
      return value ? JSON.parse(value) : {
        challenge: '',
        solution: '',
        results: '',
        metrics: [],
        technologies: [],
        timeline: ''
      };
    },
    set(value) {
      this.setDataValue('caseStudy', JSON.stringify(value || {
        challenge: '',
        solution: '',
        results: '',
        metrics: [],
        technologies: [],
        timeline: ''
      }));
    }
  },
  faq: {
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify({
      question: '',
      answer: '',
      order: 0
    }),
    get() {
      const value = this.getDataValue('faq');
      return value ? JSON.parse(value) : {
        question: '',
        answer: '',
        order: 0
      };
    },
    set(value) {
      this.setDataValue('faq', JSON.stringify(value || {
        question: '',
        answer: '',
        order: 0
      }));
    }
  },
  customFields: {
    type: DataTypes.TEXT,
    defaultValue: '{}',
    get() {
      const value = this.getDataValue('customFields');
      return value ? JSON.parse(value) : {};
    },
    set(value) {
      this.setDataValue('customFields', JSON.stringify(value || {}));
    }
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  previousVersions: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const value = this.getDataValue('previousVersions');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('previousVersions', JSON.stringify(value || []));
    }
  },
  analytics: {
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify({
      impressions: 0,
      clicks: 0,
      shares: 0,
      avgTimeOnPage: null,
      bounceRate: null
    }),
    get() {
      const value = this.getDataValue('analytics');
      return value ? JSON.parse(value) : {
        impressions: 0,
        clicks: 0,
        shares: 0,
        avgTimeOnPage: null,
        bounceRate: null
      };
    },
    set(value) {
      this.setDataValue('analytics', JSON.stringify(value || {
        impressions: 0,
        clicks: 0,
        shares: 0,
        avgTimeOnPage: null,
        bounceRate: null
      }));
    }
  }
}, {
  sequelize,
  modelName: 'Content',
  tableName: 'contents',
  timestamps: true,
  indexes: [
    { fields: ['type', 'status'] },
    { fields: ['slug'], unique: true },
    { fields: ['publishedAt'] },
    { fields: ['featured', 'publishedAt'] },
    { fields: ['category', 'status'] },
    { fields: ['tags'] },
    { fields: ['type'] },
    { fields: ['status'] },
    { fields: ['featured'] },
    { fields: ['author'] }
  ],
  hooks: {
    beforeSave: async (content) => {
      // Auto-generate slug from title if not provided
      if (!content.slug && content.title) {
        content.slug = content.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim('-');
      }
      
      // Set published date when status changes to published
      if (content.changed('status') && content.status === 'published' && !content.publishedAt) {
        content.publishedAt = new Date();
      }
      
      // Auto-generate excerpt from content if not provided
      if (!content.excerpt && content.content) {
        const plainText = content.content.replace(/<[^>]*>/g, '');
        content.excerpt = plainText.substring(0, 200) + (plainText.length > 200 ? '...' : '');
      }
      
      // Auto-generate SEO meta title from title if not provided
      if (!content.seo.metaTitle && content.title) {
        content.seo = {
          ...content.seo,
          metaTitle: content.title.substring(0, 60)
        };
      }
      
      // Auto-generate SEO meta description from excerpt if not provided
      if (!content.seo.metaDescription && content.excerpt) {
        content.seo = {
          ...content.seo,
          metaDescription: content.excerpt.substring(0, 160)
        };
      }
      
      // Handle scheduled publishing
      if (content.scheduledAt && content.scheduledAt <= new Date() && content.status === 'draft') {
        content.status = 'published';
        content.publishedAt = new Date();
      }
    }
  }
});

module.exports = Content;