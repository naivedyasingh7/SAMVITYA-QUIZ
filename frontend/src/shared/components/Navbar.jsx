import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Trophy, Shield, Cpu, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar({ onOpenRegister, onOpenSimulator }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          scrolled
            ? 'bg-[#0a0a14]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-white/[0.03] backdrop-blur-md border border-white/[0.08]'
        }`}
      >
        {/* Logo / Event Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#030305] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-sans font-black tracking-wider text-base sm:text-lg text-[#FAF8F5] uppercase">
                sam<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-extrabold">VIT</span>ya
              </span>
              <span className="hidden sm:inline-block font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                '26
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Arena Live</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 font-sans text-xs tracking-[0.15em] uppercase text-gray-300 font-semibold">
          <a href="#about" className="hover:text-pink-300 transition-colors">
            About
          </a>
          <a href="#modules" className="hover:text-purple-300 transition-colors">
            6 Modules
          </a>
          <a href="#activities" className="hover:text-pink-300 transition-colors">
            Activities
          </a>
          <a href="#leaderboard" className="hover:text-purple-300 transition-colors">
            Leaderboard
          </a>
          <a href="#architecture" className="hover:text-pink-300 transition-colors">
            Architecture
          </a>
          <a href="#timeline" className="hover:text-pink-300 transition-colors">
            Timeline
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenRegister}
            className="relative group overflow-hidden rounded-full p-[1px] font-sans font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 active:scale-95 shadow-lg shadow-purple-500/20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 group-hover:opacity-90 transition-opacity"></span>
            <span className="relative flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#07070e] transition-colors group-hover:bg-transparent">
              <QrCode className="w-3.5 h-3.5 text-pink-400 group-hover:text-white transition-colors" />
              <span className="hidden xs:inline">QR Check-In</span>
              <span className="xs:hidden">Check-In</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>

          <Link
            to="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 text-gray-300 hover:text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>Admin</span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto rounded-2xl bg-[#0a0a14]/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl flex flex-col gap-4 text-sm font-sans uppercase tracking-widest text-gray-300 font-medium animate-in fade-in slide-in-from-top-4 duration-200">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:text-pink-300 hover:bg-white/5 rounded-lg transition-colors"
          >
            About Event
          </a>
          <a
            href="#modules"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:text-purple-300 hover:bg-white/5 rounded-lg transition-colors"
          >
            The 6 Modules
          </a>
          <a
            href="#activities"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:text-pink-300 hover:bg-white/5 rounded-lg transition-colors"
          >
            Activities & Quizzes
          </a>
          <a
            href="#leaderboard"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:text-purple-300 hover:bg-white/5 rounded-lg transition-colors"
          >
            Live Leaderboard
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:text-pink-300 hover:bg-white/5 rounded-lg transition-colors"
          >
            System Architecture
          </a>
          <a
            href="#timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:text-purple-300 hover:bg-white/5 rounded-lg transition-colors"
          >
            Event Timeline
          </a>
          <div className="pt-2 border-t border-white/10 flex gap-2">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-bold"
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
