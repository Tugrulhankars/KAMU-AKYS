import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, userAPI, User } from '../services/api';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login(email, password);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      toast.success('Başarıyla giriş yapıldı!');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Giriş yapılırken bir hata oluştu';
      toast.error(message);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      await authAPI.register(userData);
      toast.success('Kayıt başarıyla tamamlandı! Giriş yapabilirsiniz.');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kayıt olurken bir hata oluştu';
      toast.error(message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Çıkış yapıldı');
    navigate('/');
  };

  const updateProfile = async (userData: any): Promise<boolean> => {
    try {
      await userAPI.updateProfile(userData);
      
      // Profil güncellendikten sonra kullanıcı bilgilerini yeniden al
      const updatedUser = await userAPI.getProfile();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profil başarıyla güncellendi!');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Profil güncellenirken bir hata oluştu';
      toast.error(message);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 