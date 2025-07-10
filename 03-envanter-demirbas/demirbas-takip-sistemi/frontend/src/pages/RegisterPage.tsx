import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CubeIcon, EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { UserRole } from '../types';
import toast from 'react-hot-toast';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    department: '',
    phoneNumber: '',
    role: UserRole.Personel
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Login olmuş kullanıcıları Dashboard'a yönlendir
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role' ? parseInt(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Kullanıcı adı gereklidir';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Kullanıcı adı en az 3 karakter olmalıdır';
    } else if (formData.username.length > 50) {
      newErrors.username = 'Kullanıcı adı en fazla 50 karakter olmalıdır';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gereklidir';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifre tekrarı gereklidir';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad gereklidir';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad gereklidir';
    }

    if (formData.phoneNumber && !/^[0-9\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Geçerli bir telefon numarası giriniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: formData.department,
        phoneNumber: formData.phoneNumber,
        role: formData.role
      };

      await register(registerData);
      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
      navigate('/login');
    } catch (error: any) {
      console.error('Register error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Kayıt olurken bir hata oluştu');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 animate-fade-in border border-primary/20">
        <h2 className="text-3xl font-bold text-center text-primary mb-6 drop-shadow">Kayıt Ol</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Kullanıcı Adı */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-muted-foreground mb-1">Kullanıcı Adı *</label>
              <div className="relative">
                <UserIcon className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`input-field pl-10 text-base rounded-xl h-12 ${errors.username ? 'border-red-500' : ''}`}
                  placeholder="Kullanıcı adınızı girin"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            {/* E-posta */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">E-posta *</label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`input-field pl-10 text-base rounded-xl h-12 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="E-posta adresinizi girin"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            {/* Şifre */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">Şifre *</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={`input-field pr-12 text-base rounded-xl h-12 ${errors.password ? 'border-red-500' : ''}`}
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            {/* Şifre Tekrar */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground mb-1">Şifre Tekrar *</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className={`input-field pr-12 text-base rounded-xl h-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Şifrenizi tekrar girin"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
            {/* Ad */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-1">Ad *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className={`input-field text-base rounded-xl h-12 ${errors.firstName ? 'border-red-500' : ''}`}
                placeholder="Adınızı girin"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            {/* Soyad */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-1">Soyad *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className={`input-field text-base rounded-xl h-12 ${errors.lastName ? 'border-red-500' : ''}`}
                placeholder="Soyadınızı girin"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
            {/* Telefon */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-muted-foreground mb-1">Telefon</label>
              <div className="relative">
                <PhoneIcon className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  className={`input-field pl-10 text-base rounded-xl h-12 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  placeholder="Telefon numaranız (isteğe bağlı)"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
            </div>
            {/* Departman */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-muted-foreground mb-1">Departman</label>
              <div className="relative">
                <BuildingOfficeIcon className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="department"
                  name="department"
                  type="text"
                  className="input-field pl-10 text-base rounded-xl h-12"
                  placeholder="Departman (isteğe bağlı)"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full text-lg">Kayıt Ol</button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-muted-foreground">Zaten hesabınız var mı?</span>
          <Link to="/login" className="ml-2 btn-secondary inline-block">Giriş Yap</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 