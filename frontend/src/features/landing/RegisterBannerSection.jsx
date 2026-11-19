import React from 'react';
import { ArrowRight, QrCode } from 'lucide-react';

export function RegisterBannerSection({ onOpenRegister }) {
  return (
    <section
      id="register"
      className="relative w-full overflow-hidden px-4 pt-4 pb-0 sm:px-8 md:px-16 md:pt-4 md:pb-0 -mb-6 md:-mb-10 select-none z-30"
      aria-labelledby="join-arena-title"
    >
      <div
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] transform-gpu shadow-[0_20px_50px_rgba(82,0,199,0.3)] transition-all duration-500 hover:border-purple-400"
        style={{
          background: 'linear-gradient(115deg, #2a005c, #0e0024 56%, #2a005c)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderBottom: 0
        }}
      >
        {/* Ambient Top Glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

        <div className="relative flex min-h-[8.5rem] flex-col gap-5 px-6 py-7 sm:px-8 sm:py-8 md:min-h-[9.5rem] md:flex-row md:items-center md:justify-between md:px-10 md:py-9">
          
          <div className="max-w-xl">
            <h2
              id="join-arena-title"
              className="font-sans text-3xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-[#faf8f5] sm:text-4xl md:text-5xl"
            >
              Join the <span className="text-[#f0abfc]">Arena!</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 font-normal">
              Claim your digital badge, explore 15+ challenges, and compete on the live leaderboard.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end shrink-0">
            <button
              onClick={onOpenRegister}
              className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border px-6 py-3.5 font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-[#10051f] hover:-translate-y-1 hover:border-white hover:bg-white transition-all shadow-xl cursor-pointer"
              style={{
                backgroundColor: '#FAF8F5',
                borderColor: '#FAF8F5'
              }}
            >
              {/* Shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2 font-black">
                <QrCode className="w-3.5 h-3.5 text-purple-700" />
                <span>REGISTER NOW</span>
              </span>
              <svg
                className="relative ml-2.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8h11M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
