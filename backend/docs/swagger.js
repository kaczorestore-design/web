const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AI Teleradiology API',
    version: '1.0.0',
    description: 'Comprehensive API for AI-powered teleradiology services',
    contact: {
      name: 'AI Teleradiology Support',
      email: 'support@ai-teleradiology.com',
      url: 'https://ai-teleradiology.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://api.ai-teleradiology.com'
        : `http://localhost:${process.env.PORT || 5000}`,
      description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token for authentication'
      },
      apiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API key for external service access'
      }
    },
    schemas: {
      User: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'password'],
        properties: {
          _id: {
            type: 'string',
            description: 'User ID'
          },
          firstName: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            description: 'User first name'
          },
          lastName: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            description: 'User last name'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address'
          },
          role: {
            type: 'string',
            enum: ['user', 'radiologist', 'admin', 'cms_editor'],
            description: 'User role'
          },
          specialization: {
            type: 'string',
            maxLength: 100,
            description: 'Medical specialization'
          },
          licenseNumber: {
            type: 'string',
            maxLength: 50,
            description: 'Medical license number'
          },
          institution: {
            type: 'string',
            maxLength: 200,
            description: 'Medical institution'
          },
          phone: {
            type: 'string',
            description: 'Phone number'
          },
          isActive: {
            type: 'boolean',
            description: 'Account active status'
          },
          isVerified: {
            type: 'boolean',
            description: 'Email verification status'
          },
          lastLogin: {
            type: 'string',
            format: 'date-time',
            description: 'Last login timestamp'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Account creation timestamp'
          }
        }
      },
      Content: {
        type: 'object',
        required: ['title', 'content', 'type'],
        properties: {
          _id: {
            type: 'string',
            description: 'Content ID'
          },
          title: {
            type: 'string',
            minLength: 1,
            maxLength: 200,
            description: 'Content title'
          },
          slug: {
            type: 'string',
            description: 'URL-friendly slug'
          },
          content: {
            type: 'string',
            description: 'Main content body'
          },
          excerpt: {
            type: 'string',
            maxLength: 500,
            description: 'Content excerpt'
          },
          type: {
            type: 'string',
            enum: ['page', 'blog', 'service', 'testimonial', 'case_study', 'faq'],
            description: 'Content type'
          },
          status: {
            type: 'string',
            enum: ['draft', 'published', 'archived'],
            description: 'Publication status'
          },
          featured: {
            type: 'boolean',
            description: 'Featured content flag'
          },
          author: {
            $ref: '#/components/schemas/User'
          },
          category: {
            type: 'string',
            maxLength: 100,
            description: 'Content category'
          },
          tags: {
            type: 'array',
            items: {
              type: 'string',
              maxLength: 50
            },
            description: 'Content tags'
          },
          viewCount: {
            type: 'number',
            description: 'View count'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp'
          }
        }
      },
      Service: {
        allOf: [
          { $ref: '#/components/schemas/Content' },
          {
            type: 'object',
            properties: {
              serviceDetails: {
                type: 'object',
                properties: {
                  serviceType: {
                    type: 'string',
                    enum: ['teleradiology', 'ai_reporting', 'pacs_integration', 'coverage_24x7', 'quality_assurance', 'consultation'],
                    description: 'Type of service'
                  },
                  description: {
                    type: 'string',
                    maxLength: 1000,
                    description: 'Service description'
                  },
                  features: {
                    type: 'array',
                    items: {
                      type: 'string',
                      maxLength: 200
                    },
                    description: 'Service features'
                  },
                  benefits: {
                    type: 'array',
                    items: {
                      type: 'string',
                      maxLength: 200
                    },
                    description: 'Service benefits'
                  },
                  pricing: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        enum: ['fixed', 'per_study', 'subscription', 'custom']
                      },
                      amount: {
                        type: 'number',
                        minimum: 0
                      },
                      currency: {
                        type: 'string',
                        enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
                      }
                    }
                  },
                  availability: {
                    type: 'object',
                    properties: {
                      hours: {
                        type: 'string',
                        enum: ['24x7', 'business_hours', 'custom']
                      },
                      timezone: {
                        type: 'string',
                        maxLength: 50
                      }
                    }
                  },
                  turnaroundTime: {
                    type: 'object',
                    properties: {
                      routine: {
                        type: 'number',
                        minimum: 1,
                        description: 'Routine turnaround time in hours'
                      },
                      urgent: {
                        type: 'number',
                        minimum: 1,
                        description: 'Urgent turnaround time in hours'
                      },
                      stat: {
                        type: 'number',
                        minimum: 1,
                        description: 'STAT turnaround time in hours'
                      }
                    }
                  },
                  isActive: {
                    type: 'boolean',
                    description: 'Service active status'
                  }
                }
              }
            }
          }
        ]
      },
      Contact: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'subject', 'message'],
        properties: {
          _id: {
            type: 'string',
            description: 'Contact ID'
          },
          firstName: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            description: 'First name'
          },
          lastName: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
            description: 'Last name'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address'
          },
          phone: {
            type: 'string',
            description: 'Phone number'
          },
          organization: {
            type: 'string',
            maxLength: 200,
            description: 'Organization name'
          },
          subject: {
            type: 'string',
            minLength: 1,
            maxLength: 200,
            description: 'Inquiry subject'
          },
          message: {
            type: 'string',
            minLength: 10,
            maxLength: 2000,
            description: 'Inquiry message'
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high', 'urgent'],
            description: 'Inquiry priority'
          },
          status: {
            type: 'string',
            enum: ['pending', 'in_progress', 'resolved', 'closed'],
            description: 'Inquiry status'
          },
          servicesInterested: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Services of interest'
          },
          budgetRange: {
            type: 'string',
            enum: ['under_10k', '10k_25k', '25k_50k', '50k_100k', 'over_100k', 'not_specified'],
            description: 'Budget range'
          },
          timeline: {
            type: 'string',
            enum: ['immediate', 'within_month', 'within_quarter', 'within_year', 'not_specified'],
            description: 'Project timeline'
          },
          source: {
            type: 'string',
            enum: ['website', 'referral', 'search', 'social_media', 'advertisement', 'other'],
            description: 'Inquiry source'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Submission timestamp'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          message: {
            type: 'string',
            description: 'Error message'
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: 'Field name'
                },
                message: {
                  type: 'string',
                  description: 'Field error message'
                }
              }
            }
          },
          stack: {
            type: 'string',
            description: 'Error stack trace (development only)'
          }
        }
      },
      Success: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true
          },
          message: {
            type: 'string',
            description: 'Success message'
          },
          data: {
            type: 'object',
            description: 'Response data'
          }
        }
      },
      Pagination: {
        type: 'object',
        properties: {
          current: {
            type: 'number',
            description: 'Current page number'
          },
          pages: {
            type: 'number',
            description: 'Total number of pages'
          },
          total: {
            type: 'number',
            description: 'Total number of items'
          },
          limit: {
            type: 'number',
            description: 'Items per page'
          },
          hasNext: {
            type: 'boolean',
            description: 'Has next page'
          },
          hasPrev: {
            type: 'boolean',
            description: 'Has previous page'
          }
        }
      }
    },
    responses: {
      UnauthorizedError: {
        description: 'Authentication required',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              success: false,
              message: 'Authentication required'
            }
          }
        }
      },
      ForbiddenError: {
        description: 'Insufficient permissions',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              success: false,
              message: 'Insufficient permissions'
            }
          }
        }
      },
      NotFoundError: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              success: false,
              message: 'Resource not found'
            }
          }
        }
      },
      ValidationError: {
        description: 'Validation failed',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              success: false,
              message: 'Validation failed',
              errors: [
                {
                  field: 'email',
                  message: 'Please provide a valid email address'
                }
              ]
            }
          }
        }
      },
      ServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              success: false,
              message: 'Internal server error'
            }
          }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  tags: [
    {
      name: 'Authentication',
      description: 'User authentication and authorization'
    },
    {
      name: 'Users',
      description: 'User management operations'
    },
    {
      name: 'Content',
      description: 'Content management system'
    },
    {
      name: 'Services',
      description: 'Teleradiology services management'
    },
    {
      name: 'Contact',
      description: 'Contact form and inquiry management'
    },
    {
      name: 'Uploads',
      description: 'File upload operations'
    }
  ]
}

// Options for swagger-jsdoc
const options = {
  definition: swaggerDefinition,
  apis: [
    './routes/*.js',
    './models/*.js',
    './middleware/*.js'
  ]
}

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options)

// Swagger UI options
const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true
  },
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #667eea }
    .swagger-ui .scheme-container { background: #f8f9fa; padding: 10px; border-radius: 5px }
  `,
  customSiteTitle: 'AI Teleradiology API Documentation',
  customfavIcon: '/favicon.ico'
}

module.exports = {
  specs,
  swaggerUi,
  swaggerUiOptions
}