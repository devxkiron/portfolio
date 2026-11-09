import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'pulse' | 'shimmer' | 'solid';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'pulse',
  ...props
}) => {
  const baseStyles =
    'relative overflow-hidden rounded-md bg-zinc-200/80 dark:bg-zinc-800/50 border border-zinc-300/40 dark:border-zinc-700/20';

  const animationStyles =
    variant === 'pulse'
      ? 'animate-pulse'
      : variant === 'shimmer'
      ? 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent'
      : '';

  return (
    <div
      className={`${baseStyles} ${animationStyles} ${className}`}
      {...props}
    />
  );
};
