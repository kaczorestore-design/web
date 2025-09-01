import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../utils/api'

// Initial state
const initialState = {
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
}

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  UPDATE_USER: 'UPDATE_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
}

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        isAuthenticated: true,
        error: null,
      }
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      }
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      }
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext()

// Provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const navigate = useNavigate()

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('cms_token')
      const refreshToken = localStorage.getItem('cms_refresh_token')
      
      // If we have a token but no refresh token, clear everything
      if (token && !refreshToken) {
        localStorage.removeItem('cms_token')
        localStorage.removeItem('cms_refresh_token')
        delete api.defaults.headers.common['Authorization']
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
        return
      }
      
      if (!token) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
        return
      }

      try {
        // Set token in API headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        // Verify token and get user data
        const response = await api.get('/auth/me')
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: response.data.data.user,
            token,
          },
        })
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('cms_token')
        localStorage.removeItem('cms_refresh_token')
        delete api.defaults.headers.common['Authorization']
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START })

    try {
      const response = await api.post('/auth/login', credentials)
      const { user, token, refreshToken } = response.data.data

      // Store tokens
      localStorage.setItem('cms_token', token)
      localStorage.setItem('cms_refresh_token', refreshToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, token },
      })

      toast.success(`Welcome back, ${user.firstName}!`)
      navigate('/dashboard')
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: message,
      })
      // Create a proper error object with message property
      const errorToThrow = new Error(message)
      errorToThrow.response = error.response
      throw errorToThrow
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local storage and state
      localStorage.removeItem('cms_token')
      localStorage.removeItem('cms_refresh_token')
      delete api.defaults.headers.common['Authorization']
      
      dispatch({ type: AUTH_ACTIONS.LOGOUT })
      toast.success('Logged out successfully')
      navigate('/auth/login')
    }
  }

  // Update user profile
  const updateUser = (userData) => {
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: userData,
    })
  }

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      await api.post('/auth/forgot-password', { email })
      toast.success('Password reset instructions sent to your email')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset email'
      toast.error(message)
      throw error
    }
  }

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      await api.post('/auth/reset-password', { token, password })
      toast.success('Password reset successfully')
      navigate('/auth/login')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password'
      toast.error(message)
      throw error
    }
  }

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      })
      toast.success('Password changed successfully')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password'
      toast.error(message)
      throw error
    }
  }

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await api.post('/auth/refresh')
      const { token } = response.data
      
      localStorage.setItem('cms_token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      return token
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
      throw error
    }
  }

  // Check permissions
  const hasPermission = (permission) => {
    if (!state.user) return false
    
    // Admin has all permissions
    if (state.user.role === 'admin') return true
    
    // Check specific permissions
    return state.user.permissions?.includes(permission) || false
  }

  // Check role
  const hasRole = (role) => {
    if (!state.user) return false
    return state.user.role === role
  }

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
  }, [])

  const value = {
    // State
    user: state.user,
    token: state.token,
    loading: state.loading,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    
    // Actions
    login,
    logout,
    updateUser,
    forgotPassword,
    resetPassword,
    changePassword,
    refreshToken,
    hasPermission,
    hasRole,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext