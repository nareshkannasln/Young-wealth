import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav: React.FC = () => (
  <nav className="mb-4">
    <ul className="flex gap-4">
      <li><Link to="/admin/dashboard">Dashboard</Link></li>
      <li><Link to="/admin/courses">Courses</Link></li>
      <li><Link to="/admin/videos">Videos</Link></li>
      <li><Link to="/admin/pricing">Pricing</Link></li>
    </ul>
  </nav>
);

export default AdminNav;
