import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to user's appropriate dashboard
<<<<<<< HEAD
    const dashboardRoute = user?.role === 'school-student' 
      ? '/dashboard/school'
      : user?.role === 'college-student'
      ? '/dashboard/college'
      : '/dashboard/employee';
    
    return <Navigate to={dashboardRoute} replace />;
=======
    const getDashboardRoute = (role: string) => {
      switch (role) {
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
    
    return <Navigate to={getDashboardRoute(user?.role || 'school-student')} replace />;
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
  }

  return <>{children}</>;
};