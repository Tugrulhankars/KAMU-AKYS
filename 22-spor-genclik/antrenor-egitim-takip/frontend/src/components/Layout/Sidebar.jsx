import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Award,
  BarChart3,
  User,
  Settings,
  Activity,
  FileText,
  Shield
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['Admin', 'Yonetici', 'Antrenor']
  },
  {
    title: 'Antrenörler',
    path: '/antrenorler',
    icon: <Users className="w-5 h-5" />,
    roles: ['Admin', 'Yonetici']
  },
  {
    title: 'Eğitimler',
    path: '/egitimler',
    icon: <GraduationCap className="w-5 h-5" />,
    roles: ['Admin', 'Yonetici', 'Antrenor']
  },
  {
    title: 'Sertifikalar',
    path: '/sertifikalar',
    icon: <Award className="w-5 h-5" />,
    roles: ['Admin', 'Yonetici', 'Antrenor']
  },
  {
    title: 'Performans',
    path: '/performans',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['Admin', 'Yonetici', 'Antrenor']
  },
  {
    title: 'Sporcular',
    path: '/sporcular',
    icon: <Activity className="w-5 h-5" />,
    roles: ['Admin', 'Yonetici', 'Antrenor']
  },
  {
    title: 'Raporlar',
    path: '/raporlar',
    icon: <FileText className="w-5 h-5" />,
    roles: ['Admin', 'Yonetici']
  },
  {
    title: 'Kullanıcı Yönetimi',
    path: '/kullanicilar',
    icon: <Shield className="w-5 h-5" />,
    roles: ['Admin']
  }
];

const Sidebar = ({ open, onClose, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  const sidebarContent = (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Logo ve başlık */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Antrenör Eğitim
            </h2>
            <p className="text-sm text-gray-500">
              Yönetim Sistemi
            </p>
          </div>
        </div>
      </div>

      {/* Ana menü */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`w-full sidebar-item ${
              isActive(item.path) ? 'sidebar-item-active' : ''
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.title}</span>
          </button>
        ))}
      </nav>

      {/* Alt menü */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => handleNavigation('/profile')}
          className={`w-full sidebar-item ${
            isActive('/profile') ? 'sidebar-item-active' : ''
          }`}
        >
          <User className="w-5 h-5" />
          <span className="ml-3">Profil</span>
        </button>

        <button
          onClick={() => handleNavigation('/settings')}
          className={`w-full sidebar-item ${
            isActive('/settings') ? 'sidebar-item-active' : ''
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="ml-3">Ayarlar</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full z-40">
        <div className="pt-16">{/* Header için boşluk */}</div>
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full">
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default Sidebar; 