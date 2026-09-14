'use client';

import React from 'react';
import { SiteConfigData } from '@/lib/theme-config/types';
import { FONT_OPTIONS } from '@/lib/theme-config/defaults';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface LivePreviewProps {
  config: SiteConfigData;
  previewMode: 'dark' | 'light';
}

export function LivePreview({ config, previewMode }: LivePreviewProps) {
  const palette = previewMode === 'dark' ? config.colors.dark : config.colors.light;

  const getFontVar = (key: string) => {
    const opt = FONT_OPTIONS.find((f) => f.id === key);
    return opt ? opt.variable : 'inherit';
  };

  const headingFont = getFontVar(config.typography.heading);
  const bodyFont = getFontVar(config.typography.body);
  const brandFont = getFontVar(config.typography.brand);
  const accentFont = getFontVar(config.typography.accent);
  const dataFont = getFontVar(config.typography.data);

  return (
    <div
      className="rounded-lg border p-5 transition-all text-left"
      style={{
        backgroundColor: palette.background,
        color: palette.foreground,
        borderColor: palette.border,
        fontFamily: `${bodyFont}, sans-serif`,
        boxShadow: config.layout.shadows.sm,
      }}
    >
      {/* Header / Brand Specimen */}
      <div
        className="flex items-center justify-between border-b pb-3 mb-4"
        style={{ borderColor: palette.border }}
      >
        <div className="flex items-center gap-2">
          {config.brand.logoType === 'image' && config.brand.logoUrl ? (
            <img src={config.brand.logoUrl} alt="Logo" className="h-5 w-auto" />
          ) : (
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ fontFamily: `${brandFont}, sans-serif`, color: palette.foreground }}
            >
              {config.brand.name || 'HELLOWORLD'}
            </span>
          )}
        </div>

        <span
          className="text-[10px] font-mono px-2 py-0.5 border rounded"
          style={{
            borderColor: palette.borderSubtle,
            backgroundColor: palette.cardMuted,
            color: palette.subtleForeground,
          }}
        >
          {previewMode.toUpperCase()} SPECIMEN
        </span>
      </div>

      {/* Hero Badge */}
      <div className="mb-3">
        <span
          className="inline-block px-2.5 py-0.5 text-[11px] font-mono font-medium border"
          style={{
            borderRadius: config.layout.borderRadius.full,
            borderColor: palette.border,
            backgroundColor: palette.cardMuted,
            color: palette.brandNeonText,
          }}
        >
          {config.brand.badgeText || 'AVAILABLE FOR SELECT PROJECTS'}
        </span>
      </div>

      {/* Heading Specimen */}
      <h3
        className="text-xl font-bold tracking-tight leading-snug mb-2"
        style={{ fontFamily: `${headingFont}, sans-serif`, color: palette.foreground }}
      >
        Autonomous AI Systems
        <span
          className="block text-sm font-normal mt-0.5"
          style={{ fontFamily: `${accentFont}, sans-serif`, color: palette.brandNeon }}
        >
          ON AUTOPILOT
        </span>
      </h3>

      <p className="text-xs mb-4 leading-relaxed" style={{ color: palette.mutedForeground }}>
        {config.brand.tagline || 'Engineering high-converting, resilient digital systems.'}
      </p>

      {/* Mini Stats Card */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div
          className="p-3 border"
          style={{
            backgroundColor: palette.card,
            borderColor: palette.border,
            borderRadius: config.layout.borderRadius.md,
          }}
        >
          <div
            className="text-lg font-bold"
            style={{ fontFamily: `${dataFont}, sans-serif`, color: palette.foreground }}
          >
            14,750+
          </div>
          <div className="text-[10px] uppercase font-mono mt-0.5" style={{ color: palette.mutedForeground }}>
            Tasks Automated
          </div>
        </div>

        <div
          className="p-3 border"
          style={{
            backgroundColor: palette.card,
            borderColor: palette.border,
            borderRadius: config.layout.borderRadius.md,
          }}
        >
          <div
            className="text-lg font-bold"
            style={{ fontFamily: `${dataFont}, sans-serif`, color: palette.brandNeon }}
          >
            99.9%
          </div>
          <div className="text-[10px] uppercase font-mono mt-0.5" style={{ color: palette.mutedForeground }}>
            Uptime SLA
          </div>
        </div>
      </div>

      {/* Button Specimen */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
          style={{
            backgroundColor: palette.brandNeon,
            color: previewMode === 'dark' ? '#090d0b' : '#0d1310',
            borderRadius: config.layout.borderRadius.md,
          }}
        >
          <span>Primary Button</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border"
          style={{
            backgroundColor: palette.cardMuted,
            color: palette.foreground,
            borderColor: palette.border,
            borderRadius: config.layout.borderRadius.md,
          }}
        >
          <ShieldCheck className="w-3 h-3" />
          <span>Secondary Card</span>
        </button>
      </div>
    </div>
  );
}
