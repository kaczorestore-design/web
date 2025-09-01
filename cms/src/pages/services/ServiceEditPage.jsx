import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate, useParams } from 'react-router-dom'

const ServiceEditPage = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Radiology',
    price: '',
    duration: '',
    status: 'active',
    requirements: '',
    preparation: '',
    contraindications: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  const categories = [
    'Radiology',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Emergency',
    'Laboratory',
    'Consultation'
  ]

  useEffect(() => {
    // Simulate loading service data
    const loadService = async () => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        const mockService = {
          id: id,
          name: 'CT Scan - Chest',
          description: 'Comprehensive chest CT scan for diagnostic imaging of thoracic structures including lungs, heart, and surrounding tissues.',
          category: 'Radiology',
          price: '450.00',
          duration: '30 minutes',
          status: 'active',
          requirements: 'Patient must remove all metal objects and jewelry. Contrast may be required.',
          preparation: 'Fast for 4 hours before the procedure if contrast is required. Arrive 30 minutes early.',
          contraindications: 'Pregnancy, severe kidney disease, known allergy to contrast material.'
        }
        
        setFormData(mockService)
        setLoading(false)
      }, 1000)
    }
    
    loadService()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required'
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Updating service:', formData)
      setSaving(false)
      navigate('/services')
    }, 1000)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      setSaving(true)
      
      // Simulate API call
      setTimeout(() => {
        console.log('Deleting service:', id)
        setSaving(false)
        navigate('/services')
      }, 1000)
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading service...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Edit Service
            </h1>
            <div className="flex space-x-3">
              <button
                onClick={handleDelete}
                disabled={saving}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-md transition-colors"
              >
                Delete Service
              </button>
              <button
                onClick={() => navigate('/services')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Back to Services
              </button>
            </div>
          </div>
          
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Basic Information */}
                <div>
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Service Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        } ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter service name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="category" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Category
                      </label>
                      <select
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        }`}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="description" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description *
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                      } ${errors.description ? 'border-red-500' : ''}`}
                      placeholder="Describe the service in detail..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>
                </div>

                {/* Pricing and Duration */}
                <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Pricing & Duration
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="price" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Price (USD) *
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} sm:text-sm`}>$</span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={formData.price}
                          onChange={handleChange}
                          className={`block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                            theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                          } ${errors.price ? 'border-red-500' : ''}`}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="duration" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Duration *
                      </label>
                      <input
                        type="text"
                        name="duration"
                        id="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        } ${errors.duration ? 'border-red-500' : ''}`}
                        placeholder="e.g., 30 minutes, 1 hour"
                      />
                      {errors.duration && (
                        <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="status" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Additional Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="requirements" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Requirements
                      </label>
                      <textarea
                        name="requirements"
                        id="requirements"
                        rows={3}
                        value={formData.requirements}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        }`}
                        placeholder="List any requirements for this service..."
                      />
                    </div>

                    <div>
                      <label htmlFor="preparation" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Patient Preparation
                      </label>
                      <textarea
                        name="preparation"
                        id="preparation"
                        rows={3}
                        value={formData.preparation}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        }`}
                        placeholder="Instructions for patient preparation..."
                      />
                    </div>

                    <div>
                      <label htmlFor="contraindications" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contraindications
                      </label>
                      <textarea
                        name="contraindications"
                        id="contraindications"
                        rows={3}
                        value={formData.contraindications}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                        }`}
                        placeholder="List any contraindications or warnings..."
                      />
                    </div>
                  </div>
                </div>

                {/* Service Update Guidelines */}
                <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Service Update Guidelines:
                  </h4>
                  <ul className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                    <li>• Review all changes carefully before saving</li>
                    <li>• Price changes may affect existing appointments</li>
                    <li>• Status changes will immediately affect service availability</li>
                    <li>• Ensure all patient safety information is up to date</li>
                    <li>• Consider notifying relevant staff of significant changes</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/services')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                >
                  {saving && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceEditPage