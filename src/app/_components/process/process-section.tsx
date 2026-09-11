'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  const { sectionTitle, highlightedText, subtitle, steps } = processConfig;
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // Header Animation
      const headerElements = sectionEl.querySelectorAll('.process-header-item');
      if (headerElements.length > 0) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 85%',
            },
          }
        );
      }

      // Process Cards Individual Entrance Animation
      const cards = sectionEl.querySelectorAll('.process-card-wrapper');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`relative w-full bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl sm:mb-16">
          <h2 className="process-header-item text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
            {sectionTitle}
            <span className="block mt-2">
              <span className="inline-block rounded-md bg-brand-neon px-2.5 py-0.5 font-black text-black shadow-sm">
                {highlightedText}
              </span>
            </span>
          </h2>
          {subtitle && (
            <p className="process-header-item mt-5 text-base sm:text-lg font-medium text-zinc-400 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* 5 Step Cards List */}
        <div className="space-y-6 sm:space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className="process-card-wrapper">
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
