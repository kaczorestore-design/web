import React from 'react'
import { UsersIcon, PlusIcon } from '@heroicons/react/24/outline'

const Users = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage user accounts, roles, and permissions.
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            <PlusIcon className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users content placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <UsersIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            User Management Coming Soon
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            This page will contain the user management interface for creating, editing, and managing user accounts, roles, and permissions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Users