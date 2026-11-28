import React from 'react';
import { Database, Cpu, Shield, Globe, Terminal, Code2, Cloud, Sparkles } from 'lucide-react';

export function PartnersMarqueeSection() {
  const partners = [
    { name: 'SUPABASE POSTGRESQL', category: 'Central Database & RLS' },
    { name: 'SUPABASE REALTIME', category: 'WebSocket PubSub Engine' },
    { name: 'SUPABASE EDGE FUNCTIONS', category: 'Serverless Deno Compute' },
    { name: 'REACT 18 & VITE', category: 'Client Framework' },
    { name: 'TAILWIND CSS', category: 'Styling & Design System' },
    { name: 'VIT B UNIVERSITY', category: 'Host Institution' },
    { name: 'SCSE FOSTA', category: 'Dept. of CSE Organizing Body' },
    { name: 'GITHUB MONOREPO', category: 'Version Control & CI/CD' }
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center bg-transparent text-white overflow-hidden select-none">
      
      {/* 1. Pill Header (Exact HackX) */}
      <div className="mb-3 sm:mb-4">
        <h3 className="font-sans font-bold uppercase tracking-[0.25em] text-xs sm:text-sm md:text-base text-white/80">
          OUR PARTNERS & INFRASTRUCTURE
        </h3>
      </div>

      {/* 2. Headline (Exact HackX 3-line stacked title) */}
      <h2 className="font-sans font-black uppercase text-center text-white tracking-tight leading-[1.05] text-[32px] sm:text-[42px] md:text-[54px] lg:text-[64px] max-w-5xl mb-10 md:mb-14 z-10">
        <span className="block text-gray-400">POWERED BY</span>
        <span className="block text-white">WORLD CLASS TECH</span>
        <span className="block text-gradient-purple">& PLATFORMS!</span>
      </h2>

      {/* 3. Multi-Row Infinite Marquee */}
      <div className="w-full relative z-10 overflow-hidden py-4 border-y border-white/[0.08] bg-black/30">
        <div className="flex w-max animate-marquee pause-hover">
          {[...partners, ...partners, ...partners].map((p, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 mx-6 sm:mx-8 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer whitespace-nowrap group hover:bg-white/[0.07]"
            >
              <div className="w-2 h-2 rounded-full bg-pink-400 group-hover:scale-150 transition-transform"></div>
              <div>
                <span className="font-sans font-black text-sm sm:text-base text-white tracking-wider block">
                  {p.name}
                </span>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
                  {p.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
