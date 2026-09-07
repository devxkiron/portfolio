"use client";

import React from "react";
import { toolchainTools } from "@/data/toolchain";
import { SectionHeader } from "../common/SectionHeader";
import { ScrollReveal } from "../common/ScrollReveal";
import { Cpu } from "lucide-react";

export const ToolchainSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up">
          <SectionHeader
            badge="PRODUCTION STACK"
            titlePrefix="Engineered With The World's"
            highlightText="BEST TOOLCHAIN"
            subtitle="Enterprise-grade reliability built on battle-tested frameworks and frontier AI models."
            align="center"
            className="mb-14"
          />
        </ScrollReveal>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {toolchainTools.map((tool, idx) => (
            <ScrollReveal key={tool.name} direction="up" delay={0.04 * idx}>
              <div className="p-4 rounded-xl bg-[var(--brand-muted)] border border-black/[0.06] dark:border-white/[0.06] hover:border-[var(--brand-neon)]/50 hover:bg-black/[0.02] transition-all flex flex-col items-center justify-center text-center group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-dark)] text-[var(--brand-neon)] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                  {tool.name}
                </span>
                <span className="text-[10px] font-mono text-[var(--foreground)]/50 mt-0.5">
                  {tool.category}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
