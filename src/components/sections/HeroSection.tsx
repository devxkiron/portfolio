"use client";

import React from "react";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { ScrollReveal } from "../common/ScrollReveal";
import { heroStats } from "@/data/navigation";
import { ArrowUpRight, Play } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[var(--brand-neon)]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Tag Badge */}
        <ScrollReveal direction="down" delay={0.1}>
          <div className="inline-block mb-6">
            <Badge variant="outline" hasDot className="py-1.5 px-4 shadow-sm">
              <span className="text-black/80 dark:text-white/80 font-mono tracking-widest text-[11px]">
                POWERED BY AUTOPILOT AI
              </span>
            </Badge>
          </div>
        </ScrollReveal>

        {/* Main H1 Title */}
        <ScrollReveal direction="up" delay={0.2}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-[var(--foreground)]">
            We Build Software That <br className="hidden sm:inline" />
            Runs Your Business <br />
            <span className="relative inline-block mt-2 sm:mt-3 px-3 py-1 text-[#6dae00] dark:text-[var(--brand-neon)] font-black tracking-tighter uppercase italic drop-shadow-[0_4px_24px_rgba(174,255,0,0.4)]">
              ON AUTOPILOT
            </span>
          </h1>
        </ScrollReveal>

        {/* Subtitle Description */}
        <ScrollReveal direction="up" delay={0.3}>
          <p className="mt-7 max-w-2xl mx-auto text-base sm:text-xl text-[var(--foreground)]/75 leading-relaxed font-normal">
            Stop wasting hours on manual tasks. We engineer custom AI agents and internal tools
            that run your operations, scale revenue, and free up your core team.
          </p>
        </ScrollReveal>

        {/* Hero Actions */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="#booking"
              variant="secondary"
              size="lg"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Book a Free Strategy Call
            </Button>
            <Button
              href="#workflows"
              variant="outline"
              size="lg"
              icon={<Play className="w-3.5 h-3.5 fill-current" />}
              iconPosition="left"
            >
              See Our Work
            </Button>
          </div>
        </ScrollReveal>

        {/* 4-Column Proof Metrics Bar */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mt-16 sm:mt-24 pt-10 border-t border-black/[0.08] dark:border-white/[0.1] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {heroStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center ${
                  idx !== heroStats.length - 1
                    ? "md:border-r md:border-black/[0.08] dark:md:border-white/[0.08]"
                    : ""
                }`}
              >
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-[var(--foreground)]/65 font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
