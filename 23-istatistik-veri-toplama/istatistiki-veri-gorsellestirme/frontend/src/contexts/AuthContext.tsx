import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, LoginData, RegisterData, ApiError } from '../types';
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
    const storedToken = localStorage.getItem('auth-token');
    const storedUser = localStorage.getItem('auth-user');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      const response = await authAPI.login(data);
      
      const userData: User = {
        id: 0, // This will be extracted from JWT in a real app
        username: response.username,
        role: response.role,
        createdAt: new Date().toISOString(),
      };

      setToken(response.token);
      setUser(userData);
      
      localStorage.setItem('auth-token', response.token);
      localStorage.setItem('auth-user', JSON.stringify(userData));
      
      toast.success('Başarıyla giriş yaptınız!');
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message);
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      const response = await authAPI.register(data);
      
      const userData: User = {
        id: 0, // This will be extracted from JWT in a real app
        username: response.username,
        role: response.role,
        createdAt: new Date().toISOString(),
      };

      setToken(response.token);
      setUser(userData);
      
      localStorage.setItem('auth-token', response.token);
      localStorage.setItem('auth-user', JSON.stringify(userData));
      
      toast.success('Başarıyla kayıt oldunuz!');
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message);
      throw error;
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
  const isAdmin = user?.role === 'Admin';

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 