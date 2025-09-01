import { motion } from 'framer-motion'
import { 
  User, 
  FileText, 
  Calendar, 
  Download, 
  Eye, 
  Clock, 
  Shield, 
  Heart, 
  Activity, 
  Bell, 
  Settings, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  Search, 
  Filter
} from 'lucide-react'
import { useState } from 'react'

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock patient data
  const patientInfo = {
    name: 'John Smith',
    dateOfBirth: '1985-03-15',
    patientId: 'PT-78901',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '456 Oak Street, Chicago, IL 60601',
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 234-5678'
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BC123456789',
      groupNumber: 'GRP001'
    }
  }

  const stats = [
    {
      title: 'Total Reports',
      value: '12',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Results',
      value: '2',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Upcoming Appointments',
      value: '1',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Health Score',
      value: '85%',
      icon: Heart,
      color: 'bg-red-500'
    }
  ]

  const medicalReports = [
    {
      id: 'RPT-2024-001',
      studyType: 'Chest X-Ray',
      date: '2024-01-15T10:30:00Z',
      radiologist: 'Dr. Sarah Johnson',
      status: 'completed',
      findings: 'Normal chest X-ray. No acute cardiopulmonary abnormalities.',
      priority: 'routine',
      downloadUrl: '#',
      facility: 'Metro General Hospital'
    },
    {
      id: 'RPT-2024-002',
      studyType: 'Brain MRI',
      date: '2024-01-10T14:20:00Z',
      radiologist: 'Dr. Michael Chen',
      status: 'completed',
      findings: 'No acute intracranial abnormalities. Age-appropriate changes.',
      priority: 'routine',
      downloadUrl: '#',
      facility: 'Metro General Hospital'
    },
    {
      id: 'RPT-2024-003',
      studyType: 'Abdominal CT',
      date: '2024-01-08T09:15:00Z',
      radiologist: 'Dr. Emily Rodriguez',
      status: 'completed',
      findings: 'Normal abdominal CT scan. No evidence of acute pathology.',
      priority: 'routine',
      downloadUrl: '#',
      facility: 'Metro General Hospital'
    },
    {
      id: 'RPT-2024-004',
      studyType: 'Knee MRI',
      date: '2024-01-05T16:45:00Z',
      radiologist: 'Dr. Robert Wilson',
      status: 'pending',
      findings: null,
      priority: 'routine',
      downloadUrl: null,
      facility: 'Metro General Hospital'
    },
    {
      id: 'RPT-2024-005',
      studyType: 'Mammography',
      date: '2024-01-03T11:30:00Z',
      radiologist: 'Dr. Lisa Anderson',
      status: 'pending',
      findings: null,
      priority: 'urgent',
      downloadUrl: null,
      facility: 'Metro General Hospital'
    }
  ]

  const appointments = [
    {
      id: 'APT-2024-001',
      type: 'Follow-up Consultation',
      date: '2024-01-20T14:00:00Z',
      doctor: 'Dr. Sarah Johnson',
      facility: 'Metro General Hospital',
      address: '123 Medical Center Drive, Chicago, IL',
      status: 'confirmed',
      notes: 'Follow-up for chest X-ray results'
    },
    {
      id: 'APT-2024-002',
      type: 'Annual Physical',
      date: '2024-02-15T10:30:00Z',
      doctor: 'Dr. James Miller',
      facility: 'Metro General Hospital',
      address: '123 Medical Center Drive, Chicago, IL',
      status: 'scheduled',
      notes: 'Annual health checkup'
    }
  ]

  const healthMetrics = [
    {
      metric: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      lastUpdated: '2024-01-15'
    },
    {
      metric: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      lastUpdated: '2024-01-15'
    },
    {
      metric: 'BMI',
      value: '24.2',
      unit: 'kg/m²',
      status: 'normal',
      lastUpdated: '2024-01-10'
    },
    {
      metric: 'Cholesterol',
      value: '185',
      unit: 'mg/dL',
      status: 'normal',
      lastUpdated: '2024-01-08'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'scheduled': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'routine': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600'
      case 'high': return 'text-orange-600'
      case 'low': return 'text-blue-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const filteredReports = medicalReports.filter(report => {
    const matchesSearch = report.studyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.radiologist.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'reports', label: 'Medical Reports', icon: FileText },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'health', label: 'Health Metrics', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patient Portal</h1>
              <p className="text-gray-600">Welcome back, {patientInfo.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-green-600 font-medium">HIPAA Secure</span>
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
                  <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {medicalReports.slice(0, 3).map((report) => (
                      <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{report.studyType}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{report.radiologist}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(report.date).toLocaleDateString()}
                        </p>
                        {report.findings && (
                          <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                            {report.findings}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {appointments.filter(apt => new Date(apt.date) > new Date()).map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{appointment.doctor}</p>
                        <p className="text-sm text-blue-600 font-medium mt-1">
                          {new Date(appointment.date).toLocaleDateString()} at {new Date(appointment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{appointment.facility}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
          >
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Reports</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Medical Reports</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <div key={report.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{report.studyType}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">Report ID: {report.id}</p>
                            <p className="text-sm text-gray-600">Date: {new Date(report.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Radiologist: {report.radiologist}</p>
                            <p className="text-sm text-gray-600">Facility: {report.facility}</p>
                          </div>
                        </div>
                        {report.findings && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Findings:</h4>
                            <p className="text-sm text-gray-700">{report.findings}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {report.status === 'completed' && (
                          <>
                            <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg">
                              <Download className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {report.status === 'pending' && (
                          <div className="flex items-center gap-2 text-yellow-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Processing</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
                  <button className="btn-primary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{appointment.type}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">Doctor: {appointment.doctor}</p>
                            <p className="text-sm text-gray-600">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">Time: {new Date(appointment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Facility: {appointment.facility}</p>
                            <div className="flex items-start gap-1">
                              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                              <p className="text-sm text-gray-600">{appointment.address}</p>
                            </div>
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="btn-secondary text-sm">
                          Reschedule
                        </button>
                        <button className="btn-outline text-sm text-red-600 border-red-300 hover:bg-red-50">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Health Metrics Tab */}
        {activeTab === 'health' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Vital Signs</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {healthMetrics.map((metric) => (
                      <div key={metric.metric} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{metric.metric}</h3>
                          <p className="text-sm text-gray-600">Last updated: {new Date(metric.lastUpdated).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getHealthStatusColor(metric.status)}`}>
                            {metric.value}
                          </p>
                          <p className="text-sm text-gray-500">{metric.unit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Health Summary</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="font-medium text-green-900">Overall Health</h3>
                      </div>
                      <p className="text-sm text-green-800">Your vital signs are within normal ranges. Keep up the good work!</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        <h3 className="font-medium text-blue-900">Recommendations</h3>
                      </div>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Continue regular exercise routine</li>
                        <li>• Schedule annual physical exam</li>
                        <li>• Monitor blood pressure monthly</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-medium text-yellow-900">Upcoming</h3>
                      </div>
                      <p className="text-sm text-yellow-800">Annual physical exam due in 2 months</p>
                    </div>
                  </div>
                </div>
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={patientInfo.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                  <input type="text" value={patientInfo.patientId} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" value={patientInfo.dateOfBirth} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={patientInfo.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" value={patientInfo.phone} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea 
                    value={patientInfo.address} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    rows="3"
                  />
                </div>
                <button className="btn-primary w-full">
                  Update Profile
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Emergency Contact</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" value={patientInfo.emergencyContact.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <input type="text" value={patientInfo.emergencyContact.relationship} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" value={patientInfo.emergencyContact.phone} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Insurance Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                    <input type="text" value={patientInfo.insurance.provider} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                    <input type="text" value={patientInfo.insurance.policyNumber} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Number</label>
                    <input type="text" value={patientInfo.insurance.groupNumber} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
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

export default PatientPortal