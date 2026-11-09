import React from 'react';
import { Link } from 'react-router-dom';

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-slate-200 p-4 space-y-4">
      <h3 className="font-bold text-white uppercase text-xs tracking-wider">Admin Controls</h3>
      <nav className="space-y-2">
        <Link to="/admin/dashboard" className="block px-3 py-2 rounded hover:bg-slate-700">Dashboard</Link>
        <Link to="/admin/participants" className="block px-3 py-2 rounded hover:bg-slate-700">Participants</Link>
        <Link to="/admin/activities" className="block px-3 py-2 rounded hover:bg-slate-700">Activities</Link>
        <Link to="/admin/award-points" className="block px-3 py-2 rounded hover:bg-slate-700">Award Offline Points</Link>
      </nav>
    </aside>
  );
}
