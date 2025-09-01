import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'

const ServicesListPage = () => {
  const { theme } = useTheme()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    // Simulate loading services data
    setTimeout(() => {
      setServices([
        {
          id: 1,
          name: 'X-Ray Imaging',
          description: 'Digital X-ray imaging services for bone and chest examinations',
          category: 'Radiology',
          status: 'active',
          price: 150,
          duration: '30 minutes',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-20'
        },
        {
          id: 2,
          name: 'MRI Scan',
          description: 'Magnetic Resonance Imaging for detailed soft tissue analysis',
          category: 'Radiology',
          status: 'active',
          price: 800,
          duration: '60 minutes',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-18'
        },
        {
          id: 3,
          name: 'CT Scan',
          description: 'Computed Tomography for cross-sectional body imaging',
          category: 'Radiology',
          status: 'active',
          price: 500,
          duration: '45 minutes',
          createdAt: '2024-01-12',
          updatedAt: '2024-01-19'
        },
        {
          id: 4,
          name: 'Ultrasound',
          description: 'Real-time ultrasound imaging for various medical conditions',
          category: 'Radiology',
          status: 'inactive',
          price: 200,
          duration: '30 minutes',
          createdAt: '2024-01-08',
          updatedAt: '2024-01-16'
        },
        {
          id: 5,
          name: 'Mammography',
          description: 'Specialized breast imaging for cancer screening',
          category: 'Radiology',
          status: 'active',
          price: 300,
          duration: '20 minutes',
          createdAt: '2024-01-14',
          updatedAt: '2024-01-21'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return a.price - b.price
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt)
      default:
        return 0
    }
  })

  const getStatusBadge = (status) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
    if (status === 'active') {
      return `${baseClasses} bg-green-100 text-green-800`
    } else {
      return `${baseClasses} bg-red-100 text-red-800`
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Loading services...</p>
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
              Services Management
            </h1>
            <Link
              to="/services/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Service
            </Link>
          </div>

          {/* Filters and Search */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg mb-6`}>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="search" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Search Services
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                    placeholder="Search by name, description, or category..."
                  />
                </div>
                <div>
                  <label htmlFor="status" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Filter by Status
                  </label>
                  <select
                    id="status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sort" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Sort by
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="created">Date Created</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg overflow-hidden`}>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Services ({filteredServices.length})
                </h2>
              </div>
              
              {filteredServices.length === 0 ? (
                <div className="text-center py-12">
                  <svg className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className={`mt-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                    No services found
                  </h3>
                  <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filter criteria.' : 'Get started by creating a new service.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <div key={service.id} className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
                      theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {service.name}
                        </h3>
                        <span className={getStatusBadge(service.status)}>
                          {service.status}
                        </span>
                      </div>
                      
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                        {service.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Category:</span>
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{service.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Price:</span>
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${service.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Duration:</span>
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{service.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/services/${service.id}/edit`}
                          className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            theme === 'dark' 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => console.log('Delete service:', service.id)}
                          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            theme === 'dark' 
                              ? 'bg-red-600 hover:bg-red-700 text-white' 
                              : 'bg-red-600 hover:bg-red-700 text-white'
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg p-6`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Services</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{services.length}</p>
                </div>
              </div>
            </div>
            
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg p-6`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Active Services</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {services.filter(s => s.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg p-6`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Price</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ${Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg p-6`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Categories</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {new Set(services.map(s => s.category)).size}
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

export default ServicesListPage