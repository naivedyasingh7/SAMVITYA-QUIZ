import React, { useState } from 'react';
import { X, ArrowUpRight, Shield, QrCode, Trophy, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeaderNav({ onOpenRegister }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-[100] isolate h-24 w-full overflow-hidden px-6 sm:px-8 md:h-32 md:px-14 flex justify-between items-center pointer-events-none">
        
        {/* Left Side: Brand Mark + Divider + MENU Trigger */}
        <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto mix-blend-difference">
          {/* Geometric SVG Brand Logo */}
          <Link
            to="/"
            aria-label="Home"
            className="group flex items-center justify-center text-white hover:opacity-85 transition-opacity"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white transition-transform group-hover:scale-105"
              viewBox="0 0 895 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H335.426L559.574 400.568L895 1000H559.574L335.426 599.432L0 0Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M335.426 1000H0L335.426 599.432V1000Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M559.574 0H895L559.574 400.568V0Z" />
            </svg>
          </Link>

          {/* Vertical Hairline Divider */}
          <div className="h-6 sm:h-7 w-[1px] bg-white/40"></div>

          {/* HackX Signature Animated MENU Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-10 group flex items-center gap-2.5 justify-center text-white hover:opacity-85 transition-opacity outline-none select-none cursor-pointer"
            aria-label="Open Menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
              <span
                className={`absolute w-4 h-[0.75px] bg-white transition-transform duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                }`}
              ></span>
              <span
                className={`absolute w-4 h-[0.75px] bg-white transition-transform duration-300 ${
                  menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                }`}
              ></span>
            </div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold font-sans h-4 flex items-center overflow-hidden relative select-none">
              <span className="block uppercase transition-transform group-hover:-translate-y-0.5">
                {menuOpen ? 'CLOSE' : 'MENU'}
              </span>
            </span>
          </button>
        </div>

        {/* Right Side: Quick Action Link */}
        <div className="flex items-center gap-4 pointer-events-auto mix-blend-difference">
          <a
            href="#leaderboard"
            className="relative z-10 group/btn font-sans text-xs md:text-sm font-normal tracking-tight text-white hover:opacity-85 transition-opacity flex items-center gap-1.5"
          >
            <span>Live Leaderboard</span>
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          </a>
        </div>
      </header>

      {/* Full-Screen Menu Overlay (HackX Signature Fullscreen Menu) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[95] bg-[#05000d]/95 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-14 md:p-20 text-white animate-in fade-in duration-300 select-none overflow-y-auto">
          {/* Top Bar inside Overlay */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-gray-400 uppercase border-b border-white/10 pb-6">
            <span>VIT B UNIVERSITY • Protocol Zero 2026</span>
            <span className="text-pink-400">ARENA NAVIGATION</span>
          </div>

          {/* Giant Menu Links */}
          <nav className="flex flex-col gap-4 sm:gap-6 my-auto font-sans font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none">
            <a
              href="#stats-archive-page"
              onClick={() => setMenuOpen(false)}
              className="hover:text-purple-400 transition-colors flex items-center gap-4 group"
            >
              <span className="font-mono text-sm sm:text-xl font-normal text-gray-500 group-hover:text-purple-400">01</span>
              <span>OVERVIEW & STATS</span>
            </a>
            <a
              href="#register"
              onClick={() => {
                setMenuOpen(false);
                onOpenRegister?.();
              }}
              className="hover:text-pink-400 transition-colors flex items-center gap-4 group"
            >
              <span className="font-mono text-sm sm:text-xl font-normal text-gray-500 group-hover:text-pink-400">02</span>
              <span>QR REGISTRATION</span>
            </a>
            <a
              href="#sdg-section"
              onClick={() => setMenuOpen(false)}
              className="hover:text-purple-400 transition-colors flex items-center gap-4 group"
            >
              <span className="font-mono text-sm sm:text-xl font-normal text-gray-500 group-hover:text-purple-400">03</span>
              <span>THE 6 MODULES</span>
            </a>
            <a
              href="#activities"
              onClick={() => setMenuOpen(false)}
              className="hover:text-pink-400 transition-colors flex items-center gap-4 group"
            >
              <span className="font-mono text-sm sm:text-xl font-normal text-gray-500 group-hover:text-pink-400">04</span>
              <span>ACTIVITIES & QUIZZES</span>
            </a>
            <a
              href="#leaderboard"
              onClick={() => setMenuOpen(false)}
              className="hover:text-purple-400 transition-colors flex items-center gap-4 group"
            >
              <span className="font-mono text-sm sm:text-xl font-normal text-gray-500 group-hover:text-purple-400">05</span>
              <span>LIVE LEADERBOARD</span>
            </a>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="hover:text-amber-400 transition-colors flex items-center gap-4 group"
            >
              <span className="font-mono text-sm sm:text-xl font-normal text-gray-500 group-hover:text-amber-400">06</span>
              <span>ADMIN & REFEREE HUB</span>
            </Link>
          </nav>

          {/* Bottom Footer Info inside Menu */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-gray-500 pt-6 border-t border-white/10">
            <div>DEPARTMENT OF COMPUTER SCIENCE & ENGG • SCSE FOSTA</div>
            <div className="flex items-center gap-6 text-gray-300">
              <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-white">Architecture</a>
              <a href="#timeline" onClick={() => setMenuOpen(false)} className="hover:text-white">Schedule</a>
              <a href="#faq" onClick={() => setMenuOpen(false)} className="hover:text-white">FAQ</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
