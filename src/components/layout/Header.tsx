import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">
          Young Wealth
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className={
              location.pathname === '/'
                ? 'font-semibold text-blue-600'
                : ''
            }
          >
            Home
          </Link>
          {!isAuthenticated && <Link to="/login">Login</Link>}
          {!isAuthenticated && <Link to="/signup">Signup</Link>}
          {isAuthenticated && user?.role === 'school-student' && (
            <Link to="/dashboard/school">School Dashboard</Link>
          )}
          {isAuthenticated && user?.role === 'college-student' && (
            <Link to="/dashboard/college">College Dashboard</Link>
          )}
          {isAuthenticated && user?.role === 'employee' && (
            <Link to="/dashboard/employee">Employee Dashboard</Link>
          )}
          {isAuthenticated && user?.role === 'admin' && <Link to="/admin">Admin</Link>}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="ml-2 text-red-600"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};