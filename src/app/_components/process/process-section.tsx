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

        // Animate previous cards to smoothly recede in 3D depth WITHOUT shifting up into header text
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          const targetScale = Math.max(0.88, 1 - depth * 0.03);
          const targetY = 0; // Stay anchored in place — never collide with header text
          const targetOpacity = Math.max(0.35, 1 - depth * 0.22);

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
      className={`relative w-full bg-black px-4 pt-16 pb-8 text-white sm:px-6 sm:pt-20 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12 flex flex-col justify-start items-center scroll-mt-20 ${className}`}
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
            showDivider={false}
            animated={false}
            className="!mb-5 sm:!mb-7 w-full max-w-4xl"
            titleClassName="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight"
            subtitleClassName="!mt-1.5 max-w-lg text-xs md:text-sm text-zinc-400 leading-relaxed"
          />
        </div>

        {/* Stacking Cards Container — tall on mobile to fit vertical content and fill bottom void */}
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
