import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  getSystemTheme: () => 'light' | 'dark'
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme, get().getSystemTheme())
      },
      getSystemTheme: () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme, state.getSystemTheme())
        }
      },
    }
  )
)

function applyTheme(theme: Theme, systemTheme: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  
  if (theme === 'system') {
    root.classList.add(systemTheme)
  } else {
    root.classList.add(theme)
  }
}

// System theme değişikliklerini dinle
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const store = useThemeStore.getState()
    if (store.theme === 'system') {
      applyTheme('system', e.matches ? 'dark' : 'light')
    }
  })
} 