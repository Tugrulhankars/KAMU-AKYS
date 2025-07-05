import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'system':
        return <Monitor className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  const getTitle = () => {
    switch (theme) {
      case 'light':
        return 'Açık tema'
      case 'dark':
        return 'Koyu tema'
      case 'system':
        return 'Sistem teması'
      default:
        return 'Tema değiştir'
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      title={getTitle()}
      className="relative"
    >
      {getIcon()}
    </Button>
  )
} 