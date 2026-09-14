import React from 'react';
import { Sparkles, Network, Code, LayoutDashboard } from 'lucide-react';
import type { CapabilityCard } from './types';

interface ArchitectureCapabilityCardProps {
  capability: CapabilityCard;
}

export const ArchitectureCapabilityCard: React.FC<ArchitectureCapabilityCardProps> = ({
  capability,
}) => {
  const { iconType, title, description } = capability;

  const renderIcon = () => {
    switch (iconType) {
      case 'sparkles':
        return <Sparkles className="h-5 w-5 text-emerald-950 dark:text-brand-neon" />;
      case 'workflow':
        return <Network className="h-5 w-5 text-emerald-950 dark:text-brand-neon" />;
      case 'code':
        return <Code className="h-5 w-5 text-emerald-950 dark:text-brand-neon" />;
      case 'dashboard':
        return <LayoutDashboard className="h-5 w-5 text-emerald-950 dark:text-brand-neon" />;
      default:
        return <Sparkles className="h-5 w-5 text-emerald-950 dark:text-brand-neon" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-start rounded-2xl border border-[#b8d4ab] dark:border-border bg-[#f2f7ec] dark:bg-card p-5 sm:p-6 text-left overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#8ec279] dark:hover:border-brand-neon/60 hover:bg-[#e9f2e1] dark:hover:bg-card-muted/60 shadow-[0_12px_28px_-8px_rgba(36,73,0,0.08),0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-sm">
      {/* Subtle top ambient glow gradient on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-neon/[0.12] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon Squircle with high-contrast icon */}
      <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#b8d4ab] dark:border-brand-neon/40 bg-white dark:bg-brand-neon/10 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:border-[#8ec279] dark:group-hover:border-brand-neon/60 group-hover:shadow-[0_0_16px_rgba(174,255,0,0.22)]">
        <div className="transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
          {renderIcon()}
        </div>
      </div>

      {/* Card Title */}
      <h3 className="relative font-bold tracking-tight text-zinc-950 dark:text-foreground text-base sm:text-lg transition-colors duration-200">
        {title}
      </h3>

      {/* Card Description */}
      <p className="relative mt-2 text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-muted-foreground transition-colors duration-200">
        {description}
      </p>
    </div>
  );
};
