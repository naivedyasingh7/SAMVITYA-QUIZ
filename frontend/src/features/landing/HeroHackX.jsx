import React from 'react';
import { QrCode, Trophy, ArrowRight, Play, Shield, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroHackX({ onOpenRegister, onOpenSimulator, onOpenEventQR }) {
  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-14 pt-24 pb-16 select-none">
      
      {/* Central H1 Stack (Exact HackX 4.0 Layout & Styling) */}
      <h1
        className="flex flex-col items-center justify-center font-sans font-medium uppercase tracking-normal leading-[0.85] text-center text-[#FAF8F5] max-w-5xl mx-auto w-full"
        style={{ fontSize: 'clamp(1.8rem, 5.4vw, 5.6rem)' }}
      >
        {/* 1. Top Glassmorphic Pill */}
        <div className="overflow-visible pb-1 sm:pb-2">
          <div className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 md:px-8 md:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md text-[0.26em] md:text-[0.22em] tracking-[0.15em] uppercase">
            <span className="text-center font-sans font-semibold uppercase tracking-wide text-[#FAF8F5] whitespace-normal sm:whitespace-nowrap max-w-[85vw] sm:max-w-none leading-tight text-[11px] sm:text-[13px] md:text-[15px]">
              DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING, SCSE, FOSTA
            </span>
          </div>
        </div>

        {/* 2. Corner Bracket Framed "PRESENTS" */}
        <div className="overflow-visible pt-1 pb-2 md:pt-2 md:pb-3 mt-1 sm:mt-2">
          <div className="relative inline-flex items-center justify-center px-3 py-1.5 md:px-5 md:py-2">
            <span className="absolute left-0 top-0 h-2 w-2 md:h-2.5 md:w-2.5 border-t-[3px] border-l-[3px] border-white"></span>
            <span className="absolute right-0 top-0 h-2 w-2 md:h-2.5 md:w-2.5 border-t-[3px] border-r-[3px] border-white"></span>
            <span className="absolute left-0 bottom-0 h-2 w-2 md:h-2.5 md:w-2.5 border-b-[3px] border-l-[3px] border-white"></span>
            <span className="absolute right-0 bottom-0 h-2 w-2 md:h-2.5 md:w-2.5 border-b-[3px] border-r-[3px] border-white"></span>
            <span className="font-sans font-bold uppercase tracking-[0.3em] text-[#FAF8F5] text-[12px] sm:text-[14px] md:text-[16px]">
              PRESENTS
            </span>
          </div>
        </div>

        {/* 3. Main Brand Logotype with Floating Circular Prize Badge */}
        <div className="overflow-visible py-1 sm:py-2 w-full">
          <div className="relative inline-block w-full max-w-[760px] mx-auto">
            
            {/* Bold Stylized Geometric SVG Logotype for Protocol Zero */}
            <div className="w-[85vw] max-w-[620px] md:w-[60vw] md:max-w-[760px] mx-auto my-2">
              <svg
                viewBox="0 0 800 170"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto select-none pointer-events-none drop-shadow-[0_0_35px_rgba(168,85,247,0.3)]"
              >
                <text
                  x="50%"
                  y="56%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="url(#ProtocolZeroGradient)"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    fontSize: '82px',
                    letterSpacing: '0.05em'
                  }}
                >
                  PROTOCOL ZERO
                </text>
                <defs>
                  <linearGradient id="ProtocolZeroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#FAF8F5" />
                    <stop offset="75%" stopColor="#E0C3FC" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Floating Circular Prize Badge (Exact HackX 4.0 Style) */}
            <div className="absolute -top-3 right-0 sm:-top-4 sm:-right-4 md:-top-4 md:right-[5%] z-30">
              <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-[#8b7a9f]/25 backdrop-blur-md border border-white/15 lg:h-24 lg:w-24 shadow-md transition-transform hover:scale-110">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-white transform text-base font-extrabold lg:text-2xl tracking-tight">
                    ₹50K+
                  </span>
                  <span className="text-[8px] lg:text-[10px] font-mono text-purple-200 uppercase font-bold">
                    10K PTS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Hairline Accent Line with Instrument Serif Italic Phrase */}
        <div className="overflow-visible pb-3 w-full -mt-1 sm:-mt-4 md:-mt-6 px-2">
          <div className="flex items-center justify-center sm:justify-between w-full gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="hidden sm:block h-[1.5px] flex-1 bg-[#F0ABFC]"></div>
            <span className="font-serif italic font-normal normal-case tracking-wide text-sm sm:text-2xl md:text-3xl lg:text-[2.2rem] leading-snug sm:leading-normal text-white whitespace-normal sm:whitespace-nowrap text-center pt-0.5 pb-2 sm:pr-4 inline-block">
              Real-Time Participant Management + Gamification
            </span>
          </div>
        </div>

      </h1>

      {/* Prominent Flow Choice: "Are you an Admin or Participant?" */}
      <div className="mt-8 max-w-3xl w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left z-20">
        {/* Participant Portal Option */}
        <div className="glass-surface p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400/60 transition-all shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
              PARTICIPANT
            </span>
            <Users className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-lg font-black text-white font-space tracking-tight">
            Participant Portal
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Open the site to receive your unique <strong>P00x</strong> ID, play the 10-question Online Quiz, and track your offline game check-offs and leaderboard rank.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all flex items-center gap-1.5"
            >
              <span>Enter as Participant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Admin Portal Option */}
        <div className="glass-surface p-6 rounded-2xl border border-indigo-500/30 hover:border-indigo-400/60 transition-all shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
              ADMINISTRATOR
            </span>
            <Shield className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-lg font-black text-white font-space tracking-tight">
            Admin Operations Portal
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Admin login required. View all participant IDs with their points, tick off offline games they play, and award offline game points live.
          </p>
          <div className="pt-1">
            <Link
              to="/admin/login"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all inline-flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Fast Action CTAs */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 z-20">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-5 py-2.5 backdrop-blur-md text-xs font-bold text-white hover:bg-white/10 transition-all"
        >
          <Users className="w-3.5 h-3.5 text-purple-300" />
          <span>My Participant Dashboard</span>
        </Link>

        <Link
          to="/quiz-simulation"
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-600/15 px-5 py-2.5 backdrop-blur-md text-xs font-mono text-purple-200 hover:bg-purple-600/25 transition-all"
        >
          <Play className="w-3 h-3 text-pink-400" />
          <span>Online Quiz Centre</span>
        </Link>

        <Link
          to="/leaderboard"
          className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 backdrop-blur-md text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition-all"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Live Leaderboard</span>
        </Link>
      </div>

    </section>
  );
}
export default HeroHackX;
