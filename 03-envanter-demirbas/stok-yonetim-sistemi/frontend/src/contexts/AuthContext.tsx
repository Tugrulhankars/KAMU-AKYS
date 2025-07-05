import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../services/api';
import { User, RegisterRequest, UserRole } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    department?: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
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
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);

          // Verify token is still valid by fetching profile
          const response = await authApi.getProfile();
          if (response.success && response.data) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            // Token invalid, clear auth
            logout();
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authApi.login({ email, password });
      if (response.success && response.data) {
        const { token: authToken, user: userData } = response.data;
        setToken(authToken);
        setUser(userData);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Giriş başarılı!');
        return true;
      } else {
        toast.error(response.message || 'Giriş başarısız!');
        return false;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Giriş sırasında bir hata oluştu';
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    department?: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const registerData: RegisterRequest = {
        ...userData,
        role: UserRole.DepoGorevlisi // Default role
      };
      const response = await authApi.register(registerData);
      if (response.success) {
        toast.success('Kayıt başarılı! Lütfen giriş yapın.');
        return true;
      } else {
        toast.error(response.message || 'Kayıt başarısız!');
        return false;
      }
    } catch (error: any) {
      console.error('Register error:', error);
      const errorMessage = error.response?.data?.message || 'Kayıt sırasında bir hata oluştu';
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Çıkış yapıldı');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 