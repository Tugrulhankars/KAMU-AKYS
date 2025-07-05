import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ProtectedRouteProps, UserRole } from '../../types';
import Loading from './Loading';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Loading durumunda spinner göster
  if (isLoading) {
    return <Loading size="lg" text="Yetkilendiriliyor..." />;
  }

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Belirli roller gerekliyse kontrol et
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.includes(user.role);
    
    if (!hasRequiredRole) {
      // Yetkisiz erişim, dashboard'a yönlendir
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Kullanıcı aktif değilse erişim engelle
  if (!user.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Hesap Devre Dışı
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Hesabınız devre dışı bırakılmıştır. Lütfen yöneticinizle iletişime geçin.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  // Logout function'ını çağır
                  window.location.href = '/login';
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Giriş Sayfasına Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 