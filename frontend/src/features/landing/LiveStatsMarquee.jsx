import React from 'react';
import { Sparkles, Zap, Shield, Trophy, Cpu, Code2 } from 'lucide-react';

export function LiveStatsMarquee() {
  const tickerItems = [
    { text: '1,200+ REGISTERED PARTICIPANTS', icon: Sparkles, color: 'text-purple-400' },
    { text: 'SUB-SECOND REALTIME RANKINGS', icon: Zap, color: 'text-pink-400' },
    { text: 'IMMUTABLE AUDIT TRANSACTION LEDGER', icon: Shield, color: 'text-emerald-400' },
    { text: '10,000+ POINT PRIZE POOL', icon: Trophy, color: 'text-amber-400' },
    { text: '6 CONTRACT-FIRST MODULES', icon: Cpu, color: 'text-cyan-400' },
    { text: 'ZERO DUPLICATE IDEMPOTENT SCORING', icon: Code2, color: 'text-purple-300' }
  ];

  const reverseItems = [
    { text: 'VIT-AP ANNUAL TECHNICAL EXTRAVAGANZA', icon: Sparkles, color: 'text-pink-400' },
    { text: 'OFFLINE ROBOTICS & BOOTH CHALLENGES', icon: Cpu, color: 'text-amber-400' },
    { text: 'PROVIDER-AGNOSTIC QUIZ ADAPTERS', icon: Code2, color: 'text-cyan-400' },
    { text: 'AUTOMATED PROPORTIONAL SCORING', icon: Zap, color: 'text-emerald-400' },
    { text: 'SUPABASE POSTGRESQL + REALTIME', icon: Shield, color: 'text-purple-400' }
  ];

  return (
    <div className="w-full overflow-hidden bg-[#050508] border-y border-white/[0.08] py-4 select-none flex flex-col gap-3">
      {/* Track 1: Normal Direction */}
      <div className="flex w-max animate-marquee pause-hover">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 mx-4 sm:mx-6 font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] text-gray-300 whitespace-nowrap">
              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.text}</span>
              <span className="text-gray-600 font-bold">•</span>
            </div>
          );
        })}
      </div>

      {/* Track 2: Reverse Direction */}
      <div className="flex w-max animate-marquee-reverse pause-hover">
        {[...reverseItems, ...reverseItems, ...reverseItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 mx-4 sm:mx-6 font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-gray-400 whitespace-nowrap">
              <Icon className={`w-3 h-3 ${item.color}`} />
              <span>{item.text}</span>
              <span className="text-gray-700 font-bold">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
