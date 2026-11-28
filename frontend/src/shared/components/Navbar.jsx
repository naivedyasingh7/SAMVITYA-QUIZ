import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { PlayCircle, Shield, Award, LogOut, Home, Menu, X } from 'lucide-react';

export function Navbar() {
  const { currentUser, isAdmin, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isQuizActive = location.pathname.includes('/quiz');
  const isLeaderboardActive = location.pathname.includes('/leaderboard');
  const isAdminActive = location.pathname.includes('/admin');

  const navLinks = [
    { to: '/', label: 'Home', icon: Home, active: location.pathname === '/' },
    { to: '/leaderboard', label: 'Leaderboard', icon: Award, active: isLeaderboardActive },
    { to: '/quiz-simulation', label: 'Online Quiz Centre', icon: PlayCircle, active: isQuizActive && !isAdminActive },
    { to: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield, active: isAdminActive }
  ];

  return (
    <nav className="glass-surface sticky top-0 z-40 border-b border-white/[0.08] backdrop-blur-md px-3 sm:px-8 py-2.5 sm:py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Logo link to Home */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-white font-bold text-sm tracking-tight hover:opacity-90 transition-opacity min-w-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white font-black text-xs shrink-0">
              PZ
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase font-space bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent truncate">
                Protocol Zero &apos;26
              </span>
              <span className="hidden sm:block text-[10px] text-purple-300/70 font-mono tracking-widest uppercase">
                Championship Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2 text-xs font-medium">
          {navLinks.map(({ to, label, icon: Icon, active }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                active
                  ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* User Session Profile & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-white/[0.08] shrink-0">
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-medium text-slate-200 block leading-tight">
                  {currentUser.name || 'User'}
                </span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md inline-block mt-0.5 bg-white/[0.05] border border-white/10 text-slate-400">
                  {isAdmin ? 'ADMINISTRATOR' : (currentUser.code || currentUser.teamUsername || 'PARTICIPANT')}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs px-2.5 py-1.5 rounded-md font-medium border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                title="Sign out of this session"
              >
                <LogOut className="w-3 h-3 stroke-[1.75]" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to="/register"
                className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-md font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/admin/login"
                className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-md font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border border-purple-400/30 transition-all shadow-md shadow-purple-600/20 flex items-center gap-1"
              >
                <Shield className="w-3 h-3 stroke-[1.75]" />
                <span>Admin</span>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.1]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-1.5 text-xs font-medium">
          {navLinks.map(({ to, label, icon: Icon, active }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                active
                  ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-4 h-4 stroke-[1.75]" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
export default Navbar;
