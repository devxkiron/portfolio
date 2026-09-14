'use client';

import React from 'react';
import { ColorBends } from '@/components/ui/color-bends';
import { HeroContent } from './hero-content';
import { heroConfig } from './hero.config';

interface HeroSectionProps {
  brandOverride?: {
    tagline?: string;
    badgeText?: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ brandOverride }) => {
  const { shader } = heroConfig;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-200"
    >
      {/* Interactive WebGL Three.js Background Canvas */}
      <div className="absolute inset-0 z-0">
        <ColorBends
          className="h-full w-full opacity-75 dark:opacity-100"
          colors={[shader.color]}
          rotation={shader.rotation}
          autoRotate={shader.autoRotate}
          speed={shader.speed}
          scale={shader.scale}
          frequency={shader.frequency}
          warpStrength={shader.warpStrength}
          mouseInfluence={shader.mouseInfluence}
          parallax={shader.parallax}
          noise={shader.noise}
          iterations={shader.iterations}
          intensity={shader.intensity}
          bandWidth={shader.bandWidth}
          transparent={shader.transparent}
        />
        {/* Ambient atmospheric vignettes to blend smoothly with theme */}
        <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.06)_60%,rgba(0,0,0,0.25)_100%] dark:bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.3)_60%,rgba(0,0,0,0.85)_100%]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
      </div>

      {/* Hero Content */}
      <HeroContent brandOverride={brandOverride} />
    </section>
  );
};
