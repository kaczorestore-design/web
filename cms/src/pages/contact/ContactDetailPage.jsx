import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate, useParams } from 'react-router-dom'

const ContactDetailPage = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [reply, setReply] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [newPriority, setNewPriority] = useState('')

  useEffect(() => {
    // Simulate loading contact data
    const loadContact = async () => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        const mockContact = {
          id: id,
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@hospital.com',
          phone: '+1 (555) 123-4567',
          subject: 'Equipment Maintenance Request',
          message: 'Need urgent maintenance for CT scanner in radiology department. The scanner has been producing inconsistent image quality over the past week. This is affecting our ability to provide accurate diagnoses for our patients. We need a technician to inspect the equipment as soon as possible.',
          status: 'pending',
          priority: 'high',
          department: 'Radiology',
          assignedTo: null,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          replies: [
            {
              id: 1,
              author: 'System',
              message: 'Contact request received and assigned ticket #CT-2024-001',
              timestamp: '2024-01-15T10:30:00Z',
              type: 'system'
            }
          ]
        }
        
        setContact(mockContact)
        setNewStatus(mockContact.status)
        setNewPriority(mockContact.priority)
        setLoading(false)
      }, 1000)
    }
    
    loadContact()
  }, [id])

  const handleStatusUpdate = async () => {
    if (!contact || (newStatus === contact.status && newPriority === contact.priority)) {
      return
    }
    
    setUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      setContact(prev => ({
        ...prev,
        status: newStatus,
        priority: newPriority,
        updatedAt: new Date().toISOString()
      }))
      setUpdating(false)
    }, 1000)
  }

  const handleReplySubmit = async (e) => {
    e.preventDefault()
    
    if (!reply.trim()) {
      return
    }
    
    setUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      const newReply = {
        id: contact.replies.length + 1,
        author: 'Admin User',
        message: reply,
        timestamp: new Date().toISOString(),
        type: 'admin'
      }
      
      setContact(prev => ({
        ...prev,
        replies: [...prev.replies, newReply],
        updatedAt: new Date().toISOString()
      }))
      
      setReply('')
      setUpdating(false)
    }, 1000)
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800'
    }
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        theme === 'dark' ? 'bg-gray-600 text-gray-300' : priorityStyles[priority]
      }`}>
        {priority.toUpperCase()}
      </span>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading contact details...</p>
        </div>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Contact Not Found</h2>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>The contact you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/contact')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to Contact List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Contact Details
              </h1>
              <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Ticket ID: #{contact.id}
              </p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className={`px-4 py-2 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Back to List
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {contact.subject}
                      </h3>
                      <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        From: {contact.name}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {getStatusBadge(contact.status)}
                      {getPriorityBadge(contact.priority)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{contact.email}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Phone</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{contact.phone}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Department</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{contact.department}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Created</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{formatDate(contact.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Message</p>
                    <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {contact.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Conversation History */}
              <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Conversation History
                  </h3>
                  
                  <div className="space-y-4">
                    {contact.replies.map((reply) => (
                      <div key={reply.id} className={`flex space-x-3 ${
                        reply.type === 'admin' ? 'justify-end' : 'justify-start'
                      }`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          reply.type === 'admin' 
                            ? 'bg-blue-600 text-white' 
                            : theme === 'dark' 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{reply.message}</p>
                          <p className={`text-xs mt-1 ${
                            reply.type === 'admin' 
                              ? 'text-blue-100' 
                              : theme === 'dark' 
                                ? 'text-gray-500' 
                                : 'text-gray-500'
                          }`}>
                            {reply.author} • {formatDate(reply.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Reply Form */}
                  <form onSubmit={handleReplySubmit} className="mt-6">
                    <div>
                      <label htmlFor="reply" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Add Reply
                      </label>
                      <textarea
                        id="reply"
                        rows={4}
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        }`}
                        placeholder="Type your reply here..."
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="submit"
                        disabled={updating || !reply.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                      >
                        {updating && (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {updating ? 'Sending...' : 'Send Reply'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Management */}
              <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Manage Status
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="status" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Status
                      </label>
                      <select
                        id="status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Priority
                      </label>
                      <select
                        id="priority"
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        }`}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={handleStatusUpdate}
                      disabled={updating || (newStatus === contact.status && newPriority === contact.priority)}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center"
                    >
                      {updating && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {updating ? 'Updating...' : 'Update Status'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Quick Actions
                  </h3>
                  
                  <div className="space-y-3">
                    <button className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      📧 Send Email
                    </button>
                    <button className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      📞 Schedule Call
                    </button>
                    <button className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      📋 Create Task
                    </button>
                    <button className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      🔗 Assign to Team
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Contact Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Last Updated</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formatDate(contact.updatedAt)}
                      </p>
                    </div>
                    
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Assigned To</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {contact.assignedTo || 'Unassigned'}
                      </p>
                    </div>
                    
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Response Time</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {contact.replies.length > 1 ? 'Responded' : 'Pending Response'}
                      </p>
                    </div>
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

export default ContactDetailPage