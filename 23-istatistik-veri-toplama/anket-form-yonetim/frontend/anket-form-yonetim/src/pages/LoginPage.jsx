import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Giriş Yap</h1>
      <LoginForm />
      <p className="text-center text-gray-600 mt-4">
        Hesabınız yok mu? <Link to="/register" className="text-blue-600 hover:underline">Kayıt Olun</Link>
      </p>
    </div>
  );
};

export default LoginPage; 