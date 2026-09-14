import React from 'react';
import ShinyText from '@/components/ShinyText';

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
      className={`inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-card/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-foreground backdrop-blur-md transition-colors ${className}`}
    >
      
      <ShinyText
        text={statusText}
        speed={2.2}
        color="currentColor"
        shineColor="#aeff00"
        className="tracking-wider uppercase text-[11px] sm:text-xs font-semibold"
      />
    </div>
  );
};
