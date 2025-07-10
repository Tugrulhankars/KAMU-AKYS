import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Şifremi Unuttum
        </h2>
        <p className="text-gray-600 mb-8">
          Bu sayfa yakında eklenecek.
        </p>
        <Link
          to="/login"
          className="btn-primary"
        >
          Giriş Sayfasına Dön
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 