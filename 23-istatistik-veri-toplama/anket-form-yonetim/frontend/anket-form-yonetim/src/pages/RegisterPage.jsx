import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Kayıt Ol</h1>
      <RegisterForm />
      <p className="text-center text-gray-600 mt-4">
        Zaten bir hesabınız var mı? <Link to="/login" className="text-blue-600 hover:underline">Giriş Yapın</Link>
      </p>
    </div>
  );
};

export default RegisterPage; 