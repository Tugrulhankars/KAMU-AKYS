import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Menu, X, User, LogOut, BarChart3, Users, Home, Settings } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAdmin, isOfficer } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Ana Sayfa', href: '/', icon: Home, show: true },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, show: true },
    { name: 'İstatistikler', href: '/statistics', icon: BarChart3, show: true },
    { name: 'Admin Panel', href: '/admin', icon: Settings, show: isAdmin },
    { name: 'Görevli Panel', href: '/officer', icon: Users, show: isOfficer && !isAdmin },
    { name: 'Gözlemci Panel', href: '/viewer', icon: BarChart3, show: !isAdmin && !isOfficer },
  ]

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const isCurrentPath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BarChart3 className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Nüfus Sayım
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => 
              item.show ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isCurrentPath(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              ) : null
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <User className="h-4 w-4 mr-2" />
                <span className="font-medium">{user?.username}</span>
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => 
              item.show ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isCurrentPath(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ) : null
            )}

            {/* Mobile User Info */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center px-3 py-2">
                <User className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-base font-medium text-gray-900">{user?.username}</div>
                  <div className="text-sm text-gray-500">{user?.role}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 