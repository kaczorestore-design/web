import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const UnauthorizedPage = () => {
  const { theme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const goHome = () => {
    navigate('/')
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full mx-auto text-center px-4">
        {/* 403 Illustration */}
        <div className="mb-8">
          <div className={`text-9xl font-bold ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'} mb-4`}>
            403
          </div>
          <div className="relative">
            <svg
              className={`w-32 h-32 mx-auto ${theme === 'dark' ? 'text-red-500' : 'text-red-400'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-5V9m0 0V7m0 2h2m-2 0H10m2-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
              />
            </svg>
            {/* Warning indicators */}
            <div className={`absolute top-2 left-10 w-4 h-4 rounded-full ${theme === 'dark' ? 'bg-red-500' : 'bg-red-400'} animate-pulse`}></div>
            <div className={`absolute top-6 right-8 w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-orange-500' : 'bg-orange-400'} animate-pulse delay-75`}></div>
            <div className={`absolute bottom-4 left-8 w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400'} animate-pulse delay-150`}></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            Access Denied
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            You don't have permission to access this resource.
          </p>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            Please contact your administrator if you believe this is an error.
          </p>
        </div>

        {/* User Info */}
        {user && (
          <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-center mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Logged in as: <span className="font-medium">{user.name || user.email}</span>
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              Role: <span className="font-medium capitalize">{user.role || 'User'}</span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={goHome}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Dashboard
            </button>
            
            <button
              onClick={goBack}
              className={`px-6 py-3 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </div>
          
          {/* Logout Option */}
          {user && (
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto ${
                  theme === 'dark'
                    ? 'bg-red-900 hover:bg-red-800 text-red-200'
                    : 'bg-red-100 hover:bg-red-200 text-red-700'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Switch Account
              </button>
            </div>
          )}
          
          {/* Quick Links for Accessible Pages */}
          <div className="mt-8">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mb-3`}>
              You may have access to these pages:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/profile"
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
              >
                Profile
              </Link>
              <Link
                to="/settings/profile"
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
              >
                Account Settings
              </Link>
              <Link
                to="/help"
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
              >
                Help
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className={`mt-12 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
            Need Access?
          </h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
            Contact your system administrator to request access to this resource.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:admin@teleradiology.com"
              className={`text-xs hover:underline ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              📧 Contact Admin
            </a>
            <a
              href="tel:+1-555-123-4567"
              className={`text-xs hover:underline ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              📞 Call Support
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className={`mt-6 p-3 rounded-lg border ${
          theme === 'dark'
            ? 'bg-yellow-900/20 border-yellow-700 text-yellow-200'
            : 'bg-yellow-50 border-yellow-200 text-yellow-800'
        }`}>
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-xs font-medium">
              This access attempt has been logged for security purposes.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage