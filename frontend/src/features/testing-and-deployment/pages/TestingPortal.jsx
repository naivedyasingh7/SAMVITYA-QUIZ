import React from 'react';
import { TestingDashboard } from '../components/TestingDashboard.jsx';
import { Cpu, ShieldCheck, CheckCircle2, GitBranch, Terminal } from 'lucide-react';

export default function TestingPortal() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
            Quality Assurance & Verification Suite
          </span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight font-space">
          samVITya '26 Automated QA & Stress Testing Lab
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Execute multi-participant concurrency trials, stress test idempotency guards, seed test fixtures, and verify system integrity.
        </p>
      </div>

      {/* Health Metrics & Architecture Status */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Integration Status</span>
          <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>6 Modules Green</span>
          </div>
        </div>

        <div className="glass-card p-4 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Deduplication Guard</span>
          <div className="flex items-center gap-1.5 text-purple-300 text-sm font-bold font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict Idempotency</span>
          </div>
        </div>

        <div className="glass-card p-4 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Database Schema</span>
          <div className="flex items-center gap-1.5 text-indigo-300 text-sm font-bold font-mono">
            <Cpu className="w-4 h-4" />
            <span>11 Normalized Tables</span>
          </div>
        </div>

        <div className="glass-card p-4 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Monorepo Branches</span>
          <div className="flex items-center gap-1.5 text-amber-300 text-sm font-bold font-mono">
            <GitBranch className="w-4 h-4" />
            <span>6 Isolated Tracks</span>
          </div>
        </div>
      </div>

      {/* Interactive Testing Dashboard */}
      <TestingDashboard />
    </div>
  );
}
