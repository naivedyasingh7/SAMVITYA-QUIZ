import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Award,
  Activity,
  FileText,
  Cpu,
  Sliders,
  BarChart3,
  ShieldCheck,
  Menu,
  X,
  Trophy,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '../../../shared/hooks/useAuth.js';

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const primaryLinks = [
    { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/participants', label: 'Participants', icon: Users },
    { to: '/admin/award-points', label: 'Award Points', icon: Award },
    { to: '/admin/activities', label: 'Activities', icon: Activity },
    { to: '/admin/quiz-manager', label: 'Quiz Manager', icon: FileText }
  ];

  const systemLinks = [
    { to: '/quiz-integrations', label: 'Quiz Integrations', icon: Cpu },
    { to: '/scoring', label: 'Scoring Engine', icon: Sliders },
    { to: '/leaderboard/analytics', label: 'Analytics & Lock', icon: BarChart3 },
    { to: '/testing', label: 'QA & Load Suite', icon: ShieldCheck }
  ];

  const handleLogout = () => {
    logout?.();
    navigate('/admin/login');
  };

  const renderNavContent = (onItemClick) => (
    <div className="flex flex-col h-full justify-between space-y-6">
      <div className="space-y-6">
        {/* Console Badge */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-transparent border border-indigo-500/20">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white tracking-tight truncate">Protocol Zero</div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ADMIN CONSOLE</span>
            </div>
          </div>
        </div>

        {/* Operations */}
        <div>
          <h3 className="px-3 font-mono font-semibold text-slate-500 uppercase text-[10px] tracking-widest mb-2">
            Operations
          </h3>
          <nav className="space-y-1">
            {primaryLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={onItemClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/25 to-indigo-600/10 text-white border border-purple-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-purple-400" />
                  )}
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-300' : 'text-slate-400'}`} />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* System Modules */}
        <div className="pt-4 border-t border-white/[0.06]">
          <h3 className="px-3 font-mono font-semibold text-slate-500 uppercase text-[10px] tracking-widest mb-2">
            System Modules
          </h3>
          <nav className="space-y-1">
            {systemLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={onItemClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/25 to-blue-600/10 text-white border border-indigo-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-indigo-400" />
                  )}
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-300' : 'text-slate-400'}`} />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Quick Links */}
      <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
        <Link
          to="/leaderboard"
          onClick={onItemClick}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10 transition-colors"
        >
          <Trophy className="w-4 h-4 shrink-0" />
          <span>View Live Leaderboard</span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400/90 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button (visible < lg) */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open Admin Menu"
        className="lg:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-2xl shadow-purple-900/50 border border-white/20"
      >
        <Menu className="w-4 h-4" />
        <span>Admin Menu</span>
      </button>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] h-full bg-[#090B12] border-r border-white/10 p-4 overflow-y-auto z-10">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close Admin Menu"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="pt-2 h-full">{renderNavContent(() => setMobileOpen(false))}</div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[#070910]/90 backdrop-blur-xl border-r border-white/[0.08] p-4 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
        {renderNavContent(undefined)}
      </aside>
    </>
  );
}
export default AdminSidebar;
