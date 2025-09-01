import { motion } from 'framer-motion'
import { 
  Building, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Download, 
  Eye, 
  Calendar,
  Activity,
  Settings,
  Bell,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import { useState } from 'react'

const DiagnosticCentrePortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [uploadProgress, setUploadProgress] = useState(0)

  // Mock data for diagnostic centre dashboard
  const stats = [
    {
      title: 'Active Radiologists',
      value: '8',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Cases This Month',
      value: '342',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Avg Turnaround',
      value: '2.1h',
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      title: 'Compliance Score',
      value: '98%',
      icon: CheckCircle,
      color: 'bg-orange-500'
    }
  ]

  const onboardingStatus = {
    applicationSubmitted: true,
    documentsUploaded: true,
    complianceReview: true,
    technicalIntegration: false,
    finalApproval: false,
    status: 'in_progress',
    completionPercentage: 60
  }

  const requiredDocuments = [
    {
      id: 1,
      name: 'Business License',
      status: 'uploaded',
      uploadedAt: '2024-01-10T14:30:00Z',
      expiryDate: '2025-12-31',
      required: true
    },
    {
      id: 2,
      name: 'HIPAA Compliance Certificate',
      status: 'uploaded',
      uploadedAt: '2024-01-10T15:45:00Z',
      expiryDate: '2024-12-31',
      required: true
    },
    {
      id: 3,
      name: 'Professional Liability Insurance',
      status: 'uploaded',
      uploadedAt: '2024-01-11T09:20:00Z',
      expiryDate: '2024-11-30',
      required: true
    },
    {
      id: 4,
      name: 'Technical Infrastructure Assessment',
      status: 'pending',
      uploadedAt: null,
      expiryDate: null,
      required: true
    },
    {
      id: 5,
      name: 'Quality Assurance Protocols',
      status: 'under_review',
      uploadedAt: '2024-01-12T11:15:00Z',
      expiryDate: null,
      required: true
    }
  ]

  const assignedRadiologists = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Chest Imaging',
      availability: 'available',
      currentCases: 3,
      avgTurnaround: '1.8h',
      rating: 4.9,
      contact: {
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 123-4567'
      }
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neuroradiology',
      availability: 'busy',
      currentCases: 7,
      avgTurnaround: '2.3h',
      rating: 4.8,
      contact: {
        email: 'michael.chen@example.com',
        phone: '+1 (555) 234-5678'
      }
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Musculoskeletal',
      availability: 'available',
      currentCases: 2,
      avgTurnaround: '1.5h',
      rating: 4.9,
      contact: {
        email: 'emily.rodriguez@example.com',
        phone: '+1 (555) 345-6789'
      }
    }
  ]

  const recentCases = [
    {
      id: 'RAD-2024-156',
      patientId: 'PT-78901',
      studyType: 'Chest X-Ray',
      radiologist: 'Dr. Sarah Johnson',
      status: 'completed',
      submittedAt: '2024-01-15T10:30:00Z',
      completedAt: '2024-01-15T12:15:00Z',
      turnaround: '1h 45m'
    },
    {
      id: 'RAD-2024-157',
      patientId: 'PT-78902',
      studyType: 'Brain MRI',
      radiologist: 'Dr. Michael Chen',
      status: 'in_progress',
      submittedAt: '2024-01-15T14:20:00Z',
      completedAt: null,
      turnaround: null
    },
    {
      id: 'RAD-2024-158',
      patientId: 'PT-78903',
      studyType: 'Knee MRI',
      radiologist: 'Dr. Emily Rodriguez',
      status: 'pending',
      submittedAt: '2024-01-15T15:45:00Z',
      completedAt: null,
      turnaround: null
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'under_review': return 'bg-blue-100 text-blue-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-yellow-100 text-yellow-800'
      case 'offline': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'onboarding', label: 'Onboarding', icon: FileText },
    { id: 'radiologists', label: 'Radiologists', icon: Users },
    { id: 'cases', label: 'Cases', icon: Building },
    { id: 'profile', label: 'Profile', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Diagnostic Centre Portal</h1>
              <p className="text-gray-600">Metro General Hospital - Chicago, IL</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                onboardingStatus.status === 'approved' ? 'bg-green-100 text-green-800' :
                onboardingStatus.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {onboardingStatus.status === 'approved' ? 'Fully Approved' :
                 onboardingStatus.status === 'in_progress' ? 'Onboarding in Progress' :
                 'Pending Approval'}
              </div>
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
                  <h2 className="text-xl font-semibold text-gray-900">Recent Cases</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentCases.slice(0, 5).map((case_) => (
                      <div key={case_.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{case_.id}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                            {case_.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{case_.studyType} • {case_.radiologist}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted: {new Date(case_.submittedAt).toLocaleString()}
                        </p>
                        {case_.turnaround && (
                          <p className="text-xs text-green-600 font-medium mt-1">
                            Turnaround: {case_.turnaround}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Available Radiologists</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {assignedRadiologists.filter(r => r.availability === 'available').map((radiologist) => (
                      <div key={radiologist.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{radiologist.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(radiologist.availability)}`}>
                            {radiologist.availability}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{radiologist.specialty}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            Current cases: {radiologist.currentCases}
                          </span>
                          <span className="text-xs text-green-600 font-medium">
                            Avg: {radiologist.avgTurnaround}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Onboarding Tab */}
        {activeTab === 'onboarding' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Onboarding Progress</h2>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-primary-600">{onboardingStatus.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-primary-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${onboardingStatus.completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { key: 'applicationSubmitted', label: 'Application', icon: FileText },
                  { key: 'documentsUploaded', label: 'Documents', icon: Upload },
                  { key: 'complianceReview', label: 'Compliance', icon: CheckCircle },
                  { key: 'technicalIntegration', label: 'Technical', icon: Settings },
                  { key: 'finalApproval', label: 'Approval', icon: CheckCircle }
                ].map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = onboardingStatus[step.key]
                  return (
                    <div key={step.key} className="text-center">
                      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                        isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <p className={`text-sm font-medium ${
                        isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Document Upload */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Required Documents</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {requiredDocuments.map((doc) => (
                    <div key={doc.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium text-gray-900">{doc.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                              {doc.status.replace('_', ' ')}
                            </span>
                            {doc.required && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Required
                              </span>
                            )}
                          </div>
                          {doc.uploadedAt && (
                            <p className="text-sm text-gray-600 mt-1">
                              Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          )}
                          {doc.expiryDate && (
                            <p className="text-sm text-gray-600">
                              Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.status === 'uploaded' || doc.status === 'under_review' ? (
                            <>
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-blue-600 hover:text-blue-700">
                                <Download className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button className="btn-primary text-sm">
                              <Upload className="w-4 h-4 mr-1" />
                              Upload
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Radiologists Tab */}
        {activeTab === 'radiologists' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Assigned Radiologists</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assignedRadiologists.map((radiologist) => (
                    <div key={radiologist.id} className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{radiologist.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(radiologist.availability)}`}>
                          {radiologist.availability}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{radiologist.specialty}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Current Cases:</span>
                          <span className="text-sm font-medium">{radiologist.currentCases}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Avg Turnaround:</span>
                          <span className="text-sm font-medium">{radiologist.avgTurnaround}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Rating:</span>
                          <span className="text-sm font-medium text-yellow-600">★ {radiologist.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{radiologist.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{radiologist.contact.phone}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <button className="btn-secondary text-sm flex-1">
                          <Mail className="w-4 h-4 mr-1" />
                          Message
                        </button>
                        <button className="btn-primary text-sm flex-1">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </button>
                      </div>
                    </div>
                  ))}
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
                  <h2 className="text-xl font-semibold text-gray-900">Case Management</h2>
                  <button className="btn-primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit New Case
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Study Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Radiologist</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turnaround</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentCases.map((case_) => (
                      <tr key={case_.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{case_.id}</div>
                          <div className="text-sm text-gray-500">{case_.patientId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {case_.studyType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {case_.radiologist}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                            {case_.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(case_.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {case_.turnaround || 'Pending'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            {case_.status === 'completed' && (
                              <button className="text-green-600 hover:text-green-900">
                                <Download className="w-4 h-4" />
                              </button>
                            )}
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

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Facility Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facility Name</label>
                  <input type="text" value="Metro General Hospital" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea 
                    value="123 Medical Center Drive\nChicago, IL 60601" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input type="email" value="admin@metrogeneral.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" value="+1 (312) 555-0123" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
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
                    <span className="text-sm font-bold text-green-600">2.1 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Cases This Month</span>
                    <span className="text-sm font-bold text-blue-600">342</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Compliance Score</span>
                    <span className="text-sm font-bold text-purple-600">98%</span>
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

export default DiagnosticCentrePortal