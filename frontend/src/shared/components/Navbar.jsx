import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Shield, FileText, Trophy, LogOut } from 'lucide-react';

export function Navbar({ title = "Event Points System" }) {
  const { currentUser, role, isAdmin, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isQuizActive = location.pathname.startsWith('/quiz-session') || location.pathname.startsWith('/quiz-simulation');
  const isLeaderboardActive = location.pathname === '/leaderboard';
  const isAdminActive = location.pathname.startsWith('/admin/quiz-manager') || location.pathname.startsWith('/quiz-integrations');

  return (
    <nav className="sticky top-0 z-50 bg-[#080b11]/80 backdrop-blur-xl border-b border-white/[0.08] px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-200 group-hover:border-white/20 transition-colors">
              <span className="font-mono text-xs font-semibold">EP</span>
            </div>
            <span className="font-semibold text-sm text-slate-100 tracking-tight">
              {title}
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1.5 text-xs font-medium">
          <Link
            to="/quiz-session"
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${isQuizActive
              ? 'bg-white/[0.08] text-white border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
          >
            <FileText className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Take Quiz</span>
          </Link>
          <Link
            to="/leaderboard"
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${isLeaderboardActive
              ? 'bg-white/[0.08] text-white border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
          >
            <Trophy className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Leaderboard</span>
          </Link>

          {/* Admin Link */}
          <Link
            to="/admin/quiz-manager"
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${isAdminActive
              ? 'bg-indigo-500/15 text-indigo-200 border border-indigo-500/30 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
          >
            <Shield className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Admin Quiz Manager</span>
          </Link>
        </div>

        {/* User Session Profile & Controls */}
        <div className="flex items-center gap-3 pl-3 border-l border-white/[0.08]">
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-medium text-slate-200 block leading-tight">
                  {currentUser.name || 'User'}
                </span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md inline-block mt-0.5 bg-white/[0.05] border border-white/10 text-slate-400">
                  {isAdmin ? 'ADMINISTRATOR' : (currentUser.code || 'PARTICIPANT')}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs px-2.5 py-1.5 rounded-md font-medium border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                title="Sign out of this session"
              >
                <LogOut className="w-3 h-3 stroke-[1.75]" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/register"
                className="text-xs px-3 py-1.5 rounded-md font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 transition-colors"
              >
                Participant Sign In
              </Link>
              <Link
                to="/admin/login"
                className="text-xs px-3 py-1.5 rounded-md font-medium bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3 h-3 stroke-[1.75]" />
                <span>Admin Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
