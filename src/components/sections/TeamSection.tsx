"use client";

import React from "react";
import { teamMembers } from "@/data/team";
import { SectionHeader } from "../common/SectionHeader";
import { ScrollReveal } from "../common/ScrollReveal";
import { Button } from "../common/Button";
import { ArrowRight, User } from "lucide-react";

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <ScrollReveal direction="up">
          <SectionHeader
            badge="THE ENGINEERS"
            titlePrefix="One team. From whiteboard"
            highlightText="TO PRODUCTION"
            subtitle="No account managers, no middlemen. You work directly with the senior engineers who build your system."
            align="center"
            className="mb-16"
          />
        </ScrollReveal>

        {/* 6 Team Member Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {teamMembers.map((member, idx) => (
            <ScrollReveal key={member.name} direction="up" delay={0.08 * idx}>
              <div className="flex flex-col items-center group">
                {/* Circular Avatar Container */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--brand-dark)] border-2 border-black/[0.08] dark:border-white/[0.1] group-hover:border-[var(--brand-neon)] flex items-center justify-center transition-all duration-300 shadow-md overflow-hidden">
                  {/* Stylized Avatar Silhouette with Neon Glow */}
                  <div className="w-full h-full bg-gradient-to-b from-[#1c2c20] to-[#0a120c] flex items-center justify-center text-white/80 group-hover:text-[var(--brand-neon)] transition-colors">
                    <User className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  {/* Status Indicator Dot */}
                  <span className="absolute bottom-1 right-2 w-3 h-3 rounded-full bg-[var(--brand-neon)] border-2 border-[var(--brand-dark)]" />
                </div>

                <h4 className="text-sm sm:text-base font-bold text-[var(--foreground)] mt-3">
                  {member.name}
                </h4>
                <p className="text-xs text-[var(--foreground)]/65 font-medium mt-0.5">
                  {member.role}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Action Button */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-14 flex justify-center">
            <Button
              href="#booking"
              variant="outline"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Meet the Full Team
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
