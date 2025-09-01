import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import {
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  CogIcon,
  EnvelopeIcon,
  PhotoIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { dashboardAPI } from '../utils/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState('7d')

  // Fetch dashboard stats
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery(['dashboard-stats'], dashboardAPI.getStats, {
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // Fetch analytics data
  const {
    data: analytics,
    isLoading: analyticsLoading,
  } = useQuery(
    ['dashboard-analytics', timeRange],
    () => dashboardAPI.getAnalytics({ timeRange }),
    {
      refetchInterval: 60000, // Refetch every minute
    }
  )

  // Fetch recent activity
  const {
    data: recentActivity,
    isLoading: activityLoading,
  } = useQuery(
    ['dashboard-activity'],
    () => dashboardAPI.getRecentActivity({ limit: 10 }),
    {
      refetchInterval: 30000,
    }
  )

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.data?.users?.total || 0,
      change: stats?.data?.users?.change || 0,
      icon: UsersIcon,
      color: 'bg-blue-500',
      href: '/users',
      subtitle: `${stats?.data?.users?.active || 0} active`,
    },
    {
      title: 'Sales Leads',
      value: stats?.data?.salesLeads?.total || 0,
      change: stats?.data?.salesLeads?.conversionRate || 0,
      icon: BriefcaseIcon,
      color: 'bg-green-500',
      href: '/sales-leads',
      subtitle: `${stats?.data?.salesLeads?.hot || 0} hot leads`,
    },
    {
      title: 'Radiologist Applications',
      value: stats?.data?.radiologistApplications?.total || 0,
      change: stats?.data?.radiologistApplications?.approvalRate || 0,
      icon: UserGroupIcon,
      color: 'bg-purple-500',
      href: '/radiologist-applications',
      subtitle: `${stats?.data?.radiologistApplications?.pending || 0} pending`,
    },
    {
      title: 'Revenue',
      value: `$${(stats?.data?.revenue?.total || 0).toLocaleString()}`,
      change: stats?.data?.salesLeads?.conversionRate || 0,
      icon: CurrencyDollarIcon,
      color: 'bg-emerald-500',
      href: '/sales-leads',
      subtitle: `${stats?.data?.revenue?.closedDeals || 0} deals closed`,
    },
    {
      title: 'Contact Messages',
      value: stats?.data?.contacts?.total || 0,
      change: stats?.data?.contacts?.resolutionRate || 0,
      icon: EnvelopeIcon,
      color: 'bg-orange-500',
      href: '/contacts',
      subtitle: `${stats?.data?.contacts?.new || 0} new messages`,
    },
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration':
        return UsersIcon
      case 'sales_lead':
        return BriefcaseIcon
      case 'radiologist_application':
        return UserGroupIcon
      case 'contact_inquiry':
        return EnvelopeIcon
      case 'content':
        return DocumentTextIcon
      case 'service':
        return CogIcon
      case 'file':
        return PhotoIcon
      default:
        return ChartBarIcon
    }
  }

  if (statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-sm text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (statsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Dashboard</h3>
            <p className="text-sm text-red-600">
              {statsError.message || 'Failed to load dashboard data'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.firstName || 'Admin'}!
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Here's what's happening with your platform today.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          const isPositive = card.change >= 0
          
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => window.location.href = card.href}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {typeof card.value === 'string' ? card.value : card.value.toLocaleString()}
                  </p>
                  {card.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                  )}
                  {card.change !== 0 && (
                    <div className="flex items-center mt-2">
                      {isPositive ? (
                        <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {Math.abs(card.change)}%
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                  )}
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
          </div>
          {analyticsLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  Analytics chart will be displayed here
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Integration with charting library needed
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          {activityLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity?.data?.activities?.length > 0 ? (
                recentActivity.data.activities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-gray-100 rounded-full">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-600">No recent activity</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button
            onClick={() => window.location.href = '/users'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <UsersIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Manage Users</span>
          </button>
          <button
            onClick={() => window.location.href = '/sales-leads'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <BriefcaseIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Sales Leads</span>
          </button>
          <button
            onClick={() => window.location.href = '/radiologist-applications'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <UserGroupIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Applications</span>
          </button>
          <button
            onClick={() => window.location.href = '/contacts'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <EnvelopeIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Contact Messages</span>
          </button>
          <button
            onClick={() => window.location.href = '/content'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <DocumentTextIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Content</span>
          </button>
          <button
            onClick={() => window.location.href = '/services'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <CogIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Services</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard