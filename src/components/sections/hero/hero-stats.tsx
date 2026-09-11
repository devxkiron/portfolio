import React from 'react';

export interface StatItem {
  value: string;
  label: string;
}

interface HeroStatsProps {
  stats?: StatItem[];
  className?: string;
}

export const HeroStats: React.FC<HeroStatsProps> = ({ stats = [], className = '' }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div
      className={`grid w-full grid-cols-2 gap-8 pt-12 sm:grid-cols-4 sm:gap-10 sm:pt-16 ${className}`}
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col items-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {stat.value}
          </span>
          <span className="mt-2 font-mono text-[11px] font-medium tracking-wider text-zinc-400 uppercase sm:text-xs">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};
