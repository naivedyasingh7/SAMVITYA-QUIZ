import React from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-surface rounded-xl max-w-lg w-full p-6 shadow-2xl text-slate-100 border border-white/[0.08]">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/[0.06]">
          <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            title="Close dialog"
          >
            <X className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
