import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-navy-700">
          <TrendingUp className="w-6 h-6" />
          Young Wealth
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            {/* Always show Learn */}
            <li>
              <Link to="/learn" className={location.pathname === '/learn' ? 'active' : ''}>
                Learn
              </Link>
            </li>
            {/* Show Expense Tracker for college students */}
            {user?.role === 'college-student' && (
              <li>
                <Link to="/expenses" className={location.pathname === '/expenses' ? 'active' : ''}>
                  Expense Tracker
                </Link>
              </li>
            )}
            {/* Show Payment for all except admin */}
            {user?.role !== 'admin' && (
              <li>
                <Link to="/payment" className={location.pathname === '/payment' ? 'active' : ''}>
                  Payment
                </Link>
              </li>
            )}
            {/* Dashboard/Admin Dashboard link by role */}
            {user?.role === 'admin' ? (
              <li>
                <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
                  Admin Dashboard
                </Link>
              </li>
            ) : user ? (
              <li>
                <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                  Dashboard
                </Link>
              </li>
            ) : null}
            {isAuthenticated ? (
              <>
                <li>
                  <span>{user?.fullName}</span>
                </li>
                <li>
                  <button onClick={logout} className="flex items-center gap-1">
                    <LogOut />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};