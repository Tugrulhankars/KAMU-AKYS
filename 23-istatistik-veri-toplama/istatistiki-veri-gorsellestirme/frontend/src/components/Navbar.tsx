import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo & App Name */}
        <div className="flex items-center gap-2">
          <span className="bg-white rounded-full p-1 shadow">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#2563eb"/><text x="16" y="21" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">IV</text></svg>
          </span>
          <span className="text-white text-2xl font-bold tracking-tight drop-shadow">İstatistik Portalı</span>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              <button onClick={handleLogout} className="text-white hover:bg-blue-700 rounded-full p-2 transition-colors">
                <LogOut className="h-6 w-6" />
              </button>
              <div className="ml-2 flex items-center gap-2">
                <span className="text-white font-medium hidden md:inline">{user?.username}</span>
                <span className="bg-white border-2 border-blue-600 rounded-full p-1">
                  <User className="h-7 w-7 text-blue-600" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar; 