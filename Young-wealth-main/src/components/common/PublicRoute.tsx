import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    const getDashboardRoute = (role: string) => {
      switch (role) {
        case 'school-student':
          return ROUTES.DASHBOARD.SCHOOL;
        case 'college-student':
          return ROUTES.DASHBOARD.COLLEGE;
        case 'employee':
          return ROUTES.DASHBOARD.EMPLOYEE;
        case 'admin':
          return ROUTES.DASHBOARD.ADMIN;
        default:
          return ROUTES.DASHBOARD.SCHOOL;
      }
    };

    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <>{children}</>;
};
