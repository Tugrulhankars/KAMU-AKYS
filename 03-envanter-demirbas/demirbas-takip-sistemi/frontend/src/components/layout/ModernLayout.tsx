import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { UserRole } from '../../types'
import {
  Home,
  Package,
  Layers,
  Users,
  ClipboardList,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const ModernLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, hasRole } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { 
      name: 'Ana Sayfa', 
      href: '/dashboard', 
      icon: Home, 
      current: location.pathname === '/dashboard' 
    },
    { 
      name: 'Demirbaşlar', 
      href: '/dashboard/assets', 
      icon: Package, 
      current: location.pathname.startsWith('/dashboard/assets') 
    },
    { 
      name: 'Kategoriler', 
      href: '/dashboard/categories', 
      icon: Layers, 
      current: location.pathname.startsWith('/dashboard/categories') 
    },
    { 
      name: 'Zimmet İşlemleri', 
      href: '/dashboard/assignments', 
      icon: ClipboardList, 
      current: location.pathname.startsWith('/dashboard/assignments') 
    },
  ]

  const adminNavigation = [
    { 
      name: 'Kullanıcı Yönetimi', 
      href: '/dashboard/users', 
      icon: Users, 
      current: location.pathname.startsWith('/dashboard/users') 
    },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out md:hidden",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">Demirbaş</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <SidebarContent 
          navigation={navigation} 
          adminNavigation={adminNavigation} 
          hasRole={hasRole}
          onNavigate={() => setSidebarOpen(false)}
        />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Card className="h-full rounded-none border-l-0 border-t-0 border-b-0">
            <CardContent className="p-0">
              <div className="flex items-center space-x-2 p-6 border-b">
                <Package className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-bold">Demirbaş</h1>
              </div>
              <SidebarContent 
                navigation={navigation} 
                adminNavigation={adminNavigation} 
                hasRole={hasRole}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <Card className="rounded-none border-l-0 border-t-0 border-r-0">
          <CardContent className="p-0">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <h2 className="text-xl font-semibold">Demirbaş Takip Sistemi</h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.role === UserRole.Admin ? 'Yönetici' : 'Personel'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    title="Çıkış yap"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

interface SidebarContentProps {
  navigation: any[]
  adminNavigation: any[]
  hasRole: (role: UserRole) => boolean
  onNavigate?: () => void
}

const SidebarContent: React.FC<SidebarContentProps> = ({ 
  navigation, 
  adminNavigation, 
  hasRole, 
  onNavigate 
}) => {
  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              item.current
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
        
        {hasRole(UserRole.Admin) && (
          <>
            <div className="border-t my-4" />
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Yönetici
            </div>
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  item.current
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </>
        )}
      </nav>
    </div>
  )
}

export default ModernLayout 