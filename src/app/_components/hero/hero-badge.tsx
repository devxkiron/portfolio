import React from 'react';

interface HeroBadgeProps {
  statusText?: string;
  className?: string;
}

export const HeroBadge: React.FC<HeroBadgeProps> = ({
  statusText = 'Available for select projects & full-time roles',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-border bg-card/85 px-4 py-2 text-xs sm:text-sm font-medium text-foreground backdrop-blur-md shadow-sm transition-colors ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-neon opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-neon"></span>
      </span>
      <span>{statusText}</span>
    </div>
  );
};
