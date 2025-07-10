import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/app/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Arka plan dekorasyonu */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full opacity-20 blur-2xl -z-10 animate-pulse" style={{top: '-6rem', left: '-6rem'}}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-2xl -z-10 animate-pulse" style={{bottom: '-8rem', right: '-8rem'}}></div>
      <div className="max-w-md w-full space-y-8 z-10">
        <div>
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-white shadow-lg border-4 border-green-600">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Hesabınıza Giriş Yapın
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Veya{' '}
            <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
              yeni hesap oluşturun
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-2xl bg-white p-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-green-50"
                placeholder="E-posta adresi"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-green-50"
                placeholder="Şifre"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Giriş yapılıyor...
                </div>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </div>
        </form>
        {/* Güvenlik badge ve sosyal medya */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-2">
            <svg className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span className="font-medium">Verileriniz güvende</span>
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-green-400" title="Facebook"><svg width="20" height="20" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="#" className="hover:text-green-400" title="Twitter"><svg width="20" height="20" fill="currentColor"><path d="M20 4a8.1 8.1 0 0 1-2.36.65A4.1 4.1 0 0 0 19.45 2a8.19 8.19 0 0 1-2.6 1A4.1 4.1 0 0 0 9.85 7.03a11.65 11.65 0 0 1-8.45-4.29a4.1 4.1 0 0 0 1.27 5.47A4.07 4.07 0 0 1 1.64 7v.05a4.1 4.1 0 0 0 3.29 4.02a4.09 4.09 0 0 1-1.85.07a4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 17.54A11.62 11.62 0 0 0 8.29 19.5c7.55 0 11.68-6.26 11.68-11.68c0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 20 4z"/></svg></a>
            <a href="#" className="hover:text-green-400" title="Instagram"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="3.5"/><rect x="2" y="2" width="16" height="16" rx="5"/><circle cx="15.5" cy="4.5" r="1"/></svg></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 