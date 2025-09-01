import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'

const SettingsPage = () => {
  const { theme } = useTheme()
  const [settings, setSettings] = useState({
    siteName: 'AI Teleradiology CMS',
    siteDescription: 'Advanced medical imaging management system',
    contactEmail: 'admin@teleradiology.com',
    supportPhone: '+1 (555) 123-4567',
    timezone: 'UTC',
    language: 'en',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    backupFrequency: 'daily',
    maxFileSize: '100',
    allowedFileTypes: ['dcm', 'pdf', 'jpg', 'png', 'doc', 'docx'],
    sessionTimeout: '30',
    passwordMinLength: '8',
    requireTwoFactor: false,
    logRetentionDays: '90',
    websiteLogo: null,
    websiteFavicon: null
  })
  
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  // Load settings on component mount
  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Settings would be loaded from API here
      console.log('Settings loaded')
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
    setSaved(false)
  }

  const handleCheckboxChange = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
    setSaved(false)
  }

  const handleArrayChange = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item)
    setSettings(prev => ({
      ...prev,
      [field]: array
    }))
    setSaved(false)
  }

  const handleFileUpload = (field, file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          [field]: e.target.result
        }))
        setSaved(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: null
    }))
    setSaved(false)
  }

  const saveSettings = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Settings saved:', settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      setSettings({
        siteName: 'AI Teleradiology CMS',
        siteDescription: 'Advanced medical imaging management system',
        contactEmail: 'admin@teleradiology.com',
        supportPhone: '+1 (555) 123-4567',
        timezone: 'UTC',
        language: 'en',
        maintenanceMode: false,
        registrationEnabled: true,
        emailNotifications: true,
        smsNotifications: false,
        autoBackup: true,
        backupFrequency: 'daily',
        maxFileSize: '100',
        allowedFileTypes: ['dcm', 'pdf', 'jpg', 'png', 'doc', 'docx'],
        sessionTimeout: '30',
        passwordMinLength: '8',
        requireTwoFactor: false,
        logRetentionDays: '90',
        websiteLogo: null,
        websiteFavicon: null
      })
      setSaved(false)
    }
  }

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'files', name: 'File Management', icon: '📁' },
    { id: 'system', name: 'System', icon: '🖥️' }
  ]

  const timezones = [
    'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai',
    'Australia/Sydney', 'Pacific/Auckland'
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' }
  ]

  const backupFrequencies = [
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              System Settings
            </h1>
            <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Configure system-wide settings and preferences
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Link
              to="/settings/profile"
              className={`p-4 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">👤</span>
                <div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Profile Settings
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Manage your personal profile
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/settings/security"
              className={`p-4 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔐</span>
                <div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Security Settings
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Configure security options
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/settings/notifications"
              className={`p-4 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔔</span>
                <div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Notification Settings
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Manage notification preferences
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Main Settings Panel */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg`}>
            {/* Tab Navigation */}
            <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : theme === 'dark'
                          ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      General Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Site Name
                        </label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => handleInputChange('siteName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={settings.contactEmail}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Support Phone
                        </label>
                        <input
                          type="tel"
                          value={settings.supportPhone}
                          onChange={(e) => handleInputChange('supportPhone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Timezone
                        </label>
                        <select
                          value={settings.timezone}
                          onChange={(e) => handleInputChange('timezone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        >
                          {timezones.map(tz => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Language
                        </label>
                        <select
                          value={settings.language}
                          onChange={(e) => handleInputChange('language', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        >
                          {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Site Description
                      </label>
                      <textarea
                        value={settings.siteDescription}
                        onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md transition-colors ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      />
                    </div>
                    
                    {/* Website Logo and Favicon Section */}
                    <div className="mt-8">
                      <h4 className={`text-md font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                        Website Branding
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Website Logo */}
                        <div>
                          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Website Logo
                          </label>
                          <div className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                            theme === 'dark'
                              ? 'border-gray-600 bg-gray-700'
                              : 'border-gray-300 bg-gray-50'
                          }`}>
                            {settings.websiteLogo ? (
                              <div className="text-center">
                                <img
                                  src={settings.websiteLogo}
                                  alt="Website Logo"
                                  className="max-h-24 mx-auto mb-2 object-contain"
                                />
                                <div className="flex justify-center space-x-2">
                                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                    Change
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleFileUpload('websiteLogo', e.target.files[0])}
                                      className="hidden"
                                    />
                                  </label>
                                  <button
                                    onClick={() => removeFile('websiteLogo')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <svg className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="mt-2">
                                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                                    Upload Logo
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleFileUpload('websiteLogo', e.target.files[0])}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                                <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Website Favicon */}
                        <div>
                          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Website Favicon
                          </label>
                          <div className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                            theme === 'dark'
                              ? 'border-gray-600 bg-gray-700'
                              : 'border-gray-300 bg-gray-50'
                          }`}>
                            {settings.websiteFavicon ? (
                              <div className="text-center">
                                <img
                                  src={settings.websiteFavicon}
                                  alt="Website Favicon"
                                  className="w-8 h-8 mx-auto mb-2 object-contain"
                                />
                                <div className="flex justify-center space-x-2">
                                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                    Change
                                    <input
                                      type="file"
                                      accept="image/*,.ico"
                                      onChange={(e) => handleFileUpload('websiteFavicon', e.target.files[0])}
                                      className="hidden"
                                    />
                                  </label>
                                  <button
                                    onClick={() => removeFile('websiteFavicon')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <svg className={`mx-auto h-8 w-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                <div className="mt-2">
                                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                                    Upload Favicon
                                    <input
                                      type="file"
                                      accept="image/*,.ico"
                                      onChange={(e) => handleFileUpload('websiteFavicon', e.target.files[0])}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                                <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                  ICO, PNG 16x16 or 32x32 pixels
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="maintenanceMode"
                          checked={settings.maintenanceMode}
                          onChange={() => handleCheckboxChange('maintenanceMode')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="maintenanceMode" className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Enable Maintenance Mode
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="registrationEnabled"
                          checked={settings.registrationEnabled}
                          onChange={() => handleCheckboxChange('registrationEnabled')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="registrationEnabled" className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Allow User Registration
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Notification Settings
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Email Notifications
                          </label>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Receive notifications via email
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={() => handleCheckboxChange('emailNotifications')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            SMS Notifications
                          </label>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Receive notifications via SMS
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={() => handleCheckboxChange('smsNotifications')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Security Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Session Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                          min="5"
                          max="480"
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Minimum Password Length
                        </label>
                        <input
                          type="number"
                          value={settings.passwordMinLength}
                          onChange={(e) => handleInputChange('passwordMinLength', e.target.value)}
                          min="6"
                          max="32"
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="requireTwoFactor"
                          checked={settings.requireTwoFactor}
                          onChange={() => handleCheckboxChange('requireTwoFactor')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="requireTwoFactor" className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Require Two-Factor Authentication
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* File Management Settings */}
              {activeTab === 'files' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      File Management Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Maximum File Size (MB)
                        </label>
                        <input
                          type="number"
                          value={settings.maxFileSize}
                          onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
                          min="1"
                          max="1000"
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Allowed File Types (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={settings.allowedFileTypes.join(', ')}
                        onChange={(e) => handleArrayChange('allowedFileTypes', e.target.value)}
                        placeholder="dcm, pdf, jpg, png, doc, docx"
                        className={`w-full px-3 py-2 border rounded-md transition-colors ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* System Settings */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      System Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Backup Frequency
                        </label>
                        <select
                          value={settings.backupFrequency}
                          onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        >
                          {backupFrequencies.map(freq => (
                            <option key={freq.value} value={freq.value}>{freq.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Log Retention (days)
                        </label>
                        <input
                          type="number"
                          value={settings.logRetentionDays}
                          onChange={(e) => handleInputChange('logRetentionDays', e.target.value)}
                          min="7"
                          max="365"
                          className={`w-full px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="autoBackup"
                          checked={settings.autoBackup}
                          onChange={() => handleCheckboxChange('autoBackup')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="autoBackup" className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Enable Automatic Backups
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className={`px-6 py-4 bg-gray-50 ${theme === 'dark' ? 'bg-gray-750' : ''} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex justify-between`}>
              <button
                onClick={resetSettings}
                disabled={loading}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Reset to Defaults
              </button>
              
              <div className="flex space-x-3">
                {saved && (
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Settings saved!</span>
                  </div>
                )}
                
                <button
                  onClick={saveSettings}
                  disabled={loading}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${
                    loading
                      ? 'bg-blue-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {loading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {loading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage