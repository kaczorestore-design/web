const { connectDB } = require('../utils/database')
const User = require('../models/User')
require('dotenv').config()

const seedUsers = async () => {
  try {
    console.log('🌱 Starting database seeding...')
    
    // Connect to database
    await connectDB()
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ 
      where: { email: 'admin@teleradiology.com' } 
    })
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists')
      console.log('Email: admin@teleradiology.com')
      console.log('Password: Admin123!')
      return
    }
    
    // Create default admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@teleradiology.com',
      password: 'Admin123!',
      role: 'admin',
      isActive: true,
      isVerified: true,
      specialization: 'general'
    })
    
    console.log('✅ Default admin user created successfully!')
    console.log('Email: admin@teleradiology.com')
    console.log('Password: Admin123!')
    console.log('Role: admin')
    
    // Create default CMS editor user
    const cmsEditor = await User.create({
      firstName: 'CMS',
      lastName: 'Editor',
      email: 'cms@teleradiology.com',
      password: 'CmsEditor123!',
      role: 'cms_editor',
      isActive: true,
      isVerified: true,
      specialization: 'general'
    })
    
    console.log('✅ Default CMS editor user created successfully!')
    console.log('Email: cms@teleradiology.com')
    console.log('Password: CmsEditor123!')
    console.log('Role: cms_editor')
    
    console.log('\n🎉 Database seeding completed!')
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedUsers()
}

module.exports = { seedUsers }