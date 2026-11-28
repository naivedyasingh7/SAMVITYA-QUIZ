import React from 'react';
import { Mail, Phone, ExternalLink, Heart, Sparkles, Shield, Github, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const coordinators = [
    { name: 'Srikirti', role: 'Participant System Lead', email: 'srikirti@vitb.ac.in', phone: '+91 98401 22341' },
    { name: 'Suvradeep', role: 'Admin & Operations Lead', email: 'suvradeep@vitb.ac.in', phone: '+91 87654 32190' },
    { name: 'Ashwin', role: 'Quiz Integration Lead', email: 'ashwin@vitb.ac.in', phone: '+91 91234 56789' },
    { name: 'Divya', role: 'Automatic Scoring Lead', email: 'divya@vitb.ac.in', phone: '+91 99887 76655' },
    { name: 'Priyansh', role: 'Leaderboard & Analytics Lead', email: 'Priyansh@vitb.ac.in', phone: '+91 97766 55443' },
    { name: 'Naivedya', role: 'QA & Deployment Lead', email: 'naivedya@vitb.ac.in', phone: '+91 94433 22110' }
  ];

  return (
    <footer className="relative w-full bg-[#020204] border-t border-white/10 pt-20 sm:pt-28 pb-12 px-4 sm:px-6 md:px-12 select-none overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-purple-900/15 via-pink-900/10 to-transparent blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HackX Signature Giant Headline */}
        <div className="text-center mb-16 sm:mb-24">
          <h2
            className="font-sans font-black uppercase text-white leading-[0.88] tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 9.5vw, 7.5rem)' }}
          >
            <span className="block text-gray-400 opacity-90">LET'S BUILD</span>
            <span className="block text-gradient">FUTURE</span>
            <span className="block text-gradient-purple">TOGETHER.</span>
          </h2>
          <div className="mt-4 font-serif italic text-xl sm:text-2xl text-purple-300">
            Protocol Zero 2026 • Annual Technical Festival
          </div>
        </div>

        {/* 6 Coordinators Cards */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
              Engineering Leads & Module Owners
            </span>
            <span className="font-mono text-xs text-pink-400">VIT B SCSE FOSTA</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coordinators.map((c, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all hover:bg-white/[0.04]"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-sans font-bold text-base text-white">{c.name}</h4>
                    <p className="font-mono text-[11px] text-pink-300/80 mb-2">{c.role}</p>
                  </div>
                  <span className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-400 font-mono text-xs flex items-center justify-center font-bold">
                    0{i + 1}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-400 font-mono">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3 h-3 text-gray-500" />
                    <span>{c.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-gray-500" />
                    <span>{c.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Credits & Social Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © 2026 Protocol Zero Event Points Management System. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
            <a href="#modules" className="hover:text-pink-300 transition-colors">Architecture</a>
            <a href="#leaderboard" className="hover:text-purple-300 transition-colors">Leaderboard</a>
            <span className="text-gray-700">|</span>
            <span className="text-gray-400">VIT B University</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
