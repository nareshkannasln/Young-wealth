import React from 'react';
<<<<<<< HEAD
import { Link, useLocation } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
import { TrendingUp, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
<<<<<<< HEAD
  const location = useLocation();
=======
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036

  const handleLogout = () => {
    logout();
  };

  return (
<<<<<<< HEAD
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
=======
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-navy-700 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Young Wealth</h1>
              <p className="text-xs text-gray-600">Start Easy, Grow Wealthy</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-semibold">{user?.fullName}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-navy-700 hover:bg-navy-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
>>>>>>> 93e9b760fcf5f6b33fd85575eb3c5948149cf036
      </div>
    </header>
  );
};