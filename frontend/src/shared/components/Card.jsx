import React from 'react';

export function Card({ title, children, className = '' }) {
  return (
    <section className={`glass-card p-6 ${className}`}>
      {title && (
        <header className="mb-4 pb-3 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-100 tracking-tight">
            {title}
          </h3>
        </header>
      )}
      {children}
    </section>
  );
}
