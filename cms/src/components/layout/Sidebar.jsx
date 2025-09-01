import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  CogIcon,
  EnvelopeIcon,
  PhotoIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../utils/cn'

const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar } = useTheme()
  const { user, hasPermission } = useAuth()
  const location = useLocation()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      permission: null,
    },
    {
      name: 'Content',
      href: '/content',
      icon: DocumentTextIcon,
      permission: 'content.read',
    },
    {
      name: 'Users',
      href: '/users',
      icon: UsersIcon,
      permission: 'users.read',
    },
    {
      name: 'Services',
      href: '/services',
      icon: CogIcon,
      permission: 'services.read',
    },
    {
      name: 'Contacts',
      href: '/contacts',
      icon: EnvelopeIcon,
      permission: 'contacts.read',
    },
    {
      name: 'Files',
      href: '/files',
      icon: PhotoIcon,
      permission: 'files.read',
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: ChartBarIcon,
      permission: 'analytics.read',
    },
    {
      name: 'Radiologist Applications',
      href: '/radiologist-applications',
      icon: UserGroupIcon,
      permission: 'radiologist.read',
    },
    {
      name: 'Sales Leads',
      href: '/sales-leads',
      icon: BuildingOfficeIcon,
      permission: 'sales.read',
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Cog6ToothIcon,
      permission: 'settings.read',
    },
  ]

  // Filter navigation items based on permissions
  const filteredNavigation = navigationItems.filter(
    (item) => !item.permission || hasPermission(item.permission)
  )

  const isActiveRoute = (href) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">CMS</span>
          </div>
        )}
        
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const Icon = item.icon
          const isActive = isActiveRoute(item.href)
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                isActive
                  ? 'bg-primary-100 text-primary-900 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <Icon
                className={cn(
                  'flex-shrink-0 w-5 h-5 transition-colors duration-200',
                  isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500',
                  sidebarCollapsed ? 'mx-auto' : 'mr-3'
                )}
              />
              {!sidebarCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* User Info */}
      {!sidebarCollapsed && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user?.firstName?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role || 'User'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar