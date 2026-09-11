'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SectionHeaderProps {
  /** Main section title */
  title: React.ReactNode;
  /** Optional subtitle or description */
  subtitle?: React.ReactNode;
  /** Optional badge or pill above the title */
  badge?: React.ReactNode;
  /** Text & items alignment (default: 'center') */
  align?: 'left' | 'center' | 'right';
  /** Whether to show the decorative bottom divider line (default: true) */
  showDivider?: boolean;
  /** Enable or disable GSAP scroll entrance animation (default: true) */
  animated?: boolean;
  /** Heading semantic HTML tag (default: 'h2') */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  /** Extra container className */
  className?: string;
  /** Extra title className */
  titleClassName?: string;
  /** Extra subtitle className */
  subtitleClassName?: string;
  /** Extra badge className */
  badgeClassName?: string;
  /** Extra divider className */
  dividerClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  showDivider = true,
  animated = true,
  as: HeadingTag = 'h2',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  badgeClassName = '',
  dividerClassName = '',
}) => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!animated) return;
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const ctx = gsap.context(() => {
      const headerItems = headerEl.querySelectorAll('.section-header-item');
      if (headerItems.length === 0) return;

      gsap.fromTo(
        headerItems,
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerEl,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, [animated]);

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align];

  const hasCustomMargin = className.includes('mb-') || className.includes('!mb-');
  const containerMargin = hasCustomMargin ? '' : 'mb-6 sm:mb-8 lg:mb-12';
  const resolvedTitleClass = titleClassName || 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
  const resolvedSubtitleClass = subtitleClassName || 'text-xs sm:text-sm md:text-base leading-relaxed text-zinc-400';

  return (
    <div
      ref={headerRef}
      className={`flex flex-col ${alignmentClasses} ${containerMargin} ${className}`}
    >
      {badge && (
        <div
          className={`section-header-item mb-2 sm:mb-3 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/80 px-2.5 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs font-medium uppercase tracking-wider text-zinc-300 backdrop-blur-sm ${badgeClassName}`}
        >
          {badge}
        </div>
      )}

      <HeadingTag
        className={`section-header-item font-extrabold tracking-tight text-white leading-[1.15] ${resolvedTitleClass}`}
      >
        {title}
      </HeadingTag>

      {subtitle && (
        <p
          className={`section-header-item mt-2 sm:mt-3 max-w-xl ${resolvedSubtitleClass}`}
        >
          {subtitle}
        </p>
      )}

      {showDivider && (
        <div
          className={`section-header-item mt-2.5 sm:mt-4 h-px w-10 sm:w-16 bg-zinc-800 ${dividerClassName}`}
        />
      )}
    </div>
  );
};
