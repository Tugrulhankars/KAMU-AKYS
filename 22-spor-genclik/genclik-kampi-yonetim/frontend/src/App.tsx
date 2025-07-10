import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Camps from './pages/Camps';
import CampDetail from './pages/CampDetail';
import CampForm from './pages/CampForm';
import Participants from './pages/Participants';
import ParticipantDetail from './pages/ParticipantDetail';
import ParticipantForm from './pages/ParticipantForm';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import ActivityForm from './pages/ActivityForm';
import Registrations from './pages/Registrations';
import RegistrationDetail from './pages/RegistrationDetail';
import RegistrationForm from './pages/RegistrationForm';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import UserForm from './pages/UserForm';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              
              {/* Camp routes */}
              <Route path="camps" element={<Camps />} />
              <Route path="camps/new" element={<CampForm />} />
              <Route path="camps/:id" element={<CampDetail />} />
              <Route path="camps/:id/edit" element={<CampForm />} />
              
              {/* Participant routes */}
              <Route path="participants" element={<Participants />} />
              <Route path="participants/new" element={<ParticipantForm />} />
              <Route path="participants/:id" element={<ParticipantDetail />} />
              <Route path="participants/:id/edit" element={<ParticipantForm />} />
              
              {/* Activity routes */}
              <Route path="activities" element={<Activities />} />
              <Route path="activities/new" element={<ActivityForm />} />
              <Route path="activities/:id" element={<ActivityDetail />} />
              <Route path="activities/:id/edit" element={<ActivityForm />} />
              
              {/* Registration routes */}
              <Route path="registrations" element={<Registrations />} />
              <Route path="registrations/new" element={<RegistrationForm />} />
              <Route path="registrations/:id" element={<RegistrationDetail />} />
              <Route path="registrations/:id/edit" element={<RegistrationForm />} />
              
              {/* User routes */}
              <Route path="users" element={<Users />} />
              <Route path="users/new" element={<UserForm />} />
              <Route path="users/:id" element={<UserDetail />} />
              <Route path="users/:id/edit" element={<UserForm />} />
              
              {/* Profile route */}
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App; 