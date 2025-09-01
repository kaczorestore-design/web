const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize instance
// Use SQLite for development if PostgreSQL is not available
const sequelize = process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql') 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, '..', 'database.sqlite'),
      logging: process.env.NODE_ENV === 'development' ? console.log : false
    });

module.exports = sequelize;