import React, { useState } from 'react';
import { Gamepad2, Play, Trophy, Users, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export function ActivitiesShowcase({ onLaunchActivity }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const activities = [
    {
      id: 'act-01',
      title: 'Cyber Security & Crypto Trivia',
      type: 'online_quiz',
      category: 'Online Speed Quiz',
      maxPoints: 1000,
      duration: '10 Mins',
      participants: 450,
      description: 'Test your knowledge on cryptography, network forensics, OWASP top 10, and modern cyber defense mechanisms.',
      status: 'Live Now',
      provider: 'Mock / Kahoot'
    },
    {
      id: 'act-02',
      title: 'Robo-Maze Obstacle Course',
      type: 'offline_game',
      category: 'Physical Booth Challenge',
      maxPoints: 500,
      duration: '5 Mins',
      participants: 120,
      description: 'Pilot physical micro-bots through an obstacle maze under 3 minutes. Points verified and awarded by arena referees.',
      status: 'Booth Station #1',
      provider: 'Referee Verification'
    },
    {
      id: 'act-03',
      title: 'Decentralized Web3 Puzzle',
      type: 'online_quiz',
      category: 'Online Speed Quiz',
      maxPoints: 800,
      duration: '15 Mins',
      participants: 310,
      description: 'Decode simulated smart contracts, identify re-entrancy bugs, and verify transaction hashes in our test environment.',
      status: 'Live Now',
      provider: 'Mock / Wayground'
    },
    {
      id: 'act-04',
      title: 'Fastest Typist Tech Sprint',
      type: 'offline_game',
      category: 'Physical Booth Challenge',
      maxPoints: 400,
      duration: '2 Mins',
      participants: 280,
      description: 'Speed code typing battle at the central arena station. High WPM combined with zero syntax errors wins maximum score.',
      status: 'Booth Station #2',
      provider: 'Referee Verification'
    },
    {
      id: 'act-05',
      title: 'Algorithm & Debugging Blitz',
      type: 'online_quiz',
      category: 'Online Speed Quiz',
      maxPoints: 1200,
      duration: '20 Mins',
      participants: 520,
      description: 'Rapid-fire algorithmic puzzle solver. Fix broken code snippets across C++, Python, and Java with highest accuracy.',
      status: 'Live Now',
      provider: 'Mock / External'
    },
    {
      id: 'act-06',
      title: 'Hardware Circuit Assembly Quest',
      type: 'offline_game',
      category: 'Physical Booth Challenge',
      maxPoints: 600,
      duration: '10 Mins',
      participants: 95,
      description: 'Assemble breadboard sensor circuits based on schematic diagrams. Inspected and approved by lab marshals.',
      status: 'Booth Station #3',
      provider: 'Referee Verification'
    }
  ];

  const filtered = activeFilter === 'all' ? activities : activities.filter(a => a.type === activeFilter);

  return (
    <section id="activities" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#030305] overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 font-mono text-[11px] uppercase tracking-[0.25em] mb-4">
              <Gamepad2 className="w-3.5 h-3.5 text-pink-400" /> ARENA COMPETITION TRACKS
            </div>
            <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              ACTIVITIES & <span className="text-gradient-purple">QUIZZES</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm max-w-xl">
              Compete in online speed quizzes or physical campus challenge booths. Points from all activities accumulate into your overall standing.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10 self-start md:self-auto font-sans text-xs uppercase font-bold tracking-wider">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeFilter === 'all' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Activities
            </button>
            <button
              onClick={() => setActiveFilter('online_quiz')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeFilter === 'online_quiz' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Online Quizzes
            </button>
            <button
              onClick={() => setActiveFilter('offline_game')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeFilter === 'offline_game' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Offline Booths
            </button>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity) => (
            <div
              key={activity.id}
              className="glass-card glass-card-hover rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden group"
            >
              {/* Tech Corner Accents */}
              <span className="tech-corner-tl border-purple-400/50"></span>
              <span className="tech-corner-br border-pink-400/50"></span>

              <div>
                {/* Status Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {activity.status}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" /> Max {activity.maxPoints} pts
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-lg text-white uppercase tracking-tight mb-2 group-hover:text-pink-300 transition-colors">
                  {activity.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {activity.description}
                </p>

                {/* Metadata tags */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-400 pt-3 border-t border-white/[0.06] mb-4">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Format:</span>
                    <span className="text-gray-200">{activity.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Est. Duration:</span>
                    <span className="text-gray-200">{activity.duration}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onLaunchActivity(activity)}
                className="w-full mt-2 py-2.5 rounded-xl bg-white/[0.05] hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white border border-white/10 hover:border-transparent text-gray-200 font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-600/20 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 text-pink-400 group-hover:text-white transition-colors" />
                <span>{activity.type === 'online_quiz' ? 'Launch Quiz Simulator' : 'Inspect Booth Details'}</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
