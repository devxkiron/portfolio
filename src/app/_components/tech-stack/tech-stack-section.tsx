'use client';

import React, { useState, useMemo } from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { techStackConfig } from './tech-stack.config';
import { TechMarquee } from './tech-marquee';
import { TechCategoryId } from './types';

export const TechStackSection: React.FC = () => {
  const {
    titlePrefix,
    titleHighlight,
    titleSuffix,
    subtitle,
    categories,
    items,
  } = techStackConfig;

  const [selectedCategory, setSelectedCategory] = useState<TechCategoryId>('all');

  const row1Items = useMemo(() => items.filter((item) => item.row === 1), [items]);
  const row2Items = useMemo(() => items.filter((item) => item.row === 2), [items]);

  return (
    <section
      id="tech-stack"
      className="relative w-full bg-black py-20 sm:py-24 text-white overflow-hidden scroll-mt-20"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(92,246,41,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Project Reusable SectionHeader Component */}
        <SectionHeader
          title={
            <>
              <span>{titlePrefix}</span>
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#5cf629] to-lime-300 drop-shadow-[0_0_24px_rgba(92,246,41,0.5)]">
                {titleHighlight}
              </span>
              <span>{titleSuffix}</span>
            </>
          }
          subtitle={subtitle}
          align="center"
          showDivider={true}
          className="!mb-6"
        />

        {/* Category Filter Pills */}
        <div className="mt-2 mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border border-lime-400/80 bg-lime-400/10 text-[#5cf629] shadow-[0_0_15px_rgba(92,246,41,0.25)]'
                    : 'border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Row Marquee Grid */}
      <div className="mt-8 w-full">
        <TechMarquee
          row1Items={row1Items}
          row2Items={row2Items}
          selectedCategory={selectedCategory}
        />
      </div>
    </section>
  );
};
