import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { eventStore } from '../services/eventStore.js';

export function QRScannerModal({ isOpen, onClose, onParticipantFound }) {
  const [manualCode, setManualCode] = useState('');
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    let html5QrCode = null;

    if (isOpen) {
      setCameraError(null);
      setIsScanning(true);

      const scannerId = 'html5qr-code-reader';
      try {
        html5QrCode = new Html5Qrcode(scannerId);
        scannerRef.current = html5QrCode;

        html5QrCode
          .start(
            { facingMode: 'environment' },
            {
              fps: 10,
              qrbox: { width: 220, height: 220 }
            },
            (decodedText) => {
              // Extract username P00x or participant code
              let username = decodedText;
              try {
                const parsed = JSON.parse(decodedText);
                if (parsed.username) username = parsed.username;
                else if (parsed.code) username = parsed.code;
              } catch (_) {}

              handleMatchedParticipant(username);
              html5QrCode.stop().catch(() => {});
            },
            (errorMessage) => {
              // scanning in progress, ignore frame-level misses
            }
          )
          .catch((err) => {
            console.warn('Camera scan not supported or blocked:', err);
            setCameraError('Camera access unavailable. You can enter the username (e.g. P001) manually below.');
            setIsScanning(false);
          });
      } catch (e) {
        setCameraError('Camera initialization error. Please enter username manually.');
        setIsScanning(false);
      }
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMatchedParticipant = (identifier) => {
    const participant = eventStore.getParticipantById(identifier);
    if (participant) {
      onParticipantFound?.(participant);
      onClose();
    } else {
      setCameraError(`No participant found matching '${identifier}'. Try P001, P002, or P003.`);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    handleMatchedParticipant(manualCode.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="glass-surface max-w-md w-full p-6 sm:p-7 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-4 relative overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-base text-white font-space">
            Scan Competitor QR Pass (QR 2)
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Point camera at the participant's badge (e.g. P001) to automatically select them for point awarding.
        </p>

        {/* Camera Viewport */}
        <div className="bg-black/80 rounded-2xl overflow-hidden border border-white/10 min-h-[240px] flex items-center justify-center relative">
          <div id="html5qr-code-reader" className="w-full" />
          {!isScanning && (
            <div className="p-4 text-center text-xs text-slate-400">
              <Camera className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
              <span>Camera not active</span>
            </div>
          )}
        </div>

        {cameraError && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{cameraError}</span>
          </div>
        )}

        {/* Manual Fallback Entry */}
        <form onSubmit={handleManualSubmit} className="pt-2 border-t border-white/[0.08] space-y-2">
          <label className="block text-[11px] font-mono text-slate-400 uppercase">
            Manual Username Lookup
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="e.g. P001, P002, or P008"
              className="glass-input flex-1 px-3 py-2 text-xs text-white uppercase font-mono rounded-xl"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Lookup</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default QRScannerModal;
