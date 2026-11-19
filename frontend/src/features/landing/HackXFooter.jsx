import React from 'react';

export function HackXFooter() {
  const team = [
    { name: 'Srikirti', role: 'Participant System', phone: '+91 98401 22341', email: 'srikirti@vitap.ac.in' },
    { name: 'Suvradeep', role: 'Admin & Operations', phone: '+91 87654 32190', email: 'suvradeep@vitap.ac.in' },
    { name: 'Ashwin', role: 'Quiz Integration', phone: '+91 91234 56789', email: 'ashwin@vitap.ac.in' },
    { name: 'Divya', role: 'Automatic Scoring', phone: '+91 99887 76655', email: 'divya@vitap.ac.in' },
    { name: 'Priyanshu', role: 'Leaderboard & Analytics', phone: '+91 97766 55443', email: 'priyanshu@vitap.ac.in' },
    { name: 'Naivedya', role: 'Testing & QA Suite', phone: '+91 94433 22110', email: 'naivedya@vitap.ac.in' }
  ];

  return (
    <footer
      className="relative z-20 w-full overflow-hidden select-none"
      style={{
        minHeight: '85vh',
        maxWidth: '1600px',
        margin: '0 auto',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 56px) clamp(24px, 3vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#FAF8F5'
      }}
    >
      {/* Top Hero Row (Exact HackX 4.0 Footer Row) */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 w-full relative z-10">
        
        {/* Giant Left Headline */}
        <div className="flex flex-col items-start gap-6 max-w-xl">
          <h2
            className="font-sans font-black uppercase text-white leading-[0.88] tracking-[-0.015em] m-0"
            style={{ fontSize: 'clamp(48px, 8.6vw, 128px)' }}
          >
            <span className="block">Let's</span>
            <span className="block">create</span>
            <span
              className="block font-serif lowercase"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '1.06em',
                letterSpacing: 0,
                color: '#f0abfc'
              }}
            >
              future
            </span>
            <span className="block">together</span>
          </h2>

          <div className="pt-4 border-t border-white/10 w-full">
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-1">
              Contact us
            </p>
            <a
              href="mailto:samvitya@vitap.ac.in"
              className="font-mono text-sm sm:text-base text-purple-300 hover:text-white transition-colors"
            >
              samvitya@vitap.ac.in
            </a>
          </div>
        </div>

        {/* Right 2-Column Team Grid (Exact HackX 4.0 Layout) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-8 w-full lg:w-auto lg:ml-auto"
          style={{ maxWidth: '580px' }}
        >
          {team.map((member, i) => (
            <div key={i} className="text-left font-sans">
              <p
                className="font-bold text-white mb-1.5"
                style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}
              >
                {member.name}
              </p>
              <p className="font-mono text-xs text-purple-300/80 mb-1">{member.role}</p>
              <p className="font-mono text-xs text-gray-400 mb-1">{member.phone}</p>
              <a
                href={`mailto:${member.email}`}
                className="font-mono text-xs text-gray-500 hover:text-pink-300 transition-colors block truncate"
              >
                {member.email}
              </a>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Bar: Copyright & Socials */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-12 sm:pt-16 border-t border-white/10 mt-16 text-xs font-mono text-gray-500">
        <div>
          © 2026 samVITya Event Points Management System. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Instagram
          </a>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">VIT-AP University</span>
        </div>
      </div>

    </footer>
  );
}
