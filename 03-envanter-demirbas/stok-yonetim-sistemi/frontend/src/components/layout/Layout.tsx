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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar text-white shadow-2xl rounded-tr-3xl rounded-br-3xl py-8 px-4">
        <div className="flex items-center mb-10 px-2">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <CubeIcon className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-2xl font-extrabold tracking-wide">StokPanel</span>
        </div>
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            if (!hasPermission(item.allowedRoles)) return null;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-150
                  ${isCurrentPath(item.href)
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'text-gray-300 hover:bg-primary/20 hover:text-white'}
                `}
              >
                <item.icon className={`h-7 w-7 ${isCurrentPath(item.href) ? 'text-white' : 'text-primary/70'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-2 px-2">
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger text-white font-bold hover:bg-danger/80 transition">
            <ArrowRightOnRectangleIcon className="h-6 w-6" /> Çıkış Yap
          </button>
          <div className="flex items-center gap-2 mt-4">
            <UserCircleIcon className="h-7 w-7 text-primary" />
            <span className="text-base font-medium">{user?.fullName}</span>
          </div>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 h-20 flex items-center bg-white shadow-card px-8">
          <button
            type="button"
            className="lg:hidden mr-4 text-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-7 w-7" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">{navigation.find(n => isCurrentPath(n.href))?.name || 'Panel'}</h1>
        </header>
        {/* Content area */}
        <main className="flex-1 bg-background p-8 rounded-tl-3xl">
          {children}
        </main>
      </div>
      {/* Mobile sidebar (aynı şekilde güncellenmeli) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-sidebar text-white shadow-2xl rounded-tr-3xl rounded-br-3xl py-8 px-4 flex flex-col">
            <div className="flex items-center mb-10 px-2">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <CubeIcon className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-extrabold tracking-wide">StokPanel</span>
            </div>
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => {
                if (!hasPermission(item.allowedRoles)) return null;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-150
                      ${isCurrentPath(item.href)
                        ? 'bg-primary text-white shadow-md scale-105'
                        : 'text-gray-300 hover:bg-primary/20 hover:text-white'}
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className={`h-7 w-7 ${isCurrentPath(item.href) ? 'text-white' : 'text-primary/70'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-2 px-2">
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger text-white font-bold hover:bg-danger/80 transition">
                <ArrowRightOnRectangleIcon className="h-6 w-6" /> Çıkış Yap
              </button>
              <div className="flex items-center gap-2 mt-4">
                <UserCircleIcon className="h-7 w-7 text-primary" />
                <span className="text-base font-medium">{user?.fullName}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Layout; 