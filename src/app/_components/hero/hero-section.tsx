'use client';

import React from 'react';
import { HeroBackground } from './hero-background';
import { HeroContent } from './hero-content';
import { HeroBackgroundVariant } from '@/lib/theme-config/types';

interface HeroSectionProps {
  brandOverride?: {
    tagline?: string;
    badgeText?: string;
  };
  heroBackground?: HeroBackgroundVariant;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ brandOverride, heroBackground = 'color-bends' }) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-200"
    >
      {/* Interactive Background Canvas / Shader Variation */}
      <HeroBackground variant={heroBackground} />

      {/* Hero Content */}
      <HeroContent brandOverride={brandOverride} />
    </section>
  );
};
