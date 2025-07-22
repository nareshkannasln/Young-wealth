import React from 'react';
import { Briefcase, TrendingUp, Shield, Target } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg shadow-md p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome, {user?.fullName}! 💼
          </h1>
          <p className="text-blue-100 mb-4">
            Professional financial management for working professionals
          </p>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm font-medium">
              🚧 Employee dashboard is coming soon! We're building advanced features for working professionals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 opacity-75">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Salary Management</p>
                <p className="text-2xl font-bold text-gray-900">Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 opacity-75">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-emerald-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Investment Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 opacity-75">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Insurance & Protection</p>
                <p className="text-2xl font-bold text-gray-900">Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 opacity-75">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Retirement Planning</p>
                <p className="text-2xl font-bold text-gray-900">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Briefcase className="h-10 w-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Employee Features Coming Soon
            </h2>
            <p className="text-gray-600 mb-6">
              We're developing comprehensive financial tools specifically designed for working professionals. 
              Stay tuned for advanced salary management, investment tracking, tax optimization, and retirement planning features.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Expected Launch:</strong> Q2 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};