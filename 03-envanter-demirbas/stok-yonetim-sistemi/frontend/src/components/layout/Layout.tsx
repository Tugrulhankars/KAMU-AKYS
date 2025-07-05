import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  ArrowsRightLeftIcon,
  UsersIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  allowedRoles?: UserRole[];
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Ürünler',
    href: '/products',
    icon: CubeIcon,
  },
  {
    name: 'Kategoriler',
    href: '/categories',
    icon: TagIcon,
  },
  {
    name: 'Stok İşlemleri',
    href: '/stock-transactions',
    icon: ArrowsRightLeftIcon,
  },
  {
    name: 'Kullanıcılar',
    href: '/users',
    icon: UsersIcon,
    allowedRoles: [UserRole.Admin],
  },
  // {
  //   name: 'Raporlar',
  //   href: '/reports',
  //   icon: ChartBarIcon,
  // },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const hasPermission = (allowedRoles?: UserRole[]) => {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    return user && allowedRoles.includes(user.role as UserRole);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'Yönetici';
      case 'DepoGorevlisi':
        return 'Depo Görevlisi';
      case 'IncelemeYetkilisi':
        return 'İnceleme Yetkilisi';
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
            <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <CubeIcon className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-lg font-semibold text-gray-900">Stok Yönetim</span>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => {
                if (!hasPermission(item.allowedRoles)) return null;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isCurrentPath(item.href)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`${
                        isCurrentPath(item.href) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 h-6 w-6`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
          <div className="flex h-16 shrink-0 items-center px-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <CubeIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">Stok Yönetim</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              if (!hasPermission(item.allowedRoles)) return null;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isCurrentPath(item.href)
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors`}
                >
                  <item.icon
                    className={`${
                      isCurrentPath(item.href) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-6 w-6`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              {/* Breadcrumb or page title could go here */}
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* User menu */}
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.role && getRoleLabel(user.role.toString())}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gray-500"
                      title="Ayarlar"
                      onClick={() => navigate('/profile')}
                    >
                      <Cog6ToothIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gray-500"
                      onClick={handleLogout}
                      title="Çıkış Yap"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 