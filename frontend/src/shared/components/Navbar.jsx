import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { PlayCircle, Shield, Award, Users, LogOut, ArrowLeft, Home } from 'lucide-react';

export function Navbar() {
  const { currentUser, role, isAdmin, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isQuizActive = location.pathname.includes('/quiz');
  const isLeaderboardActive = location.pathname.includes('/leaderboard');
  const isAdminActive = location.pathname.includes('/admin');

  return (
    <nav className="glass-surface sticky top-0 z-40 border-b border-white/[0.08] backdrop-blur-md px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo link to Home */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-white font-bold text-sm tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white font-black text-xs">
              SV
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-wider uppercase font-space bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent">
                samVITya '26
              </span>
              <span className="text-[10px] text-purple-300/70 font-mono tracking-widest uppercase">
                Championship Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-2 text-xs font-medium">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              location.pathname === '/'
                ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Home className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Home</span>
          </Link>

          <Link
            to="/leaderboard"
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              isLeaderboardActive
                ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Award className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Leaderboard</span>
          </Link>

          <Link
            to="/quiz-simulation"
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              isQuizActive && !isAdminActive
                ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Online Quiz Centre</span>
          </Link>

          <Link
            to="/admin/dashboard"
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              isAdminActive
                ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Admin Dashboard</span>
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
                className="text-xs px-3 py-1.5 rounded-md font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border border-purple-400/30 transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5"
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
export default Navbar;
