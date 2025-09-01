const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2
const path = require('path')
const fs = require('fs').promises
const crypto = require('crypto')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// File type configurations
const fileConfigs = {
  images: {
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    maxSize: 10 * 1024 * 1024, // 10MB
    folder: 'ai-teleradiology/images',
    transformation: [
      { quality: 'auto', fetch_format: 'auto' },
      { width: 1920, height: 1080, crop: 'limit' }
    ]
  },
  medical: {
    allowedTypes: [
      'image/jpeg', 'image/jpg', 'image/png', 'image/tiff', 'image/bmp',
      'application/dicom', 'application/octet-stream'
    ],
    maxSize: 100 * 1024 * 1024, // 100MB
    folder: 'ai-teleradiology/medical',
    transformation: [
      { quality: 'auto', fetch_format: 'auto' }
    ]
  },
  documents: {
    allowedTypes: [
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain', 'text/csv'
    ],
    maxSize: 25 * 1024 * 1024, // 25MB
    folder: 'ai-teleradiology/documents'
  },
  avatars: {
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    maxSize: 5 * 1024 * 1024, // 5MB
    folder: 'ai-teleradiology/avatars',
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'face' },
      { quality: 'auto', fetch_format: 'auto' }
    ]
  }
}

// Create Cloudinary storage
const createCloudinaryStorage = (fileType) => {
  const config = fileConfigs[fileType]
  
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: config.folder,
      allowed_formats: config.allowedTypes.map(type => type.split('/')[1]),
      transformation: config.transformation || [],
      public_id: (req, file) => {
        const timestamp = Date.now()
        const randomString = crypto.randomBytes(8).toString('hex')
        const fileName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_')
        return `${fileName}_${timestamp}_${randomString}`
      }
    }
  })
}

// Create local storage (fallback)
const createLocalStorage = (fileType) => {
  const config = fileConfigs[fileType]
  const uploadPath = path.join(process.cwd(), 'uploads', fileType)
  
  return multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        await fs.mkdir(uploadPath, { recursive: true })
        cb(null, uploadPath)
      } catch (error) {
        cb(error)
      }
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now()
      const randomString = crypto.randomBytes(8).toString('hex')
      const ext = path.extname(file.originalname)
      const fileName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_')
      cb(null, `${fileName}_${timestamp}_${randomString}${ext}`)
    }
  })
}

// File filter function
const createFileFilter = (fileType) => {
  const config = fileConfigs[fileType]
  
  return (req, file, cb) => {
    // Check file type
    if (!config.allowedTypes.includes(file.mimetype)) {
      const error = new Error(`Invalid file type. Allowed types: ${config.allowedTypes.join(', ')}`)
      error.code = 'INVALID_FILE_TYPE'
      return cb(error, false)
    }
    
    // Additional validation for medical files
    if (fileType === 'medical') {
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.bmp', '.dcm', '.dicom']
      const fileExtension = path.extname(file.originalname).toLowerCase()
      
      if (!allowedExtensions.includes(fileExtension)) {
        const error = new Error(`Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`)
        error.code = 'INVALID_FILE_EXTENSION'
        return cb(error, false)
      }
    }
    
    cb(null, true)
  }
}

// Create multer upload middleware
const createUploadMiddleware = (fileType, fieldName = 'file', maxCount = 1) => {
  const config = fileConfigs[fileType]
  
  if (!config) {
    throw new Error(`Invalid file type: ${fileType}`)
  }
  
  const storage = process.env.CLOUDINARY_CLOUD_NAME ? 
    createCloudinaryStorage(fileType) : 
    createLocalStorage(fileType)
  
  const upload = multer({
    storage,
    fileFilter: createFileFilter(fileType),
    limits: {
      fileSize: config.maxSize,
      files: maxCount
    }
  })
  
  if (maxCount === 1) {
    return upload.single(fieldName)
  } else {
    return upload.array(fieldName, maxCount)
  }
}

// Upload to Cloudinary directly
const uploadToCloudinary = async (filePath, fileType, options = {}) => {
  try {
    const config = fileConfigs[fileType]
    
    const uploadOptions = {
      folder: config.folder,
      transformation: config.transformation || [],
      ...options
    }
    
    const result = await cloudinary.uploader.upload(filePath, uploadOptions)
    
    return {
      success: true,
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        created_at: result.created_at
      }
    }
    
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error(`Failed to upload to Cloudinary: ${error.message}`)
  }
}

// Delete from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    
    return {
      success: result.result === 'ok',
      result: result.result
    }
    
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error(`Failed to delete from Cloudinary: ${error.message}`)
  }
}

// Get file info from Cloudinary
const getCloudinaryFileInfo = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId)
    
    return {
      success: true,
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        created_at: result.created_at,
        folder: result.folder
      }
    }
    
  } catch (error) {
    console.error('Cloudinary info error:', error)
    throw new Error(`Failed to get file info: ${error.message}`)
  }
}

// Process uploaded file
const processUploadedFile = (file, fileType) => {
  const config = fileConfigs[fileType]
  
  // For Cloudinary uploads
  if (file.path && file.path.includes('cloudinary')) {
    return {
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: file.path,
      publicId: file.filename,
      provider: 'cloudinary',
      folder: config.folder
    }
  }
  
  // For local uploads
  return {
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    path: file.path,
    provider: 'local',
    folder: config.folder
  }
}

// Validate file before upload
const validateFile = (file, fileType) => {
  const config = fileConfigs[fileType]
  const errors = []
  
  // Check file type
  if (!config.allowedTypes.includes(file.mimetype)) {
    errors.push(`Invalid file type. Allowed: ${config.allowedTypes.join(', ')}`)
  }
  
  // Check file size
  if (file.size > config.maxSize) {
    errors.push(`File too large. Maximum size: ${(config.maxSize / (1024 * 1024)).toFixed(1)}MB`)
  }
  
  // Check file name
  if (!file.originalname || file.originalname.length > 255) {
    errors.push('Invalid file name')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Generate secure file URL
const generateSecureUrl = (publicId, options = {}) => {
  try {
    return cloudinary.url(publicId, {
      secure: true,
      sign_url: true,
      type: 'authenticated',
      ...options
    })
  } catch (error) {
    console.error('URL generation error:', error)
    return null
  }
}

// Clean up old files
const cleanupOldFiles = async (folderPath, maxAge = 7 * 24 * 60 * 60 * 1000) => { // 7 days
  try {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      // Cleanup Cloudinary files
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folderPath,
        max_results: 500
      })
      
      const oldFiles = result.resources.filter(file => {
        const fileAge = Date.now() - new Date(file.created_at).getTime()
        return fileAge > maxAge
      })
      
      for (const file of oldFiles) {
        await deleteFromCloudinary(file.public_id)
      }
      
      return { deleted: oldFiles.length }
    } else {
      // Cleanup local files
      const uploadPath = path.join(process.cwd(), 'uploads', folderPath)
      const files = await fs.readdir(uploadPath)
      let deletedCount = 0
      
      for (const file of files) {
        const filePath = path.join(uploadPath, file)
        const stats = await fs.stat(filePath)
        const fileAge = Date.now() - stats.mtime.getTime()
        
        if (fileAge > maxAge) {
          await fs.unlink(filePath)
          deletedCount++
        }
      }
      
      return { deleted: deletedCount }
    }
  } catch (error) {
    console.error('Cleanup error:', error)
    throw error
  }
}

// Test Cloudinary connection
const testCloudinaryConnection = async () => {
  try {
    await cloudinary.api.ping()
    // console.log('Cloudinary connection successful')
    return true
  } catch (error) {
    console.error('Cloudinary connection failed:', error)
    return false
  }
}

module.exports = {
  createUploadMiddleware,
  uploadToCloudinary,
  deleteFromCloudinary,
  getCloudinaryFileInfo,
  processUploadedFile,
  validateFile,
  generateSecureUrl,
  cleanupOldFiles,
  testCloudinaryConnection,
  fileConfigs,
  cloudinary
}