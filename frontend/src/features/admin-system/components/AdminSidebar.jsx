import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  Activity, 
  FileText, 
  Cpu, 
  Sliders, 
  BarChart3, 
  ShieldCheck 
} from 'lucide-react';

export function AdminSidebar() {
  const location = useLocation();

  const primaryLinks = [
    { to: '/admin/dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { to: '/admin/participants', label: 'Participant Management', icon: Users },
    { to: '/admin/award-points', label: 'Award Offline Points', icon: Award },
    { to: '/admin/activities', label: 'Manage Activities', icon: Activity },
    { to: '/admin/quiz-manager', label: 'Quiz Questions & CSV Ingest', icon: FileText }
  ];

  const systemLinks = [
    { to: '/quiz-integrations', label: 'Quiz Integration Hub', icon: Cpu },
    { to: '/scoring', label: 'Scoring Rules Engine', icon: Sliders },
    { to: '/leaderboard/analytics', label: 'Leaderboard & Analytics', icon: BarChart3 },
    { to: '/testing', label: 'Testing & QA Suite', icon: ShieldCheck }
  ];

  return (
    <aside className="w-64 glass-surface border-r border-white/[0.08] p-4 space-y-5">
      <div>
        <h3 className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider mb-2">Admin Operations</h3>
        <nav className="space-y-1 text-xs">
          {primaryLinks.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors ${isActive
                  ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 font-medium'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-3 border-t border-white/[0.06]">
        <h3 className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider mb-2">System Modules</h3>
        <nav className="space-y-1 text-xs">
          {systemLinks.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors ${isActive
                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
