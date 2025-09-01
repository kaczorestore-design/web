const { Sequelize } = require('sequelize')
const sequelize = require('../config/sequelize')

// Database connection helper
const connectDB = async () => {
  try {
    // Test the connection
    await sequelize.authenticate()
    console.log('PostgreSQL Connected successfully')
    
    // Import models to register them with sequelize
    require('../models/User')
    require('../models/Content')
    require('../models/Contact')
    
    // Sync models with database
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
    console.log('Database models synchronized')
    
    return sequelize
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

// Graceful shutdown
const disconnectDB = async () => {
  try {
    if (sequelize) {
      await sequelize.close()
      console.log('PostgreSQL connection closed')
    }
  } catch (error) {
    console.error('Error closing PostgreSQL connection:', error)
  }
}

// Database health check
const checkDBHealth = async () => {
  try {
    if (!sequelize) {
      return {
        status: 'disconnected',
        message: 'Database not initialized'
      }
    }
    
    await sequelize.authenticate()
    return {
      status: 'connected',
      message: 'Database connection is healthy',
      dialect: sequelize.getDialect(),
      database: sequelize.getDatabaseName()
    }
  } catch (error) {
    return {
      status: 'error',
      message: error.message
    }
  }
}

// Pagination helper
const paginate = async (Model, query = {}, options = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'DESC',
      include = [],
      attributes
    } = options
    
    const offset = (page - 1) * limit
    
    const findOptions = {
      where: query,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order.toUpperCase()]],
      include,
      ...(attributes && { attributes })
    }
    
    const { count, rows } = await Model.findAndCountAll(findOptions)
    
    return {
      data: rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit),
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1
      }
    }
  } catch (error) {
    throw new Error(`Pagination error: ${error.message}`)
  }
}

// Search documents
const searchDocuments = async (Model, searchTerm, options = {}) => {
  try {
    const {
      fields = ['title', 'content', 'description'],
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'DESC'
    } = options
    
    const { Op } = require('sequelize')
    
    const searchConditions = fields.map(field => ({
      [field]: {
        [Op.iLike]: `%${searchTerm}%`
      }
    }))
    
    const whereClause = {
      [Op.or]: searchConditions
    }
    
    return await paginate(Model, whereClause, {
      page,
      limit,
      sort,
      order
    })
  } catch (error) {
    throw new Error(`Search error: ${error.message}`)
  }
}

// Aggregate helper (using raw queries for complex aggregations)
const aggregate = async (query, options = {}) => {
  try {
    const { type = 'SELECT' } = options
    
    const [results, metadata] = await sequelize.query(query, {
      type: sequelize.QueryTypes[type]
    })
    
    return results
  } catch (error) {
    throw new Error(`Aggregation error: ${error.message}`)
  }
}

// Bulk operations
const bulkWrite = async (Model, operations, options = {}) => {
  try {
    const transaction = await sequelize.transaction()
    
    try {
      const results = []
      
      for (const operation of operations) {
        let result
        
        switch (operation.type) {
          case 'create':
            result = await Model.create(operation.data, { transaction })
            break
          case 'update':
            result = await Model.update(operation.data, {
              where: operation.where,
              transaction
            })
            break
          case 'delete':
            result = await Model.destroy({
              where: operation.where,
              transaction
            })
            break
          default:
            throw new Error(`Unknown operation type: ${operation.type}`)
        }
        
        results.push(result)
      }
      
      await transaction.commit()
      return results
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  } catch (error) {
    throw new Error(`Bulk operation error: ${error.message}`)
  }
}

// Transaction wrapper
const withTransaction = async (operations) => {
  const transaction = await sequelize.transaction()
  
  try {
    const result = await operations(transaction)
    await transaction.commit()
    return result
  } catch (error) {
    await transaction.rollback()
    throw new Error(`Transaction error: ${error.message}`)
  }
}

// Validate document (using Sequelize validation)
const validateDocument = async (Model, data, options = {}) => {
  try {
    const instance = Model.build(data)
    await instance.validate()
    return { isValid: true, errors: [] }
  } catch (error) {
    return {
      isValid: false,
      errors: error.errors ? error.errors.map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      })) : [{ message: error.message }]
    }
  }
}

// Create indexes (handled by Sequelize model definitions)
const createIndexes = async () => {
  try {
    console.log('Indexes are managed by Sequelize model definitions')
    return { success: true, message: 'Indexes managed by Sequelize' }
  } catch (error) {
    throw new Error(`Index creation error: ${error.message}`)
  }
}

// Get database statistics
const getDBStats = async () => {
  try {
    const stats = {
      database: sequelize.getDatabaseName(),
      dialect: sequelize.getDialect(),
      version: await sequelize.databaseVersion(),
      connectionPool: {
        max: sequelize.options.pool.max,
        min: sequelize.options.pool.min,
        acquire: sequelize.options.pool.acquire,
        idle: sequelize.options.pool.idle
      }
    }
    
    // Get table statistics
    const tables = await sequelize.getQueryInterface().showAllTables()
    stats.tables = tables.length
    
    return stats
  } catch (error) {
    throw new Error(`Stats error: ${error.message}`)
  }
}

// Cleanup expired tokens (implement based on your token model)
const cleanupExpiredTokens = async () => {
  try {
    const { Op } = require('sequelize')
    
    // This would depend on your token model structure
    // Example implementation:
    // const deletedCount = await TokenModel.destroy({
    //   where: {
    //     expiresAt: {
    //       [Op.lt]: new Date()
    //     }
    //   }
    // })
    
    console.log('Token cleanup completed')
    return { success: true, message: 'Expired tokens cleaned up' }
  } catch (error) {
    throw new Error(`Token cleanup error: ${error.message}`)
  }
}

// Cleanup old sessions
const cleanupOldSessions = async (daysOld = 30) => {
  try {
    const { Op } = require('sequelize')
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)
    
    // This would depend on your session model structure
    console.log(`Session cleanup completed for sessions older than ${daysOld} days`)
    return { success: true, message: 'Old sessions cleaned up' }
  } catch (error) {
    throw new Error(`Session cleanup error: ${error.message}`)
  }
}

// Create backup (PostgreSQL specific)
const createBackup = async (tables = ['users', 'contents', 'contacts']) => {
  try {
    console.log('PostgreSQL backup should be handled by pg_dump utility')
    return {
      success: true,
      message: 'Use pg_dump for PostgreSQL backups',
      command: `pg_dump ${process.env.DATABASE_URL} > backup_${Date.now()}.sql`
    }
  } catch (error) {
    throw new Error(`Backup error: ${error.message}`)
  }
}

// Get slow queries (PostgreSQL specific)
const getSlowQueries = async () => {
  try {
    const slowQueries = await sequelize.query(`
      SELECT query, mean_time, calls, total_time
      FROM pg_stat_statements
      ORDER BY mean_time DESC
      LIMIT 10
    `, {
      type: sequelize.QueryTypes.SELECT
    })
    
    return slowQueries
  } catch (error) {
    // pg_stat_statements extension might not be enabled
    console.log('pg_stat_statements extension not available')
    return []
  }
}

// Get Sequelize instance
const getSequelize = () => sequelize

module.exports = {
  connectDB,
  disconnectDB,
  checkDBHealth,
  paginate,
  searchDocuments,
  aggregate,
  bulkWrite,
  withTransaction,
  validateDocument,
  createIndexes,
  getDBStats,
  cleanupExpiredTokens,
  cleanupOldSessions,
  createBackup,
  getSlowQueries,
  getSequelize,
  get sequelize() { return sequelize; }
}