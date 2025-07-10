import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Token varsa kullanıcı bilgilerini al
      const fetchCurrentUser = async () => {
        try {
          const response = await apiClient.get('/auth/me');
          setUser({ ...response.data, token });
        } catch {
          // Token geçersizse localStorage'dan sil
          localStorage.removeItem('token');
          delete apiClient.defaults.headers.common['Authorization'];
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    const { accessToken } = response.data;
    localStorage.setItem('token', accessToken);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
    // Login sonrası kullanıcı bilgilerini al
    const userResponse = await apiClient.get('/auth/me');
    setUser({ ...userResponse.data, token: accessToken });
  };

  const register = async ({ firstname, lastname, email, password }) => {
    await apiClient.post('/auth/register', { firstname, lastname, email, password });
    // Kayıt sonrası token set edilmeyecek, login sayfasına yönlendirme yapılacak
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 