const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  })

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(error => error.message).join(', ')
    error = {
      message,
      statusCode: 400,
      errors: err.errors.reduce((acc, error) => {
        acc[error.path] = error.message
        return acc
      }, {})
    }
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'field'
    const value = err.errors[0]?.value || 'value'
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`
    error = {
      message,
      statusCode: 400
    }
  }

  // Sequelize foreign key constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    const message = 'Referenced resource not found'
    error = {
      message,
      statusCode: 400
    }
  }

  // Sequelize database error
  if (err.name === 'SequelizeDatabaseError') {
    const message = 'Database operation failed'
    error = {
      message,
      statusCode: 500
    }
  }

  // PostgreSQL/Sequelize connection errors
  if (err.name === 'SequelizeConnectionError' || err.name === 'SequelizeConnectionRefusedError') {
    const message = 'Database connection error'
    error = {
      message,
      statusCode: 503
    }
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      statusCode: 401
    }
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      statusCode: 401
    }
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = {
      message: 'File too large',
      statusCode: 400
    }
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    error = {
      message: 'Too many files',
      statusCode: 400
    }
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = {
      message: 'Unexpected file field',
      statusCode: 400
    }
  }

  // Express validator errors
  if (err.type === 'validation') {
    error = {
      message: 'Validation failed',
      statusCode: 400,
      errors: err.errors
    }
  }

  // Rate limit errors
  if (err.statusCode === 429) {
    error = {
      message: 'Too many requests, please try again later',
      statusCode: 429,
      retryAfter: err.retryAfter
    }
  }

  // PostgreSQL specific errors
  if (err.code === '23505') { // Unique violation
    const message = 'Duplicate entry found'
    error = {
      message,
      statusCode: 400
    }
  }

  if (err.code === '23503') { // Foreign key violation
    const message = 'Referenced resource not found'
    error = {
      message,
      statusCode: 400
    }
  }

  if (err.code === '23502') { // Not null violation
    const message = 'Required field is missing'
    error = {
      message,
      statusCode: 400
    }
  }

  // Custom application errors
  if (err.isOperational) {
    error = {
      message: err.message,
      statusCode: err.statusCode || 500
    }
  }

  // Default to 500 server error
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'

  // Prepare error response
  const errorResponse = {
    success: false,
    error: {
      message,
      ...(error.errors && { details: error.errors }),
      ...(error.retryAfter && { retryAfter: error.retryAfter })
    }
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack
    errorResponse.error.originalError = err
  }

  // Add request ID for tracking
  if (req.id) {
    errorResponse.error.requestId = req.id
  }

  res.status(statusCode).json(errorResponse)
}

module.exports = errorHandler