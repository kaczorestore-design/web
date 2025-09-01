const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs').promises
const { body, param, validationResult } = require('express-validator')
const { authenticate, authorize } = require('../middleware/auth')
const router = express.Router()

// File type configurations
const fileTypes = {
  images: {
    allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'],
    maxSize: 10 * 1024 * 1024, // 10MB
    destination: 'uploads/images/'
  },
  medical: {
    allowedTypes: ['.dcm', '.dicom', '.jpg', '.jpeg', '.png', '.tiff', '.nii', '.nifti'],
    maxSize: 100 * 1024 * 1024, // 100MB
    destination: 'uploads/medical/'
  },
  documents: {
    allowedTypes: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
    maxSize: 25 * 1024 * 1024, // 25MB
    destination: 'uploads/documents/'
  },
  avatars: {
    allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
    maxSize: 2 * 1024 * 1024, // 2MB
    destination: 'uploads/avatars/'
  }
}

// Ensure upload directories exist
const ensureDirectories = async () => {
  for (const config of Object.values(fileTypes)) {
    try {
      await fs.mkdir(config.destination, { recursive: true })
    } catch (error) {
      console.error(`Error creating directory ${config.destination}:`, error)
    }
  }
}

// Initialize directories
ensureDirectories()

// File filter function
const createFileFilter = (allowedTypes) => {
  return (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    
    if (allowedTypes.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`), false)
    }
  }
}

// Storage configuration
const createStorage = (destination) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination)
    },
    filename: (req, file, cb) => {
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname)
      const name = path.basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9]/g, '_')
        .substring(0, 50)
      
      cb(null, `${name}_${uniqueSuffix}${ext}`)
    }
  })
}

// Create multer instances for different file types
const uploaders = {}
for (const [type, config] of Object.entries(fileTypes)) {
  uploaders[type] = multer({
    storage: createStorage(config.destination),
    limits: {
      fileSize: config.maxSize,
      files: type === 'medical' ? 10 : 5 // Allow more medical files
    },
    fileFilter: createFileFilter(config.allowedTypes)
  })
}

// Validation rules
const uploadValidation = [
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Each tag cannot exceed 30 characters'),
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean')
]

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    })
  }
  next()
}

// Helper function to get file info
const getFileInfo = (file, type) => {
  return {
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
    type: type,
    url: `/api/uploads/serve/${type}/${file.filename}`,
    uploadedAt: new Date(),
    uploadedBy: null // Will be set in route handler
  }
}

// Helper function to clean up files on error
const cleanupFiles = async (files) => {
  if (!files) return
  
  const fileArray = Array.isArray(files) ? files : [files]
  
  for (const file of fileArray) {
    try {
      await fs.unlink(file.path)
    } catch (error) {
      console.error('Error cleaning up file:', error)
    }
  }
}

// @route   POST /api/uploads/images
// @desc    Upload image files
// @access  Private
router.post('/images', authenticate, uploaders.images.array('images', 5), uploadValidation, handleValidationErrors, async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      })
    }
    
    const uploadedFiles = req.files.map(file => ({
      ...getFileInfo(file, 'image'),
      uploadedBy: req.user._id,
      description: req.body.description,
      tags: req.body.tags || [],
      isPublic: req.body.isPublic || false
    }))
    
    res.json({
      success: true,
      message: `${uploadedFiles.length} image(s) uploaded successfully`,
      data: { files: uploadedFiles }
    })
    
  } catch (error) {
    await cleanupFiles(req.files)
    next(error)
  }
})

// @route   POST /api/uploads/medical
// @desc    Upload medical files (DICOM, etc.)
// @access  Private (Radiologist, Referring Physician, Admin)
router.post('/medical', authenticate, authorize('radiologist', 'referring_physician', 'admin'), uploaders.medical.array('medical', 10), uploadValidation, handleValidationErrors, async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      })
    }
    
    const uploadedFiles = req.files.map(file => ({
      ...getFileInfo(file, 'medical'),
      uploadedBy: req.user._id,
      description: req.body.description,
      tags: req.body.tags || [],
      patientId: req.body.patientId,
      studyId: req.body.studyId,
      isPublic: false // Medical files are never public
    }))
    
    res.json({
      success: true,
      message: `${uploadedFiles.length} medical file(s) uploaded successfully`,
      data: { files: uploadedFiles }
    })
    
  } catch (error) {
    await cleanupFiles(req.files)
    next(error)
  }
})

// @route   POST /api/uploads/documents
// @desc    Upload document files
// @access  Private
router.post('/documents', authenticate, uploaders.documents.array('documents', 5), uploadValidation, handleValidationErrors, async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      })
    }
    
    const uploadedFiles = req.files.map(file => ({
      ...getFileInfo(file, 'document'),
      uploadedBy: req.user._id,
      description: req.body.description,
      tags: req.body.tags || [],
      isPublic: req.body.isPublic || false
    }))
    
    res.json({
      success: true,
      message: `${uploadedFiles.length} document(s) uploaded successfully`,
      data: { files: uploadedFiles }
    })
    
  } catch (error) {
    await cleanupFiles(req.files)
    next(error)
  }
})

// @route   POST /api/uploads/avatar
// @desc    Upload user avatar
// @access  Private
router.post('/avatar', authenticate, uploaders.avatars.single('avatar'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }
    
    const fileInfo = {
      ...getFileInfo(req.file, 'avatar'),
      uploadedBy: req.user._id,
      isPublic: false
    }
    
    // TODO: Update user avatar in database
    // await User.findByIdAndUpdate(req.user._id, { avatar: fileInfo.url })
    
    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: { file: fileInfo }
    })
    
  } catch (error) {
    await cleanupFiles(req.file)
    next(error)
  }
})

// @route   GET /api/uploads/serve/:type/:filename
// @desc    Serve uploaded files
// @access  Public for public files, Private for others
router.get('/serve/:type/:filename', async (req, res, next) => {
  try {
    const { type, filename } = req.params
    
    // Validate type
    if (!fileTypes[type] && type !== 'avatar') {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type'
      })
    }
    
    // Determine file path
    let filePath
    if (type === 'avatar') {
      filePath = path.join(fileTypes.avatars.destination, filename)
    } else {
      filePath = path.join(fileTypes[type].destination, filename)
    }
    
    // Check if file exists
    try {
      await fs.access(filePath)
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      })
    }
    
    // For medical files, require authentication
    if (type === 'medical') {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        })
      }
      
      // Check if user has access to medical files
      if (!['radiologist', 'referring_physician', 'admin'].includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        })
      }
    }
    
    // Set appropriate headers
    const ext = path.extname(filename).toLowerCase()
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.bmp': 'image/bmp',
      '.tiff': 'image/tiff',
      '.webp': 'image/webp',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.txt': 'text/plain',
      '.dcm': 'application/dicom',
      '.dicom': 'application/dicom'
    }
    
    const mimeType = mimeTypes[ext] || 'application/octet-stream'
    res.setHeader('Content-Type', mimeType)
    
    // For downloads, set Content-Disposition header
    if (req.query.download === 'true') {
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    }
    
    // Send file
    res.sendFile(path.resolve(filePath))
    
  } catch (error) {
    next(error)
  }
})

// @route   DELETE /api/uploads/:type/:filename
// @desc    Delete uploaded file
// @access  Private (Owner or Admin)
router.delete('/:type/:filename', authenticate, param('type').isIn(['images', 'medical', 'documents', 'avatars']).withMessage('Invalid file type'), async (req, res, next) => {
  try {
    const { type, filename } = req.params
    
    // Determine file path
    const config = fileTypes[type]
    if (!config) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type'
      })
    }
    
    const filePath = path.join(config.destination, filename)
    
    // Check if file exists
    try {
      await fs.access(filePath)
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      })
    }
    
    // TODO: Check if user owns the file or is admin
    // This would require storing file metadata in database
    
    // Delete file
    await fs.unlink(filePath)
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    })
    
  } catch (error) {
    next(error)
  }
})

// @route   GET /api/uploads/info/:type
// @desc    Get upload configuration info
// @access  Public
router.get('/info/:type', (req, res) => {
  const { type } = req.params
  const config = fileTypes[type]
  
  if (!config) {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type'
    })
  }
  
  res.json({
    success: true,
    data: {
      allowedTypes: config.allowedTypes,
      maxSize: config.maxSize,
      maxSizeFormatted: `${Math.round(config.maxSize / (1024 * 1024))}MB`
    }
  })
})

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    let message = 'File upload error'
    
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File too large'
        break
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files'
        break
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field'
        break
      default:
        message = error.message
    }
    
    return res.status(400).json({
      success: false,
      message,
      code: error.code
    })
  }
  
  next(error)
})

module.exports = router