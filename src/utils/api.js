import axios from 'axios'

// Create axios instance for the main website
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message)
      throw new Error('Network error. Please check your connection.')
    }

    const { status, data } = error.response

    // Handle different error status codes
    switch (status) {
      case 400:
        throw new Error(data.message || 'Bad request. Please check your input.')
      case 404:
        throw new Error('The requested resource was not found.')
      case 422:
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.map(err => err.message || err).join(', '))
        } else {
          throw new Error(data.message || 'Validation error occurred.')
        }
      case 429:
        throw new Error('Too many requests. Please try again later.')
      case 500:
        throw new Error('Server error. Please try again later.')
      case 503:
        throw new Error('Service temporarily unavailable. Please try again later.')
      default:
        throw new Error(data.message || 'An unexpected error occurred.')
    }
  }
)

// API helper functions
export const apiHelpers = {
  // Generic CRUD operations
  async get(endpoint, params = {}) {
    const response = await api.get(endpoint, { params })
    return response.data
  },

  async post(endpoint, data = {}) {
    const response = await api.post(endpoint, data)
    return response.data
  },

  async put(endpoint, data = {}) {
    const response = await api.put(endpoint, data)
    return response.data
  },

  async patch(endpoint, data = {}) {
    const response = await api.patch(endpoint, data)
    return response.data
  },

  async delete(endpoint) {
    const response = await api.delete(endpoint)
    return response.data
  },
}

// Specific API endpoints for the main website
export const contactAPI = {
  // Submit contact form
  submitContact: (contactData) => apiHelpers.post('/contact', contactData),
}

export const servicesAPI = {
  // Get all services
  getServices: (params) => apiHelpers.get('/services', params),
  // Get featured services
  getFeaturedServices: () => apiHelpers.get('/services/featured'),
  // Get service by ID
  getService: (id) => apiHelpers.get(`/services/${id}`),
  // Get service by slug
  getServiceBySlug: (slug) => apiHelpers.get(`/services/slug/${slug}`),
}

export const cmsAPI = {
  // Get published content
  getPublishedContent: (params) => apiHelpers.get('/cms/content/published', params),
  // Get content by slug
  getContentBySlug: (slug) => apiHelpers.get(`/cms/content/slug/${slug}`),
  // Get featured content
  getFeaturedContent: () => apiHelpers.get('/cms/content/featured'),
  // Get categories
  getCategories: () => apiHelpers.get('/cms/categories'),
  // Get tags
  getTags: () => apiHelpers.get('/cms/tags'),
}

export default api