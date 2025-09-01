import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../utils/api'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { toast } from 'react-hot-toast'
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'

const SalesLeadsPage = () => {
  const { hasPermission } = useAuth()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await api.get('/sales-leads')
      setLeads(response.data.data.leads || [])
    } catch (error) {
      console.error('Error fetching leads:', error)
      toast.error('Failed to load sales leads')
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (id, status) => {
    try {
      await api.patch(`/sales-leads/${id}`, { status })
      toast.success(`Lead status updated to ${status}`)
      fetchLeads()
    } catch (error) {
      console.error('Error updating lead:', error)
      toast.error('Failed to update lead status')
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'all' || lead.status === filter
    const matchesSearch = 
      lead.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.industry?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
    switch (status) {
      case 'qualified':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'contacted':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'proposal':
        return `${baseClasses} bg-purple-100 text-purple-800`
      case 'closed-won':
        return `${baseClasses} bg-emerald-100 text-emerald-800`
      case 'closed-lost':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`
    }
  }

  const getPriorityBadge = (priority) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
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
          <h1 className="text-2xl font-bold text-gray-900">Sales Leads</h1>
          <p className="text-gray-600">Track and manage your sales pipeline</p>
        </div>
        {hasPermission('sales.create') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Lead
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search leads..."
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
          <option value="all">All Leads</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="closed-won">Closed Won</option>
          <option value="closed-lost">Closed Lost</option>
        </select>
      </div>

      {/* Leads List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filter !== 'all' ? 'Try adjusting your search or filter.' : 'No sales leads have been created yet.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {lead.companyName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <UserIcon className="w-4 h-4" />
                            <span>{lead.contactName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <EnvelopeIcon className="w-4 h-4" />
                            <span>{lead.email}</span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center space-x-1">
                              <PhoneIcon className="w-4 h-4" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="font-medium">Industry:</span>
                          <span>{lead.industry || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          <MapPinIcon className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Location:</span>
                          <span>{lead.location || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Est. Value:</span>
                          <span>${lead.estimatedValue?.toLocaleString() || 'Not specified'}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="font-medium">Source:</span>
                          <span>{lead.source || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Created:</span>
                          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          <span className="font-medium">Last Contact:</span>
                          <span>{lead.lastContactDate ? new Date(lead.lastContactDate).toLocaleDateString() : 'Never'}</span>
                        </div>
                      </div>
                    </div>

                    {lead.notes && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Notes:</span> {lead.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className={getStatusBadge(lead.status)}>
                        {lead.status?.charAt(0).toUpperCase() + lead.status?.slice(1) || 'New'}
                      </span>
                      <span className={getPriorityBadge(lead.priority)}>
                        {lead.priority?.charAt(0).toUpperCase() + lead.priority?.slice(1) || 'Low'}
                      </span>
                    </div>
                    
                    {hasPermission('sales.manage') && (
                      <div className="flex space-x-2">
                        <select
                          value={lead.status || 'new'}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="proposal">Proposal</option>
                          <option value="closed-won">Closed Won</option>
                          <option value="closed-lost">Closed Lost</option>
                        </select>
                        <button
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Edit lead"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="View details"
                        >
                          <EyeIcon className="w-4 h-4" />
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

export default SalesLeadsPage