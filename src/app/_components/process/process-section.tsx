'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/ui/section-header';
import { processConfig } from './process.config';
import { ProcessCard } from './process-card';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessSectionProps {
  /**
   * If true, alternates graphic/text order (Step 1 graphic left, Step 2 text left...).
   * If false, all cards have text on the left and graphics on the right.
   * Default: true (matches the overview mockup).
   */
  alternating?: boolean;
  className?: string;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  alternating = true,
  className = '',
}) => {
  const { steps } = processConfig;
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const stackContainerEl = stackContainerRef.current;
    if (!sectionEl || !stackContainerEl) return;

    const ctx = gsap.context(() => {
      const cardElements = stackContainerEl.querySelectorAll<HTMLElement>('.process-card-stacked');
      if (cardElements.length <= 1) return;

      // Anchor scaling to top center
      gsap.set(cardElements, {
        transformOrigin: 'center top',
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
          // Generous scroll distance (~900px per step) so cards don't rush on slight scroll
          end: () => `+=${Math.max(window.innerHeight * 4.5, 3600)}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Initial resting hold on Card 0 so slight scroll does not immediately flip away
      tl.to({}, { duration: 0.3 });

      // Sequential smooth card stacking with comfortable reading hold pauses
      cardElements.forEach((card, i) => {
        if (i === 0) return;

        const stepLabel = `card-${i + 1}`;
        const transitionDuration = 1.2;
        const holdDuration = 0.5;

        // Animate all previous cards (0 .. i-1) to create a real 3D deck stacking effect
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          const targetScale = Math.max(0.86, 1 - depth * 0.04);
          const targetY = -depth * 14;
          const targetOpacity = Math.max(0.4, 1 - depth * 0.2);

          tl.to(
            cardElements[j],
            {
              scale: targetScale,
              opacity: targetOpacity,
              y: targetY,
              duration: transitionDuration,
              ease: 'power1.inOut',
            },
            stepLabel
          );
        }

        // Incoming card slides up smoothly from below to cover previous card
        tl.fromTo(
          card,
          {
            y: () => window.innerHeight,
            opacity: 1,
          },
          {
            y: 0,
            opacity: 1,
            duration: transitionDuration,
            ease: 'power1.out',
          },
          stepLabel
        );

        // Reading hold period after card settles
        tl.to({}, { duration: holdDuration });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`relative w-full min-h-screen bg-black px-4 pt-2 pb-8 text-white sm:px-6 sm:pt-3 sm:pb-10 lg:px-8 lg:pt-5 flex flex-col justify-start items-center ${className}`}
    >
      <div className="mx-auto max-w-7xl w-full flex flex-col items-center">
        {/* Reusable Section Header — compact, perfectly balanced on mobile & medium devices */}
        <div className="relative z-20 w-full flex justify-center px-2">
          <SectionHeader
            title={
              <>
                <span>How we automate your business</span>
                <span className="block mt-1">
                  in{' '}
                  <span className="inline-block rounded-md bg-brand-neon px-2 py-0.5 font-black text-black shadow-sm text-sm sm:text-lg md:text-xl lg:text-2xl align-baseline">
                    5 CLEAR STEPS.
                  </span>
                </span>
              </>
            }
            subtitle="From initial diagnostic audit all the way to autonomous operation. Real production systems with zero overhead."
            align="center"
            showDivider={true}
            animated={false}
            className="!mb-2 sm:!mb-3 w-full max-w-4xl"
            titleClassName="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight"
            subtitleClassName="!mt-1 max-w-lg text-xs md:text-sm text-zinc-400 leading-snug"
            dividerClassName="!mt-1.5 sm:!mt-2"
          />
        </div>

        {/* Stacking Cards Container */}
        <div
          ref={stackContainerRef}
          className="cards-stack-container relative w-full h-[400px] sm:h-[420px] lg:h-[450px] max-w-7xl mx-auto"
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
