"use client";

import React, { useEffect, useRef } from "react";
import { processSteps } from "@/data/processSteps";
import { ProcessStepCard } from "./ProcessStepCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cardWrappers = gsap.utils.toArray<HTMLElement>(".process-card-wrapper");
      const cardInners = gsap.utils.toArray<HTMLElement>("[data-process-card]");

      cardWrappers.forEach((wrapper, i) => {
        if (i < cardWrappers.length - 1) {
          const nextWrapper = cardWrappers[i + 1];
          const currentInner = cardInners[i];

          // As the next card scrolls up to land on top of the current card:
          gsap.to(currentInner, {
            scale: 0.94 - i * 0.015,
            opacity: 0.65,
            filter: "brightness(0.75)",
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: nextWrapper,
              start: "top bottom-=10%",
              end: `top ${96 + (i + 1) * 24}px`,
              scrub: 0.5,
            },
          });
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="process" ref={containerRef} className="py-12 sm:py-20 relative">
      {/* Background Mesh Grid Pattern & Ambient Glow (Clipped inside absolute wrapper, not section) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[var(--brand-neon)]/[0.04] blur-[140px] rounded-full" />

        {/* Mesh Grid Matrix with Radial Fade Mask */}
        <div
          className="absolute inset-0 opacity-[0.14] dark:opacity-[0.20]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, #000 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, #000 50%, transparent 100%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Left-Aligned Header Matching Reference Image */}
        <div className="max-w-3xl mb-10 sm:mb-14 text-left">
          <h2 className="text-3xl sm:text-5xl md:text-[54px] font-black tracking-tight leading-[1.08] text-[var(--foreground)]">
            How we automate your <br />
            business <br />
            in{" "}
            <span className="text-[#8fe000] dark:text-[var(--brand-neon)] font-black tracking-tight italic [text-shadow:0_0_25px_rgba(174,255,0,0.3)]">
              5 CLEAR STEPS.
            </span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[var(--foreground)]/70 max-w-2xl leading-relaxed font-normal">
            From discovering manual bottlenecks to deploying self-healing AI systems that save
            your team dozens of hours every week.
          </p>
        </div>

        {/* 5 Step Cards - GSAP Stacking Container */}
        <div className="relative flex flex-col pb-32">
          {processSteps.map((step, idx) => (
            <div
              key={step.number}
              className="process-card-wrapper sticky mb-10 sm:mb-14 last:mb-0"
              style={{
                top: `calc(96px + ${idx * 24}px)`,
                zIndex: idx + 1,
              }}
            >
              <ProcessStepCard step={step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
