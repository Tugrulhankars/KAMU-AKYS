import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CubeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Zaten login olmuş kullanıcıları Dashboard'a yönlendir
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Giriş başarılı!');
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Giriş yapılamadı');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-border p-8 space-y-8">
          <div className="flex flex-col items-center">
            <CubeIcon className="h-14 w-14 text-primary mb-2" />
            <h2 className="text-2xl font-bold text-primary mb-1 text-center">Kamu-AKYS Demirbaş Takip Sistemi</h2>
            <p className="text-sm text-muted-foreground text-center">Giriş yaparak sisteme erişin</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">E-posta</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field mt-1 text-base rounded-xl h-12"
                  placeholder="E-posta adresinizi girin"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">Şifre</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="input-field pr-12 text-base rounded-xl h-12"
                    placeholder="Şifrenizi girin"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-base h-12 rounded-xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Giriş Yapılıyor...
                </div>
              ) : (
                'Giriş Yap'
              )}
            </button>
            <div className="text-center mt-2">
              <Link to="/register">
                <button type="button" className="btn-secondary w-full text-base h-12 rounded-xl">Kayıt Ol</button>
              </Link>
            </div>
          </form>
          <div className="mt-4 p-4 bg-accent rounded-xl border border-accent text-sm text-accent-foreground">
            <div className="font-semibold mb-1">Demo Hesap</div>
            <div className="flex flex-col gap-1">
              <span><b>E-posta:</b> admin@demirbas.gov.tr</span>
              <span><b>Şifre:</b> admin123</span>
              <span className="text-xs text-muted-foreground">Sistem yöneticisi olarak giriş yapabilirsiniz.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 