import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, Printer, QrCode, Sparkles } from 'lucide-react';

export function EventRegistrationQRModal({ isOpen, onClose }) {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      const regUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/register`
        : 'https://samvitya2026.vit.ac.in/register';

      QRCode.toDataURL(regUrl, {
        width: 380,
        margin: 2,
        color: {
          dark: '#030305',
          light: '#FAF8F5'
        }
      })
        .then((url) => setQrUrl(url))
        .catch((err) => console.error('Error generating event QR:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!qrUrl) return;
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = 'samVITya-2026-Event-Registration-QR1.png';
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="glass-surface max-w-md w-full p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl text-center relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <QrCode className="w-3.5 h-3.5" />
          <span>QR 1 — Event Entrance & Registration Pass</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white font-space tracking-tight">
          Scan to Enter samVITya '26
        </h3>
        <p className="text-xs text-slate-300 mt-1.5 max-w-xs mx-auto">
          Display on entrance projectors or print on venue banners. Scanning opens the registration portal and generates individual competitor IDs.
        </p>

        {/* The QR Canvas Card */}
        <div className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-purple-500/20 my-6 inline-block">
          {qrUrl ? (
            <img src={qrUrl} alt="Event Registration QR" className="w-60 h-60 object-contain rounded-xl" />
          ) : (
            <div className="w-60 h-60 flex items-center justify-center font-mono text-xs text-slate-500">
              Generating High-Res QR...
            </div>
          )}
          <span className="text-[11px] font-mono font-bold text-slate-900 block mt-2 uppercase tracking-widest">
            Scan with any camera
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Banner</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default EventRegistrationQRModal;
