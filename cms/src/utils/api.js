import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Clear invalid tokens on module load to ensure clean state
const clearInvalidTokens = () => {
  const token = localStorage.getItem('cms_token')
  const refreshToken = localStorage.getItem('cms_refresh_token')
  
  // Only clear if we have an inconsistent state (one token without the other)
  if ((token && !refreshToken) || (!token && refreshToken)) {
    localStorage.removeItem('cms_token')
    localStorage.removeItem('cms_refresh_token')
    delete api.defaults.headers.common['Authorization']
    console.log('Cleared invalid tokens for clean state')
  }
}

// Run cleanup immediately
clearInvalidTokens()

// Set auth token if available (after clearing)
const token = localStorage.getItem('cms_token')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('cms_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - TEMPORARILY DISABLED
// api.interceptors.response.use(
//   (response) => {
//     // Calculate request duration
//     const duration = new Date() - response.config.metadata.startTime
//     console.log(`API Request: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`)

//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config

//     // Handle network errors
//     if (!error.response) {
//       toast.error('Network error. Please check your connection.')
//       return Promise.reject(error)
//     }

//     const { status, data } = error.response

//     // Handle different error status codes
//     switch (status) {
//       case 401:
//         // Unauthorized - token expired or invalid
//         if (!originalRequest._retry) {
//           originalRequest._retry = true

//           try {
//             // Get refresh token from localStorage
//             const refreshToken = localStorage.getItem('cms_refresh_token')
//             if (!refreshToken) {
//               throw new Error('No refresh token available')
//             }

//             // Try to refresh token
//             const refreshResponse = await api.post('/auth/refresh', { refreshToken })
//             const { token, refreshToken: newRefreshToken } = refreshResponse.data.data
            
//             // Store new tokens
//             localStorage.setItem('cms_token', token)
//             localStorage.setItem('cms_refresh_token', newRefreshToken)
//             api.defaults.headers.common['Authorization'] = `Bearer ${token}`
//             originalRequest.headers['Authorization'] = `Bearer ${token}`
            
//             return api(originalRequest)
//           } catch (refreshError) {
//             // Refresh failed, redirect to login
//             localStorage.removeItem('cms_token')
//             localStorage.removeItem('cms_refresh_token')
//             delete api.defaults.headers.common['Authorization']
//             window.location.href = '/auth/login'
//             return Promise.reject(refreshError)
//           }
//         }
//         break

//       case 403:
//         // Forbidden - insufficient permissions
//         toast.error('You do not have permission to perform this action.')
//         break

//       case 404:
//         // Not found
//         toast.error('The requested resource was not found.')
//         break

//       case 422:
//         // Validation error
//         if (data.errors && Array.isArray(data.errors)) {
//           data.errors.forEach(err => toast.error(err.message || err))
//         } else {
//           toast.error(data.message || 'Validation error occurred.')
//         }
//         break

//       case 429:
//         // Rate limit exceeded
//         toast.error('Too many requests. Please try again later.')
//         break

//       case 500:
//         // Internal server error
//         toast.error('Server error. Please try again later.')
//         break

//       case 503:
//         // Service unavailable
//         toast.error('Service temporarily unavailable. Please try again later.')
//         break

//       default:
//         // Generic error message
//         toast.error(data.message || 'An unexpected error occurred.')
//     }

//     return Promise.reject(error)
//   }
// )

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

  // File upload with progress
  async upload(endpoint, formData, onProgress = null) {
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      },
    })
    return response.data
  },

  // Download file
  async download(endpoint, filename = null) {
    const response = await api.get(endpoint, {
      responseType: 'blob',
    })

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename || 'download')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    return response.data
  },

  // Batch requests
  async batch(requests) {
    const promises = requests.map(request => {
      const { method, endpoint, data, params } = request
      switch (method.toLowerCase()) {
        case 'get':
          return this.get(endpoint, params)
        case 'post':
          return this.post(endpoint, data)
        case 'put':
          return this.put(endpoint, data)
        case 'patch':
          return this.patch(endpoint, data)
        case 'delete':
          return this.delete(endpoint)
        default:
          throw new Error(`Unsupported method: ${method}`)
      }
    })

    return Promise.allSettled(promises)
  },
}

// Specific API endpoints
export const authAPI = {
  login: (credentials) => apiHelpers.post('/auth/login', credentials),
  logout: () => apiHelpers.post('/auth/logout'),
  register: (userData) => apiHelpers.post('/auth/register', userData),
  forgotPassword: (email) => apiHelpers.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => apiHelpers.post('/auth/reset-password', { token, password }),
  changePassword: (data) => apiHelpers.post('/auth/change-password', data),
  refreshToken: () => apiHelpers.post('/auth/refresh'),
  getProfile: () => apiHelpers.get('/auth/me'),
  updateProfile: (data) => apiHelpers.patch('/auth/profile', data),
}

export const usersAPI = {
  getUsers: (params) => apiHelpers.get('/users', params),
  getUser: (id) => apiHelpers.get(`/users/${id}`),
  createUser: (data) => apiHelpers.post('/users', data),
  updateUser: (id, data) => apiHelpers.put(`/users/${id}`, data),
  deleteUser: (id) => apiHelpers.delete(`/users/${id}`),
  activateUser: (id) => apiHelpers.post(`/users/${id}/activate`),
  deactivateUser: (id) => apiHelpers.post(`/users/${id}/deactivate`),
  getUserStats: () => apiHelpers.get('/users/stats'),
}

export const contentAPI = {
  getContent: (params) => apiHelpers.get('/cms/content', params),
  getContentItem: (id) => apiHelpers.get(`/cms/content/${id}`),
  createContent: (data) => apiHelpers.post('/cms/content', data),
  updateContent: (id, data) => apiHelpers.put(`/cms/content/${id}`, data),
  deleteContent: (id) => apiHelpers.delete(`/cms/content/${id}`),
  publishContent: (id) => apiHelpers.patch(`/cms/content/${id}/publish`),
  unpublishContent: (id) => apiHelpers.patch(`/cms/content/${id}/unpublish`),
  getContentStats: () => apiHelpers.get('/cms/content/stats'),
}

export const servicesAPI = {
  getServices: (params) => apiHelpers.get('/services', params),
  getService: (id) => apiHelpers.get(`/services/${id}`),
  createService: (data) => apiHelpers.post('/services', data),
  updateService: (id, data) => apiHelpers.put(`/services/${id}`, data),
  deleteService: (id) => apiHelpers.delete(`/services/${id}`),
  toggleServiceStatus: (id) => apiHelpers.patch(`/services/${id}/toggle-status`),
  getServiceStats: () => apiHelpers.get('/services/stats'),
}

export const contactAPI = {
  getContacts: (params) => apiHelpers.get('/contact', params),
  getContact: (id) => apiHelpers.get(`/contact/${id}`),
  updateContact: (id, data) => apiHelpers.put(`/contact/${id}`, data),
  deleteContact: (id) => apiHelpers.delete(`/contact/${id}`),
  addNote: (id, note) => apiHelpers.post(`/contact/${id}/notes`, { note }),
  getContactStats: () => apiHelpers.get('/contact/stats'),
}

export const filesAPI = {
  uploadFile: (formData, onProgress) => apiHelpers.upload('/uploads', formData, onProgress),
  getFiles: (params) => apiHelpers.get('/uploads', params),
  deleteFile: (id) => apiHelpers.delete(`/uploads/${id}`),
  getFileInfo: (id) => apiHelpers.get(`/uploads/${id}`),
}

export const dashboardAPI = {
  getStats: () => apiHelpers.get('/dashboard/stats'),
  getAnalytics: (params) => apiHelpers.get('/dashboard/analytics', params),
  getRecentActivity: (params) => apiHelpers.get('/dashboard/activity', params),
  getPerformance: () => apiHelpers.get('/dashboard/performance'),
}

export default api