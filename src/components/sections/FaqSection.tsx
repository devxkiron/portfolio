"use client";

import React, { useState } from "react";
import { faqs } from "@/data/faqs";
import { SectionHeader } from "../common/SectionHeader";
import { ScrollReveal } from "../common/ScrollReveal";
import { Plus, Minus } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First open by default as shown in image

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left">
              <SectionHeader
                badge="FAQ"
                titlePrefix="Frequently"
                highlightText="ASKED"
                titleSuffix="Questions"
                subtitle="Everything you need to know about our process, pricing, security, and timelines."
                align="left"
              />
            </ScrollReveal>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;

              return (
                <ScrollReveal key={faq.question} direction="up" delay={0.08 * idx}>
                  <div
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? "bg-[var(--brand-muted)] border-black/[0.12] dark:border-white/[0.15] shadow-sm"
                        : "bg-transparent border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.15]"
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        {isOpen && (
                          <span className="w-2 h-2 rounded-full bg-[var(--brand-neon)] flex-shrink-0 animate-pulse" />
                        )}
                        <span className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                          {faq.question}
                        </span>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                          isOpen
                            ? "bg-[var(--brand-neon)] text-[var(--brand-dark)]"
                            : "bg-black/[0.05] dark:bg-white/[0.08] text-[var(--foreground)]"
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[var(--foreground)]/70 leading-relaxed border-t border-black/[0.04] dark:border-white/[0.04]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
