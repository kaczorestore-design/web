import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate, useParams } from 'react-router-dom'

const ContentPreviewPage = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading content
    setTimeout(() => {
      setContent({
        id: id,
        title: `Sample Article ${id}`,
        content: `This is a preview of the content for article ${id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        status: 'published',
        category: 'blog',
        tags: ['sample', 'article', 'cms'],
        author: 'Admin User',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-16'
      })
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Loading content...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Content Not Found</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>The requested content could not be found.</p>
          <button
            onClick={() => navigate('/content')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to Content List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/content')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                ← Back to List
              </button>
              <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Content Preview
              </h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/content/edit/${content.id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Edit
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Publish
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg overflow-hidden`}>
            {/* Meta Information */}
            <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Status:</strong>
                  <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    content.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : content.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {content.status}
                  </span>
                </span>
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Category:</strong> {content.category}
                </span>
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Author:</strong> {content.author}
                </span>
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Created:</strong> {content.createdAt}
                </span>
                {content.updatedAt !== content.createdAt && (
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <strong>Updated:</strong> {content.updatedAt}
                  </span>
                )}
              </div>
              {content.tags && content.tags.length > 0 && (
                <div className="mt-3">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {content.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Article Content */}
            <article className="px-6 py-8">
              <header className="mb-8">
                <h1 className={`text-4xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {content.title}
                </h1>
              </header>
              
              <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
                {content.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={`mb-4 text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPreviewPage