import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = "px-4 py-2 rounded-md font-medium text-xs tracking-normal transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99] select-none inline-flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]",
    secondary: "bg-white/[0.05] hover:bg-white/[0.08] text-slate-200 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
    danger: "bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border border-rose-500/30",
    emerald: "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]",
    glass: "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/15 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
    ghost: "bg-transparent hover:bg-white/[0.05] text-slate-300 hover:text-white"
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
