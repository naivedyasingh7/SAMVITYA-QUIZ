import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LayoutDashboard, Users, Activity, Award } from 'lucide-react';

export function AdminSidebar() {
  const location = useLocation();

  const links = [
    { to: '/admin/quiz-manager', label: 'Quiz Questions & Answers', icon: FileText },
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/participants', label: 'Participants', icon: Users },
    { to: '/admin/activities', label: 'Activities', icon: Activity },
    { to: '/admin/award-points', label: 'Award Offline Points', icon: Award }
  ];

  return (
    <aside className="w-64 glass-surface border-r border-white/[0.08] p-4 space-y-4">
      <h3 className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider">Admin Controls</h3>
      <nav className="space-y-1 text-xs">
        {links.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30 font-medium'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
            >
              <Icon className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
