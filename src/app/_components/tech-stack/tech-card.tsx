'use client';

import React, { useState } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { TechItem } from './types';
import { TechIconRenderer } from './tech-icons';

interface TechCardProps {
  item: TechItem;
  isDimmed?: boolean;
  isHighlighted?: boolean;
}

export const TechCard: React.FC<TechCardProps> = ({
  item,
  isDimmed = false,
  isHighlighted = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverCard openDelay={80} closeDelay={120}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`group relative flex items-center justify-center p-2 sm:p-3 transition-all duration-300 select-none cursor-pointer outline-none bg-transparent border-none ${
            isDimmed
              ? 'opacity-20 grayscale hover:opacity-100 hover:grayscale-0'
              : 'opacity-90 hover:opacity-100'
          }`}
          style={{
            transform: isHovered ? 'scale(1.22) translateY(-2px)' : 'scale(1)',
            filter: isHovered
              ? `drop-shadow(0 0 12px ${item.brandColor}bb)`
              : isHighlighted
              ? `drop-shadow(0 0 8px #5cf629bb)`
              : 'none',
          }}
        >
          {/* Bare Icon with authentic brand color */}
          <div className="flex items-center justify-center transition-transform duration-300">
            <TechIconRenderer
              iconName={item.iconName}
              size={36}
              color={item.brandColor}
            />
          </div>
        </button>
      </HoverCardTrigger>

      {/* Modern Popover / Tooltip */}
      <HoverCardContent
        side="top"
        sideOffset={14}
        className="w-64 border border-zinc-700/60 bg-[#0c100d]/95 p-3.5 backdrop-blur-xl shadow-2xl ring-1 ring-white/10"
      >
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10"
            style={{
              backgroundColor: `${item.brandColor}18`,
              borderColor: `${item.brandColor}40`,
            }}
          >
            <TechIconRenderer
              iconName={item.iconName}
              size={22}
              color={item.brandColor}
            />
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-white text-sm tracking-tight truncate">
                {item.name}
              </span>
              <span
                className="shrink-0 text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded"
                style={{
                  color: item.brandColor === '#FFFFFF' ? '#A1A1AA' : item.brandColor,
                  backgroundColor: `${item.brandColor}15`,
                  border: `1px solid ${item.brandColor}30`,
                }}
              >
                {item.categoryLabel}
              </span>
            </div>

            <p className="mt-1 text-[11px] leading-relaxed text-zinc-400 font-normal">
              {item.description}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
