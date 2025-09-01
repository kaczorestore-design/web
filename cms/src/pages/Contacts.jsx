import React from 'react'
import { EnvelopeIcon, EyeIcon } from '@heroicons/react/24/outline'

const Contacts = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <EnvelopeIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
              <p className="text-sm text-gray-600 mt-1">
                View and manage contact form submissions.
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200">
            <EyeIcon className="h-4 w-4" />
            <span>View All</span>
          </button>
        </div>
      </div>

      {/* Contacts content placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <EnvelopeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Contact Management Coming Soon
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            This page will contain the contact management interface for viewing, responding to, and managing contact form submissions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contacts