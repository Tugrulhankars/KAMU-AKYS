import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AkLogo from '../assets/Ak_dark.png';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src={AkLogo} 
            alt="KAMU-AKYS Logo" 
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold text-gray-800">
            Anket Yönetimi
          </span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Anketler
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Hakkımızda
          </Link>
          {user ? (
            <>
              <Link
                to="/groups"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Gruplarım
              </Link>
              <Link
                to="/groups/join"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Gruba Katıl
              </Link>
              <Link
                to="/surveys/new"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Yeni Anket Oluştur
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Hoş geldiniz!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Kayıt Ol
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 