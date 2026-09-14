import React from 'react';
import { HeroBadge } from './hero-badge';
import { HeroActions } from './hero-actions';
import { HeroStats } from './hero-stats';
import { heroConfig } from './hero.config';
import BlurText from '@/components/BlurText';

import StrokeText from '@/components/StrokeText';

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
      <h1 className="font-clash text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl flex flex-col items-center">
        <BlurText
          text={content.title.line1}
          as="span"
          delay={100}
          animateBy="words"
          direction="top"
          className="justify-center"
        />
        <BlurText
          text={content.title.line2}
          as="span"
          delay={120}
          animateBy="words"
          direction="top"
          className="justify-center"
        />
        <span className="mt-3 block font-origin-tech font-normal tracking-wider text-brand-neon-text dark:text-[#b5f57c] w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto">
          <StrokeText
            text={content.title.highlighted}
            strokeColor="var(--brand-neon, #aeff00)"
            fillColor="currentColor"
            strokeWidth={1.8}
            drawDuration={1.6}
            fillDelay={0.3}
            fontSize={72}
            letterSpacing={4}
            fontFamily="var(--font-face-origin-tech), var(--font-origin-tech), sans-serif"
            trigger="mount"
            fillMode="wipe"
            className="w-full flex justify-center"
          />
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
