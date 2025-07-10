import React, { useState } from 'react';
import {
  Menu,
  User,
  LogOut,
  Settings,
  Bell,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout, onToggleSidebar }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    onLogout();
  };

  const handleProfile = () => {
    setIsProfileMenuOpen(false);
    navigate('/profile');
  };

  const handleSettings = () => {
    setIsProfileMenuOpen(false);
    navigate('/settings');
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-error-100 text-error-800 border-error-200';
      case 'Yonetici':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'Antrenor':
        return 'bg-success-100 text-success-800 border-success-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Sol taraf - Menü butonu ve başlık */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Antrenör Eğitim Takip Sistemi
            </h1>
          </div>
        </div>

        {/* Sağ taraf - Kullanıcı bilgileri */}
        <div className="flex items-center space-x-4">
          {/* Bildirimler */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
          </button>

          {/* Arama */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {user ? (
            <div className="relative">
              {/* Kullanıcı bilgileri */}
              <div className="flex items-center space-x-3">
                {/* Rol badge */}
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
                
                {/* Kullanıcı adı */}
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user.fullName}
                </span>
                
                {/* Avatar */}
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="header-avatar hover:bg-primary-200 transition-colors"
                >
                  {user.fullName?.charAt(0)?.toUpperCase()}
                </button>
              </div>

              {/* Profil menüsü */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-large border border-gray-200 py-1 z-50">
                  <button
                    onClick={handleProfile}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profil
                  </button>
                  
                  <button
                    onClick={handleSettings}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Ayarlar
                  </button>
                  
                  <hr className="my-1 border-gray-200" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Giriş Yap
            </button>
          )}
        </div>
      </div>

      {/* Overlay - menü açıkken arka planı karart */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header; 