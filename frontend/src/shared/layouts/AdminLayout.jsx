import React from 'react';

export function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="border-b border-slate-800 p-4 font-semibold text-lg">
        Admin Portal
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
