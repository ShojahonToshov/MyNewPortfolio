import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const variants = [
  { path: '/', label: 'Home' },
  { path: '/1', label: 'Var 1' },
  { path: '/2', label: 'Var 2' },
  { path: '/3', label: 'Var 3' },
];

export default function VariantSwitcher() {
  const location = useLocation();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 p-2 bg-black/80 backdrop-blur-md rounded-full shadow-2xl border border-white/10">
      {variants.map((v) => {
        const isActive = location.pathname === v.path;
        return (
          <Link
            key={v.path}
            to={v.path}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              isActive 
                ? 'bg-white text-black scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                : 'text-white/70 hover:text-white hover:bg-white/20'
            }`}
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
