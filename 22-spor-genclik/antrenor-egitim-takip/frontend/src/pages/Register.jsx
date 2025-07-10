import React, { useState } from 'react';
import { Mail, Lock, UserPlus, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    department: '',
    position: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await registerUser(formData);
      if (result?.success !== false) {
        navigate('/login');
      } else {
        setError(result?.message || 'Kayıt başarısız.');
      }
    } catch {
      setError('Kayıt sırasında bir hata oluştu.');
    }
    setLoading(false);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-xl rounded-2xl px-10 py-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Kayıt Ol</h2>
            <p className="mt-2 text-sm text-gray-500">Antrenör Eğitim Takip Sistemine kayıt olun</p>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="form-label text-gray-700 font-medium">Ad</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
                  placeholder="Adınız"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="form-label text-gray-700 font-medium">Soyad</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
                  placeholder="Soyadınız"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="form-label text-gray-700 font-medium">E-posta Adresi</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="form-label text-gray-700 font-medium">Şifre</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="address" className="form-label text-gray-700 font-medium">Adres</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={handleChange}
                className="form-input py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
                placeholder="Adresinizi girin"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="form-label text-gray-700 font-medium">Telefon</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-input py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
                placeholder="05xxxxxxxxx"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="form-label text-gray-700 font-medium">Doğum Tarihi</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="form-input py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
              />
            </div>
            <div>
              <label htmlFor="gender" className="form-label text-gray-700 font-medium">Cinsiyet</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
              >
                <option value="">Seçiniz</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div>
              <label htmlFor="department" className="form-label text-gray-700 font-medium">Departman</label>
              <input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleChange}
                className="form-input py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
                placeholder="Departman"
              />
            </div>
            <div>
              <label htmlFor="position" className="form-label text-gray-700 font-medium">Pozisyon</label>
              <input
                id="position"
                name="position"
                type="text"
                value={formData.position}
                onChange={handleChange}
                className="form-input py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full"
                placeholder="Pozisyon"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-2"></div>
                  Kayıt olunuyor...
                </div>
              ) : (
                'Kayıt Ol'
              )}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
              >
                Zaten hesabınız var mı? <span className="underline">Giriş yapın</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 