import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'

const FileManagerPage = () => {
  const { theme } = useTheme()
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedFiles, setSelectedFiles] = useState([])
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    // Simulate loading files data
    const loadFiles = async () => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        const mockFiles = [
          {
            id: 1,
            name: 'patient_scan_001.dcm',
            type: 'dicom',
            size: 15728640, // 15MB
            path: '/radiology/scans/',
            createdAt: '2024-01-15T10:30:00Z',
            modifiedAt: '2024-01-15T10:30:00Z',
            owner: 'Dr. Smith',
            isFolder: false,
            thumbnail: null
          },
          {
            id: 2,
            name: 'Reports',
            type: 'folder',
            size: null,
            path: '/documents/',
            createdAt: '2024-01-10T09:00:00Z',
            modifiedAt: '2024-01-15T14:20:00Z',
            owner: 'Admin',
            isFolder: true,
            thumbnail: null
          },
          {
            id: 3,
            name: 'chest_xray_analysis.pdf',
            type: 'pdf',
            size: 2048576, // 2MB
            path: '/reports/',
            createdAt: '2024-01-14T16:45:00Z',
            modifiedAt: '2024-01-14T16:45:00Z',
            owner: 'Dr. Johnson',
            isFolder: false,
            thumbnail: null
          },
          {
            id: 4,
            name: 'mri_brain_study.jpg',
            type: 'image',
            size: 5242880, // 5MB
            path: '/images/',
            createdAt: '2024-01-13T11:20:00Z',
            modifiedAt: '2024-01-13T11:20:00Z',
            owner: 'Dr. Wilson',
            isFolder: false,
            thumbnail: '/api/thumbnails/mri_brain_study.jpg'
          },
          {
            id: 5,
            name: 'Templates',
            type: 'folder',
            size: null,
            path: '/templates/',
            createdAt: '2024-01-05T08:00:00Z',
            modifiedAt: '2024-01-12T10:30:00Z',
            owner: 'Admin',
            isFolder: true,
            thumbnail: null
          },
          {
            id: 6,
            name: 'ultrasound_report.docx',
            type: 'document',
            size: 1048576, // 1MB
            path: '/reports/',
            createdAt: '2024-01-12T13:15:00Z',
            modifiedAt: '2024-01-12T13:15:00Z',
            owner: 'Dr. Brown',
            isFolder: false,
            thumbnail: null
          },
          {
            id: 7,
            name: 'ct_scan_series.zip',
            type: 'archive',
            size: 52428800, // 50MB
            path: '/archives/',
            createdAt: '2024-01-11T09:30:00Z',
            modifiedAt: '2024-01-11T09:30:00Z',
            owner: 'Dr. Davis',
            isFolder: false,
            thumbnail: null
          },
          {
            id: 8,
            name: 'patient_data.csv',
            type: 'spreadsheet',
            size: 524288, // 512KB
            path: '/data/',
            createdAt: '2024-01-10T15:45:00Z',
            modifiedAt: '2024-01-10T15:45:00Z',
            owner: 'Data Manager',
            isFolder: false,
            thumbnail: null
          }
        ]
        
        setFiles(mockFiles)
        setLoading(false)
      }, 1000)
    }
    
    loadFiles()
  }, [])

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || file.type === filterType
    return matchesSearch && matchesType
  })

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'size':
        return (b.size || 0) - (a.size || 0)
      case 'modified':
        return new Date(b.modifiedAt) - new Date(a.modifiedAt)
      case 'type':
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  const formatFileSize = (bytes) => {
    if (!bytes) return '-'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFileIcon = (file) => {
    if (file.isFolder) {
      return '📁'
    }
    
    switch (file.type) {
      case 'dicom':
        return '🏥'
      case 'pdf':
        return '📄'
      case 'image':
        return '🖼️'
      case 'document':
        return '📝'
      case 'archive':
        return '📦'
      case 'spreadsheet':
        return '📊'
      default:
        return '📄'
    }
  }

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === sortedFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(sortedFiles.map(file => file.id))
    }
  }

  const handleDelete = () => {
    if (selectedFiles.length === 0) return
    
    // Simulate delete operation
    setFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)))
    setSelectedFiles([])
  }

  const handleDownload = () => {
    if (selectedFiles.length === 0) return
    
    // Simulate download operation
    // console.log('Downloading files:', selectedFiles)
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading files...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                File Manager
              </h1>
              <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage and organize your medical files and documents
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/files/upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Files
              </Link>
              <button className={`px-4 py-2 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}>
                New Folder
              </button>
            </div>
          </div>
          
          {/* Breadcrumb */}
          <div className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>📁 Home {currentPath !== '/' && `> ${currentPath}`}</span>
          </div>
          
          {/* Controls */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg mb-6`}>
            <div className="px-4 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search files..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                    <svg className={`absolute left-3 top-2.5 h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  {/* Filter */}
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="all">All Types</option>
                    <option value="folder">Folders</option>
                    <option value="dicom">DICOM Files</option>
                    <option value="pdf">PDF Documents</option>
                    <option value="image">Images</option>
                    <option value="document">Documents</option>
                    <option value="archive">Archives</option>
                  </select>
                  
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="name">Sort by Name</option>
                    <option value="size">Sort by Size</option>
                    <option value="modified">Sort by Modified</option>
                    <option value="type">Sort by Type</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-3">
                  {/* View Mode Toggle */}
                  <div className="flex rounded-md shadow-sm">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-2 text-sm font-medium rounded-l-md border ${
                        viewMode === 'grid'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : theme === 'dark'
                            ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                        viewMode === 'list'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : theme === 'dark'
                            ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      List
                    </button>
                  </div>
                  
                  {/* Bulk Actions */}
                  {selectedFiles.length > 0 && (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleDownload}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                      >
                        Download ({selectedFiles.length})
                      </button>
                      <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                      >
                        Delete ({selectedFiles.length})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* File List */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
            {viewMode === 'list' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedFiles.length === sortedFiles.length && sortedFiles.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Name
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Size
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Type
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Modified
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Owner
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {sortedFiles.map((file) => (
                      <tr key={file.id} className={`hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => handleFileSelect(file.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{getFileIcon(file)}</span>
                            <div>
                              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {file.name}
                              </div>
                              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {file.path}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                          {formatFileSize(file.size)}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {file.type}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                          {formatDate(file.modifiedAt)}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                          {file.owner}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">Download</button>
                            <button className="text-gray-600 hover:text-gray-900">Share</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {sortedFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`relative group cursor-pointer rounded-lg border-2 border-dashed p-4 hover:border-blue-500 transition-colors ${
                        selectedFiles.includes(file.id)
                          ? 'border-blue-500 bg-blue-50'
                          : theme === 'dark'
                            ? 'border-gray-600 hover:bg-gray-700'
                            : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleFileSelect(file.id)}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">{getFileIcon(file)}</div>
                        <div className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {file.name}
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                          {formatFileSize(file.size)}
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                          {formatDate(file.modifiedAt)}
                        </div>
                      </div>
                      
                      {/* Selection indicator */}
                      {selectedFiles.includes(file.id) && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {sortedFiles.length === 0 && (
              <div className="text-center py-12">
                <svg className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h3 className={`mt-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                  No files found
                </h3>
                <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by uploading your first file.'
                  }
                </p>
                {(!searchTerm && filterType === 'all') && (
                  <div className="mt-6">
                    <Link
                      to="/files/upload"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Upload Files
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* File Stats */}
          <div className={`mt-6 bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {files.length}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Files
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {files.filter(f => f.isFolder).length}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Folders
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {formatFileSize(files.reduce((total, file) => total + (file.size || 0), 0))}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Size
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedFiles.length}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Selected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileManagerPage