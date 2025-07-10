import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Gamepad2, 
  Building2, 
  UserCheck,
  Home
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Anasayfa',
      icon: Home,
      path: '/',
      description: 'Ana sayfa'
    },
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      description: 'Genel bakış'
    },
    {
      name: 'Müsabakalar',
      icon: Trophy,
      path: '/competitions',
      description: 'Müsabaka yönetimi'
    },
    {
      name: 'Katılımcılar',
      icon: Users,
      path: '/participants',
      description: 'Katılımcı takibi'
    },
    {
      name: 'Maçlar',
      icon: Gamepad2,
      path: '/matches',
      description: 'Maç organizasyonu'
    },
    {
      name: 'Tesisler',
      icon: Building2,
      path: '/venues',
      description: 'Tesis yönetimi'
    },
    {
      name: 'Kullanıcılar',
      icon: UserCheck,
      path: '/users',
      description: 'Kullanıcı yönetimi'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Trophy className="h-8 w-8 text-blue-600" />
          <span className="text-lg font-bold text-gray-900">
            KAMU-AKYS
          </span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={item.description}
              >
                <Icon 
                  className={`h-5 w-5 ${
                    isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'
                  }`} 
                />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* KAMU-AKYS Badge */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <div className="text-xs text-blue-600 font-semibold mb-1">
              KAMU-AKYS
            </div>
            <div className="text-xs text-blue-500">
              Spor Müsabaka Organizasyonu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 