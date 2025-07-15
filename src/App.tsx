import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './components/auth/LoginPage';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import LoadingSpinner from './components/common/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole: string }> = ({
  children,
  allowedRole,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  console.log('Current user in AppContent:', user);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : 
          <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />} />
        
        <Route path="/student" element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;