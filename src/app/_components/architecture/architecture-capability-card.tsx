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
    <div className="group flex flex-col justify-start rounded-xl border border-zinc-800 bg-[#0d140e] p-5 sm:p-6 text-left transition-colors duration-200 hover:border-zinc-700">
      {/* Icon Squircle */}
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-brand-neon/20 bg-brand-neon/10">
        {renderIcon()}
      </div>

      {/* Card Title */}
      <h3 className="font-bold tracking-tight text-white text-base sm:text-lg">
        {title}
      </h3>

      {/* Card Description */}
      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
    </div>
  );
};
