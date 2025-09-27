
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 text-center">
      <div className="inline-flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-light h-5 w-5"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
        <span className="text-sm font-medium text-slate-300">Wawasan Pasar AI</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 text-transparent bg-clip-text">
        Analisis Tren Pasar
      </h1>
    </header>
  );
};

export default Header;