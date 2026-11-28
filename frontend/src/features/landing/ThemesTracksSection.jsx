import React, { useState } from 'react';
import { UserCheck, Shield, Layers, Award, Trophy, CheckSquare, ArrowUpRight, Cpu } from 'lucide-react';

export function ThemesTracksSection() {
  const [selectedTrack, setSelectedTrack] = useState(0);

  const tracks = [
    {
      id: 'participant',
      name: 'Participant System',
      lead: 'Srikirti',
      phase: 'Phase 1',
      branch: 'feature/participant-system',
      icon: UserCheck,
      color: '#c084fc',
      tagline: 'QR Identification, Persistent Tokens & Mobile Passport',
      desc: 'Generates personal EVT26-Pxxxx QR identities, detects returning participants without duplicate logins, and powers the participant dashboard.',
      deliverables: [
        'Real-time QR generation & scanner',
        'Human-readable ID allocation',
        'Wallet session & local caching',
        'Personal points history viewer'
      ]
    },
    {
      id: 'admin',
      name: 'Admin & Referee Hub',
      lead: 'Suvradeep',
      phase: 'Phase 2',
      branch: 'feature/admin-system',
      icon: Shield,
      color: '#f472b6',
      tagline: 'Secure Supabase Auth, Participant Roster & Offline Points',
      desc: 'Administrative control center enforcing backend RLS policies. Enables station referees to award verified offline booth points to individual participants.',
      deliverables: [
        'Protected Admin Login (Supabase Auth)',
        'Participant management directory',
        'Activity CRUD and points configuration',
        'Referee offline score dispatch'
      ]
    },
    {
      id: 'quiz',
      name: 'Quiz Integration Engine',
      lead: 'Ashwin',
      phase: 'Phase 3',
      branch: 'feature/quiz-integration-framework',
      icon: Layers,
      color: '#38bdf8',
      tagline: 'Provider Adapters, Launch Tokens & Result Ingestion',
      desc: 'Decoupled adapter architecture supporting Kahoot, Wayground, and Mock simulators. Issues tracking attempt tokens (att-xxxx) and normalizes incoming scores.',
      deliverables: [
        'Extensible BaseQuizProvider adapter',
        'Built-in MockQuizProvider engine',
        'Attempt tracking session manager',
        'Webhook ingestion & participant matching'
      ]
    },
    {
      id: 'scoring',
      name: 'Automatic Scoring Engine',
      lead: 'Divya',
      phase: 'Phase 4',
      branch: 'feature/automatic-scoring',
      icon: Award,
      color: '#fbbf24',
      tagline: 'Idempotency Guard, Rule Math & Immutable Ledger',
      desc: 'Centralized mathematical scoring engine. Validates payloads, rejects duplicate external result IDs, and appends verified transactions to the ledger.',
      deliverables: [
        'Strict idempotency on external_result_id',
        'Proportional linear scoring rules',
        'Append-only points_transactions ledger',
        'Audit adjustment & correction log'
      ]
    },
    {
      id: 'leaderboard',
      name: 'Realtime Leaderboard',
      lead: 'Priyansh',
      phase: 'Phase 5',
      branch: 'feature/leaderboard',
      icon: Trophy,
      color: '#34d399',
      tagline: 'Top 3 Podium, Live WebSocket Sync & Winner Freeze',
      desc: 'Sub-second live rankings calculated from confirmed point transactions. Displays online vs. offline breakdowns and enables winner declaration freeze.',
      deliverables: [
        'WebSocket real-time subscription',
        'Top 3 Gold/Silver/Bronze podium',
        'Online vs offline points breakdown',
        'Admin winner declaration freeze'
      ]
    },
    {
      id: 'testing',
      name: 'Testing & QA Suite',
      lead: 'Naivedya',
      phase: 'Phase 6',
      branch: 'feature/testing-and-deployment',
      icon: CheckSquare,
      color: '#a78bfa',
      tagline: 'Multi-User Concurrency, Idempotency QA & CI/CD',
      desc: 'Comprehensive test harnesses verifying registration-to-leaderboard dataflows, anti-tamper constraints, and automated GitHub Actions CI pipelines.',
      deliverables: [
        'Cross-module integration test suite',
        'Concurrency duplicate submission test',
        'Security RLS boundary verification',
        'GitHub Actions automated CI pipeline'
      ]
    }
  ];

  const active = tracks[selectedTrack];
  const ActiveIcon = active.icon;

  return (
    <section id="sdg-section" className="w-full bg-transparent select-none overflow-hidden py-16 sm:py-24">
      
      {/* 1. Header with Badge */}
      <div className="text-center mb-8 sm:mb-12">
        <h2
          className="font-sans font-medium uppercase text-[24px] sm:text-[33px] md:text-[39px] tracking-widest text-[#f9f6f0] text-center whitespace-nowrap mb-2"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          OUR THEMES & MODULES
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-purple-200">
          Six independent engineering pillars powering the Protocol Zero arena
        </p>
      </div>

      {/* 2. Top Animated Horizontal Badge Marquee (Exact HackX Marquee) */}
      <div className="w-full overflow-hidden border-y border-white/[0.08] py-3.5 mb-12 sm:mb-16 bg-black/20">
        <div className="flex w-max animate-marquee pause-hover">
          {[...tracks, ...tracks, ...tracks].map((t, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTrack(idx % tracks.length)}
              className="flex items-center gap-3 mx-4 sm:mx-6 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-purple-400 transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }}></span>
              <span className="font-sans font-bold text-xs uppercase tracking-wider text-gray-200">
                {t.name}
              </span>
              <span className="font-mono text-[10px] text-gray-500">({t.lead})</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Split-Screen 3D Track Explorer (Exact HackX Desktop Layout) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Giant Track Titles List */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
            {tracks.map((track, idx) => {
              const isSelected = selectedTrack === idx;
              return (
                <div
                  key={track.id}
                  onClick={() => setSelectedTrack(idx)}
                  className={`font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-normal leading-[1.04] select-none cursor-pointer origin-left transition-all duration-300 flex items-center justify-between group py-1.5 ${
                    isSelected
                      ? 'text-white scale-[1.02] translate-x-2'
                      : 'text-gray-600 hover:text-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs sm:text-sm font-normal ${
                        isSelected ? 'text-pink-400' : 'text-gray-700'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span style={{ color: isSelected ? '#FAF8F5' : undefined }}>
                      {track.name}
                    </span>
                  </span>
                  {isSelected && (
                    <span className="font-mono text-xs uppercase font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 hidden sm:inline-block">
                      Lead: {track.lead}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Track Glass Card Preview */}
          <div className="lg:col-span-5">
            <div
              className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(24, 0, 56, 0.7), rgba(13, 0, 33, 0.8))'
              }}
            >
              {/* Tech Corner Accents */}
              <span className="tech-corner-tl border-white"></span>
              <span className="tech-corner-tr border-white"></span>
              <span className="tech-corner-bl border-white"></span>
              <span className="tech-corner-br border-white"></span>

              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-pink-400 font-bold">
                  {active.phase}
                </span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold border border-white/15">
                  Owner: {active.lead}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20 shadow-md"
                  style={{ backgroundColor: `${active.color}25`, color: active.color }}
                >
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                    {active.name}
                  </h3>
                  <span className="font-mono text-[11px] text-gray-400 block">{active.tagline}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed my-4">
                {active.desc}
              </p>

              {/* Deliverables List */}
              <div className="py-3 border-t border-white/10 space-y-1.5 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">
                  Key Deliverables:
                </span>
                {active.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300 font-medium">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Branch: <code className="text-purple-300">{active.branch}</code></span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
