import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../utils/api'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { toast } from 'react-hot-toast'
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

const RadiologistApplicationsPage = () => {
  const { hasPermission } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await api.get('/radiologist-applications')
      setApplications(response.data.data.applications || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast.error('Failed to load radiologist applications')
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (id, status) => {
    try {
      await api.patch(`/radiologist-applications/${id}`, { status })
      toast.success(`Application ${status} successfully`)
      fetchApplications()
    } catch (error) {
      console.error('Error updating application:', error)
      toast.error('Failed to update application status')
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter
    const matchesSearch = 
      app.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-500" />
      default:
        return <ClockIcon className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Radiologist Applications</h1>
          <p className="text-gray-600">Manage radiologist applications and approvals</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Applications List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filter !== 'all' ? 'Try adjusting your search or filter.' : 'No radiologist applications have been submitted yet.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <div key={application.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-primary-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {application.firstName} {application.lastName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <EnvelopeIcon className="w-4 h-4" />
                            <span>{application.email}</span>
                          </div>
                          {application.phone && (
                            <div className="flex items-center space-x-1">
                              <PhoneIcon className="w-4 h-4" />
                              <span>{application.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2 text-sm">
                          <AcademicCapIcon className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Specialization:</span>
                          <span>{application.specialization || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Experience:</span>
                          <span>{application.experience || 'Not specified'} years</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="font-medium">License Number:</span>
                          <span>{application.licenseNumber || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          <span className="font-medium">Applied:</span>
                          <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {application.message && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Message:</span> {application.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                      <span className={getStatusBadge(application.status)}>
                        {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Pending'}
                      </span>
                    </div>
                    
                    {hasPermission('radiologist.manage') && application.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateApplicationStatus(application.id, 'approved')}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(application.id, 'rejected')}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RadiologistApplicationsPage