import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Edit, 
  Plus,
  Filter,
  Search,
  Download
} from 'lucide-react'
import { useState } from 'react'

const SalesPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedQuery, setSelectedQuery] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for sales dashboard
  const stats = [
    {
      title: 'Active Leads',
      value: '24',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Monthly Revenue',
      value: '$127K',
      change: '+18%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Conversion Rate',
      value: '32%',
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg Response Time',
      value: '1.2h',
      change: '-15%',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ]

  const salesQueries = [
    {
      id: 'SQ-2024-001',
      company: 'Metro Health System',
      contact: {
        name: 'John Smith',
        email: 'john.smith@metrohealth.com',
        phone: '+1 (555) 123-4567'
      },
      status: 'new',
      priority: 'high',
      subject: 'Enterprise PACS Integration',
      description: 'Looking for comprehensive PACS solution for 5 hospitals with 24/7 radiology coverage.',
      estimatedValue: '$250,000',
      createdAt: '2024-01-15T11:00:00Z',
      lastContact: null,
      nextFollowUp: '2024-01-16T09:00:00Z',
      source: 'Website Form'
    },
    {
      id: 'SQ-2024-002',
      company: 'City General Hospital',
      contact: {
        name: 'Lisa Wang',
        email: 'lisa.wang@citygeneral.com',
        phone: '+1 (555) 234-5678'
      },
      status: 'processing',
      priority: 'medium',
      subject: '24/7 Radiology Coverage',
      description: 'Need overnight and weekend radiology coverage for emergency department.',
      estimatedValue: '$120,000',
      createdAt: '2024-01-14T16:30:00Z',
      lastContact: '2024-01-15T10:30:00Z',
      nextFollowUp: '2024-01-17T14:00:00Z',
      source: 'Phone Inquiry'
    },
    {
      id: 'SQ-2024-003',
      company: 'Rural Care Network',
      contact: {
        name: 'David Brown',
        email: 'david.brown@ruralcare.com',
        phone: '+1 (555) 345-6789'
      },
      status: 'proposal_sent',
      priority: 'medium',
      subject: 'Teleradiology Services',
      description: 'Remote radiology services for 3 rural hospitals.',
      estimatedValue: '$85,000',
      createdAt: '2024-01-13T13:45:00Z',
      lastContact: '2024-01-14T15:20:00Z',
      nextFollowUp: '2024-01-18T11:00:00Z',
      source: 'Referral'
    },
    {
      id: 'SQ-2024-004',
      company: 'Advanced Imaging Center',
      contact: {
        name: 'Sarah Martinez',
        email: 'sarah.martinez@advancedimaging.com',
        phone: '+1 (555) 456-7890'
      },
      status: 'negotiation',
      priority: 'high',
      subject: 'AI-Enhanced Reporting',
      description: 'Interested in AI-powered radiology reporting and workflow optimization.',
      estimatedValue: '$180,000',
      createdAt: '2024-01-12T09:15:00Z',
      lastContact: '2024-01-15T13:45:00Z',
      nextFollowUp: '2024-01-16T16:00:00Z',
      source: 'Trade Show'
    },
    {
      id: 'SQ-2024-005',
      company: 'Coastal Medical Group',
      contact: {
        name: 'Michael Chen',
        email: 'michael.chen@coastalmed.com',
        phone: '+1 (555) 567-8901'
      },
      status: 'closed_won',
      priority: 'low',
      subject: 'Subspecialty Reads',
      description: 'Subspecialty radiology reads for cardiothoracic imaging.',
      estimatedValue: '$95,000',
      createdAt: '2024-01-10T14:20:00Z',
      lastContact: '2024-01-15T11:30:00Z',
      nextFollowUp: null,
      source: 'Website Form'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'proposal_sent': return 'bg-purple-100 text-purple-800'
      case 'negotiation': return 'bg-orange-100 text-orange-800'
      case 'closed_won': return 'bg-green-100 text-green-800'
      case 'closed_lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredQueries = salesQueries.filter(query => {
    const matchesStatus = filterStatus === 'all' || query.status === filterStatus
    const matchesSearch = query.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.subject.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'leads', label: 'Active Leads', icon: Users },
    { id: 'pipeline', label: 'Sales Pipeline', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sales Portal</h1>
              <p className="text-gray-600">Welcome back, Alex Thompson</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                New Lead
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container-custom">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={stat.title} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <span className={`text-sm font-medium ${
                            stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">High Priority Leads</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {salesQueries.filter(q => q.priority === 'high').slice(0, 3).map((query) => (
                      <div key={query.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{query.company}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                            {query.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{query.subject}</p>
                        <p className="text-sm font-medium text-green-600 mt-1">{query.estimatedValue}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <button className="text-primary-600 hover:text-primary-700 text-sm">
                            <Eye className="w-4 h-4 inline mr-1" />
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-700 text-sm">
                            <Phone className="w-4 h-4 inline mr-1" />
                            Call
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Follow-ups Due</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {salesQueries.filter(q => q.nextFollowUp && new Date(q.nextFollowUp) <= new Date(Date.now() + 24*60*60*1000)).map((query) => (
                      <div key={query.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{query.company}</h3>
                          <span className="text-xs text-orange-600 font-medium">
                            Due: {new Date(query.nextFollowUp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{query.contact.name}</p>
                        <p className="text-sm text-gray-600">{query.subject}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <button className="text-primary-600 hover:text-primary-700 text-sm">
                            <Mail className="w-4 h-4 inline mr-1" />
                            Email
                          </button>
                          <button className="text-green-600 hover:text-green-700 text-sm">
                            <Phone className="w-4 h-4 inline mr-1" />
                            Call
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Active Leads</h2>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search leads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="processing">Processing</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="closed_won">Closed Won</option>
                      <option value="closed_lost">Closed Lost</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Follow-up</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQueries.map((query) => (
                      <tr key={query.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{query.company}</div>
                          <div className="text-sm text-gray-500">{query.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{query.contact.name}</div>
                          <div className="text-sm text-gray-500">{query.contact.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{query.subject}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{query.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                            {query.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {query.estimatedValue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {query.nextFollowUp ? new Date(query.nextFollowUp).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Phone className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pipeline Tab */}
        {activeTab === 'pipeline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {['new', 'processing', 'proposal_sent', 'negotiation', 'closed_won'].map((status) => {
                const statusQueries = salesQueries.filter(q => q.status === status)
                const totalValue = statusQueries.reduce((sum, q) => sum + parseInt(q.estimatedValue.replace(/[$,]/g, '')), 0)
                
                return (
                  <div key={status} className="bg-white rounded-xl shadow-lg">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900 capitalize">{status.replace('_', ' ')}</h3>
                      <p className="text-sm text-gray-600">{statusQueries.length} leads • ${totalValue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                      {statusQueries.map((query) => (
                        <div key={query.id} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <h4 className="font-medium text-sm text-gray-900">{query.company}</h4>
                          <p className="text-xs text-gray-600 mt-1">{query.subject}</p>
                          <p className="text-xs font-medium text-green-600 mt-1">{query.estimatedValue}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(query.priority)}`}>
                              {query.priority}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(query.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                    <span className="text-sm font-bold text-green-600">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Pipeline Value</span>
                    <span className="text-sm font-bold text-blue-600">$635K</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Response Time</span>
                    <span className="text-sm font-bold text-purple-600">1.2h avg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">New Leads</span>
                  <span className="text-sm font-bold text-gray-900">18</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Proposals Sent</span>
                  <span className="text-sm font-bold text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Deals Closed</span>
                  <span className="text-sm font-bold text-gray-900">5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Revenue Generated</span>
                  <span className="text-sm font-bold text-green-600">$127,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SalesPortal