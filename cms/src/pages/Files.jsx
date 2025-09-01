import React from 'react'
import { PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'

const Files = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <PhotoIcon className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">File Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Upload and manage medical images and documents.
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-200">
            <CloudArrowUpIcon className="h-4 w-4" />
            <span>Upload Files</span>
          </button>
        </div>
      </div>

      {/* Files content placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            File Management Coming Soon
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            This page will contain the file management interface for uploading, organizing, and managing medical images and documents.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Files