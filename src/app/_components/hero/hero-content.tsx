import React from 'react';
import { HeroBadge } from './hero-badge';
import { HeroActions } from './hero-actions';
import { HeroStats } from './hero-stats';
import { heroConfig } from './hero.config';

interface HeroContentProps {
  className?: string;
  brandOverride?: {
    tagline?: string;
    badgeText?: string;
  };
}

export const HeroContent: React.FC<HeroContentProps> = ({ className = '', brandOverride }) => {
  const { content } = heroConfig;
  const statusBadgeText = brandOverride?.badgeText || content.statusBadge;
  const subtitleText = brandOverride?.tagline || content.subtitle;

  return (
    <div
      className={`relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center ${className}`}
    >
      {/* Top Agency & Review Badge */}
      <HeroBadge statusText={statusBadgeText} className="mb-8" />

      {/* Main Headline */}
      <h1 className="font-clash text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="block">{content.title.line1}</span>
        <span className="block">{content.title.line2}</span>
        <span className="mt-2 block font-origin-tech font-normal tracking-wide text-brand-neon-text dark:text-[#b5f57c]">
          {content.title.highlighted}
        </span>
      </h1>

      {/* Subtitle / Value Proposition */}
      <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
        {subtitleText}
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 sm:mt-10">
        <HeroActions
          primaryCta={content.cta.primary}
          secondaryCta={content.cta.secondary}
        />
      </div>

      {/* Proof / Business Metrics */}
      <HeroStats stats={content.stats} />
    </div>
  );
};
