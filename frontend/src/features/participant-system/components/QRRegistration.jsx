import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, CheckCircle, Copy, Sparkles, Shield } from 'lucide-react';

export function QRRegistration({ participantCode, participantName, participantUsername, onScan }) {
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const displayUsername = participantUsername || participantCode || 'P001';

  useEffect(() => {
    if (displayUsername) {
      // Encode direct username string so camera scanners instantly read 'P001'
      QRCode.toDataURL(displayUsername, {
        width: 280,
        margin: 2,
        color: {
          dark: '#030305',
          light: '#FAF8F5'
        }
      })
        .then((url) => setQrUrl(url))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [displayUsername]);

  const handleCopyCode = () => {
    if (displayUsername) {
      navigator.clipboard?.writeText(displayUsername);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!qrUrl) return;
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = `samVITya-Badge-${displayUsername}.png`;
    a.click();
  };

  return (
    <div className="glass-surface p-6 rounded-3xl border border-white/10 text-center flex flex-col items-center max-w-sm mx-auto shadow-2xl relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-600/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-1.5 mb-2">
        <QrCode className="w-4 h-4 text-purple-400" />
        <span className="text-[11px] uppercase tracking-widest font-mono text-purple-300 font-bold">
          QR 2 — Individual Participant QR
        </span>
      </div>

      <p className="text-[11px] text-slate-400 mb-3 max-w-[220px]">
        Show this pass to booth admins during offline games to verify your identity and receive points.
      </p>

      <div className="bg-white p-3.5 rounded-2xl shadow-xl border border-white/20 mb-3 inline-block">
        {qrUrl ? (
          <img src={qrUrl} alt="Participant QR Badge" className="w-44 h-44 object-contain rounded-xl" />
        ) : (
          <div className="w-44 h-44 flex items-center justify-center text-xs text-slate-500 font-mono">
            Generating Pass...
          </div>
        )}
      </div>

      <div className="mb-4">
        <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-mono">Unique Username</span>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-xl font-black font-mono text-white tracking-widest bg-white/[0.05] px-4 py-1 rounded-xl border border-white/10 shadow-inner">
            {displayUsername}
          </span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
            title="Copy Username"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={handleDownload}
          disabled={!qrUrl}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save QR Badge</span>
        </button>
      </div>
    </div>
  );
}
export default QRRegistration;
