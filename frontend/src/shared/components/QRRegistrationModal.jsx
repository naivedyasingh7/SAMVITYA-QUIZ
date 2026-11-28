import React, { useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { X, CheckCircle, QrCode, Sparkles, User, Mail, School, Copy, Download } from 'lucide-react';
import { storage } from '../utils/storage.js';

export function QRRegistrationModal({ isOpen, onClose, onRegistered }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    // Generate code matching the schema: EVT26-Pxxxx
    const randomCode = `EVT26-P${Math.floor(1000 + Math.random() * 9000)}`;
    const newParticipant = {
      id: crypto.randomUUID ? crypto.randomUUID() : `usr-${Date.now()}`,
      participant_code: randomCode,
      full_name: fullName,
      email: email,
      organization: organization || 'VIT B University',
      total_points: 0,
      online_points: 0,
      offline_points: 0,
      created_at: new Date().toISOString()
    };

    try {
      const qrUrl = await QRCode.toDataURL(
        JSON.stringify({
          code: randomCode,
          name: fullName,
          email: email
        }),
        {
          width: 280,
          margin: 2,
          color: {
            dark: '#030305',
            light: '#FAF8F5'
          }
        }
      );

      // Save to local storage for returning participant recognition
      storage.set('participant_session', newParticipant);
      setRegisteredData(newParticipant);
      setQrDataUrl(qrUrl);
      onRegistered?.(newParticipant);

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Failed to generate QR code', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCode = () => {
    if (registeredData?.participant_code) {
      navigator.clipboard.writeText(registeredData.participant_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#090913] border border-white/10 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden">
        {/* Tech decorative corners */}
        <div className="tech-corner-tl border-purple-400"></div>
        <div className="tech-corner-tr border-pink-400"></div>
        <div className="tech-corner-bl border-pink-400"></div>
        <div className="tech-corner-br border-purple-400"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!registeredData ? (
          <div>
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-mono text-[11px] uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Person 1 • Srikirti Module
              </div>
              <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Participant Check-In
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Enter your details to generate your unique event QR badge and digital points passport.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5">
                  Full Name <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5">
                  University / Personal Email <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.mercer@vitb.ac.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5">
                  College / Department
                </label>
                <div className="relative">
                  <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. School of Computer Science & Engg"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-sans font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? 'Generating Digital Badge...' : 'Generate My Event QR Badge'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-2 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight">
              Registration Confirmed!
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Your official digital passport is generated. Present this at booth stations and online quiz portals.
            </p>

            {/* QR Card */}
            <div className="mt-5 p-4 rounded-xl bg-white/[0.04] border border-white/10 inline-block shadow-inner">
              {qrDataUrl && (
                <img
                  src={qrDataUrl}
                  alt="Participant QR Code"
                  className="w-52 h-52 mx-auto rounded-lg shadow-md border-2 border-white/20"
                />
              )}
            </div>

            {/* Participant Code Chip */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="font-mono text-base font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-lg border border-pink-500/30">
                {registeredData.participant_code}
              </span>
              <button
                onClick={copyCode}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="Copy code"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && <span className="text-[11px] font-mono text-emerald-400 block mt-1">Copied to clipboard!</span>}

            <div className="mt-6 flex gap-3 justify-center">
              <a
                href={qrDataUrl}
                download={`${registeredData.participant_code}-badge.png`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Download className="w-4 h-4" /> Download QR
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Done / Explore
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
