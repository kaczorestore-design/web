import React, { useState, useCallback } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

const UploadPage = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [uploadComplete, setUploadComplete] = useState(false)

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  // Handle drop event
  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  // Handle file input change
  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  // Process selected files
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file, index) => ({
      id: Date.now() + index,
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending', // pending, uploading, completed, error
      progress: 0,
      error: null
    }))
    
    setFiles(prev => [...prev, ...newFiles])
  }

  // Remove file from list
  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Get file type icon
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️'
    if (type.includes('pdf')) return '📄'
    if (type.includes('document') || type.includes('word')) return '📝'
    if (type.includes('spreadsheet') || type.includes('excel')) return '📊'
    if (type.includes('zip') || type.includes('rar')) return '📦'
    if (type.includes('dicom')) return '🏥'
    return '📄'
  }

  // Simulate file upload
  const uploadFiles = async () => {
    if (files.length === 0) return
    
    setUploading(true)
    setUploadComplete(false)
    
    // Update all files to uploading status
    setFiles(prev => prev.map(file => ({ ...file, status: 'uploading', progress: 0 })))
    
    // Simulate upload progress for each file
    for (const file of files) {
      await simulateFileUpload(file.id)
    }
    
    setUploading(false)
    setUploadComplete(true)
  }

  // Simulate individual file upload with progress
  const simulateFileUpload = (fileId) => {
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 15
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          
          // Mark file as completed
          setFiles(prev => prev.map(file => 
            file.id === fileId 
              ? { ...file, status: 'completed', progress: 100 }
              : file
          ))
          
          resolve()
        } else {
          // Update progress
          setFiles(prev => prev.map(file => 
            file.id === fileId 
              ? { ...file, progress: Math.round(progress) }
              : file
          ))
        }
      }, 200)
    })
  }

  // Clear all files
  const clearFiles = () => {
    setFiles([])
    setUploadComplete(false)
    setUploadProgress({})
  }

  // Get overall upload progress
  const getOverallProgress = () => {
    if (files.length === 0) return 0
    const totalProgress = files.reduce((sum, file) => sum + file.progress, 0)
    return Math.round(totalProgress / files.length)
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Upload Files
              </h1>
              <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Upload medical files, documents, and images to the system
              </p>
            </div>
            <button
              onClick={() => navigate('/files')}
              className={`px-4 py-2 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Back to Files
            </button>
          </div>
          
          {/* Upload Area */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg mb-6`}>
            <div className="p-6">
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : theme === 'dark'
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".dcm,.pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx,.zip,.rar"
                />
                
                <div className="space-y-4">
                  <div className="text-6xl">📁</div>
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {dragActive ? 'Drop files here' : 'Drag and drop files here'}
                    </h3>
                    <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      or click to browse and select files
                    </p>
                  </div>
                  
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Supported formats: DICOM (.dcm), PDF, Images (JPG, PNG, GIF), Documents (DOC, DOCX), Spreadsheets (XLS, XLSX), Archives (ZIP, RAR)
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* File List */}
          {files.length > 0 && (
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg mb-6`}>
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Selected Files ({files.length})
                  </h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={clearFiles}
                      disabled={uploading}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        uploading
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      Clear All
                    </button>
                    <button
                      onClick={uploadFiles}
                      disabled={uploading || files.length === 0}
                      className={`px-4 py-1 text-sm rounded-md transition-colors flex items-center ${
                        uploading || files.length === 0
                          ? 'bg-blue-400 text-white cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {uploading && (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {uploading ? 'Uploading...' : 'Upload All'}
                    </button>
                  </div>
                </div>
                
                {/* Overall Progress */}
                {uploading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Overall Progress</span>
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{getOverallProgress()}%</span>
                    </div>
                    <div className={`w-full bg-gray-200 rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : ''}`}>
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getOverallProgress()}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="divide-y divide-gray-200">
                {files.map((file) => (
                  <div key={file.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getFileIcon(file.type)}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {file.name}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {/* Status Badge */}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          file.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : file.status === 'uploading'
                              ? 'bg-blue-100 text-blue-800'
                              : file.status === 'error'
                                ? 'bg-red-100 text-red-800'
                                : theme === 'dark'
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-gray-100 text-gray-800'
                        }`}>
                          {file.status === 'completed' && '✓ Completed'}
                          {file.status === 'uploading' && `${file.progress}%`}
                          {file.status === 'error' && '✗ Error'}
                          {file.status === 'pending' && 'Pending'}
                        </span>
                        
                        {/* Remove Button */}
                        {file.status !== 'uploading' && (
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <div className={`w-full bg-gray-200 rounded-full h-1.5 ${theme === 'dark' ? 'bg-gray-700' : ''}`}>
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Error Message */}
                    {file.status === 'error' && file.error && (
                      <div className="mt-2">
                        <p className="text-sm text-red-600">{file.error}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Upload Complete Message */}
          {uploadComplete && (
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
              <div className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Upload Complete!
                    </h3>
                    <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      All {files.length} file(s) have been successfully uploaded.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => navigate('/files')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    View Files
                  </button>
                  <button
                    onClick={clearFiles}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Upload More
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Upload Guidelines */}
          <div className={`mt-6 bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
            <div className="px-6 py-4">
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                Upload Guidelines
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Supported File Types
                  </h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• DICOM files (.dcm) - Medical imaging data</li>
                    <li>• PDF documents (.pdf) - Reports and documents</li>
                    <li>• Images (.jpg, .png, .gif) - X-rays, scans, photos</li>
                    <li>• Documents (.doc, .docx) - Text documents</li>
                    <li>• Spreadsheets (.xls, .xlsx) - Data files</li>
                    <li>• Archives (.zip, .rar) - Compressed files</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    File Size Limits
                  </h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• Maximum file size: 100 MB per file</li>
                    <li>• Maximum total upload: 500 MB per session</li>
                    <li>• DICOM files: Up to 200 MB per file</li>
                    <li>• Images: Up to 50 MB per file</li>
                    <li>• Documents: Up to 25 MB per file</li>
                    <li>• Archives: Up to 100 MB per file</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Security & Privacy
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  All uploaded files are encrypted and stored securely. Patient data is handled in compliance with HIPAA regulations. 
                  Files are automatically scanned for malware and viruses before being stored in the system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage