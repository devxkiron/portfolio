'use client';

import React from 'react';
import { TypographyConfig, AvailableFontKey } from '@/lib/theme-config/types';
import { FONT_OPTIONS } from '@/lib/theme-config/defaults';
import { Check, Sparkles } from 'lucide-react';

interface TypographyTabProps {
  typography: TypographyConfig;
  onChange: (updated: TypographyConfig) => void;
}

interface FontCombo {
  id: string;
  name: string;
  description: string;
  isPrimary?: boolean;
  heading: AvailableFontKey;
  body: AvailableFontKey;
  brand: AvailableFontKey;
  accent: AvailableFontKey;
  data: AvailableFontKey;
  mono: AvailableFontKey;
}

const FONT_COMBINATIONS: FontCombo[] = [
  {
    id: 'clash-cabinet',
    name: 'Clash + Cabinet',
    description: 'Clash headings + Cabinet body – quirky personality',
    isPrimary: true,
    heading: 'clash',
    body: 'cabinet',
    brand: 'motech',
    accent: 'origin-tech',
    data: 'avtech',
    mono: 'jetbrains',
  },
  {
    id: 'sharp-minimal',
    name: 'Sharp Minimal',
    description: 'Clash headings + Satoshi body – clean modernist precision',
    heading: 'clash',
    body: 'satoshi',
    brand: 'motech',
    accent: 'origin-tech',
    data: 'avtech',
    mono: 'jetbrains',
  },
  {
    id: 'editorial-luxury',
    name: 'Editorial Luxury',
    description: 'Hatton headings + Cabinet body – premium magazine editorial',
    heading: 'hatton',
    body: 'cabinet',
    brand: 'hatton',
    accent: 'elegtro',
    data: 'cabinet',
    mono: 'jetbrains',
  },
  {
    id: 'futuristic-bold',
    name: 'Futuristic Bold',
    description: 'Syne headings + Jakarta body – wide futuristic expansion',
    heading: 'syne',
    body: 'jakarta',
    brand: 'motech',
    accent: 'origin-tech',
    data: 'avtech',
    mono: 'jetbrains',
  },
  {
    id: 'cyber-tech',
    name: 'Cyber Tech',
    description: 'Origin Tech headings + Satoshi body – cutting-edge robotics & AI',
    heading: 'origin-tech',
    body: 'satoshi',
    brand: 'motech',
    accent: 'avtech',
    data: 'avtech',
    mono: 'jetbrains',
  },
  {
    id: 'syne-satoshi',
    name: 'Syne + Satoshi',
    description: 'Syne display + Satoshi body – bold architectural high contrast',
    heading: 'syne',
    body: 'satoshi',
    brand: 'motech',
    accent: 'origin-tech',
    data: 'avtech',
    mono: 'jetbrains',
  },
  {
    id: 'electric-dynamic',
    name: 'Electric Dynamic',
    description: 'Elegtro Volt signature + Cabinet body – creative boutique agency vibe',
    heading: 'elegtro',
    body: 'cabinet',
    brand: 'motech',
    accent: 'origin-tech',
    data: 'avtech',
    mono: 'jetbrains',
  },
  {
    id: 'developer-mono',
    name: 'Developer Monospace',
    description: 'JetBrains Mono headers + Satoshi body – developer-first tech aesthetic',
    heading: 'jetbrains',
    body: 'satoshi',
    brand: 'jetbrains',
    accent: 'origin-tech',
    data: 'avtech',
    mono: 'jetbrains',
  },
];

export function TypographyTab({ typography, onChange }: TypographyTabProps) {
  const handleApplyCombo = (combo: FontCombo) => {
    onChange({
      heading: combo.heading,
      body: combo.body,
      brand: combo.brand,
      accent: combo.accent,
      data: combo.data,
      mono: combo.mono,
    });
  };

  const handleRoleChange = (role: keyof TypographyConfig, fontKey: AvailableFontKey) => {
    onChange({
      ...typography,
      [role]: fontKey,
    });
  };

  const isComboActive = (combo: FontCombo) => {
    return (
      typography.heading === combo.heading &&
      typography.body === combo.body &&
      typography.brand === combo.brand &&
      typography.accent === combo.accent
    );
  };

  const fontRoles: Array<{
    role: keyof TypographyConfig;
    label: string;
    description: string;
  }> = [
    {
      role: 'heading',
      label: 'Headings Font',
      description: 'Used for H1, H2, section titles, and modal headers',
    },
    {
      role: 'body',
      label: 'Body / General UI Font',
      description: 'Used for paragraphs, description text, links, and buttons',
    },
    {
      role: 'brand',
      label: 'Brand / Logo Font',
      description: 'Used for the brand name in the navbar and footer',
    },
    {
      role: 'accent',
      label: 'Accent Highlight Font',
      description: 'Used for special emphasized phrases (e.g. "ON AUTOPILOT")',
    },
    {
      role: 'data',
      label: 'Stats / Data Numbers Font',
      description: 'Used for key numerical statistics and metrics',
    },
    {
      role: 'mono',
      label: 'Code / Technical Font',
      description: 'Used for code blocks, terminal outputs, and technical labels',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-base font-semibold text-zinc-100">Typography System</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Select from curated font pairings with Clash + Cabinet as primary, or customize individual font roles.
        </p>
      </div>

      {/* Curated Font Combinations List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Curated Font Pairings
          </label>
          <span className="text-[11px] text-zinc-500">1-click to apply across site</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FONT_COMBINATIONS.map((combo) => {
            const active = isComboActive(combo);
            return (
              <button
                key={combo.id}
                type="button"
                onClick={() => handleApplyCombo(combo)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  active
                    ? 'border-[#aeff00] bg-[#aeff00]/10 text-white shadow-sm ring-1 ring-[#aeff00]/30'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300'
                }`}
              >
                {/* Active checkmark circle icon */}
                <div
                  className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                    active
                      ? 'bg-[#aeff00] text-black'
                      : 'border border-zinc-700 bg-zinc-950 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-100 tracking-tight">
                      {combo.name}
                    </span>
                    {combo.isPrimary && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-[#aeff00] border border-zinc-700">
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                    {combo.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Granular Role Customization */}
      <div className="border-t border-zinc-800 pt-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Custom Role Overrides
          </h3>
          <p className="text-[11px] text-zinc-500">
            Override any individual role independently from the preset combination.
          </p>
        </div>

        <div className="space-y-3">
          {fontRoles.map(({ role, label, description }) => {
            const selectedValue = typography[role];
            const currentFont = FONT_OPTIONS.find((f) => f.id === selectedValue);

            return (
              <div
                key={role}
                className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-zinc-200">{label}</div>
                  <div className="text-[11px] text-zinc-500">{description}</div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
                  <select
                    value={selectedValue}
                    onChange={(e) => handleRoleChange(role, e.target.value as AvailableFontKey)}
                    className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-200 focus:outline-none focus:border-zinc-500 cursor-pointer min-w-[210px]"
                  >
                    {FONT_OPTIONS.map((font) => (
                      <option key={font.id} value={font.id}>
                        {font.label}
                      </option>
                    ))}
                  </select>

                  <div
                    className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-300 truncate max-w-[150px] text-center"
                    style={{ fontFamily: `${currentFont?.variable || 'inherit'}, sans-serif` }}
                  >
                    Preview ABC 123
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
