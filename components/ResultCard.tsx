
import React from 'react';

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  animationDelay?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, icon, items, animationDelay = '0s' }) => {
  return (
    <div
      className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg animate-slide-up"
      style={{ animationDelay }}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-slate-200">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-brand-primary mt-1 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span className="text-slate-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultCard;
