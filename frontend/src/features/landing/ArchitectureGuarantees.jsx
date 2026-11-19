import React from 'react';
import { ShieldAlert, Database, Cpu, Lock, CheckCircle2, FileCode2 } from 'lucide-react';

export function ArchitectureGuarantees() {
  const guarantees = [
    {
      title: 'Zero-Mutation Points Ledger',
      icon: Database,
      tag: 'Integrity Rule #1',
      color: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      description: 'Scores are never stored as a mutable number that code can directly increment. Every change is an immutable row in points_transactions. Totals are always calculated from valid ledger entries.'
    },
    {
      title: 'Deduplication & Idempotency',
      icon: ShieldAlert,
      tag: 'Integrity Rule #2',
      color: 'border-pink-500/30 text-pink-400 bg-pink-500/10',
      description: 'Every external quiz result carries an external_result_id. The PostgreSQL database enforces a strict UNIQUE(activity_id, external_result_id) constraint to reject replay attacks and duplicate submissions.'
    },
    {
      title: 'Provider-Agnostic Adapters',
      icon: Cpu,
      tag: 'Integrity Rule #3',
      color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
      description: 'Third-party quiz platforms (Kahoot, Wayground, custom forms) are isolated behind a standardized BaseQuizProvider interface. Changing quiz engines requires zero edits to scoring or leaderboard code.'
    },
    {
      title: 'Database Row Level Security',
      icon: Lock,
      tag: 'Integrity Rule #4',
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description: 'Administrative actions (creating activities, manual offline adjustments, declaring winners) are strictly protected by backend JWT authentication and Supabase PostgreSQL RLS policies, not just hidden client buttons.'
    }
  ];

  return (
    <section id="architecture" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#030305] overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-[11px] uppercase tracking-[0.25em] mb-4">
            <FileCode2 className="w-3.5 h-3.5 text-cyan-400" /> SYSTEM ARCHITECTURE & CONTRACTS
          </div>
          <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            ENGINEERING <span className="text-gradient">GUARANTEES</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            How 6 independent developers work on 6 separate Git branches without code collisions or corrupt state.
          </p>
        </div>

        {/* 4 Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
              >
                {/* Tech Corner Markers */}
                <span className="tech-corner-tl border-white/40"></span>
                <span className="tech-corner-br border-white/40"></span>

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${item.color}`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-xl text-white uppercase tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
