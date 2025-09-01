import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../utils/cn'

const Layout = () => {
  const { sidebarCollapsed, theme } = useTheme()

  return (
    <div className={cn('min-h-screen bg-gray-50', theme === 'dark' && 'dark')}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout