'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { HeroBackgroundVariant } from '@/lib/theme-config/types';
import { ColorBends } from '@/components/ui/color-bends';
import { heroConfig } from './hero.config';

// Dynamically import WebGL-heavy shader components to keep initial SSR lightweight & fast
const AcidSquares = dynamic(() => import('@/components/AcidSquares'), { ssr: false });
const Prism = dynamic(() => import('@/components/Prism'), { ssr: false });
const SideRays = dynamic(() => import('@/components/SideRays'), { ssr: false });
const LightRays = dynamic(() => import('@/components/LightRays'), { ssr: false });
const PixelBlast = dynamic(() => import('@/components/PixelBlast'), { ssr: false });
const Dither = dynamic(() => import('@/components/Dither'), { ssr: false });

interface HeroBackgroundProps {
  variant?: HeroBackgroundVariant;
  className?: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  variant = 'color-bends',
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  const { shader } = heroConfig;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      {/* Visual Shader Canvas */}
      {mounted ? (
        <div className="absolute inset-0 h-full w-full">
          {variant === 'color-bends' && (
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
          )}

          {variant === 'acid-squares' && (
            <div className="absolute inset-0 h-full w-full opacity-60 dark:opacity-85">
              <AcidSquares
                color1="#aeff00"
                color2="#090d0b"
                color3="#1b3806"
                detail="medium"
                waveDepth={0.8}
                zoom={1.2}
                density={1.5}
                glow={1.0}
                speed={0.5}
                mouseInteraction={true}
              />
            </div>
          )}

          {variant === 'prism' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-70 dark:opacity-90">
              <Prism
                height={5}
                baseWidth={7}
                glow={1.4}
                noise={0.12}
                animationType="rotate"
                transparent={true}
                scale={1.2}
              />
            </div>
          )}

          {variant === 'side-rays' && (
            <div className="absolute inset-0 h-full w-full opacity-65 dark:opacity-90">
              <SideRays
                origin="top-right"
                rayColor1="#aeff00"
                rayColor2="#10b981"
                intensity={1.3}
                speed={0.8}
                spread={1.2}
                className="h-full w-full"
              />
            </div>
          )}

          {variant === 'light-rays' && (
            <div className="absolute inset-0 h-full w-full opacity-70 dark:opacity-95">
              <LightRays
                raysOrigin="top-center"
                raysColor="#aeff00"
                lightSpread={0.9}
                rayLength={1.6}
                raysSpeed={0.7}
                pulsating={true}
                fadeDistance={1.4}
                saturation={1.2}
                noiseAmount={0.1}
                className="h-full w-full"
              />
            </div>
          )}

          {variant === 'pixel-blast' && (
            <div className="absolute inset-0 h-full w-full opacity-60 dark:opacity-80">
              <PixelBlast
                variant="diamond"
                pixelSize={5}
                color="#aeff00"
                className="h-full w-full"
              />
            </div>
          )}

          {variant === 'dither' && (
            <div className="absolute inset-0 h-full w-full opacity-55 dark:opacity-75">
              <Dither
                waveSpeed={0.03}
                waveFrequency={2.5}
                waveAmplitude={0.35}
                waveColor={[0.68, 1.0, 0.0]}
                colorNum={4}
                pixelSize={3}
                enableMouseInteraction={true}
                mouseRadius={0.4}
              />
            </div>
          )}
        </div>
      ) : (
        /* Smooth placeholder glow before WebGL mounts */
        <div className="absolute inset-0 bg-gradient-to-br from-brand-neon/5 via-transparent to-brand-neon/10" />
      )}

      {/* Atmospheric depth & readability vignettes */}
      <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.06)_60%,rgba(0,0,0,0.3)_100%] dark:bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.3)_60%,rgba(0,0,0,0.85)_100%]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
    </div>
  );
};
