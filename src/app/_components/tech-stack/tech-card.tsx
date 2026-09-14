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

// Determines if a hex color is white, near-white, or pale cream
const isLightColor = (hex: string): boolean => {
  if (!hex || !hex.startsWith('#')) return false;
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 215;
  }
  return false;
};

export const TechCard: React.FC<TechCardProps> = ({
  item,
  isDimmed = false,
  isHighlighted = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLight = isLightColor(item.brandColor);

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
              ? isLight
                ? 'drop-shadow(0 0 10px rgba(0,0,0,0.22))'
                : `drop-shadow(0 0 12px ${item.brandColor}bb)`
              : isHighlighted
              ? 'drop-shadow(0 0 8px #5cf629bb)'
              : 'none',
          }}
        >
          {/* Bare Icon with theme-adaptive contrast for light/white icons */}
          <div
            className={`flex items-center justify-center transition-transform duration-300 ${
              isLight ? 'text-foreground dark:text-white' : ''
            }`}
          >
            <TechIconRenderer
              iconName={item.iconName}
              size={36}
              color={isLight ? 'currentColor' : item.brandColor}
            />
          </div>
        </button>
      </HoverCardTrigger>

      {/* Modern Popover / Tooltip */}
      <HoverCardContent
        side="top"
        sideOffset={14}
        className="w-64 border border-border bg-card p-3.5 backdrop-blur-xl shadow-xl ring-1 ring-border"
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
              isLight
                ? 'border-border bg-muted text-foreground'
                : ''
            }`}
            style={
              !isLight
                ? {
                    backgroundColor: `${item.brandColor}18`,
                    borderColor: `${item.brandColor}40`,
                  }
                : undefined
            }
          >
            <TechIconRenderer
              iconName={item.iconName}
              size={22}
              color={isLight ? 'currentColor' : item.brandColor}
              className={isLight ? 'text-foreground' : ''}
            />
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-foreground text-sm tracking-tight truncate">
                {item.name}
              </span>
              <span
                className="shrink-0 text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded"
                style={
                  isLight
                    ? {
                        color: 'var(--foreground)',
                        backgroundColor: 'var(--muted)',
                        border: '1px solid var(--border)',
                      }
                    : {
                        color: item.brandColor,
                        backgroundColor: `${item.brandColor}15`,
                        border: `1px solid ${item.brandColor}30`,
                      }
                }
              >
                {item.categoryLabel}
              </span>
            </div>

            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground font-normal">
              {item.description}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
