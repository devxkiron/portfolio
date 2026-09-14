'use client';

import React from 'react';
import { NavbarStyleVariant } from '@/lib/theme-config/types';
import { Check, Navigation, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface NavbarTabProps {
  currentVariant?: NavbarStyleVariant;
  onChange: (variant: NavbarStyleVariant) => void;
}

interface NavbarOption {
  id: NavbarStyleVariant;
  title: string;
  badge: string;
  inspiration: string;
  description: string;
  features: string[];
  renderWireframe: () => React.ReactNode;
}

const NAVBAR_OPTIONS: NavbarOption[] = [
  {
    id: 'floating-pill',
    title: 'Floating Frosted Capsule',
    badge: 'LINEAR / VERCEL',
    inspiration: 'Linear App & Vercel design system',
    description:
      'Floating capsule suspended 16px from top with frosted glass blur, pill-shaped nav buttons, and a smooth rounded-full geometry.',
    features: ['Floating capsule', 'Glassmorphism backdrop', 'Pill active indicators', 'Floating mobile drawer'],
    renderWireframe: () => (
      <div className="w-full h-12 rounded-lg bg-zinc-950/80 border border-zinc-800/80 p-2 flex items-center justify-center">
        <div className="w-[90%] h-7 rounded-full border border-zinc-700 bg-zinc-900/90 shadow-sm flex items-center justify-between px-3">
          <div className="w-12 h-2 rounded-full bg-zinc-400" />
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-1.5 rounded-full bg-zinc-600" />
            <div className="w-6 h-1.5 rounded-full bg-[#aeff00]" />
            <div className="w-6 h-1.5 rounded-full bg-zinc-600" />
          </div>
          <div className="w-8 h-3.5 rounded-full bg-[#aeff00]/20 border border-[#aeff00]/40" />
        </div>
      </div>
    ),
  },
  {
    id: 'minimal-dock',
    title: 'Raycast Floating Dock',
    badge: 'DYNAMIC ISLAND',
    inspiration: 'Raycast, Dynamic Island & macOS Dock',
    description:
      'Ultra-compact centered floating dock with live pulsing availability beacon, icons, and minimal screen footprint.',
    features: ['Centered dock footprint', 'Live pulsing availability beacon', 'Icon & text integration', 'Quick CTA micro-chip'],
    renderWireframe: () => (
      <div className="w-full h-12 rounded-lg bg-zinc-950/80 border border-zinc-800/80 p-2 flex items-center justify-center">
        <div className="h-7 rounded-2xl border border-zinc-700 bg-zinc-900/95 shadow-sm flex items-center gap-2.5 px-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="w-8 h-2 rounded bg-zinc-300 font-bold" />
          <div className="h-3 w-px bg-zinc-700" />
          <div className="flex items-center gap-1">
            <div className="w-5 h-1.5 rounded bg-zinc-600" />
            <div className="w-5 h-1.5 rounded bg-[#aeff00]" />
            <div className="w-5 h-1.5 rounded bg-zinc-600" />
          </div>
          <div className="w-5 h-4 rounded-xl bg-[#aeff00] flex items-center justify-center" />
        </div>
      </div>
    ),
  },
  {
    id: 'cyber-hud',
    title: 'Industrial Cyber HUD',
    badge: 'ORIGIN TECH',
    inspiration: 'Palantir, Sci-Fi telemetry HUD & Cyberpunk',
    description:
      'Engineering HUD with corner tech brackets [ ], monospace index tags (01//, 02//), glowing scanlines, and telemetry status.',
    features: ['Corner bracket accents [ ]', '01// Monospace link indices', 'SYSTEM: ONLINE telemetry', 'Tech angular mobile menu'],
    renderWireframe: () => (
      <div className="w-full h-12 rounded-lg bg-zinc-950/80 border border-zinc-800/80 p-2 flex items-center justify-center">
        <div className="w-full h-7 border-y border-zinc-700 bg-zinc-950 flex items-center justify-between px-2 font-mono text-[9px] text-zinc-400">
          <div className="flex items-center gap-1 text-[#aeff00]">
            <span>[//]</span>
            <span className="font-bold">DEVX</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">01/PRJ</span>
            <span className="text-[#aeff00] font-bold">02/SYS</span>
            <span className="text-zinc-500">03/STK</span>
          </div>
          <div className="flex items-center gap-1 text-[8px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ONLINE</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'glass-morphism',
    title: 'Edge-to-Edge Glassmorphism',
    badge: 'STRIPE / FRAMER',
    inspiration: 'Stripe, Framer & Linear marketing pages',
    description:
      'Full-width viewport edge-to-edge frosted glass bar with a glowing neon laser hairline bottom border for maximum content focus.',
    features: ['Edge-to-edge full width', 'Frosted glass backdrop-blur-xl', 'Neon laser hairline border', 'High-contrast desktop pill hover'],
    renderWireframe: () => (
      <div className="w-full h-12 rounded-lg bg-zinc-950/80 border border-zinc-800/80 p-2 flex items-center justify-center">
        <div className="w-full h-7 border-b border-[#aeff00]/60 bg-zinc-900/60 backdrop-blur flex items-center justify-between px-3">
          <div className="w-10 h-2 rounded bg-zinc-300" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-1.5 rounded-full bg-zinc-600" />
            <div className="w-7 h-1.5 rounded-full bg-[#aeff00]" />
            <div className="w-7 h-1.5 rounded-full bg-zinc-600" />
          </div>
          <div className="w-12 h-3.5 rounded bg-zinc-800 border border-zinc-700" />
        </div>
      </div>
    ),
  },
  {
    id: 'compact-island',
    title: 'Modular Bento Island (3-Piece Split)',
    badge: '3-PIECE BENTO',
    inspiration: 'Modern Bento Grid & Awwwards portfolios',
    description:
      'Three decoupled floating pods: Brand Chip on the left, Centered Nav Pod, and Floating CTA on the right with negative space between them.',
    features: ['3 decoupled floating pods', 'Spaced modular bento layout', 'Sleek geometric chips', 'Independent mobile trigger pod'],
    renderWireframe: () => (
      <div className="w-full h-12 rounded-lg bg-zinc-950/80 border border-zinc-800/80 p-2 flex items-center justify-center">
        <div className="w-full flex items-center justify-between px-1">
          {/* Brand Chip */}
          <div className="h-6 px-2 rounded-lg border border-zinc-700 bg-zinc-900 flex items-center">
            <div className="w-8 h-1.5 rounded bg-zinc-300" />
          </div>
          {/* Nav Pod */}
          <div className="h-6 px-3 rounded-xl border border-zinc-700 bg-zinc-900 flex items-center gap-1.5">
            <div className="w-4 h-1.5 rounded bg-zinc-600" />
            <div className="w-4 h-1.5 rounded bg-[#aeff00]" />
            <div className="w-4 h-1.5 rounded bg-zinc-600" />
          </div>
          {/* CTA Chip */}
          <div className="h-6 px-2 rounded-lg border border-[#aeff00]/40 bg-[#aeff00]/10 flex items-center">
            <div className="w-6 h-1.5 rounded bg-[#aeff00]" />
          </div>
        </div>
      </div>
    ),
  },
];

export function NavbarTab({
  currentVariant = 'floating-pill',
  onChange,
}: NavbarTabProps) {
  const handleSelect = (option: NavbarOption) => {
    onChange(option.id);
    toast.info(`Navbar style set to ${option.title}`, {
      description: 'Remember to click Save Changes (⌘S) in the top bar to persist.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#aeff00]" />
            Navbar Design Variations
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Choose from the top 5 curated navbar designs. Changes apply instantly across desktop and mobile.
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
          Active: <strong className="text-[#aeff00]">{currentVariant}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {NAVBAR_OPTIONS.map((option) => {
          const isSelected = currentVariant === option.id;

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`group relative flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                isSelected
                  ? 'border-[#aeff00] bg-zinc-900/90 shadow-[0_0_20px_rgba(174,255,0,0.12)] ring-1 ring-[#aeff00]'
                  : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/50'
              }`}
            >
              <div className="space-y-3">
                {/* Header & Badges */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-400">
                    {option.badge}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-[#aeff00]">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>
                </div>

                {/* Wireframe Mockup */}
                <div className="pt-1">{option.renderWireframe()}</div>

                {/* Title & Description */}
                <div>
                  <h3
                    className={`text-sm font-semibold transition-colors ${
                      isSelected ? 'text-[#aeff00]' : 'text-zinc-100 group-hover:text-white'
                    }`}
                  >
                    {option.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* Features Pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {option.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom selection bar */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-zinc-500 font-mono truncate max-w-[160px] sm:max-w-[220px]" title={option.inspiration}>
                  {option.inspiration}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                  className={`shrink-0 text-xs px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#aeff00] text-black font-semibold shadow-sm'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
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
