import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1>
    <p className="text-xl text-gray-700 mb-6">Page Not Found</p>
    <Link to="/" className="text-teal-700 underline text-lg">Go Home</Link>
  </div>
);
