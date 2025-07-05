import { useEffect } from 'react'
import { useTheme } from '@/hooks/use-theme'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    
    root.classList.remove('light', 'dark')
    
    if (theme === 'system') {
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme, systemTheme])

  return <>{children}</>
} 