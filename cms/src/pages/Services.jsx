import React from 'react'
import { CogIcon, PlusIcon } from '@heroicons/react/24/outline'

const Services = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CogIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage teleradiology services and offerings.
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200">
            <PlusIcon className="h-4 w-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Services content placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <CogIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Services Management Coming Soon
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            This page will contain the services management interface for creating, editing, and managing teleradiology services and offerings.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Services