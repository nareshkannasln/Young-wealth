import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BookOpen, Target, BarChart3, Users, Phone, Mail } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-navy-700 p-4 rounded-2xl">
              <TrendingUp className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-teal-600">Young Wealth</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-8">
            Start Easy, Grow Wealthy
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Empowering the next generation with financial literacy. Whether you're a school student, 
            college student, or working professional, start your journey to financial freedom today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-navy-700 hover:bg-navy-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-50 text-navy-700 border-2 border-navy-700 px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Financial Education for Everyone
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Tailored learning experiences for different life stages and career paths
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-teal-50 rounded-xl">
              <BookOpen className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">School Students</h3>
              <p className="text-gray-500">
                Learn money basics, saving habits, and goal setting. Perfect for both 
                government and private school students.
              </p>
            </div>

            <div className="text-center p-6 bg-navy-50 rounded-xl">
              <Target className="h-12 w-12 text-navy-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">College Students</h3>
              <p className="text-gray-500">
                Master budgeting, understand investments, and prepare for your 
                financial future as you transition to independence.
              </p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <BarChart3 className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Employees</h3>
              <p className="text-gray-500">
                Advanced financial management, investment strategies, and 
                retirement planning for working professionals.
                <span className="block text-sm text-orange-600 font-medium mt-2">Coming Soon!</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-navy-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-navy-200">Students Learning</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-navy-200">Interactive Lessons</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-navy-200">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Start Your Wealth Journey?
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Join thousands of students and professionals who are building better financial habits with Young Wealth.
          </p>
          <Link
            to="/signup"
            className="bg-navy-700 hover:bg-navy-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl inline-flex items-center"
          >
            <Users className="h-5 w-5 mr-2" />
            Join Young Wealth Today
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Have questions? Our team is here to help you start your financial journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-teal-50 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <Phone className="h-8 w-8 text-teal-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Call Us</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-800">Yeshwin</p>
                  <p className="text-teal-600">+91 63825 93242</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Dhanushkumar</p>
                  <p className="text-teal-600">+91 93608 08860</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Sudhiksh Kumar</p>
                  <p className="text-teal-600">+91 73589 43662</p>
                </div>
              </div>
            </div>

            <div className="bg-navy-50 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <Mail className="h-8 w-8 text-navy-700 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
              </div>
              <div>
                <p className="text-gray-500 mb-2">For general inquiries and support:</p>
                <a 
                  href="mailto:youngwealthlearning@gmail.com"
                  className="text-navy-700 hover:text-navy-800 font-medium transition-colors"
                >
                  youngwealthlearning@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};