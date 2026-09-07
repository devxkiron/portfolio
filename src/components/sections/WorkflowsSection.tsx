"use client";

import React, { useState } from "react";
import { workflowTabs, workflowFeatures } from "@/data/workflows";
import { SectionHeader } from "../common/SectionHeader";
import { ScrollReveal } from "../common/ScrollReveal";
import { Button } from "../common/Button";
import { WorkflowCanvas } from "../ui/WorkflowCanvas";
import { Zap, GitFork, Database, Send, ArrowUpRight } from "lucide-react";

export const WorkflowsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("lead-gen");

  const getIcon = (name: string) => {
    switch (name) {
      case "Zap":
        return <Zap className="w-5 h-5 text-[var(--brand-neon)]" />;
      case "GitFork":
        return <GitFork className="w-5 h-5 text-[var(--brand-neon)]" />;
      case "Database":
        return <Database className="w-5 h-5 text-[var(--brand-neon)]" />;
      case "Send":
      default:
        return <Send className="w-5 h-5 text-[var(--brand-neon)]" />;
    }
  };

  return (
    <section id="workflows" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up">
          <SectionHeader
            badge="WORKFLOW ENGINE"
            titlePrefix="We Build Workflows That"
            highlightText="Multiply Your Revenue"
            subtitle="A deep dive into our modular agent architecture designed to scale seamlessly with your volume."
            align="center"
            className="mb-12"
          />
        </ScrollReveal>

        {/* Tab Category Switcher */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {workflowTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[var(--brand-dark)] text-[var(--brand-neon)] shadow-md border border-[var(--brand-neon)]/30"
                      : "bg-black/[0.04] dark:bg-white/[0.05] text-[var(--foreground)]/70 hover:text-[var(--foreground)] border border-transparent hover:border-black/10"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-neon)] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Interactive Canvas */}
        <ScrollReveal direction="up" delay={0.2}>
          <WorkflowCanvas activeTabId={activeTab} />
        </ScrollReveal>

        {/* 4 Feature Highlight Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowFeatures.map((feat, idx) => (
            <ScrollReveal key={feat.title} direction="up" delay={0.1 * idx}>
              <div className="h-full p-5 rounded-xl bg-[var(--brand-muted)] border border-black/[0.06] dark:border-white/[0.06] hover:border-[var(--brand-neon)]/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[var(--brand-dark)] flex items-center justify-center mb-4">
                  {getIcon(feat.iconName)}
                </div>
                <h4 className="text-sm font-bold text-[var(--foreground)] mb-1.5">{feat.title}</h4>
                <p className="text-xs text-[var(--foreground)]/70 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Row */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="#booking"
              variant="secondary"
              size="md"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Book a Discovery Call
            </Button>
            <Button href="#process" variant="outline" size="md">
              View All Workflows
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
