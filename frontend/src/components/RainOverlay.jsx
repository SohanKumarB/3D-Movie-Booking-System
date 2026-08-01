import React from 'react';

export function RainOverlay({ isActive }) {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden opacity-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="rain-container absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-b from-transparent via-cyan-300 to-transparent w-[1px] h-12 animate-pulse"
            style={{
              left: `${(i * 2.5) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animationDuration: `${0.6 + (i % 5) * 0.2}s`,
              opacity: 0.3 + (i % 4) * 0.15
            }}
          />
        ))}
      </div>
    </div>
  );
}
