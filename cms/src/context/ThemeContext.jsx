import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Initial state
const initialState = {
  theme: localStorage.getItem('cms_theme') || 'light',
  sidebarCollapsed: localStorage.getItem('cms_sidebar_collapsed') === 'true',
  preferences: {
    animations: localStorage.getItem('cms_animations') !== 'false',
    notifications: localStorage.getItem('cms_notifications') !== 'false',
    autoSave: localStorage.getItem('cms_autosave') !== 'false',
    compactMode: localStorage.getItem('cms_compact_mode') === 'true',
  },
}

// Action types
const THEME_ACTIONS = {
  SET_THEME: 'SET_THEME',
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_SIDEBAR_COLLAPSED: 'SET_SIDEBAR_COLLAPSED',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  RESET_PREFERENCES: 'RESET_PREFERENCES',
}

// Reducer
function themeReducer(state, action) {
  switch (action.type) {
    case THEME_ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    case THEME_ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    case THEME_ACTIONS.SET_SIDEBAR_COLLAPSED:
      return {
        ...state,
        sidebarCollapsed: action.payload,
      }
    case THEME_ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      }
    case THEME_ACTIONS.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      }
    case THEME_ACTIONS.RESET_PREFERENCES:
      return {
        ...state,
        preferences: {
          animations: true,
          notifications: true,
          autoSave: true,
          compactMode: false,
        },
      }
    default:
      return state
  }
}

// Create context
const ThemeContext = createContext()

// Provider component
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  // Persist theme changes to localStorage
  useEffect(() => {
    localStorage.setItem('cms_theme', state.theme)
    document.documentElement.setAttribute('data-theme', state.theme)
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        state.theme === 'dark' ? '#0f172a' : '#ffffff'
      )
    }
  }, [state.theme])

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem('cms_sidebar_collapsed', state.sidebarCollapsed.toString())
  }, [state.sidebarCollapsed])

  // Persist preferences
  useEffect(() => {
    Object.entries(state.preferences).forEach(([key, value]) => {
      localStorage.setItem(`cms_${key.toLowerCase()}`, value.toString())
    })
  }, [state.preferences])

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const hasManualPreference = localStorage.getItem('cms_theme')
      if (!hasManualPreference) {
        dispatch({
          type: THEME_ACTIONS.SET_THEME,
          payload: e.matches ? 'dark' : 'light',
        })
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Set theme
  const setTheme = (theme) => {
    dispatch({ type: THEME_ACTIONS.SET_THEME, payload: theme })
  }

  // Toggle theme
  const toggleTheme = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_THEME })
  }

  // Set sidebar collapsed state
  const setSidebarCollapsed = (collapsed) => {
    dispatch({ type: THEME_ACTIONS.SET_SIDEBAR_COLLAPSED, payload: collapsed })
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_SIDEBAR })
  }

  // Update preferences
  const updatePreferences = (preferences) => {
    dispatch({ type: THEME_ACTIONS.UPDATE_PREFERENCES, payload: preferences })
  }

  // Reset preferences to defaults
  const resetPreferences = () => {
    dispatch({ type: THEME_ACTIONS.RESET_PREFERENCES })
    
    // Clear localStorage
    localStorage.removeItem('cms_animations')
    localStorage.removeItem('cms_notifications')
    localStorage.removeItem('cms_autosave')
    localStorage.removeItem('cms_compact_mode')
  }

  // Get CSS custom properties for current theme
  const getThemeColors = () => {
    const isDark = state.theme === 'dark'
    return {
      primary: isDark ? '#3b82f6' : '#2563eb',
      secondary: isDark ? '#64748b' : '#475569',
      background: isDark ? '#0f172a' : '#ffffff',
      surface: isDark ? '#1e293b' : '#f8fafc',
      text: isDark ? '#f1f5f9' : '#1e293b',
      border: isDark ? '#334155' : '#e2e8f0',
    }
  }

  // Check if animations are enabled
  const animationsEnabled = () => {
    return state.preferences.animations && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  // Get responsive breakpoint
  const getBreakpoint = () => {
    const width = window.innerWidth
    if (width < 640) return 'sm'
    if (width < 768) return 'md'
    if (width < 1024) return 'lg'
    if (width < 1280) return 'xl'
    return '2xl'
  }

  // Check if mobile device
  const isMobile = () => {
    return window.innerWidth < 768
  }

  // Check if tablet device
  const isTablet = () => {
    return window.innerWidth >= 768 && window.innerWidth < 1024
  }

  // Check if desktop device
  const isDesktop = () => {
    return window.innerWidth >= 1024
  }

  const value = {
    // State
    theme: state.theme,
    sidebarCollapsed: state.sidebarCollapsed,
    preferences: state.preferences,
    
    // Theme actions
    setTheme,
    toggleTheme,
    
    // Sidebar actions
    setSidebarCollapsed,
    toggleSidebar,
    
    // Preferences actions
    updatePreferences,
    resetPreferences,
    
    // Utility functions
    getThemeColors,
    animationsEnabled,
    getBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext