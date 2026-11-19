import React from 'react';
import { QrCode, Trophy, ArrowRight, Zap, Play, Sparkles, Terminal } from 'lucide-react';

export function HeroSection({ onOpenRegister, onOpenSimulator }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 sm:pt-36 pb-16 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#030305] select-none">
      {/* Background Glows & Grids (HackX signature ambient lighting) */}
      <div className="absolute inset-0 bg-fine-grid pointer-events-none opacity-40"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] md:w-[900px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tr from-purple-700/20 via-pink-600/15 to-transparent blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-10 right-[10%] w-[250px] sm:w-[450px] h-[250px] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none"></div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Floating Pill Tag (Department of CSE • VIT-AP) */}
        <div className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-4 py-1.5 sm:px-6 sm:py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] mb-4 sm:mb-6 animate-in fade-in duration-500">
          <span className="font-sans font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#FAF8F5] text-[10px] sm:text-xs">
            DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING • VIT-AP UNIVERSITY
          </span>
        </div>

        {/* Tech Framed Corner Bracket "PRESENTS" */}
        <div className="relative inline-flex items-center justify-center px-4 py-1 sm:px-5 sm:py-1.5 mb-3 sm:mb-4">
          <span className="tech-corner-tl border-white"></span>
          <span className="tech-corner-tr border-white"></span>
          <span className="tech-corner-bl border-white"></span>
          <span className="tech-corner-br border-white"></span>
          <span className="font-sans font-bold uppercase tracking-[0.35em] text-[#FAF8F5] text-[11px] sm:text-xs text-purple-200">
            PRESENTS
          </span>
        </div>

        {/* Massive Main Title Container with Floating Circular Prize Badge */}
        <div className="relative my-2 sm:my-3">
          <h1
            className="font-sans font-black uppercase tracking-tight text-white leading-[0.88] text-center"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 8.5rem)' }}
          >
            <span className="block text-gradient">SAMVITYA</span>
            <span className="block text-gradient-purple -mt-1 sm:-mt-3">2026</span>
          </h1>

          {/* Floating Glassmorphic Circular Prize Badge (HackX signature circular badge) */}
          <div className="absolute -top-3 -right-2 sm:-top-5 sm:-right-6 md:-top-6 md:-right-10 z-20 animate-float">
            <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-purple-900/30 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.35)]">
              <div className="absolute inset-0 rounded-full border border-pink-400/30 animate-spin" style={{ animationDuration: '14s' }}></div>
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">Prize Pool</span>
                <span className="text-white text-xs sm:text-sm md:text-base font-black tracking-tight">₹50K+</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-pink-300">10K PTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Serif Accent Headline Divider (HackX style thin line with Instrument Serif text) */}
        <div className="flex items-center justify-between w-full max-w-3xl gap-3 sm:gap-6 mt-2 sm:mt-4 mb-6 sm:mb-8 px-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#f0abfc] to-[#f0abfc]"></div>
          <span className="font-serif italic font-normal text-xl sm:text-3xl md:text-4xl text-purple-200 whitespace-nowrap px-2 tracking-wide">
            The Ultimate Quiz & Points Championship!
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#f0abfc] via-[#f0abfc] to-transparent"></div>
        </div>

        {/* Narrative Description */}
        <p className="max-w-2xl text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-8 sm:mb-10 font-normal px-4">
          Experience VIT-AP's high-octane technical arena. Check in with your personalized QR badge, conquer live speed quizzes, tackle physical booth missions, and witness your rank rise in real-time.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full px-4">
          <button
            onClick={onOpenRegister}
            className="group relative overflow-hidden rounded-full p-[1.5px] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-white shadow-[0_0_35px_rgba(168,85,247,0.4)] active:scale-95 transition-all"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 group-hover:opacity-90 transition-opacity"></span>
            <span className="relative flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0a0a14] group-hover:bg-transparent transition-colors">
              <QrCode className="w-4 h-4 text-pink-400 group-hover:text-white transition-colors" />
              <span>Register with QR Code</span>
              <ArrowRight className="w-4 h-4 text-pink-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <a
            href="#leaderboard"
            className="flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-[#FAF8F5] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all backdrop-blur-md active:scale-95"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Live Leaderboard</span>
          </a>

          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-200 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 text-pink-400" />
            <span>Test Quiz Ingestion</span>
          </button>
        </div>

        {/* Live Metrics Rail */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl mt-14 sm:mt-20 pt-8 border-t border-white/[0.08]">
          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-gray-400">Total Participants</span>
            <span className="font-sans font-black text-2xl sm:text-3xl text-white mt-1 block">1,200+</span>
            <span className="text-[10px] font-mono text-purple-400">Live Registration Open</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-gray-400">Dev Modules</span>
            <span className="font-sans font-black text-2xl sm:text-3xl text-pink-400 mt-1 block">6 Teams</span>
            <span className="text-[10px] font-mono text-pink-300">Contract-First Design</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-gray-400">Quiz & Arena Stations</span>
            <span className="font-sans font-black text-2xl sm:text-3xl text-amber-400 mt-1 block">15+ Tasks</span>
            <span className="text-[10px] font-mono text-amber-300">Online & Offline Hubs</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-gray-400">Realtime Sync</span>
            <span className="font-sans font-black text-2xl sm:text-3xl text-emerald-400 mt-1 block">&lt; 100ms</span>
            <span className="text-[10px] font-mono text-emerald-300">WebSocket Channels</span>
          </div>
        </div>

      </div>
    </section>
  );
}
