const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
// MongoDB sanitization no longer needed with PostgreSQL
const xss = require('xss-clean')
const hpp = require('hpp')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

// Import utilities
const { connectDB, checkDatabaseHealth } = require('./utils/database')
const { specs, swaggerUi, swaggerUiOptions } = require('./docs/swagger')

// Import middleware
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')

// Import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const cmsRoutes = require('./routes/cms')
const serviceRoutes = require('./routes/services')
const contactRoutes = require('./routes/contact')
const uploadRoutes = require('./routes/uploads')
const radiologistApplicationRoutes = require('./routes/radiologist-applications')
const salesLeadRoutes = require('./routes/sales-leads')

// Initialize Express app
const app = express()

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1)

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginEmbedderPolicy: false
}))

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001'
    ]
    
    // Add production domains
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL)
    }
    if (process.env.CMS_URL) {
      allowedOrigins.push(process.env.CMS_URL)
    }
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count']
}

app.use(cors(corsOptions))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // limit each IP to 100 requests per windowMs in production
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks and documentation
    return req.path === '/health' || req.path.startsWith('/api-docs')
  }
})

app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression middleware
app.use(compression())

// Data sanitization against NoSQL query injection
// MongoDB sanitization middleware removed for PostgreSQL

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
app.use(hpp({
  whitelist: ['sort', 'fields', 'page', 'limit', 'category', 'tags', 'type', 'status']
}))

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/public', express.static(path.join(__dirname, 'public')))

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbHealth = await checkDatabaseHealth()
    
    res.status(200).json({
      success: true,
      message: 'Server is healthy',
      data: {
        server: 'OK',
        database: dbHealth.status,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      }
    })
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Server health check failed',
      data: {
        server: 'OK',
        database: 'ERROR',
        error: error.message,
        timestamp: new Date().toISOString()
      }
    })
  }
})

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions))

// Redirect root to API documentation
app.get('/', (req, res) => {
  res.redirect('/api-docs')
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/cms', cmsRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/uploads', uploadRoutes)
app.use('/api/radiologist-applications', radiologistApplicationRoutes)
app.use('/api/sales-leads', salesLeadRoutes)
app.use('/api/dashboard', require('./routes/dashboard'))

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'AI Teleradiology API',
    data: {
      version: '1.0.0',
      description: 'Comprehensive API for AI-powered teleradiology services',
      documentation: '/api-docs',
      endpoints: {
        authentication: '/api/auth',
        users: '/api/users',
        content: '/api/cms',
        services: '/api/services',
        contact: '/api/contact',
        uploads: '/api/uploads'
      },
      health: '/health'
    }
  })
})

// 404 handler for undefined routes
app.use(notFound)

// Global error handler
app.use(errorHandler)

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    console.log('Process terminated')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...')
  server.close(() => {
    console.log('Process terminated')
    process.exit(0)
  })
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err)
  if (process.env.NODE_ENV === 'production') {
    server.close(() => {
      process.exit(1)
    })
  }
})

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  process.exit(1)
})

// Start server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, async () => {
  console.log(`\n🚀 AI Teleradiology API Server`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 Server running on port ${PORT}`)
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`)
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`)
  
  // Connect to database
  try {
    await connectDB()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
  }
  
  console.log('\n🎯 Ready to serve requests!\n')
})

module.exports = app