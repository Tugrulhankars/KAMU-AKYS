import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContext, { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SurveyFormPage from './pages/SurveyFormPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SurveyDetailPage from './pages/SurveyDetailPage';
import SurveyTakePage from './pages/SurveyTakePage';
import SurveyResponsesPage from './pages/SurveyResponsesPage';
import AboutPage from './pages/AboutPage';
import GroupsPage from './pages/GroupsPage';
import JoinGroupPage from './pages/JoinGroupPage';
import GroupCreatePage from './pages/GroupCreatePage';
import GroupDetailPage from './pages/GroupDetailPage';

function ProtectedRoute({ children }) {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return null;
  if (!user) {
    window.location.href = '/login';
    return null;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="surveys/new" element={<ProtectedRoute><SurveyFormPage /></ProtectedRoute>} />
            <Route path="surveys/edit/:id" element={<ProtectedRoute><SurveyFormPage /></ProtectedRoute>} />
            <Route path="surveys/:id" element={<ProtectedRoute><SurveyDetailPage /></ProtectedRoute>} />
            <Route path="surveys/take/:id" element={<ProtectedRoute><SurveyTakePage /></ProtectedRoute>} />
            <Route path="surveys/responses/:id" element={<ProtectedRoute><SurveyResponsesPage /></ProtectedRoute>} />
            <Route path="groups" element={<ProtectedRoute><GroupsPage /></ProtectedRoute>} />
            <Route path="groups/create" element={<ProtectedRoute><GroupCreatePage /></ProtectedRoute>} />
            <Route path="groups/join" element={<ProtectedRoute><JoinGroupPage /></ProtectedRoute>} />
            <Route path="groups/:id" element={<ProtectedRoute><GroupDetailPage /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
