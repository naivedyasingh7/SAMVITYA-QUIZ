import React from 'react';
import { Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export function EventTimeline() {
  const schedule = [
    {
      time: '09:00 AM - 10:00 AM',
      title: 'QR Code Registration & Onboarding',
      desc: 'Participants scan event QR, receive unique EVT26-Pxxxx passports, and calibrate their mobile dashboard.',
      status: 'Phase 1 Active',
      lead: 'Srikirti'
    },
    {
      time: '10:30 AM - 12:30 PM',
      title: 'Online Speed Quiz: Round 1',
      desc: 'Cyber Security & Algorithms trivia blitz. Live scoring engine computes proportional event points.',
      status: 'Phase 3 & 4 Active',
      lead: 'Ashwin & Divya'
    },
    {
      time: '01:30 PM - 03:30 PM',
      title: 'Physical Arena Challenge Stations',
      desc: 'Robotics Obstacle Maze and Hardware Quest. Station referees verify and award offline points.',
      status: 'Phase 2 Active',
      lead: 'Suvradeep'
    },
    {
      time: '04:00 PM - 05:00 PM',
      title: 'Grand Finale Quiz Sprint',
      desc: 'Final high-stakes quiz round. Real-time podium positions shift dynamically with every answered prompt.',
      status: 'All Modules Engaged',
      lead: 'Full Team'
    },
    {
      time: '05:30 PM',
      title: 'Leaderboard Freeze & Winner Announcement',
      desc: 'Administrative leaderboard freeze lock. Official announcement of Top 3 champions and distribution of ₹50K+ awards.',
      status: 'Phase 5 Climax',
      lead: 'Priyansh'
    }
  ];

  return (
    <section id="timeline" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#050508] overflow-hidden select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 font-mono text-[11px] uppercase tracking-[0.25em] mb-4">
            <Clock className="w-3.5 h-3.5 text-pink-400" /> EVENT DAY ROADMAP
          </div>
          <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            TIMELINE & <span className="text-gradient-purple">MILESTONES</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            The chronological flow from initial QR check-in to the final leaderboard freeze.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-pink-500 before:to-transparent">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Center Dot */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#030305] border-2 border-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.8)] z-10"></div>

              {/* Card Container */}
              <div className="w-full sm:w-[calc(50%-2rem)] pl-10 sm:pl-0">
                <div className="glass-card glass-card-hover p-6 rounded-2xl relative">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-pink-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {item.time}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                      {item.lead}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white uppercase tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-300 uppercase tracking-widest">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
