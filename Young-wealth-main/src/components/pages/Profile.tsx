import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-2"><strong>Name:</strong> {user.fullName}</div>
      <div className="mb-2"><strong>Email:</strong> {user.email}</div>
      <div className="mb-2"><strong>Role:</strong> {user.role}</div>
      {user.schoolType && <div className="mb-2"><strong>School Type:</strong> {user.schoolType}</div>}
      <div className="mb-2"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
    </div>
  );
};
