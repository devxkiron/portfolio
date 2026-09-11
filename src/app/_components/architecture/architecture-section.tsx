'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { architectureConfig } from './architecture.config';
import { ArchitectureCanvas } from './architecture-canvas';
import { ArchitectureCapabilityCard } from './architecture-capability-card';

export const ArchitectureSection: React.FC = () => {
  const {
    sectionTitle,
    subtitle,
    tabs,
    capabilities,
    primaryCtaText,
    primaryCtaHref,
    secondaryCtaText,
    secondaryCtaHref,
  } = architectureConfig;

  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <section
      id="architecture"
      className="relative w-full bg-black px-4 pt-16 pb-16 text-white sm:px-6 sm:pt-20 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-24 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        {/* Reusable Section Header */}
        <SectionHeader
          title={sectionTitle}
          subtitle={subtitle}
          className="!mb-6 sm:!mb-8"
        />

        {/* Interactive Tab Selectors */}
        <div className="mt-6 mb-7 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'border border-brand-neon/60 bg-zinc-900 text-brand-neon'
                    : 'border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Architecture Canvas */}
        <div className="w-full">
          <ArchitectureCanvas activeTab={activeTab} />
        </div>

        {/* 4 Feature Capability Cards Grid */}
        <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => (
            <ArchitectureCapabilityCard key={capability.id} capability={capability} />
          ))}
        </div>

        {/* Bottom Call To Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Button href={primaryCtaHref} variant="neon" size="md">
            {primaryCtaText}
          </Button>
          <Button href={secondaryCtaHref} variant="secondary" size="md">
            {secondaryCtaText}
          </Button>
        </div>
      </div>
    </section>
  );
};
