'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/ui/section-header';
import { bookingConfig } from './booking.config';
import { CustomScheduler } from './custom-scheduler';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BookingSection: React.FC = () => {
  const {
    sectionId,
    badgeText,
    titlePrefix,
    titleHighlight,
    subtitle,
    hostName,
    meetingTitle,
    meetingDuration,
    calendlyUrl,
    defaultTimezone,
    availableTimeSlots,
  } = bookingConfig;

  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const containerEl = containerRef.current;
    const glowEl = glowRef.current;
    if (!sectionEl || !containerEl) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation on scroll
      gsap.fromTo(
        containerEl,
        {
          opacity: 0,
          y: 35,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerEl,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Ambient subtle floating glow
      if (glowEl) {
        gsap.to(glowEl, {
          x: 35,
          y: -20,
          scale: 1.15,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative w-full bg-black py-24 sm:py-32 text-white overflow-hidden scroll-mt-20 border-t border-zinc-800/80"
    >
      {/* Anchor alias for #contact */}
      <span id="contact" className="absolute -top-20 pointer-events-none" />

      {/* Ambient subtle glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(92,246,41,0.06),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Clean SectionHeader */}
        <SectionHeader
          badge={badgeText}
          title={
            <>
              <span>{titlePrefix} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#5cf629] to-lime-300">
                {titleHighlight}
              </span>
            </>
          }
          subtitle={subtitle}
          align="center"
          showDivider={true}
          className="!mb-10"
        />

        {/* Custom Scheduler Container - Zero noise & expansive width */}
        <div ref={containerRef} className="w-full flex justify-center">
          <CustomScheduler
            calendlyUrl={calendlyUrl}
            defaultTimezone={defaultTimezone}
          />
        </div>
      </div>
    </section>
  );

};
