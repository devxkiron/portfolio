import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ClientStoriesSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[700px] sm:h-[760px] lg:h-[840px] bg-background text-foreground scroll-mt-20 overflow-hidden transition-colors duration-200">
      {/* Globe Ambient Center Silhouette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="relative w-[340px] sm:w-[460px] lg:w-[580px] aspect-square rounded-full border border-dashed border-lime-500/20 dark:border-lime-400/20 animate-[spin_60s_linear_infinite] flex items-center justify-center">
          <div className="w-[85%] aspect-square rounded-full border border-zinc-300/30 dark:border-zinc-700/30 flex items-center justify-center">
            <div className="w-[70%] aspect-square rounded-full bg-radial-gradient from-lime-500/5 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-6 sm:px-6 sm:py-8 lg:px-8 pointer-events-none">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-4">
          <div className="pointer-events-auto select-none pt-1">
            <h2 className="font-origin-tech tracking-tighter text-3xl sm:text-4xl lg:text-5xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-lime-500 to-[#b8ff1a] drop-shadow-[0_0_24px_rgba(174,255,0,0.3)]">
              CLIENT STORIES
            </h2>
          </div>

          {/* City Filter Pills Skeleton */}
          <div className="flex items-center gap-2 overflow-hidden pointer-events-auto self-end md:self-auto">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>

        {/* Camera Controls Skeleton */}
        <div className="absolute top-28 right-4 sm:top-32 sm:right-6 lg:right-8 z-20 pointer-events-auto">
          <div className="flex flex-col gap-2 p-1.5 rounded-xl border border-zinc-200/40 dark:border-zinc-800/60 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>

        {/* Bottom Floating Testimonial Card Skeleton */}
        <div className="pointer-events-auto max-w-lg pb-2 sm:pb-4">
          <div className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl p-6 sm:p-7 shadow-2xl space-y-4">
            {/* Header: Company & Badge */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full" />
              ))}
            </div>

            {/* Quote Lines */}
            <div className="space-y-2 py-1">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>

            {/* Author details & pagination */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-200/40 dark:border-zinc-800/60">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
