import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, CheckCircle, Copy } from 'lucide-react';

export function QRRegistration({ participantCode, participantName, onScan }) {
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (participantCode) {
      const payload = JSON.stringify({
        code: participantCode,
        name: participantName || 'Competitor',
        event: 'samVITya 2026',
        timestamp: Date.now()
      });
      QRCode.toDataURL(payload, {
        width: 260,
        margin: 2,
        color: {
          dark: '#030305',
          light: '#FAF8F5'
        }
      })
        .then((url) => setQrUrl(url))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [participantCode, participantName]);

  const handleCopyCode = () => {
    if (participantCode) {
      navigator.clipboard?.writeText(participantCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!qrUrl) return;
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = `samVITya-Badge-${participantCode}.png`;
    a.click();
  };

  return (
    <div className="glass-surface p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center max-w-sm mx-auto shadow-2xl relative overflow-hidden">
      {/* Neon ambient glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-600/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-3">
        <QrCode className="w-4 h-4 text-purple-400" />
        <span className="text-xs uppercase tracking-widest font-mono text-purple-300 font-semibold">
          Digital Event Pass
        </span>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-lg border border-white/20 mb-4 inline-block">
        {qrUrl ? (
          <img src={qrUrl} alt="Participant QR Badge" className="w-44 h-44 object-contain rounded-lg" />
        ) : (
          <div className="w-44 h-44 flex items-center justify-center text-xs text-slate-500 font-mono">
            Generating Pass...
          </div>
        )}
      </div>

      <div className="mb-4">
        <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-mono">Participant ID</span>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-lg font-black font-mono text-white tracking-widest bg-white/[0.05] px-3 py-1 rounded-lg border border-white/10">
            {participantCode || 'EVT26-P0102'}
          </span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
            title="Copy Participant ID"
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
          className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save QR Badge</span>
        </button>
      </div>
    </div>
  );
}
export default QRRegistration;
