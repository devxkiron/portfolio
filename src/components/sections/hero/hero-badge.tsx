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
      className={`inline-flex items-center gap-2.5 rounded-sm border border-emerald-500/3 bg-emerald-950/4 px-3.5 py-2.5 text-sm text-white backdrop-blur-md transition-colors ${className}`}
    >

      <span>{statusText}</span>
    </div>
  );
};
