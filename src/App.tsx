import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Home } from './components/pages/Home';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
<<<<<<< HEAD
=======
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
import { SchoolDashboard } from './components/dashboard/SchoolDashboard';
import { CollegeDashboard } from './components/dashboard/CollegeDashboard';
import { EmployeeDashboard } from './components/dashboard/EmployeeDashboard';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
<<<<<<< HEAD
import { AdminCourseManager } from './components/admin/AdminCourseManager';

function App() {
  const { isAuthenticated, user } = useAuth();
=======

function App() {
  const { isAuthenticated, user } = useAuth();
  const [admin, setAdmin] = React.useState(null);

  // Helper function to get dashboard route
  const getDashboardRoute = (userRole: string) => {
    switch (userRole) {
      case 'school-student':
        return '/dashboard/school';
      case 'college-student':
        return '/dashboard/college';
      case 'employee':
        return '/dashboard/employee';
      default:
        return '/dashboard/school';
    }
  };
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
<<<<<<< HEAD
        <Header />
=======
        {!window.location.pathname.startsWith('/admin') && <Header />}
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
<<<<<<< HEAD
                <Navigate to={`/dashboard/${user?.role === 'school-student' ? 'school' : user?.role === 'college-student' ? 'college' : 'employee'}`} replace />
=======
                <Navigate to={getDashboardRoute(user?.role || 'school-student')} replace />
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
              ) : (
                <Login />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? (
<<<<<<< HEAD
                <Navigate to={`/dashboard/${user?.role === 'school-student' ? 'school' : user?.role === 'college-student' ? 'college' : 'employee'}`} replace />
=======
                <Navigate to={getDashboardRoute(user?.role || 'school-student')} replace />
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
              ) : (
                <Signup />
              )
            } 
          />

<<<<<<< HEAD
=======
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              admin ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLogin onLogin={setAdmin} />
              )
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              admin ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/admin" replace />
              )
            } 
          />

>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
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
<<<<<<< HEAD
                <Navigate 
                  to={`/dashboard/${user?.role === 'school-student' ? 'school' : user?.role === 'college-student' ? 'college' : 'employee'}`} 
                  replace 
                />
=======
                <Navigate to={getDashboardRoute(user?.role || 'school-student')} replace />
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
              </ProtectedRoute>
            } 
          />

<<<<<<< HEAD
          {/* Admin Route */}
          <Route path="/admin" element={<AdminCourseManager />} />

=======
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;