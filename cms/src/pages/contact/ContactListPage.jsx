import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'

const ContactListPage = () => {
  const { theme } = useTheme()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    // Simulate loading contact data
    const loadContacts = async () => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        const mockContacts = [
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@hospital.com',
            phone: '+1 (555) 123-4567',
            subject: 'Equipment Maintenance Request',
            message: 'Need urgent maintenance for CT scanner in radiology department.',
            status: 'pending',
            priority: 'high',
            department: 'Radiology',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: 2,
            name: 'Michael Chen',
            email: 'michael.chen@email.com',
            phone: '+1 (555) 987-6543',
            subject: 'Appointment Scheduling Issue',
            message: 'Unable to schedule follow-up appointment through the portal.',
            status: 'resolved',
            priority: 'medium',
            department: 'Patient Services',
            createdAt: '2024-01-14T14:20:00Z',
            updatedAt: '2024-01-15T09:15:00Z'
          },
          {
            id: 3,
            name: 'Emily Rodriguez',
            email: 'emily.rodriguez@clinic.com',
            phone: '+1 (555) 456-7890',
            subject: 'Technical Support Request',
            message: 'Login issues with the teleradiology platform.',
            status: 'in_progress',
            priority: 'medium',
            department: 'IT Support',
            createdAt: '2024-01-13T16:45:00Z',
            updatedAt: '2024-01-14T11:30:00Z'
          },
          {
            id: 4,
            name: 'Dr. Robert Kim',
            email: 'robert.kim@medical.com',
            phone: '+1 (555) 321-0987',
            subject: 'Training Request',
            message: 'Request for additional training on new imaging protocols.',
            status: 'pending',
            priority: 'low',
            department: 'Training',
            createdAt: '2024-01-12T09:00:00Z',
            updatedAt: '2024-01-12T09:00:00Z'
          },
          {
            id: 5,
            name: 'Lisa Thompson',
            email: 'lisa.thompson@healthcare.com',
            phone: '+1 (555) 654-3210',
            subject: 'Billing Inquiry',
            message: 'Question about recent teleradiology service charges.',
            status: 'resolved',
            priority: 'low',
            department: 'Billing',
            createdAt: '2024-01-11T13:20:00Z',
            updatedAt: '2024-01-12T10:45:00Z'
          }
        ]
        
        setContacts(mockContacts)
        setLoading(false)
      }, 1000)
    }
    
    loadContacts()
  }, [])

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'status':
        return a.status.localeCompare(b.status)
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'date':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800'
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        theme === 'dark' ? 'bg-gray-700 text-gray-300' : statusStyles[status]
      }`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-orange-100 text-orange-800',
      low: 'bg-gray-100 text-gray-800'
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        theme === 'dark' ? 'bg-gray-600 text-gray-300' : priorityStyles[priority]
      }`}>
        {priority.toUpperCase()}
      </span>
    )
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

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading contacts...</p>
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
              Contact Messages
            </h1>
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {sortedContacts.length} total messages
              </span>
            </div>
          </div>
          
          {/* Filters and Search */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg mb-6`}>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="search" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Search
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                    placeholder="Search by name, email, or subject..."
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Status
                  </label>
                  <select
                    id="status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="sort" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Sort By
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  >
                    <option value="date">Date (Newest)</option>
                    <option value="name">Name</option>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilterStatus('all')
                      setSortBy('date')
                    }}
                    className={`w-full px-4 py-2 rounded-md transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Messages List */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg overflow-hidden`}>
            {sortedContacts.length === 0 ? (
              <div className="text-center py-12">
                <svg className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.456L3 21l2.544-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
                <h3 className={`mt-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                  No contact messages found
                </h3>
                <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {sortedContacts.map((contact) => (
                  <div key={contact.id} className={`p-6 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} truncate`}>
                              {contact.name}
                            </h3>
                            {getStatusBadge(contact.status)}
                            {getPriorityBadge(contact.priority)}
                          </div>
                          <Link
                            to={`/contact/${contact.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                        
                        <div className="mb-3">
                          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {contact.subject}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1 line-clamp-2`}>
                            {contact.message}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              <strong>Email:</strong> {contact.email}
                            </span>
                            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              <strong>Phone:</strong> {contact.phone}
                            </span>
                            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              <strong>Department:</strong> {contact.department}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                              Created: {formatDate(contact.createdAt)}
                            </span>
                            {contact.updatedAt !== contact.createdAt && (
                              <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                                Updated: {formatDate(contact.updatedAt)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Summary Statistics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg p-4`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Pending</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {contacts.filter(c => c.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg p-4`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>In Progress</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {contacts.filter(c => c.status === 'in_progress').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg p-4`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Resolved</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {contacts.filter(c => c.status === 'resolved').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg p-4`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>High Priority</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {contacts.filter(c => c.priority === 'high').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactListPage