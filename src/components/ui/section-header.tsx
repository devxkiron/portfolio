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

  return (
    <div
      ref={headerRef}
      className={`mb-12 flex flex-col sm:mb-16 ${alignmentClasses} ${className}`}
    >
      {badge && (
        <div
          className={`section-header-item mb-3 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-300 backdrop-blur-sm ${badgeClassName}`}
        >
          {badge}
        </div>
      )}

      <HeadingTag
        className={`section-header-item text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl ${titleClassName}`}
      >
        {title}
      </HeadingTag>

      {subtitle && (
        <p
          className={`section-header-item mt-4 max-w-xl text-base text-zinc-400 sm:text-lg ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}

      {showDivider && (
        <div
          className={`section-header-item mt-8 h-px w-16 bg-zinc-800 ${dividerClassName}`}
        />
      )}
    </div>
  );
};
