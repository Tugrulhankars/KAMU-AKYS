import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import OfficerPanel from './pages/OfficerPanel'
import ViewerPanel from './pages/ViewerPanel'
import HouseholdDetail from './pages/HouseholdDetail'
import PersonDetail from './pages/PersonDetail'
import Statistics from './pages/Statistics'
import CityManagement from './pages/CityManagement'
import DistrictManagement from './pages/DistrictManagement'
import AuditLog from './pages/AuditLog'

function App() {
  const { loading, user } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  const getDashboardRoute = () => {
    if (!user) return '/login'
    
    switch (user.role) {
      case 'Admin':
        return '/admin'
      case 'Görevli':
        return '/officer'
      case 'Gözlemci':
        return '/viewer'
      default:
        return '/login'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar />}
      
      <main className={user ? 'pt-16' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            user ? <Navigate to={getDashboardRoute()} replace /> : <Home />
          } />
          <Route path="/login" element={
            user ? <Navigate to={getDashboardRoute()} replace /> : <Login />
          } />
          <Route path="/register" element={
            user ? <Navigate to={getDashboardRoute()} replace /> : <Register />
          } />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminPanel />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/cities" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <CityManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/districts" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <DistrictManagement />
            </ProtectedRoute>
          } />

          <Route path="/admin/audit-log" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AuditLog />
            </ProtectedRoute>
          } />

          {/* Officer Routes */}
          <Route path="/officer" element={
            <ProtectedRoute allowedRoles={['Admin', 'Görevli']}>
              <OfficerPanel />
            </ProtectedRoute>
          } />

          {/* Viewer Routes */}
          <Route path="/viewer" element={
            <ProtectedRoute allowedRoles={['Admin', 'Görevli', 'Gözlemci']}>
              <ViewerPanel />
            </ProtectedRoute>
          } />

          {/* Detail Routes */}
          <Route path="/viewer/households/:id" element={
            <ProtectedRoute>
              <HouseholdDetail />
            </ProtectedRoute>
          } />

          <Route path="/viewer/people/:id" element={
            <ProtectedRoute>
              <PersonDetail />
            </ProtectedRoute>
          } />

          <Route path="/statistics" element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          } />

          {/* Unauthorized Route */}
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Erişim Reddedildi</h1>
                <p className="text-gray-600 mb-8">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
                <button
                  onClick={() => window.history.back()}
                  className="btn-primary"
                >
                  Geri Dön
                </button>
              </div>
            </div>
          } />

          {/* Fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-8">Sayfa bulunamadı</p>
                <button
                  onClick={() => window.history.back()}
                  className="btn-primary"
                >
                  Geri Dön
                </button>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App 