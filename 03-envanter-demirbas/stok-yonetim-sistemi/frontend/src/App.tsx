import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import Loading from './components/common/Loading';
import { UserRole } from './types';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import ProfilePage from './pages/ProfilePage';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage'));
const StockTransactionsPage = React.lazy(() => import('./pages/StockTransactionsPage'));
const UsersPage = React.lazy(() => import('./pages/UsersPage'));

function App() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Loading size="lg" text="Uygulama başlatılıyor..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Suspense fallback={<Loading size="lg" text="Dashboard yükleniyor..." />}>
                  <Dashboard />
                </Suspense>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <Suspense fallback={<Loading size="lg" text="Ürünler yükleniyor..." />}>
                  <ProductsPage />
                </Suspense>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Admin, UserRole.DepoGorevlisi]}>
              <Layout>
                <Suspense fallback={<Loading size="lg" text="Kategoriler yükleniyor..." />}>
                  <CategoriesPage />
                </Suspense>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Layout>
                <Suspense fallback={<Loading size="lg" text="İşlemler yükleniyor..." />}>
                  <StockTransactionsPage />
                </Suspense>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Admin]}>
              <Layout>
                <Suspense fallback={<Loading size="lg" text="Kullanıcılar yükleniyor..." />}>
                  <UsersPage />
                </Suspense>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <Layout>
                <Suspense fallback={<Loading size="lg" text="Ürün ekleme sayfası yükleniyor..." />}>
                  <AddProductPage />
                </Suspense>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to dashboard if authenticated, otherwise to home */}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} 
        />
      </Routes>
    </div>
  );
}

export default App; 