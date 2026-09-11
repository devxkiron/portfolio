'use client';

import React, { useState } from 'react';
import { architectureConfig } from './architecture.config';
import { ArchitectureCanvas } from './architecture-canvas';
import { ArchitectureCapabilityCard } from './architecture-capability-card';

export const ArchitectureSection: React.FC = () => {
  const {
    badgeText,
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
      className="relative w-full bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        {/* Top Pill Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-xs font-medium text-zinc-300">
          <span className="h-2 w-2 rounded-full bg-brand-neon shadow-[0_0_8px_#aeff00]" />
          <span>{badgeText}</span>
        </div>

        {/* Section Heading */}
        <h2 className="max-w-4xl text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {sectionTitle}
        </h2>

        {/* Subtitle */}
        <p className="mt-3 max-w-2xl text-center text-xs sm:text-sm md:text-base leading-relaxed text-zinc-400">
          {subtitle}
        </p>

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
          <a
            href={primaryCtaHref}
            className="rounded-lg bg-brand-neon px-6 py-2.5 text-xs sm:text-sm font-bold text-black transition-colors hover:bg-brand-neon/90"
          >
            {primaryCtaText}
          </a>
          <a
            href={secondaryCtaHref}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:border-zinc-700 hover:bg-zinc-800"
          >
            {secondaryCtaText}
          </a>
        </div>
      </div>
    </section>
  );
};
