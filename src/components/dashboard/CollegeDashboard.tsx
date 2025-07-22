import React from 'react';
import { GraduationCap, CreditCard, PieChart, Briefcase } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const CollegeDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {user?.fullName}! 🎓
          </h1>
          <p className="text-gray-500">
            Advanced financial education for college students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-teal-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Courses Completed</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-navy-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Budget Tracked</p>
                <p className="text-2xl font-bold text-gray-800">₹0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <PieChart className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Investments</p>
                <p className="text-2xl font-bold text-gray-800">₹0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Career Score</p>
                <p className="text-2xl font-bold text-gray-800">0%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended Courses</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-800">Personal Budgeting</h3>
                <p className="text-sm text-gray-400 mt-1">Master the art of managing your college expenses</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                    Recommended
                  </span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-800">Investment Basics</h3>
                <p className="text-sm text-gray-400 mt-1">Start building wealth early with smart investments</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-800">
                    Intermediate
                  </span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer opacity-50">
                <h3 className="font-medium text-gray-800">Credit & Loans</h3>
                <p className="text-sm text-gray-400 mt-1">Understanding credit cards and student loans</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Financial Tools</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Budget Calculator</h3>
                    <p className="text-sm text-gray-400">Plan your monthly expenses</p>
                  </div>
                  <div className="text-teal-600">
                    <CreditCard className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Investment Tracker</h3>
                    <p className="text-sm text-gray-400">Monitor your portfolio performance</p>
                  </div>
                  <div className="text-navy-700">
                    <PieChart className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer opacity-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Career Planner</h3>
                    <p className="text-sm text-gray-400">Plan your career and salary expectations</p>
                  </div>
                  <div className="text-gray-300">
                    <Briefcase className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};