"use client";

import React, { useState } from "react";
import { clientStories } from "@/data/clientStories";
import { GlobeVisualization } from "../ui/GlobeVisualization";
import { ScrollReveal } from "../common/ScrollReveal";
import { Badge } from "../common/Badge";
import { Quote, MapPin, CheckCircle2 } from "lucide-react";

export const ClientStoriesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const categories = ["ALL", "HEALTHCARE", "FINTECH", "SAAS"];

  const currentStory =
    activeCategory === "ALL"
      ? clientStories[0]
      : clientStories.find((s) => s.category === activeCategory) || clientStories[0];

  return (
    <section id="stories" className="py-24 sm:py-32 bg-[#101612] text-[#fdfcf8] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--brand-neon)]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header & Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--brand-neon)] uppercase italic drop-shadow-[0_0_20px_rgba(174,255,0,0.3)]">
                CLIENT STORIES
              </h2>
              <p className="text-xs sm:text-sm text-white/50 font-mono mt-1">
                GLOBAL IMPACT • ZERO DOWNTIME PIPELINES
              </p>
            </div>
          </ScrollReveal>

          {/* Filter Categories */}
          <ScrollReveal direction="right">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--brand-neon)] text-[var(--brand-dark)] font-bold shadow-[0_0_12px_rgba(174,255,0,0.4)]"
                        : "bg-white/[0.05] text-white/60 hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    {cat === "ALL" ? "All Stories" : cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Globe & Testimonial Stage */}
        <div className="relative mt-8 sm:mt-12 flex flex-col lg:flex-row items-center justify-between">
          {/* Central 3D Globe */}
          <div className="w-full flex-1">
            <GlobeVisualization />
          </div>

          {/* Overlay Verified Case Study Card */}
          <div className="w-full lg:w-[420px] lg:absolute lg:bottom-4 lg:left-0 z-20 mt-6 lg:mt-0">
            <ScrollReveal direction="up">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#141d16]/95 backdrop-blur-md border border-[var(--brand-neon)]/30 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <Badge variant="dark" hasDot>
                    {currentStory.category} • VERIFIED CASE
                  </Badge>
                  <span className="text-xs font-mono text-[var(--brand-neon)] font-bold bg-[var(--brand-neon)]/10 px-2.5 py-1 rounded">
                    {currentStory.metrics}
                  </span>
                </div>

                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-[var(--brand-neon)]/30 absolute -top-3 -left-1" />
                  <p className="relative z-10 text-sm sm:text-base text-white/90 leading-relaxed italic pl-5">
                    &ldquo;{currentStory.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {currentStory.author}
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-neon)]" />
                    </h5>
                    <p className="text-xs text-white/50">{currentStory.authorRole}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-white/40">
                    <MapPin className="w-3 h-3 text-[var(--brand-neon)]" />
                    <span>{currentStory.city}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
