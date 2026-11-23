import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ProjectsSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-12 sm:space-y-20">
      {Array.from({ length: count }).map((_, index) => {
        const isReversed = index % 2 === 1;
        return (
          <div
            key={`project-skeleton-${index}`}
            className={`flex flex-col ${
              isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } gap-8 lg:gap-12 items-center rounded-2xl border border-zinc-200/40 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm`}
          >
            {/* Image Preview Skeleton */}
            <div className="w-full lg:w-3/5 aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden">
              <Skeleton className="w-full h-full" variant="shimmer" />
            </div>

            {/* Content Details Skeleton */}
            <div className="w-full lg:w-2/5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header tag & Number */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-28 rounded-full" />
                  <Skeleton className="h-6 w-10 rounded-md" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Skeleton className="h-8 w-4/5 rounded-md" />
                  <Skeleton className="h-8 w-3/5 rounded-md" />
                </div>

                {/* Description */}
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  <Skeleton className="h-7 w-20 rounded-lg" />
                  <Skeleton className="h-7 w-24 rounded-lg" />
                  <Skeleton className="h-7 w-16 rounded-lg" />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Skeleton className="h-11 w-36 rounded-xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
