import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, LoginData, RegisterData, ROLES } from '../types';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

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
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('auth-token');
      const storedUser = localStorage.getItem('auth-user');

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);
          
          // Verify token is still valid
          const currentUser = await authAPI.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Error verifying stored auth:', error);
          localStorage.removeItem('auth-token');
          localStorage.removeItem('auth-user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      setLoading(true);
      const response = await authAPI.login(data);
      
      const userData: User = {
        id: 0, // Will be updated from API
        username: response.username,
        role: response.role,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      setToken(response.token);
      setUser(userData);
      
      localStorage.setItem('auth-token', response.token);
      localStorage.setItem('auth-user', JSON.stringify(userData));
      
      toast.success('Başarıyla giriş yaptınız!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Giriş yapılırken hata oluştu';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      setLoading(true);
      const response = await authAPI.register(data);
      
      const userData: User = {
        id: 0, // Will be updated from API
        username: response.username,
        role: response.role,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      setToken(response.token);
      setUser(userData);
      
      localStorage.setItem('auth-token', response.token);
      localStorage.setItem('auth-user', JSON.stringify(userData));
      
      toast.success('Başarıyla kayıt oldunuz!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kayıt olurken hata oluştu';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    toast.success('Çıkış yaptınız');
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === ROLES.ADMIN;
  const isOfficer = user?.role === ROLES.OFFICER;
  const isViewer = user?.role === ROLES.VIEWER;

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    isOfficer,
    isViewer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 