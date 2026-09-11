'use client';

import React, { useState } from 'react';
import { TechItem, TechCategoryId } from './types';
import { TechCard } from './tech-card';

interface TechMarqueeProps {
  row1Items: TechItem[];
  row2Items: TechItem[];
  selectedCategory: TechCategoryId;
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({
  row1Items,
  row2Items,
  selectedCategory,
}) => {
  // Independent hover pause state for each row
  const [isRow1Paused, setIsRow1Paused] = useState(false);
  const [isRow2Paused, setIsRow2Paused] = useState(false);

  // Multiply items 3x per track so each track is guaranteed wider than any screen resolution (4K+)
  const track1Items = [...row1Items, ...row1Items, ...row1Items];
  const track2Items = [...row2Items, ...row2Items, ...row2Items];

  const isDimmed = (item: TechItem) =>
    selectedCategory !== 'all' && item.category !== selectedCategory;

  const isHighlighted = (item: TechItem) =>
    selectedCategory !== 'all' && item.category === selectedCategory;

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Left Edge Soft Fade Mask */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent" />

      {/* Right Edge Soft Fade Mask */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent" />

      {/* Row 1: Independent Hover Container (Leftward Infinite Continuous Drift) */}
      <div
        className="marquee-row relative flex w-full overflow-hidden py-3"
        onMouseEnter={() => setIsRow1Paused(true)}
        onMouseLeave={() => setIsRow1Paused(false)}
      >
        {/* Track 1 */}
        <div
          className="marquee-track flex shrink-0 w-max items-center gap-8 sm:gap-12 pr-8 sm:pr-12 animate-marquee-left"
          style={{
            willChange: 'transform',
            animationPlayState: isRow1Paused ? 'paused' : 'running',
          }}
        >
          {track1Items.map((item, index) => (
            <TechCard
              key={`row1-a-${item.id}-${index}`}
              item={item}
              isDimmed={isDimmed(item)}
              isHighlighted={isHighlighted(item)}
            />
          ))}
        </div>

        {/* Track 2 (Identical sibling for seamless zero-gap infinite looping) */}
        <div
          aria-hidden="true"
          className="marquee-track flex shrink-0 w-max items-center gap-8 sm:gap-12 pr-8 sm:pr-12 animate-marquee-left"
          style={{
            willChange: 'transform',
            animationPlayState: isRow1Paused ? 'paused' : 'running',
          }}
        >
          {track1Items.map((item, index) => (
            <TechCard
              key={`row1-b-${item.id}-${index}`}
              item={item}
              isDimmed={isDimmed(item)}
              isHighlighted={isHighlighted(item)}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Independent Hover Container (Rightward Infinite Continuous Drift) */}
      <div
        className="marquee-row relative flex w-full overflow-hidden py-3"
        onMouseEnter={() => setIsRow2Paused(true)}
        onMouseLeave={() => setIsRow2Paused(false)}
      >
        {/* Track 1 */}
        <div
          className="marquee-track flex shrink-0 w-max items-center gap-8 sm:gap-12 pr-8 sm:pr-12 animate-marquee-right"
          style={{
            willChange: 'transform',
            animationPlayState: isRow2Paused ? 'paused' : 'running',
          }}
        >
          {track2Items.map((item, index) => (
            <TechCard
              key={`row2-a-${item.id}-${index}`}
              item={item}
              isDimmed={isDimmed(item)}
              isHighlighted={isHighlighted(item)}
            />
          ))}
        </div>

        {/* Track 2 (Identical sibling for seamless zero-gap infinite looping) */}
        <div
          aria-hidden="true"
          className="marquee-track flex shrink-0 w-max items-center gap-8 sm:gap-12 pr-8 sm:pr-12 animate-marquee-right"
          style={{
            willChange: 'transform',
            animationPlayState: isRow2Paused ? 'paused' : 'running',
          }}
        >
          {track2Items.map((item, index) => (
            <TechCard
              key={`row2-b-${item.id}-${index}`}
              item={item}
              isDimmed={isDimmed(item)}
              isHighlighted={isHighlighted(item)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 55s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }

        .marquee-row:hover .marquee-track {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};
