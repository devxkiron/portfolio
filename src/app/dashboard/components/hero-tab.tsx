'use client';

import React from 'react';
import { HeroBackgroundVariant } from '@/lib/theme-config/types';
import { Check, Sparkles, Wand2, Eye } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface HeroTabProps {
  currentVariant?: HeroBackgroundVariant;
  onChange: (variant: HeroBackgroundVariant) => void;
}

interface HeroVariationOption {
  id: HeroBackgroundVariant;
  title: string;
  badge: string;
  description: string;
  technology: string;
  previewBg: string;
}

const HERO_VARIATIONS: HeroVariationOption[] = [
  {
    id: 'color-bends',
    title: 'Color Bends (WebGL)',
    badge: 'DEFAULT',
    description: 'Ultra-smooth procedural ribbon flows with interactive physics, mouse tracking, and luminous glow.',
    technology: 'Three.js + GLSL Shaders',
    previewBg: 'from-lime-500/20 via-emerald-600/15 to-transparent',
  },
  {
    id: 'acid-squares',
    title: 'Acid Squares',
    badge: 'CYBER-GRID',
    description: 'Distorted neon grid array that ripples and bends in continuous liquid motion.',
    technology: 'OGL WebGL Engine',
    previewBg: 'from-emerald-400/20 via-lime-600/20 to-black',
  },
  {
    id: 'prism',
    title: 'Prism Refraction',
    badge: 'CHROMATIC',
    description: 'Rotating geometric optical crystal with light dispersion and prismatic glow.',
    technology: 'OGL 3D Mesh',
    previewBg: 'from-lime-400/25 via-teal-500/15 to-transparent',
  },
  {
    id: 'side-rays',
    title: 'Side Rays',
    badge: 'DRAMATIC',
    description: 'Atmospheric directional light rays beaming diagonally across the viewport.',
    technology: 'OGL Volumetric',
    previewBg: 'from-lime-500/30 via-transparent to-transparent',
  },
  {
    id: 'light-rays',
    title: 'Light Rays (God Rays)',
    badge: 'ATMOSPHERIC',
    description: 'Overhead celestial light shafts pulsating with luminous neon radiance.',
    technology: 'OGL Procedural',
    previewBg: 'from-lime-400/20 via-lime-900/10 to-transparent',
  },
  {
    id: 'pixel-blast',
    title: 'Pixel Blast',
    badge: 'INTERACTIVE',
    description: 'Dynamic matrix of diamond particles that react fluidly to pointer movements.',
    technology: 'Three.js + PostProcessing',
    previewBg: 'from-emerald-500/15 via-zinc-800 to-transparent',
  },
  {
    id: 'dither',
    title: 'Cyber Dither',
    badge: 'RETRO-TECH',
    description: 'Retro 90s digital dither shader with interactive wave displacement.',
    technology: 'R3F + PostProcessing',
    previewBg: 'from-lime-600/25 via-zinc-900 to-transparent',
  },
];

export function HeroTab({ currentVariant = 'color-bends', onChange }: HeroTabProps) {
  const handleSelect = (variant: HeroVariationOption) => {
    onChange(variant.id);
    toast.info(`Hero visual set to ${variant.title}`, {
      description: 'Remember to click Save Changes (⌘S) in the top bar to persist.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#aeff00]" />
            Hero Section Background Variations
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Choose which interactive WebGL shader or visual animation renders behind the Hero section.
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
          Active: <strong className="text-[#aeff00]">{currentVariant}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {HERO_VARIATIONS.map((variant) => {
          const isSelected = currentVariant === variant.id;

          return (
            <div
              key={variant.id}
              onClick={() => handleSelect(variant)}
              className={`group relative flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                isSelected
                  ? 'border-[#aeff00] bg-zinc-900/90 shadow-[0_0_20px_rgba(174,255,0,0.12)] ring-1 ring-[#aeff00]'
                  : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/50'
              }`}
            >
              {/* Background preview glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${variant.previewBg} opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none`}
              />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-400">
                    {variant.badge}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#aeff00] bg-[#aeff00]/10 px-2 py-0.5 rounded-full border border-[#aeff00]/30">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    {variant.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                    {variant.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-3.5 mt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 text-[11px] text-zinc-500 font-mono">
                <span className="truncate max-w-[140px] sm:max-w-[180px]" title={variant.technology}>
                  {variant.technology}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(variant);
                  }}
                  className={`shrink-0 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#aeff00] text-black font-semibold shadow-sm'
                      : 'bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700'
                  }`}
                >
                  {isSelected ? 'Active' : 'Apply'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
