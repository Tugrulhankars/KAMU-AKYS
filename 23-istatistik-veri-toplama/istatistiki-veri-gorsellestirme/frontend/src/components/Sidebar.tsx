import React from 'react';
import { Home, BarChart2, Database, Users, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menu = [
  { name: 'Anasayfa', icon: <Home />, path: '/' },
  { name: 'Dashboard', icon: <BarChart2 />, path: '/dashboard' },
  { name: 'Veri Setleri', icon: <Database />, path: '/datasets' },
  { name: 'Kullanıcılar', icon: <Users />, path: '/users' },
  { name: 'Ayarlar', icon: <Settings />, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside className="sticky top-0 h-screen w-64 bg-white border-r shadow-sm flex flex-col py-6 px-4 space-y-4">
      <div className="mb-8 flex items-center gap-2 px-2">
        <BarChart2 className="h-7 w-7 text-blue-600" />
        <span className="text-xl font-bold text-gray-900 tracking-tight">İstatistik Portalı</span>
      </div>
      <nav className="flex-1 space-y-1">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors text-base
                ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
            >
              <span className={`transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto">
        <button className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors">
          <LogOut className="h-5 w-5" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 