/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await authAPI.getProfile();
        setUser(response.data);
        setIsAuthenticated(true);
      }
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      toast.success('Başarıyla giriş yapıldı!');
      return { success: true };
    } catch (error) {
      toast.error('Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const register = async (userData) => {
    try {
      await authAPI.register(userData);
      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
      return { success: true };
    } catch (error) {
      toast.error('Kayıt yapılamadı. Lütfen bilgilerinizi kontrol edin.');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Başarıyla çıkış yapıldı.');
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      const updatedUser = response.data;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profil başarıyla güncellendi!');
      return { success: true };
    } catch (error) {
      toast.error('Profil güncellenemedi.');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const changePassword = async (passwords) => {
    try {
      await authAPI.changePassword(passwords);
      toast.success('Şifre başarıyla değiştirildi!');
      return { success: true };
    } catch (error) {
      toast.error('Şifre değiştirilemedi.');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await authAPI.forgotPassword(email);
      toast.success('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
      return { success: true };
    } catch (error) {
      toast.error('Şifre sıfırlama işlemi başarısız.');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await authAPI.resetPassword(token, password);
      toast.success('Şifreniz başarıyla sıfırlandı!');
      return { success: true };
    } catch (error) {
      toast.error('Şifre sıfırlama başarısız.');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider }; 