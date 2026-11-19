import React from 'react';
import { QrCode, Cpu, ShieldCheck, Zap, Database, Trophy, ArrowRight } from 'lucide-react';

export function AboutSection({ onOpenRegister }) {
  return (
    <section id="about" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#030305] overflow-hidden select-none">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 font-mono text-[11px] uppercase tracking-[0.25em] mb-4">
            <Zap className="w-3.5 h-3.5 text-pink-400" /> EVENT ARCHITECTURE & CONCEPT
          </div>
          <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            WHAT IS <span className="text-gradient-purple">SAMVITYA 2026?</span>
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
            samVITya is VIT-AP's flagship technical points arena designed with a contract-first distributed architecture. Hundreds of participants compete simultaneously across online speed quizzes and offline physical arena stations, with instant scores processed into an immutable PostgreSQL ledger.
          </p>
        </div>

        {/* 3 Pillars of the System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1: Digital QR Passport */}
          <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
            <div className="tech-corner-tl border-purple-400"></div>
            <div className="tech-corner-br border-pink-400"></div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block mb-1">01 • Identity</span>
            <h3 className="font-sans font-bold text-xl text-white uppercase tracking-tight mb-3">
              One QR Code. Universal Entry.
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Every participant receives a persistent <code className="text-pink-300 font-mono">EVT26-Pxxxx</code> identification code. Returning participants are recognized instantly via cookies or verified email lookup without duplicate sign-ups.
            </p>
          </div>

          {/* Pillar 2: Hybrid Quiz & Arena Scoring */}
          <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
            <div className="tech-corner-tl border-pink-400"></div>
            <div className="tech-corner-br border-amber-400"></div>
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs text-pink-400 uppercase tracking-widest block mb-1">02 • Competition</span>
            <h3 className="font-sans font-bold text-xl text-white uppercase tracking-tight mb-3">
              Hybrid Online & Offline Arena
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Participate in rapid-fire online quizzes powered by provider-agnostic adapters or tackle physical campus booth stations like the Robotics Maze and Hardware Quest awarded by authorized referees.
            </p>
          </div>

          {/* Pillar 3: Immutable Realtime Ledger */}
          <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
            <div className="tech-corner-tl border-amber-400"></div>
            <div className="tech-corner-br border-emerald-400"></div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-1">03 • Integrity</span>
            <h3 className="font-sans font-bold text-xl text-white uppercase tracking-tight mb-3">
              Zero-Mutation Transaction Ledger
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Total points are never directly mutated. Every point award or penalty is saved as an immutable transaction. Sub-second WebSocket channels stream recalculated ranks directly to the projector screens.
            </p>
          </div>

        </div>

        {/* Banner CTA inside About */}
        <div className="mt-12 sm:mt-16 rounded-2xl bg-gradient-to-r from-purple-900/40 via-pink-900/20 to-black/60 border border-purple-500/30 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              Ready to claim your standing on the podium?
            </h4>
            <p className="text-sm text-gray-300 max-w-xl">
              Grab your digital badge now. Compete across 15+ challenges, earn verified points, and lock in your top ranking.
            </p>
          </div>
          <button
            onClick={onOpenRegister}
            className="flex-shrink-0 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Get Your QR Badge</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
