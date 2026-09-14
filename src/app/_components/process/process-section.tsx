'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/ui/section-header';
import { processConfig as defaultProcessConfig } from './process.config';
import { ProcessCard } from './process-card';
import type { ProcessSectionProps } from './types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  id = 'process',
  config,
  title,
  subtitle,
  badge,
  highlightedText,
  steps: propsSteps,
  alternating = true,
  showDivider = true,
  animated = false,
  className = '',
}) => {
  const steps = propsSteps ?? config?.steps ?? defaultProcessConfig.steps;
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackContainerRef = useRef<HTMLDivElement | null>(null);

  const activeTitle = title ?? (
    <>
      <span>{config?.sectionTitle ?? defaultProcessConfig.sectionTitle}</span>
      <span className="block mt-1 sm:mt-1.5">
        <span className="inline-block rounded-md bg-brand-neon px-2.5 py-0.5 font-black text-black shadow-sm text-base sm:text-xl md:text-2xl lg:text-3xl align-baseline">
          {highlightedText ?? config?.highlightedText ?? defaultProcessConfig.highlightedText}
        </span>
      </span>
    </>
  );

  const activeSubtitle = subtitle ?? config?.subtitle ?? defaultProcessConfig.subtitle;
  const activeBadge = badge ?? config?.badge;

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const stackContainerEl = stackContainerRef.current;
    if (!sectionEl || !stackContainerEl) return;

    const ctx = gsap.context(() => {
      const cardElements = stackContainerEl.querySelectorAll<HTMLElement>('.process-card-stacked');
      if (cardElements.length <= 1) return;

      // Anchor scaling to center
      gsap.set(cardElements, {
        transformOrigin: 'center center',
      });

      // Initial positions: Card 0 visible; Cards 1..N start below viewport
      cardElements.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, {
            y: () => window.innerHeight,
            opacity: 1,
            scale: 1,
          });
        }
      });

      // Pinned Timeline with smooth scrub and generous scroll range
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          pin: true,
          start: 'top top',
          end: () => `+=${cardElements.length * 900}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stacking loop: each step comes up and settles into a slight scale-down
      const stepDuration = 1.0;
      const holdDuration = 0.5;

      cardElements.forEach((card, i) => {
        if (i === 0) return;

        tl.to(
          card,
          {
            y: 0,
            duration: stepDuration,
            ease: 'none',
          },
          `step-${i}`
        );

        // Previous cards scale down slightly and reduce opacity to create physical depth
        for (let p = 0; p < i; p++) {
          const depthScale = Math.max(0.85, 1 - (i - p) * 0.04);
          const depthOpacity = Math.max(0.4, 1 - (i - p) * 0.18);
          tl.to(
            cardElements[p],
            {
              scale: depthScale,
              opacity: depthOpacity,
              duration: stepDuration,
              ease: 'none',
            },
            `step-${i}`
          );
        }

        // Slight hold so user can read/appreciate each card before the next starts coming up
        if (i < cardElements.length - 1) {
          tl.to({}, { duration: holdDuration });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full bg-background px-4 pt-16 pb-8 text-foreground sm:px-6 sm:pt-20 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12 flex flex-col justify-start items-center scroll-mt-20 transition-colors duration-200 ${className}`}
    >
      <div className="mx-auto max-w-7xl w-full flex flex-col items-center">
        {/* Reusable SectionHeader Component */}
        <SectionHeader
          badge={activeBadge}
          title={activeTitle}
          subtitle={activeSubtitle}
          align="center"
          showDivider={showDivider}
          animated={animated}
          className="mb-8 sm:mb-12 w-full max-w-4xl"
          titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
          subtitleClassName="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed"
        />

        {/* Stacking Cards Container */}
        <div
          ref={stackContainerRef}
          className="cards-stack-container relative w-full h-[510px] sm:h-[460px] lg:h-[440px] max-w-7xl mx-auto"
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="process-card-stacked absolute inset-0 w-full"
              style={{ zIndex: index + 1 }}
            >
              <ProcessCard
                step={step}
                isReversed={alternating ? index % 2 === 0 : false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
