import React, { useState } from 'react';
import { Users, Layers, Trophy, ArrowRight } from 'lucide-react';

export function StatsArchiveSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const stats = [
    {
      num: '1',
      title: 'participants',
      metric: '1,200+',
      label: 'Active Competitors',
      desc: 'Individual registration via secure QR code passports. Automated recognition of returning participants with personal point ledgers.',
      color: 'from-purple-900/60 via-purple-950/40 to-black',
      icon: Users,
      tag: '01 • Identity & Scale'
    },
    {
      num: '2',
      title: 'modules',
      metric: '6 Teams',
      label: 'Contract-First Monorepo',
      desc: 'Independent development modules owned by Srikirti, Suvradeep, Ashwin, Divya, Priyansh, and Naivedya integrated on develop.',
      color: 'from-pink-900/60 via-pink-950/40 to-black',
      icon: Layers,
      tag: '02 • Engineering Pillars'
    },
    {
      num: '3',
      title: 'challenges',
      metric: '15+ Tasks',
      label: 'Online & Offline Hubs',
      desc: 'Rapid-fire speed quizzes, physical robotics obstacle tracks, and booth stations, all scored automatically in real-time.',
      color: 'from-amber-900/60 via-amber-950/40 to-black',
      icon: Trophy,
      tag: '03 • Competition Scope'
    }
  ];

  return (
    <section className="relative w-full bg-transparent overflow-hidden py-16 sm:py-24" id="stats-archive-page">
      <div className="relative w-full min-h-[580px] sm:min-h-[680px] md:min-h-[750px] overflow-hidden flex items-center justify-center">
        
        {/* Giant Number in Background (Exact HackX 4.0 Style) */}
        <div className="absolute left-4 sm:left-16 md:left-24 lg:left-36 bottom-[2vh] md:bottom-[3vh] lg:bottom-[4vh] z-10 flex items-end pointer-events-none select-none text-[#f4efe2]/15">
          <span className="font-sans font-medium text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[15vw] leading-none">
            0
          </span>
          <div className="relative font-sans font-medium text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[15vw] leading-none h-[1em] w-[0.7em] overflow-hidden">
            <div className="absolute bottom-0 left-0 font-sans font-medium text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[15vw] leading-none transition-all duration-500">
              {stats[activeIndex].num}
            </div>
          </div>
        </div>

        {/* Left Navigation Rail (Exact HackX 4.0 Rail Layout) */}
        <nav
          className="absolute left-3 sm:left-6 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 sm:gap-4 font-sans text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] select-none"
          aria-label="Stats Navigation Rail"
        >
          {stats.map((s, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="flex items-center gap-2 sm:gap-3 py-1.5 text-left group transition-all duration-300 pointer-events-auto cursor-pointer"
                aria-label={`Go to section 0${s.num} - ${s.title}`}
              >
                <span
                  className={`font-semibold transition-all duration-300 ${
                    isActive ? 'text-[#f4efe2] scale-125' : 'text-[#f4efe2]/30 group-hover:text-[#f4efe2]/70'
                  }`}
                >
                  {s.num}
                </span>
                <span
                  className={`font-serif italic lowercase text-xs sm:text-sm tracking-wider transition-all duration-500 overflow-hidden whitespace-nowrap ${
                    isActive
                      ? 'w-24 sm:w-32 opacity-100 text-[#faebac] translate-x-0'
                      : 'w-0 opacity-0 -translate-x-2'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Center Stacked Cards (Exact HackX Dimensions & Editorial Shadow) */}
        <div className="relative z-20 flex items-center justify-center select-none px-4">
          <div className="relative w-[260px] h-[330px] xs:w-[290px] xs:h-[370px] sm:w-[330px] sm:h-[420px] md:w-[380px] md:h-[460px] lg:w-[420px] lg:h-[500px]">
            {stats.map((item, idx) => {
              const isActive = activeIndex === idx;
              const Icon = item.icon;
              return (
                <article
                  key={idx}
                  onClick={() => setActiveIndex((idx + 1) % stats.length)}
                  className={`absolute inset-0 w-full h-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.75)] rounded-2xl border border-white/15 transition-all duration-700 ease-out p-6 sm:p-8 flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto z-20'
                      : 'opacity-0 scale-95 translate-y-6 pointer-events-none z-10'
                  } bg-gradient-to-b ${item.color} backdrop-blur-2xl`}
                >
                  {/* Tech Corner Markers */}
                  <span className="tech-corner-tl border-white/50"></span>
                  <span className="tech-corner-tr border-white/50"></span>
                  <span className="tech-corner-bl border-white/50"></span>
                  <span className="tech-corner-br border-white/50"></span>

                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-purple-300 font-bold">
                        {item.tag}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight block">
                      {item.metric}
                    </span>
                    <span className="font-sans font-bold text-sm sm:text-base uppercase tracking-wider text-amber-300 block mt-1">
                      {item.label}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-3 border-t border-white/10">
                      <span>Click card to cycle</span>
                      <span className="text-purple-300 font-bold">Next →</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
