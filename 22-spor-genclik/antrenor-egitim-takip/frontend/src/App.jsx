import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Antrenorler from './pages/Antrenorler';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Egitimler from './pages/Egitimler';
import Sertifikalar from './pages/Sertifikalar';
import Performanslar from './pages/Performanslar';
import Sporcular from './pages/Sporcular';

// Protected Route bileşeni
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Layout bileşeni
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onToggleSidebar={handleToggleSidebar} 
      />
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        user={user} 
      />
      <main className="flex-1 overflow-auto pt-16 lg:pl-80">
        {children}
      </main>
    </div>
  );
};

// Ana uygulama bileşeni
const AppContent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/antrenorler"
          element={
            <ProtectedRoute>
              <Layout>
                <Antrenorler />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/egitimler"
          element={
            <ProtectedRoute>
              <Layout>
                <Egitimler />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sertifikalar"
          element={
            <ProtectedRoute>
              <Layout>
                <Sertifikalar />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/performans"
          element={
            <ProtectedRoute>
              <Layout>
                <Performanslar />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sporcular"
          element={
            <ProtectedRoute>
              <Layout>
                <Sporcular />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/raporlar"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Raporlar</h1>
                  <p className="text-gray-600">Raporlar sayfası (gelecekte eklenecek)</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kullanicilar"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Kullanıcı Yönetimi</h1>
                  <p className="text-gray-600">Kullanıcı yönetimi sayfası (gelecekte eklenecek)</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Profil</h1>
                  <p className="text-gray-600">Profil sayfası (gelecekte eklenecek)</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Ayarlar</h1>
                  <p className="text-gray-600">Ayarlar sayfası (gelecekte eklenecek)</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
