import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { LoginData, ApiError } from '../types';
import { LogIn, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { authAPI } from '../services/api';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginData>();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      const apiError = error as ApiError;
      setError('root', { message: apiError.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="w-full max-w-md mx-auto mt-12 mb-8 flex flex-col items-center">
        <span className="text-blue-600 font-extrabold text-3xl tracking-tight mb-8">kamuveri</span>
        <div className="w-full bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <LogIn className="h-8 w-8 text-blue-600" /> Giriş Yap
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{errors.root.message}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
              <div className="relative">
                <input
                  {...register('email', { required: 'E-posta gereklidir' })}
                  type="email"
                  id="email"
                  className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E-posta adresiniz"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Şifre gereklidir' })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Şifre"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <LogIn className="h-5 w-5" /> {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
          <div className="mt-6 text-center text-gray-500 text-sm">
            Hesabınız yok mu?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">Kayıt Ol</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 