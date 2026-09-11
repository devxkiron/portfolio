'use client';

import React from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ClientStory } from './types';

interface TestimonialCardProps {
  story: ClientStory;
  currentIndex: number;
  totalStories: number;
  onPrev: () => void;
  onNext: () => void;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  story,
  currentIndex,
  totalStories,
  onPrev,
  onNext,
}) => {
  return (
    <div className="relative w-full max-w-md sm:max-w-lg rounded-2xl border border-zinc-800/90 bg-[#08120b]/90 p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.85),0_0_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl transition-all duration-300">
      {/* Top Row: Stars + Rating + Verified + Metric Pill */}
      <div className="flex items-center justify-between gap-3">
        {/* Rating Section */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-mono text-xs font-bold text-white">{story.rating.toFixed(1)}</span>
          {story.isVerified && (
            <CheckCircle2 className="h-3.5 w-3.5 fill-sky-500 text-black shrink-0" />
          )}
        </div>

        {/* Metric Badge */}
        <div className="rounded-md bg-[#e2f952] px-2.5 py-0.5 font-mono text-xs font-black tracking-tight text-black shadow-sm">
          {story.metricBadge}
        </div>
      </div>

      {/* Company Name & City */}
      <h3 className="mt-3.5 font-bold tracking-tight text-white text-base sm:text-lg flex items-center flex-wrap gap-1.5">
        <span>{story.flag}</span>
        <span className="text-white font-extrabold">{story.company}</span>
        <span className="text-zinc-500">—</span>
        <span className="text-[#e2f952]">{story.cityName}</span>
      </h3>

      {/* Client Quote */}
      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-zinc-300 italic">
        {story.quote}
      </p>

      {/* Footer: Author Info & Slider Pagination Buttons */}
      <div className="mt-5 flex items-center justify-between border-t border-zinc-800/80 pt-4">
        {/* Author Avatar & Titles */}
        <div className="flex items-center gap-3">
          <img
            src={story.authorAvatar}
            alt={story.authorName}
            className="h-10 w-10 rounded-full border border-zinc-700 object-cover"
          />
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-bold text-white">{story.authorName}</span>
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#e2f952]">
              {story.authorRole}
            </span>
          </div>
        </div>

        {/* Pagination Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous client story"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next client story"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
