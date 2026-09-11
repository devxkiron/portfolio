import React from 'react';
import { HeroBadge } from './hero-badge';
import { HeroActions } from './hero-actions';
import { HeroStats } from './hero-stats';
import { heroConfig } from './hero.config';

interface HeroContentProps {
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ className = '' }) => {
  const { content } = heroConfig;

  return (
    <div
      className={`relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center ${className}`}
    >
      {/* Top Agency & Review Badge */}
      <HeroBadge statusText={content.statusBadge} className="mb-8" />

      {/* Main Headline */}
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="block">{content.title.line1}</span>
        <span className="block">{content.title.line2}</span>
        <span className="mt-2 block font-black italic tracking-wide text-[#b5f57c]">
          {content.title.highlighted}
        </span>
      </h1>

      {/* Subtitle / Value Proposition */}
      <p className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg sm:leading-8">
        {content.subtitle}
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
