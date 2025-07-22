import React from 'react';
import { Link } from 'react-router-dom';
import { Scaling as Seedling, BookOpen, Target, TrendingUp, Users } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-emerald-500 p-4 rounded-2xl">
              <Seedling className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-emerald-500">FinSeed</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Plant Your Future, Save Today.
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
            Empowering the next generation with financial literacy. Whether you're a school student, 
            college student, or working professional, start your journey to financial freedom today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-50 text-emerald-500 border-2 border-emerald-500 px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Financial Education for Everyone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored learning experiences for different life stages and career paths
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-emerald-50 rounded-xl">
              <BookOpen className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">School Students</h3>
              <p className="text-gray-600">
                Learn money basics, saving habits, and goal setting. Perfect for both 
                government and private school students.
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">College Students</h3>
              <p className="text-gray-600">
                Master budgeting, understand investments, and prepare for your 
                financial future as you transition to independence.
              </p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <TrendingUp className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Employees</h3>
              <p className="text-gray-600">
                Advanced financial management, investment strategies, and 
                retirement planning for working professionals.
                <span className="block text-sm text-orange-600 font-medium mt-2">Coming Soon!</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-emerald-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-emerald-100">Students Learning</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-emerald-100">Interactive Lessons</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-emerald-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Plant Your Financial Future?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students and professionals who are building better financial habits with FinSeed.
          </p>
          <Link
            to="/signup"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl inline-flex items-center"
          >
            <Users className="h-5 w-5 mr-2" />
            Join FinSeed Today
          </Link>
        </div>
      </div>
    </div>
  );
};