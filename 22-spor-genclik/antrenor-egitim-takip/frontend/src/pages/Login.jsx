import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-cyan-400 via-blue-200 to-blue-600 overflow-hidden">
      {/* Flu arka plan görseli */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm z-0" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80)'}}></div>
      <div className="relative z-10 max-w-md w-full mx-auto">
        <div className="bg-white/90 rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
            Giriş Yap
          </h2>
          <p className="mb-6 text-gray-500 text-center text-base">
            Antrenör Eğitim Takip Sistemine hoş geldiniz
          </p>
          {/* Hata mesajı */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full mb-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}
          {/* Form */}
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input pl-10 py-3 rounded-xl border-2 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition w-full bg-white"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>
              {/* Şifre */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-cyan-400" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input pl-10 pr-10 py-3 rounded-xl border-2 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition w-full bg-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-cyan-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-cyan-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/* Giriş butonu */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-2"></div>
                  Giriş yapılıyor...
                </div>
              ) : (
                'Giriş Yap'
              )}
            </button>
            {/* Alt linkler */}
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-sm text-cyan-600 hover:underline font-medium"
              >
                Hesabınız yok mu? Kayıt olun
              </button>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-gray-500 hover:underline"
              >
                Şifrenizi mi unuttunuz?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 