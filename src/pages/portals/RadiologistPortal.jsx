import { motion } from 'framer-motion'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Upload, 
  Eye, 
  Calendar,
  Activity,
  User,
  Settings,
  Bell
} from 'lucide-react'
import { useState } from 'react'

const RadiologistPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedCase, setSelectedCase] = useState(null)

  // Mock data for radiologist dashboard
  const stats = [
    {
      title: 'Pending Cases',
      value: '12',
      icon: Clock,
      color: 'bg-orange-500'
    },
    {
      title: 'Completed Today',
      value: '8',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Urgent Cases',
      value: '3',
      icon: AlertCircle,
      color: 'bg-red-500'
    },
    {
      title: 'Total This Month',
      value: '247',
      icon: FileText,
      color: 'bg-blue-500'
    }
  ]

  const pendingCases = [
    {
      id: 'RAD-2024-001',
      patientId: 'PT-12345',
      studyType: 'Chest X-Ray',
      priority: 'urgent',
      facility: 'Metro General Hospital',
      receivedAt: '2024-01-15T14:30:00Z',
      deadline: '2024-01-15T18:00:00Z',
      bodyPart: 'Chest',
      indication: 'Shortness of breath, fever'
    },
    {
      id: 'RAD-2024-002',
      patientId: 'PT-12346',
      studyType: 'Brain MRI',
      priority: 'routine',
      facility: 'City Medical Center',
      receivedAt: '2024-01-15T13:15:00Z',
      deadline: '2024-01-16T09:00:00Z',
      bodyPart: 'Brain',
      indication: 'Headache, neurological symptoms'
    },
    {
      id: 'RAD-2024-003',
      patientId: 'PT-12347',
      studyType: 'Abdominal CT',
      priority: 'stat',
      facility: 'Emergency Care Center',
      receivedAt: '2024-01-15T15:45:00Z',
      deadline: '2024-01-15T16:45:00Z',
      bodyPart: 'Abdomen',
      indication: 'Acute abdominal pain'
    }
  ]

  const recentReports = [
    {
      id: 'RAD-2024-098',
      patientId: 'PT-12340',
      studyType: 'Chest CT',
      completedAt: '2024-01-15T12:30:00Z',
      status: 'finalized',
      findings: 'No acute findings. Clear lungs.'
    },
    {
      id: 'RAD-2024-097',
      patientId: 'PT-12339',
      studyType: 'Knee MRI',
      completedAt: '2024-01-15T11:15:00Z',
      status: 'pending_review',
      findings: 'Meniscal tear identified in medial meniscus.'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'stat': return 'bg-red-100 text-red-800 border-red-200'
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'routine': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'finalized': return 'bg-green-100 text-green-800'
      case 'pending_review': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimeRemaining = (deadline) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diff = deadlineDate - now
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (diff < 0) return 'Overdue'
    if (hours < 1) return `${minutes}m remaining`
    return `${hours}h ${minutes}m remaining`
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'cases', label: 'Active Cases', icon: FileText },
    { id: 'reports', label: 'My Reports', icon: CheckCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Radiologist Portal</h1>
              <p className="text-gray-600">Welcome back, Dr. Sarah Johnson</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
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
                  <h2 className="text-xl font-semibold text-gray-900">Urgent Cases</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {pendingCases.filter(c => c.priority === 'urgent' || c.priority === 'stat').map((case_) => (
                      <div key={case_.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{case_.id}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(case_.priority)}`}>
                            {case_.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{case_.studyType} • {case_.facility}</p>
                        <p className="text-xs text-red-600 font-medium mt-1">
                          {formatTimeRemaining(case_.deadline)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{report.id}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{report.studyType}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Completed: {new Date(report.completedAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cases Tab */}
        {activeTab === 'cases' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Active Cases</h2>
                  <div className="flex items-center gap-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>All Priorities</option>
                      <option>STAT</option>
                      <option>Urgent</option>
                      <option>Routine</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>All Studies</option>
                      <option>X-Ray</option>
                      <option>CT</option>
                      <option>MRI</option>
                      <option>Ultrasound</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Study Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Remaining</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingCases.map((case_) => (
                      <tr key={case_.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{case_.id}</div>
                          <div className="text-sm text-gray-500">{case_.patientId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{case_.studyType}</div>
                          <div className="text-sm text-gray-500">{case_.bodyPart}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(case_.priority)}`}>
                            {case_.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {case_.facility}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${
                            formatTimeRemaining(case_.deadline).includes('Overdue') ? 'text-red-600' :
                            formatTimeRemaining(case_.deadline).includes('h') ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {formatTimeRemaining(case_.deadline)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Download className="w-4 h-4" />
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

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">My Reports</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{report.id}</h3>
                        <p className="text-sm text-gray-600">{report.studyType} • Patient: {report.patientId}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                        {report.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Findings:</h4>
                      <p className="text-sm text-gray-700">{report.findings}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Completed: {new Date(report.completedAt).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="btn-secondary text-sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button className="btn-primary text-sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value="Dr. Sarah Johnson" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value="sarah.johnson@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                  <input type="text" value="Chest Imaging, Emergency Radiology" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <input type="text" value="RAD-12345-CA" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <button className="btn-primary w-full">
                  Update Profile
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Average Turnaround Time</span>
                    <span className="text-sm font-bold text-green-600">2.4 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Cases This Month</span>
                    <span className="text-sm font-bold text-blue-600">247</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Quality Score</span>
                    <span className="text-sm font-bold text-purple-600">98.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default RadiologistPortal