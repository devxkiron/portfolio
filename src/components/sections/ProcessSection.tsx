"use client";

import React from "react";
import { processSteps } from "@/data/processSteps";
import { SectionHeader } from "../common/SectionHeader";
import { ScrollReveal } from "../common/ScrollReveal";
import { ProcessStepCard } from "./ProcessStepCard";

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <SectionHeader
            badge="OUR PROCESS"
            titlePrefix="How we automate your business in"
            highlightText="5 CLEAN STEPS"
            subtitle="From initial workflow mapping to production deployment, we handle the entire engineering pipeline."
            align="center"
            className="mb-16 sm:mb-24"
          />
        </ScrollReveal>

        {/* 5 Step Cards Stack */}
        <div className="flex flex-col space-y-8 sm:space-y-12">
          {processSteps.map((step, idx) => (
            <ScrollReveal key={step.number} direction="up" delay={idx * 0.1}>
              <ProcessStepCard step={step} index={idx} reversed={idx % 2 === 1} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
