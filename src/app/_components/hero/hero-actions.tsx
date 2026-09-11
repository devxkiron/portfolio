import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

interface HeroActionsProps {
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  className?: string;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  primaryCta = { text: 'Explore Projects', href: '#projects' },
  secondaryCta = { text: 'Get in Touch', href: '#contact' },
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 ${className}`}>
      {/* Primary CTA */}
      <a
        href={primaryCta.href}
        className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition-all duration-200 hover:bg-zinc-200 hover:shadow-white/20 active:scale-95"
      >
        <span>{primaryCta.text}</span>
        <ArrowUpRight
          size={16}
          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>

      {/* Secondary CTA */}
      <a
        href={secondaryCta.href}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-6 py-3.5 text-sm font-semibold text-zinc-200 backdrop-blur-md transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800/80 hover:text-white active:scale-95"
      >
        <Mail size={16} />
        <span>{secondaryCta.text}</span>
      </a>
    </div>
  );
};
