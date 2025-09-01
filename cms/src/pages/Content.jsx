import React from 'react'
import { DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline'

const Content = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your website content, blog posts, and pages.
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200">
            <PlusIcon className="h-4 w-4" />
            <span>New Content</span>
          </button>
        </div>
      </div>

      {/* Content will be implemented here */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Content Management Coming Soon
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            This page will contain the content management interface for creating, editing, and managing blog posts, pages, and other content.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Content