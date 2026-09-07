"use client";

import React from "react";
import Link from "next/link";
import { impactStats } from "@/data/stats";
import { ScrollReveal } from "../common/ScrollReveal";
import { ArrowRight } from "lucide-react";

export const ImpactSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <ScrollReveal direction="up">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[var(--foreground)]">
                You stop talking about AI. <br />
                We start{" "}
                <span className="text-[#6dae00] dark:text-[var(--brand-neon)] italic">
                  SHIPPING IT.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[var(--foreground)]/70 mt-5 leading-relaxed">
                Most agencies spend months on slide decks. We ship working, tested automations
                directly to production within days.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <Link
              href="#stories"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--foreground)] hover:text-[#6dae00] dark:hover:text-[var(--brand-neon)] transition-colors group"
            >
              <span>See case studies</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        {/* 3 Large Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impactStats.map((stat, idx) => (
            <ScrollReveal key={stat.title} direction="up" delay={0.15 * idx}>
              <div className="p-8 rounded-2xl bg-[var(--brand-muted)] border border-black/[0.06] dark:border-white/[0.08] hover:border-[var(--brand-neon)]/40 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-5xl sm:text-6xl font-black tracking-tight font-mono text-[var(--foreground)] block">
                    {stat.value}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mt-4">
                    {stat.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground)]/65 leading-relaxed mt-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  {stat.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
