import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full mx-auto text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className={`text-9xl font-bold ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'} mb-4`}>
            404
          </div>
          <div className="relative">
            <svg
              className={`w-32 h-32 mx-auto ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709M15 3H9a2 2 0 00-2 2v1.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 000 1.414l6.414 6.414a1 1 0 01.293.707V20a2 2 0 002 2h6a2 2 0 002-2v-1.586a1 1 0 01.293-.707l6.414-6.414a1 1 0 000-1.414L16.707 5.293A1 1 0 0016.414 5H15V3z"
              />
            </svg>
            {/* Floating elements */}
            <div className={`absolute top-4 left-8 w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'} animate-bounce`}></div>
            <div className={`absolute top-8 right-6 w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-400'} animate-bounce delay-75`}></div>
            <div className={`absolute bottom-6 left-6 w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-green-500' : 'bg-green-400'} animate-bounce delay-150`}></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            Page Not Found
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

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
          
          {/* Quick Links */}
          <div className="mt-8">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mb-3`}>
              Or try one of these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/patients"
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
              >
                Patients
              </Link>
              <Link
                to="/studies"
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
              >
                Studies
              </Link>
              <Link
                to="/reports"
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
              >
                Reports
              </Link>
              <Link
                to="/users"
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
              >
                Users
              </Link>
              <Link
                to="/settings"
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
              >
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className={`mt-12 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
            Need Help?
          </h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
            If you believe this is an error, please contact our support team.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:support@teleradiology.com"
              className={`text-xs hover:underline ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              📧 Email Support
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
      </div>
    </div>
  )
}

export default NotFoundPage