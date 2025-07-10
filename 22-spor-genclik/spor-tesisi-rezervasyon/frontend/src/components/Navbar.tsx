import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCircle, LogOut, LogIn, UserPlus } from 'lucide-react';
import AkLogo from '../assets/Ak.png';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={AkLogo} alt="KAMU-AKYS Logo" className="h-8 w-auto" />
              <span className="text-xl font-semibold text-gray-900">
                Spor Tesisi
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              // Kullanıcı giriş yapmışsa
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <UserCircle className="w-5 h-5" />
                  <span>{user?.fullName}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Çıkış</span>
                </button>
              </>
            ) : (
              // Kullanıcı giriş yapmamışsa
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Giriş</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Kayıt Ol</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 