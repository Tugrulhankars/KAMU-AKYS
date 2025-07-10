import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { authAPI } from './services/api';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Athletes from './pages/Athletes';
import AthleteDetail from './pages/AthleteDetail';
import Licenses from './pages/Licenses';
import LicenseDetail from './pages/LicenseDetail';
import Sports from './pages/Sports';
import Clubs from './pages/Clubs';
import Users from './pages/Users';
import Profile from './pages/Profile';

// Auth context
const AuthContext = React.createContext<{
  user: any;
  login: (token: string, user: any) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = React.useState<any>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (token: string, userData: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // User bilgilerini doğrula
  const { isLoading } = useQuery(
    'user',
    () => authAPI.changePassword({ currentPassword: '', newPassword: '' }),
    {
      enabled: !!localStorage.getItem('token'),
      retry: false,
      onError: () => {
        logout();
      },
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="athletes" element={<Athletes />} />
          <Route path="athletes/:id" element={<AthleteDetail />} />
          <Route path="licenses" element={<Licenses />} />
          <Route path="licenses/:id" element={<LicenseDetail />} />
          <Route path="sports" element={<Sports />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App; 