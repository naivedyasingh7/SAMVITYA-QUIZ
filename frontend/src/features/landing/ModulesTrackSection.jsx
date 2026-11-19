import React, { useState } from 'react';
import { UserCheck, Shield, Layers, Award, Trophy, CheckSquare, ArrowUpRight, Code, Database, ChevronRight } from 'lucide-react';

export function ModulesTrackSection() {
  const [activeTab, setActiveTab] = useState(0);

  const modules = [
    {
      phase: 'Phase 1',
      title: 'Participant System',
      lead: 'Srikirti',
      branch: 'feature/participant-system',
      icon: UserCheck,
      color: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      summary: 'Dynamic QR-code entry, persistent participant identity, returning recognition, and responsive mobile dashboard.',
      deliverables: [
        'QR registration generator & scanner',
        'Unique EVT26-Pxxxx participant code generator',
        'Returning participant detection & local wallet',
        'Personal points tally and activity history'
      ],
      contract: 'shared/contracts/participant.contract.md',
      tables: ['participants']
    },
    {
      phase: 'Phase 2',
      title: 'Admin System',
      lead: 'Suvradeep',
      branch: 'feature/admin-system',
      icon: Shield,
      color: 'from-pink-500/20 to-pink-600/5 border-pink-500/30 text-pink-400',
      badgeColor: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
      summary: 'Secure administrative authentication, participant roster management, activity CRUD, and offline points award console.',
      deliverables: [
        'Role-Based Admin Login (Supabase Auth)',
        'Participant search & qualification toggle',
        'Activity configuration (online/offline/bonus)',
        'Individual offline game point awarding with audit note'
      ],
      contract: 'shared/contracts/admin.contract.md',
      tables: ['admins', 'activities']
    },
    {
      phase: 'Phase 3',
      title: 'Quiz Integration Framework',
      lead: 'Ashwin',
      branch: 'feature/quiz-integration-framework',
      icon: Layers,
      color: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/30 text-cyan-400',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      summary: 'Provider-agnostic adapter framework supporting Mock simulation, Kahoot, and Wayground with attempt tracking.',
      deliverables: [
        'Extensible BaseQuizProvider abstract adapter',
        'Built-in MockQuizProvider for local & stress testing',
        'Participant attempt token generator (att-xxxx)',
        'Webhook ingestion mapping external scores to internal IDs'
      ],
      contract: 'shared/contracts/quiz.contract.md',
      tables: ['quiz_providers', 'quiz_integrations', 'quiz_attempts', 'quiz_results']
    },
    {
      phase: 'Phase 4',
      title: 'Automatic Scoring Engine',
      lead: 'Divya',
      branch: 'feature/automatic-scoring',
      icon: Award,
      color: 'from-amber-500/20 to-amber-600/5 border-amber-500/30 text-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      summary: 'Centralized points engine converting raw scores into event points, enforcing strict idempotency and audit trails.',
      deliverables: [
        'Incoming payload schema validator',
        'Idempotency guard on UNIQUE(activity_id, external_result_id)',
        'Activity-wise proportional scoring rules',
        'Immutable append-only points_transactions ledger'
      ],
      contract: 'shared/contracts/scoring.contract.md',
      tables: ['scoring_rules', 'points_transactions']
    },
    {
      phase: 'Phase 5',
      title: 'Live Leaderboard',
      lead: 'Priyanshu',
      branch: 'feature/leaderboard',
      icon: Trophy,
      color: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      summary: 'Sub-second real-time ranking table, Top 3 podium display, score category breakdown, and winner declaration freeze.',
      deliverables: [
        'Real-time WebSocket subscriptions on points_transactions',
        'Top 3 Gold/Silver/Bronze podium display',
        'Online vs offline points breakdown modal',
        'Admin winner declaration & leaderboard lock'
      ],
      contract: 'shared/contracts/leaderboard.contract.md',
      tables: ['leaderboard', 'winner_declarations']
    },
    {
      phase: 'Phase 6',
      title: 'Testing & Deployment',
      lead: 'Naivedya',
      branch: 'feature/testing-and-deployment',
      icon: CheckSquare,
      color: 'from-violet-500/20 to-violet-600/5 border-violet-500/30 text-violet-400',
      badgeColor: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
      summary: 'Multi-participant concurrency simulation, duplicate submission stress tests, mobile QA, and GitHub Actions CI/CD.',
      deliverables: [
        'End-to-End Registration-to-Leaderboard integration suite',
        'Concurrency stress testing (duplicate attempt rejection)',
        'Security testing (RBAC & RLS barrier verification)',
        'Automated GitHub Actions CI/CD deployment pipeline'
      ],
      contract: 'tests/README.md',
      tables: ['Full 11-table schema verification']
    }
  ];

  return (
    <section id="modules" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#050508] overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-pink-900/10 blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-mono text-[11px] uppercase tracking-[0.25em] mb-4">
            <Layers className="w-3.5 h-3.5 text-purple-400" /> 6 INDEPENDENT DEVELOPMENT MODULES
          </div>
          <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            THE 6 WORK <span className="text-gradient">PILLARS</span>
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            One shared repository, six independent development folders. Everyone builds against standardized contracts so that the modules combine seamlessly into a single production application.
          </p>
        </div>

        {/* 6 Module Cards Grid (HackX 'Our Themes' Inspired Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between group"
              >
                {/* Tech Corner Brackets */}
                <span className="tech-corner-tl border-white/40"></span>
                <span className="tech-corner-tr border-white/40"></span>
                <span className="tech-corner-bl border-white/40"></span>
                <span className="tech-corner-br border-white/40"></span>

                <div>
                  {/* Phase & Lead Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                      {mod.phase}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border font-mono text-[10px] font-bold uppercase tracking-wider ${mod.badgeColor}`}>
                      Owner: {mod.lead}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${mod.color} border flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white uppercase tracking-tight leading-snug">
                      {mod.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                    {mod.summary}
                  </p>

                  {/* Deliverables Bullet List */}
                  <div className="space-y-1.5 py-3 border-t border-white/[0.06] mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block mb-1">
                      Key Deliverables:
                    </span>
                    {mod.deliverables.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className="text-pink-400 font-bold">•</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Tables & Git Branch */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <div className="truncate pr-2">
                    <span className="text-gray-500">Branch: </span>
                    <code className="text-purple-300">{mod.branch}</code>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
