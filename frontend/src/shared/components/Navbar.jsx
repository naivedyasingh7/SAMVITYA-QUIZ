import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar({ title = "Event Points System" }) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="font-bold text-lg text-indigo-600">{title}</span>
      </div>
      <div className="flex space-x-4 text-sm font-medium">
        <Link to="/register" className="text-gray-600 hover:text-indigo-600">Register</Link>
        <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
        <Link to="/leaderboard" className="text-gray-600 hover:text-indigo-600">Leaderboard</Link>
        <Link to="/admin" className="text-gray-600 hover:text-indigo-600">Admin</Link>
      </div>
    </nav>
  );
}
