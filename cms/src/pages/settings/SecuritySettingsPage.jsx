import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const SecuritySettingsPage = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 30,
    allowedIPs: [],
    trustedDevices: [],
    apiKeys: []
  })
  
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('password')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newIPAddress, setNewIPAddress] = useState('')
  const [newAPIKeyName, setNewAPIKeyName] = useState('')

  // Load security settings on component mount
  useEffect(() => {
    loadSecuritySettings()
  }, [])

  const loadSecuritySettings = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate loading security settings
      setSecurity({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: true,
        loginNotifications: true,
        sessionTimeout: 30,
        allowedIPs: ['192.168.1.100', '10.0.0.50'],
        trustedDevices: [
          { id: 1, name: 'MacBook Pro', lastUsed: '2023-12-15', location: 'New York, NY' },
          { id: 2, name: 'iPhone 14', lastUsed: '2023-12-14', location: 'New York, NY' },
          { id: 3, name: 'Windows Desktop', lastUsed: '2023-12-10', location: 'Boston, MA' }
        ],
        apiKeys: [
          { id: 1, name: 'Mobile App', key: 'sk_live_...abc123', created: '2023-11-01', lastUsed: '2023-12-15' },
          { id: 2, name: 'Integration API', key: 'sk_live_...def456', created: '2023-10-15', lastUsed: '2023-12-12' }
        ]
      })
      
      // console.log('Security settings loaded')
    } catch (error) {
      console.error('Error loading security settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setSecurity(prev => ({
      ...prev,
      [field]: value
    }))
    setSaved(false)
  }

  const changePassword = async () => {
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      alert('Please fill in all password fields')
      return
    }
    
    if (security.newPassword !== security.confirmPassword) {
      alert('New passwords do not match')
      return
    }
    
    if (security.newPassword.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      // console.log('Password changed successfully')
      
      // Clear password fields
      setSecurity(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }))
      
      alert('Password changed successfully!')
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Error changing password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggle2FA = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newStatus = !security.twoFactorEnabled
      setSecurity(prev => ({ ...prev, twoFactorEnabled: newStatus }))
      
      // console.log(`Two-factor authentication ${newStatus ? 'enabled' : 'disabled'}`)
      alert(`Two-factor authentication ${newStatus ? 'enabled' : 'disabled'} successfully!`)
    } catch (error) {
      console.error('Error toggling 2FA:', error)
      alert('Error updating two-factor authentication. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const addIPAddress = () => {
    if (!newIPAddress) {
      alert('Please enter an IP address')
      return
    }
    
    // Basic IP validation
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    if (!ipRegex.test(newIPAddress)) {
      alert('Please enter a valid IP address')
      return
    }
    
    if (security.allowedIPs.includes(newIPAddress)) {
      alert('This IP address is already in the list')
      return
    }
    
    setSecurity(prev => ({
      ...prev,
      allowedIPs: [...prev.allowedIPs, newIPAddress]
    }))
    setNewIPAddress('')
    setSaved(false)
  }

  const removeIPAddress = (ip) => {
    setSecurity(prev => ({
      ...prev,
      allowedIPs: prev.allowedIPs.filter(allowedIP => allowedIP !== ip)
    }))
    setSaved(false)
  }

  const removeTrustedDevice = (deviceId) => {
    if (window.confirm('Are you sure you want to remove this trusted device?')) {
      setSecurity(prev => ({
        ...prev,
        trustedDevices: prev.trustedDevices.filter(device => device.id !== deviceId)
      }))
      setSaved(false)
    }
  }

  const generateAPIKey = async () => {
    if (!newAPIKeyName) {
      alert('Please enter a name for the API key')
      return
    }
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newKey = {
        id: Date.now(),
        name: newAPIKeyName,
        key: `sk_live_${Math.random().toString(36).substring(2, 15)}`,
        created: new Date().toISOString().split('T')[0],
        lastUsed: 'Never'
      }
      
      setSecurity(prev => ({
        ...prev,
        apiKeys: [...prev.apiKeys, newKey]
      }))
      
      setNewAPIKeyName('')
      setSaved(false)
      alert('API key generated successfully!')
    } catch (error) {
      console.error('Error generating API key:', error)
      alert('Error generating API key. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const revokeAPIKey = (keyId) => {
    if (window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      setSecurity(prev => ({
        ...prev,
        apiKeys: prev.apiKeys.filter(key => key.id !== keyId)
      }))
      setSaved(false)
    }
  }

  const saveSecuritySettings = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      // console.log('Security settings saved:', security)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving security settings:', error)
      alert('Error saving security settings. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetSecuritySettings = () => {
    if (window.confirm('Are you sure you want to reset security settings to defaults?')) {
      loadSecuritySettings()
    }
  }

  const tabs = [
    { id: 'password', name: 'Password', icon: '🔒' },
    { id: 'authentication', name: 'Authentication', icon: '🛡️' },
    { id: 'access', name: 'Access Control', icon: '🌐' },
    { id: 'devices', name: 'Trusted Devices', icon: '📱' },
    { id: 'api', name: 'API Keys', icon: '🔑' }
  ]

  const sessionTimeouts = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
    { value: 240, label: '4 hours' },
    { value: 480, label: '8 hours' }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Security Settings
              </h1>
              <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your account security and access controls
              </p>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className={`px-4 py-2 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Back to Settings
            </button>
          </div>

          {/* Security Overview */}
          <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} shadow rounded-lg mb-6`}>
            <div className="px-6 py-4">
              <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                Security Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      security.twoFactorEnabled ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Two-Factor Authentication
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Trusted Devices
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {security.trustedDevices.length} devices
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      API Keys
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {security.apiKeys.length} active keys
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
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
              {/* Password Tab */}
              {activeTab === 'password' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Change Password
                    </h3>
                    
                    <div className="max-w-md space-y-4">
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={security.currentPassword}
                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                            className={`w-full px-3 py-2 pr-10 border rounded-md transition-colors ${
                              theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                              theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {showCurrentPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={security.newPassword}
                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                            className={`w-full px-3 py-2 pr-10 border rounded-md transition-colors ${
                              theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                              theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {showNewPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                        <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Must be at least 8 characters long
                        </p>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={security.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className={`w-full px-3 py-2 pr-10 border rounded-md transition-colors ${
                              theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                              theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {showConfirmPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={changePassword}
                        disabled={loading}
                        className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center ${
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
                        {loading ? 'Changing Password...' : 'Change Password'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Authentication Tab */}
              {activeTab === 'authentication' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Authentication Settings
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Two-Factor Authentication */}
                      <div className={`p-4 border rounded-lg ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              Two-Factor Authentication
                            </h4>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <button
                            onClick={toggle2FA}
                            disabled={loading}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              security.twoFactorEnabled ? 'bg-blue-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      
                      {/* Login Notifications */}
                      <div className={`p-4 border rounded-lg ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              Login Notifications
                            </h4>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              Get notified when someone logs into your account
                            </p>
                          </div>
                          <button
                            onClick={() => handleInputChange('loginNotifications', !security.loginNotifications)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              security.loginNotifications ? 'bg-blue-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                security.loginNotifications ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      
                      {/* Session Timeout */}
                      <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Session Timeout
                        </label>
                        <select
                          value={security.sessionTimeout}
                          onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                          className={`w-full max-w-xs px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        >
                          {sessionTimeouts.map(timeout => (
                            <option key={timeout.value} value={timeout.value}>{timeout.label}</option>
                          ))}
                        </select>
                        <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Automatically log out after this period of inactivity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Access Control Tab */}
              {activeTab === 'access' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      IP Address Restrictions
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newIPAddress}
                          onChange={(e) => setNewIPAddress(e.target.value)}
                          placeholder="192.168.1.100"
                          className={`flex-1 px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        <button
                          onClick={addIPAddress}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                        >
                          Add IP
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        {security.allowedIPs.map((ip, index) => (
                          <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${
                            theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                          }`}>
                            <span className={`font-mono text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {ip}
                            </span>
                            <button
                              onClick={() => removeIPAddress(ip)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        
                        {security.allowedIPs.length === 0 && (
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center py-4`}>
                            No IP restrictions configured. Access allowed from any IP address.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trusted Devices Tab */}
              {activeTab === 'devices' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Trusted Devices
                    </h3>
                    
                    <div className="space-y-4">
                      {security.trustedDevices.map((device) => (
                        <div key={device.id} className={`p-4 border rounded-lg ${
                          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {device.name}
                              </h4>
                              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Last used: {device.lastUsed} • {device.location}
                              </p>
                            </div>
                            <button
                              onClick={() => removeTrustedDevice(device.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {security.trustedDevices.length === 0 && (
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center py-4`}>
                          No trusted devices configured.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* API Keys Tab */}
              {activeTab === 'api' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                      API Keys
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newAPIKeyName}
                          onChange={(e) => setNewAPIKeyName(e.target.value)}
                          placeholder="API Key Name"
                          className={`flex-1 px-3 py-2 border rounded-md transition-colors ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        <button
                          onClick={generateAPIKey}
                          disabled={loading}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            loading
                              ? 'bg-blue-400 text-white cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          Generate Key
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {security.apiKeys.map((key) => (
                          <div key={key.id} className={`p-4 border rounded-lg ${
                            theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {key.name}
                              </h4>
                              <button
                                onClick={() => revokeAPIKey(key.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                              >
                                Revoke
                              </button>
                            </div>
                            <div className={`font-mono text-sm p-2 rounded bg-gray-100 ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'text-gray-700'}`}>
                              {key.key}
                            </div>
                            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              Created: {key.created} • Last used: {key.lastUsed}
                            </p>
                          </div>
                        ))}
                        
                        {security.apiKeys.length === 0 && (
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center py-4`}>
                            No API keys generated.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {activeTab !== 'password' && (
              <div className={`px-6 py-4 bg-gray-50 ${theme === 'dark' ? 'bg-gray-750' : ''} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex justify-between`}>
                <button
                  onClick={resetSecuritySettings}
                  disabled={loading}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    loading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Reset Settings
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
                    onClick={saveSecuritySettings}
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecuritySettingsPage