import React from 'react'
import { cn } from '../../utils/cn'

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  className,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  const colorClasses = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    success: 'border-success-600',
    warning: 'border-warning-600',
    danger: 'border-danger-600',
    white: 'border-white',
    gray: 'border-gray-600',
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300',
        `border-t-${colorClasses[color] || colorClasses.primary}`,
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner