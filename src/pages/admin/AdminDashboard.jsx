import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  Calendar, 
  Activity,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download
} from 'lucide-react'
import { useState } from 'react'

const AdminDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Cases',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Revenue',
      value: '$847K',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ]

  const recentApplications = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      type: 'Radiologist',
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z',
      specialty: 'Chest Imaging'
    },
    {
      id: 2,
      name: 'Regional Medical Center',
      type: 'Diagnostic Centre',
      status: 'approved',
      submittedAt: '2024-01-14T15:45:00Z',
      location: 'Chicago, IL'
    },
    {
      id: 3,
      name: 'Michael Chen',
      type: 'Sales Representative',
      status: 'under_review',
      submittedAt: '2024-01-14T09:20:00Z',
      experience: '5 years'
    },
    {
      id: 4,
      name: 'Dr. Emily Rodriguez',
      type: 'Radiologist',
      status: 'rejected',
      submittedAt: '2024-01-13T14:15:00Z',
      specialty: 'Neuroradiology'
    }
  ]

  const salesQueries = [
    {
      id: 1,
      company: 'Metro Health System',
      contact: 'John Smith',
      status: 'new',
      priority: 'high',
      subject: 'Enterprise PACS Integration',
      createdAt: '2024-01-15T11:00:00Z'
    },
    {
      id: 2,
      company: 'City General Hospital',
      contact: 'Lisa Wang',
      status: 'processing',
      priority: 'medium',
      subject: '24/7 Radiology Coverage',
      createdAt: '2024-01-14T16:30:00Z'
    },
    {
      id: 3,
      company: 'Rural Care Network',
      contact: 'David Brown',
      status: 'closed',
      priority: 'low',
      subject: 'Teleradiology Pricing',
      createdAt: '2024-01-13T13:45:00Z'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': case 'new': return 'bg-yellow-100 text-yellow-800'
      case 'approved': case 'closed': return 'bg-green-100 text-green-800'
      case 'under_review': case 'processing': return 'bg-blue-100 text-blue-800'
      case 'rejected': return 'bg-red-100 text-red-800'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your teleradiology platform</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="btn-primary">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">{application.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {application.type} • {application.specialty || application.location || application.experience}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      {application.status === 'pending' && (
                        <>
                          <button className="p-2 text-green-600 hover:text-green-700">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:text-red-700">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sales Queries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Sales Queries</h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {salesQueries.map((query) => (
                  <div key={query.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">{query.company}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(query.priority)}`}>
                          {query.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {query.subject} • {query.contact}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                          {query.status}
                        </span>
                        <p className="text-xs text-gray-500">
                          {new Date(query.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'User Management', icon: Users, description: 'Manage user accounts and permissions' },
              { title: 'Content Management', icon: FileText, description: 'Update website content and pages' },
              { title: 'System Analytics', icon: TrendingUp, description: 'View detailed system analytics' },
              { title: 'System Alerts', icon: AlertCircle, description: 'Monitor system health and alerts' }
            ].map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={action.title}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-left"
                >
                  <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard