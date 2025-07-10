import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DatasetDetail from './pages/DatasetDetail';
import AdminPanel from './pages/AdminPanel';
import Datasets from './pages/Datasets';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <div className="flex">
                    <Sidebar />
                    <main className="flex-1 min-h-screen px-4 py-8 md:px-8 md:py-10 max-w-6xl mx-auto w-full">
                      <Routes>
                        <Route
                          path="/dashboard"
                          element={
                            <ProtectedRoute>
                              <Dashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/datasets"
                          element={
                            <ProtectedRoute>
                              <Datasets />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/dataset/:id"
                          element={
                            <ProtectedRoute>
                              <DatasetDetail />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin"
                          element={
                            <ProtectedRoute requireAdmin>
                              <AdminPanel />
                            </ProtectedRoute>
                          }
                        />
                        {/* Dummy routes for sidebar */}
                        <Route path="/competitions" element={<div className='text-2xl font-bold'>Yarışmalar (Kaggle Grid Yakında)</div>} />
                        <Route path="/community" element={<div className='text-2xl font-bold'>Topluluk (Kaggle Grid Yakında)</div>} />
                        <Route path="/about" element={<div className='text-2xl font-bold'>Hakkında</div>} />
                      </Routes>
                    </main>
                  </div>
                </>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 