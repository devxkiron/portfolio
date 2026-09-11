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
        return <Sparkles className="h-5 w-5 text-brand-neon" />;
      case 'workflow':
        return <Network className="h-5 w-5 text-brand-neon" />;
      case 'code':
        return <Code className="h-5 w-5 text-brand-neon" />;
      case 'dashboard':
        return <LayoutDashboard className="h-5 w-5 text-brand-neon" />;
      default:
        return <Sparkles className="h-5 w-5 text-brand-neon" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-start rounded-xl border border-zinc-800 bg-[#0d140e] p-5 sm:p-6 text-left overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-neon/40 hover:bg-[#111a13] hover:shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_24px_rgba(174,255,0,0.06)]">
      {/* Subtle top ambient glow gradient on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-neon/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon Squircle with hover micro-interaction */}
      <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-brand-neon/20 bg-brand-neon/10 transition-all duration-300 group-hover:scale-110 group-hover:border-brand-neon/50 group-hover:bg-brand-neon/20 group-hover:shadow-[0_0_16px_rgba(174,255,0,0.22)]">
        <div className="transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
          {renderIcon()}
        </div>
      </div>

      {/* Card Title */}
      <h3 className="relative font-bold tracking-tight text-white text-base sm:text-lg transition-colors duration-200 group-hover:text-white">
        {title}
      </h3>

      {/* Card Description */}
      <p className="relative mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400 transition-colors duration-200 group-hover:text-zinc-300">
        {description}
      </p>
    </div>
  );
};
