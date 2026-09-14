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
      className={`inline-flex items-center gap-2.5  bg-card/15 px-4 py-2 text-xs sm:text-sm font-medium text-foreground backdrop-blur-md transition-colors ${className}`}
    >
      
      <span>{statusText}</span>
    </div>
  );
};
