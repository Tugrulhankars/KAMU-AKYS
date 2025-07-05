import { useThemeStore } from '@/store/themeStore'
import { useEffect } from 'react'

export function useTheme() {
  const { theme, setTheme, getSystemTheme } = useThemeStore()

  useEffect(() => {
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        const systemTheme = getSystemTheme()
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(systemTheme)
      }
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    // İlk yükleme sırasında doğru temayı uygula
    handleSystemThemeChange()

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme, getSystemTheme])

  return {
    theme,
    setTheme,
    systemTheme: getSystemTheme(),
  }
} 