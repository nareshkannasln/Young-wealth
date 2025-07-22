import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Home } from './components/pages/Home';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { SchoolDashboard } from './components/dashboard/SchoolDashboard';
import { CollegeDashboard } from './components/dashboard/CollegeDashboard';
import { EmployeeDashboard } from './components/dashboard/EmployeeDashboard';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to={`/dashboard/${user?.role === 'school-student' ? 'school' : user?.role === 'college-student' ? 'college' : 'employee'}`} replace />
              ) : (
                <Login />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? (
                <Navigate to={`/dashboard/${user?.role === 'school-student' ? 'school' : user?.role === 'college-student' ? 'college' : 'employee'}`} replace />
              ) : (
                <Signup />
              )
            } 
          />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard/school" 
            element={
              <ProtectedRoute requiredRole="school-student">
                <SchoolDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/college" 
            element={
              <ProtectedRoute requiredRole="college-student">
                <CollegeDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/employee" 
            element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Default dashboard redirect */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Navigate 
                  to={`/dashboard/${user?.role === 'school-student' ? 'school' : user?.role === 'college-student' ? 'college' : 'employee'}`} 
                  replace 
                />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;