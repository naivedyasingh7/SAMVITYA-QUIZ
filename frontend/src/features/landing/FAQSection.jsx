import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How do I register and receive my participant QR code?',
      a: 'Click on the "Register with QR Code" button at the top of the site. Enter your name, university email, and department. The system will instantly generate your unique EVT26-Pxxxx participant code and QR code badge, which you can save or download to your phone.'
    },
    {
      q: 'How are offline game points added to my profile?',
      a: 'When you complete a physical arena station (e.g. Robotics Maze, Fastest Typist), show your QR badge to the station referee. The referee scans your code and submits your score through the secure Person 2 Admin portal. The points are logged into the transaction ledger and immediately reflected on your leaderboard rank.'
    },
    {
      q: 'Can an online quiz result be submitted twice to inflate points?',
      a: 'No. The system enforces strict idempotency at both the application and database level. Every quiz completion payload includes an external_result_id. A database UNIQUE constraint prevents duplicate entries, and Person 4\'s scoring engine automatically drops duplicate submissions without corrupting your point tally.'
    },
    {
      q: 'What happens when the leaderboard is locked by the admin?',
      a: 'At 05:30 PM, the event organizers trigger the winner declaration. When the leaderboard is locked, all new point transactions are frozen, a permanent snapshot of the final Top 3 podium is recorded, and the winner celebration banner is broadcast across all live displays.'
    },
    {
      q: 'Who are the lead developers and organizers of this system?',
      a: 'The system is built by six student leads from the Department of Computer Science & Engineering, VIT B University: Srikirti (Participant System), Suvradeep (Admin System), Ashwin (Quiz Integration), Divya (Automatic Scoring), Priyansh (Leaderboard & Analytics), and Naivedya (Testing & Deployment).'
    }
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#030305] overflow-hidden select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-mono text-[11px] uppercase tracking-[0.25em] mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            RULES & <span className="text-gradient">GUIDELINES</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-sans font-bold text-sm sm:text-base text-white uppercase tracking-tight hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/[0.05] pt-4 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
