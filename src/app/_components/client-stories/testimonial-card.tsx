'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassSurface } from '@/components/ui/glass-surface';
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
  currentIndex: _currentIndex,
  totalStories: _totalStories,
  onPrev,
  onNext,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const checkTheme = () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  const cardInner = (
    <>
      {/* Top Row: Stars + Rating + Verified + Metric Pill */}
      <div className="flex items-center justify-between gap-3">
        {/* Rating Section */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-mono text-xs font-bold text-foreground dark:text-white">
            {story.rating.toFixed(1)}
          </span>
          {story.isVerified && (
            <CheckCircle2 className="h-3.5 w-3.5 fill-sky-500 text-white dark:text-black shrink-0" />
          )}
        </div>

        {/* Metric Badge */}
        <div className="rounded-md bg-brand-neon px-2.5 py-0.5 font-mono text-xs font-black tracking-tight text-black shadow-sm">
          {story.metricBadge}
        </div>
      </div>

      {/* Company Name & City */}
      <h3 className="mt-3.5 font-bold tracking-tight text-base sm:text-lg flex items-center flex-wrap gap-1.5">
        <span className="text-base">{story.flag}</span>
        <span className="text-foreground dark:text-white font-extrabold">{story.company}</span>
        <span className="text-muted-foreground dark:text-zinc-500">—</span>
        <span className="text-emerald-700 dark:text-[#b8ff1a] font-bold">{story.cityName}</span>
      </h3>

      {/* Client Quote */}
      <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-foreground/90 dark:text-zinc-200 font-medium italic">
        &ldquo;{story.quote.replace(/^[“"']+|[”"']+$/g, '')}&rdquo;
      </p>

      {/* Footer: Author Info & Slider Pagination Buttons */}
      <div className="mt-5 flex items-center justify-between border-t border-border dark:border-zinc-800/80 pt-4">
        {/* Author Avatar & Titles */}
        <div className="flex items-center gap-3">
          <img
            src={story.authorAvatar}
            alt={story.authorName}
            className="h-10 w-10 rounded-full border border-border dark:border-zinc-700 object-cover shadow-sm"
          />
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-bold text-foreground dark:text-white">
              {story.authorName}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-emerald-700 dark:text-[#b8ff1a]">
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
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card dark:bg-zinc-900/90 text-foreground dark:text-zinc-300 transition-colors hover:border-border-subtle hover:bg-muted active:scale-95 cursor-pointer shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next client story"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card dark:bg-zinc-900/90 text-foreground dark:text-zinc-300 transition-colors hover:border-border-subtle hover:bg-muted active:scale-95 cursor-pointer shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );

  if (theme === 'dark') {
    return (
      <GlassSurface
        borderRadius={24}
        borderWidth={0.06}
        brightness={35}
        opacity={0.92}
        blur={14}
        displace={0.6}
        backgroundOpacity={0.32}
        saturation={1.4}
        distortionScale={-160}
        redOffset={0}
        greenOffset={12}
        blueOffset={24}
        className="w-full max-w-md sm:max-w-lg shadow-[0_24px_64px_rgba(0,0,0,0.92),0_0_1px_rgba(255,255,255,0.2)] transition-all duration-300"
        contentClassName="p-5 sm:p-6 flex flex-col justify-between"
      >
        {cardInner}
      </GlassSurface>
    );
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg rounded-3xl border border-border/70  backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_48px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] transition-all duration-300 flex flex-col justify-between">
      {cardInner}
    </div>
  );
};
