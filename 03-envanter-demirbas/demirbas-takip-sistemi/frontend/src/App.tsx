import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ModernLayout from './components/layout/ModernLayout';
import Loading from './components/common/Loading';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ModernDashboard from './pages/ModernDashboard';
import { UserRole } from './types';
import { ThemeProvider } from './components/theme-provider';

// Lazy load pages for better performance
const AssetsPage = React.lazy(() => import('./pages/AssetsPage'));
const AssetDetailPage = React.lazy(() => import('./pages/AssetDetailPage'));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage'));
const AssignmentsPage = React.lazy(() => import('./pages/AssignmentsPage'));
const UsersPage = React.lazy(() => import('./pages/UsersPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading size="lg" text="Uygulama başlatılıyor..." />;
  }

  return (
    <ThemeProvider>
      <Routes>
        {/* Public Home Page */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute requireAuth={false}>
              <HomePage />
            </ProtectedRoute>
          } 
        />

        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <ProtectedRoute requireAuth={false}>
              <React.Suspense fallback={<Loading />}>
                <RegisterPage />
              </React.Suspense>
            </ProtectedRoute>
          } 
        />

        {/* Protected routes with modern layout */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <ModernLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<ModernDashboard />} />
          
          {/* Assets */}
          <Route 
            path="assets" 
            element={
              <React.Suspense fallback={<Loading />}>
                <AssetsPage />
              </React.Suspense>
            } 
          />
          <Route 
            path="assets/:id" 
            element={
              <React.Suspense fallback={<Loading />}>
                <AssetDetailPage />
              </React.Suspense>
            } 
          />
          
          {/* Categories */}
          <Route 
            path="categories" 
            element={
              <React.Suspense fallback={<Loading />}>
                <CategoriesPage />
              </React.Suspense>
            } 
          />
          
          {/* Assignments */}
          <Route 
            path="assignments" 
            element={
              <React.Suspense fallback={<Loading />}>
                <AssignmentsPage />
              </React.Suspense>
            } 
          />
          
          {/* Admin only routes */}
          <Route 
            path="users" 
            element={
              <ProtectedRoute requiredRole={UserRole.Admin}>
                <React.Suspense fallback={<Loading />}>
                  <UsersPage />
                </React.Suspense>
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'bg-background text-foreground border',
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--primary-foreground))',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: 'hsl(var(--destructive))',
              secondary: 'hsl(var(--destructive-foreground))',
            },
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App; 