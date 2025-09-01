import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useTheme } from './context/ThemeContext'

// Layout Components
import Layout from './components/layout/Layout'
import AuthLayout from './components/layout/AuthLayout'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'

// Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage'
import AnalyticsPage from './pages/dashboard/AnalyticsPage'

// Content Management Pages
import ContentListPage from './pages/content/ContentListPage'
import ContentCreatePage from './pages/content/ContentCreatePage'
import ContentEditPage from './pages/content/ContentEditPage'
import ContentPreviewPage from './pages/content/ContentPreviewPage'

// User Management Pages
import UsersListPage from './pages/users/UsersListPage'
import UserCreatePage from './pages/users/UserCreatePage'
import UserEditPage from './pages/users/UserEditPage'
import UserProfilePage from './pages/users/UserProfilePage'

// Service Management Pages
import ServicesListPage from './pages/services/ServicesListPage'
import ServiceCreatePage from './pages/services/ServiceCreatePage'
import ServiceEditPage from './pages/services/ServiceEditPage'

// Contact Management Pages
import ContactListPage from './pages/contact/ContactListPage'
import ContactDetailPage from './pages/contact/ContactDetailPage'

// File Management Pages
import FileManagerPage from './pages/files/FileManagerPage'
import UploadPage from './pages/files/UploadPage'

// Settings Pages
import SettingsPage from './pages/settings/SettingsPage'
import ProfileSettingsPage from './pages/settings/ProfileSettingsPage'
import SecuritySettingsPage from './pages/settings/SecuritySettingsPage'

// Radiologist Pages
import RadiologistApplicationsPage from './pages/radiologist/RadiologistApplicationsPage'

// Sales Pages
import SalesLeadsPage from './pages/sales/SalesLeadsPage'

// Error Pages
import NotFoundPage from './pages/error/NotFoundPage'
import UnauthorizedPage from './pages/error/UnauthorizedPage'

// Components
import LoadingSpinner from './components/ui/LoadingSpinner'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const { user, loading } = useAuth()
  const { theme } = useTheme()

  // Apply theme to document
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route index element={<Navigate to="login" replace />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />

          {/* Content Management */}
          <Route path="content">
            <Route index element={<ContentListPage />} />
            <Route path="create" element={<ContentCreatePage />} />
            <Route path="edit/:id" element={<ContentEditPage />} />
            <Route path="preview/:id" element={<ContentPreviewPage />} />
          </Route>

          {/* User Management */}
          <Route path="users">
            <Route index element={<UsersListPage />} />
            <Route path="create" element={<UserCreatePage />} />
            <Route path="edit/:id" element={<UserEditPage />} />
            <Route path="profile/:id" element={<UserProfilePage />} />
          </Route>

          {/* Service Management */}
          <Route path="services">
            <Route index element={<ServicesListPage />} />
            <Route path="create" element={<ServiceCreatePage />} />
            <Route path="edit/:id" element={<ServiceEditPage />} />
          </Route>

          {/* Contact Management */}
          <Route path="contacts">
            <Route index element={<ContactListPage />} />
            <Route path="detail/:id" element={<ContactDetailPage />} />
          </Route>

          {/* File Management */}
          <Route path="files">
            <Route index element={<FileManagerPage />} />
            <Route path="upload" element={<UploadPage />} />
          </Route>

          {/* Settings */}
          <Route path="settings">
            <Route index element={<SettingsPage />} />
            <Route path="profile" element={<ProfileSettingsPage />} />
            <Route path="security" element={<SecuritySettingsPage />} />
          </Route>

          {/* Radiologist Applications */}
          <Route path="radiologist-applications" element={<RadiologistApplicationsPage />} />

          {/* Sales Leads */}
          <Route path="sales-leads" element={<SalesLeadsPage />} />

          {/* Error Pages */}
          <Route path="unauthorized" element={<UnauthorizedPage />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App