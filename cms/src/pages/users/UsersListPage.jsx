import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'
import { usersAPI } from '../../utils/api'
import toast from 'react-hot-toast'
import { TrashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const UsersListPage = () => {
  const { theme } = useTheme()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionLoading, setActionLoading] = useState({})

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await usersAPI.getUsers()
      if (response.success) {
        setUsers(response.data.users || [])
      } else {
        toast.error('Failed to fetch users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to fetch users')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return
    }

    try {
      setActionLoading(prev => ({ ...prev, [`delete_${userId}`]: true }))
      const response = await usersAPI.deleteUser(userId)
      if (response.success) {
        toast.success('User deleted successfully')
        fetchUsers() // Refresh the list
      } else {
        toast.error(response.message || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    } finally {
      setActionLoading(prev => ({ ...prev, [`delete_${userId}`]: false }))
    }
  }

  const handleToggleUserStatus = async (userId, currentStatus, userName) => {
    const action = currentStatus === 'active' ? 'deactivate' : 'activate'
    if (!window.confirm(`Are you sure you want to ${action} user "${userName}"?`)) {
      return
    }

    try {
      setActionLoading(prev => ({ ...prev, [`status_${userId}`]: true }))
      const response = currentStatus === 'active' 
        ? await usersAPI.deactivateUser(userId)
        : await usersAPI.activateUser(userId)
      
      if (response.success) {
        toast.success(`User ${action}d successfully`)
        fetchUsers() // Refresh the list
      } else {
        toast.error(response.message || `Failed to ${action} user`)
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error)
      toast.error(`Failed to ${action} user`)
    } finally {
      setActionLoading(prev => ({ ...prev, [`status_${userId}`]: false }))
    }
  }

  const filteredUsers = users.filter(user => 
    (user.name || user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'cms_editor': return 'bg-blue-100 text-blue-800'
      case 'radiologist': return 'bg-purple-100 text-purple-800'
      case 'sales_agent': return 'bg-green-100 text-green-800'
      case 'hr': return 'bg-yellow-100 text-yellow-800'
      case 'accountant': return 'bg-indigo-100 text-indigo-800'
      case 'user': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              User Management
            </h1>
            <Link
              to="/users/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Add New User
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="max-w-md">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        User
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Role
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Status
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Created
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Last Login
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200`}>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {(user.name || user.username || 'N/A').split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {user.name || user.username || 'N/A'}
                              </div>
                              <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role || 'user')}`}>
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status || 'inactive')}`}>
                            {user.status || 'inactive'}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/users/edit/${user.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </Link>
                            <button
                               onClick={() => handleToggleUserStatus(user.id, user.status || 'inactive', user.name || user.username || 'User')}
                               disabled={actionLoading[`status_${user.id}`]}
                               className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                                 (user.status || 'inactive') === 'active'
                                   ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200'
                                   : 'text-green-700 bg-green-100 hover:bg-green-200'
                               } disabled:opacity-50`}
                             >
                               {actionLoading[`status_${user.id}`] ? (
                                 <div className="animate-spin rounded-full h-3 w-3 border-b border-current mr-1"></div>
                               ) : (user.status || 'inactive') === 'active' ? (
                                 <XCircleIcon className="h-3 w-3 mr-1" />
                               ) : (
                                 <CheckCircleIcon className="h-3 w-3 mr-1" />
                               )}
                               {(user.status || 'inactive') === 'active' ? 'Deactivate' : 'Activate'}
                             </button>
                             <button
                               onClick={() => handleDeleteUser(user.id, user.name || user.username || 'User')}
                               disabled={actionLoading[`delete_${user.id}`]}
                               className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50"
                             >
                               {actionLoading[`delete_${user.id}`] ? (
                                 <div className="animate-spin rounded-full h-3 w-3 border-b border-current mr-1"></div>
                               ) : (
                                 <TrashIcon className="h-3 w-3 mr-1" />
                               )}
                               Delete
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8">
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersListPage