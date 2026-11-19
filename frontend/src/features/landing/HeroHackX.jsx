import React from 'react';
import { QrCode, Trophy, ArrowRight, Play } from 'lucide-react';

export function HeroHackX({ onOpenRegister, onOpenSimulator }) {
  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-14 pt-24 pb-12 select-none">
      
      {/* Central H1 Stack (Exact HackX 4.0 Layout & Styling) */}
      <h1
        className="flex flex-col items-center justify-center font-sans font-medium uppercase tracking-normal leading-[0.85] text-center text-[#FAF8F5] max-w-5xl mx-auto w-full"
        style={{ fontSize: 'clamp(1.8rem, 5.4vw, 5.6rem)' }}
      >
        {/* 1. Top Glassmorphic Pill */}
        <div className="overflow-visible pb-1 sm:pb-2">
          <div className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 md:px-8 md:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md text-[0.26em] md:text-[0.22em] tracking-[0.15em] uppercase">
            <span className="text-center font-sans font-semibold uppercase tracking-wide text-[#FAF8F5] whitespace-normal sm:whitespace-nowrap max-w-[85vw] sm:max-w-none leading-tight text-[11px] sm:text-[13px] md:text-[15px]">
              DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING, SCSE, FOSTA
            </span>
          </div>
        </div>

        {/* 2. Corner Bracket Framed "PRESENTS" */}
        <div className="overflow-visible pt-1 pb-2 md:pt-2 md:pb-3 mt-1 sm:mt-2">
          <div className="relative inline-flex items-center justify-center px-3 py-1.5 md:px-5 md:py-2">
            <span className="absolute left-0 top-0 h-2 w-2 md:h-2.5 md:w-2.5 border-t-[3px] border-l-[3px] border-white"></span>
            <span className="absolute right-0 top-0 h-2 w-2 md:h-2.5 md:w-2.5 border-t-[3px] border-r-[3px] border-white"></span>
            <span className="absolute left-0 bottom-0 h-2 w-2 md:h-2.5 md:w-2.5 border-b-[3px] border-l-[3px] border-white"></span>
            <span className="absolute right-0 bottom-0 h-2 w-2 md:h-2.5 md:w-2.5 border-b-[3px] border-r-[3px] border-white"></span>
            <span className="font-sans font-bold uppercase tracking-[0.3em] text-[#FAF8F5] text-[12px] sm:text-[14px] md:text-[16px]">
              PRESENTS
            </span>
          </div>
        </div>

        {/* 3. Main Brand Logotype with Floating Circular Prize Badge */}
        <div className="overflow-visible py-1 sm:py-2 w-full">
          <div className="relative inline-block w-full max-w-[760px] mx-auto">
            
            {/* Bold Stylized Geometric SVG Logotype for SAMVITYA */}
            <div className="w-[85vw] max-w-[620px] md:w-[60vw] md:max-w-[760px] mx-auto my-2">
              <svg
                viewBox="0 0 800 170"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto select-none pointer-events-none drop-shadow-[0_0_35px_rgba(168,85,247,0.3)]"
              >
                <text
                  x="50%"
                  y="62%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="url(#samvityaGradient)"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    fontSize: '115px',
                    letterSpacing: '0.04em'
                  }}
                >
                  SAMVITYA
                </text>
                <defs>
                  <linearGradient id="samvityaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#FAF8F5" />
                    <stop offset="75%" stopColor="#E0C3FC" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Floating Circular Prize Badge (Exact HackX 4.0 Style) */}
            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 md:-top-4 md:right-[5%] z-30">
              <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-[#8b7a9f]/25 backdrop-blur-md border border-white/15 lg:h-24 lg:w-24 shadow-md transition-transform hover:scale-110">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-white transform text-base font-extrabold lg:text-2xl tracking-tight">
                    ₹50K+
                  </span>
                  <span className="text-[8px] lg:text-[10px] font-mono text-purple-200 uppercase font-bold">
                    10K PTS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Hairline Accent Line with Instrument Serif Italic Phrase */}
        <div className="overflow-visible pb-3 w-full -mt-2 sm:-mt-4 md:-mt-6">
          <div className="flex items-center justify-between w-full gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="h-[1.5px] flex-1 bg-[#F0ABFC]"></div>
            <span className="font-serif italic font-normal normal-case tracking-wide text-lg sm:text-2xl md:text-3xl lg:text-[2.2rem] leading-normal text-white whitespace-nowrap pt-0.5 pb-2 pr-4 inline-block flex-shrink-0">
              VIT-AP's Premier Quiz & Points Arena!
            </span>
          </div>
        </div>

      </h1>

      {/* Action Buttons: REGISTER NOW (HackX style glass pill) + TEST QUIZ SIMULATOR */}
      <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 z-20">
        <button
          onClick={onOpenRegister}
          className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md text-[13px] sm:text-[15px] md:text-[16px] tracking-[0.2em] font-bold hover:bg-white/20 transition-all text-[#FAF8F5]">
            <QrCode className="w-4 h-4 text-pink-300" />
            <span className="font-sans font-semibold uppercase tracking-widest text-[#FAF8F5]">
              REGISTER NOW
            </span>
          </div>
        </button>

        <button
          onClick={onOpenSimulator}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 backdrop-blur-md text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-purple-200 hover:bg-white/10 transition-all active:scale-95"
        >
          <Play className="w-3.5 h-3.5 text-pink-400" />
          <span>Launch Quiz Simulator</span>
        </button>
      </div>

    </section>
  );
}
