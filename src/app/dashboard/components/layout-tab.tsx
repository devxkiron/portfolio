'use client';

import React from 'react';
import { LayoutConfig, BorderRadiusTokens, ShadowTokens } from '@/lib/theme-config/types';

interface LayoutTabProps {
  layout: LayoutConfig;
  onChange: (updated: LayoutConfig) => void;
}

export function LayoutTab({ layout, onChange }: LayoutTabProps) {
  const handleRadiusChange = (key: keyof BorderRadiusTokens, value: string) => {
    onChange({
      ...layout,
      borderRadius: {
        ...layout.borderRadius,
        [key]: value,
      },
    });
  };

  const handleShadowChange = (key: keyof ShadowTokens, value: string) => {
    onChange({
      ...layout,
      shadows: {
        ...layout.shadows,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-base font-semibold text-zinc-100">Shapes, Elevation & Spacing</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Fine-tune corner radius scales, drop shadows, and layout density.
        </p>
      </div>

      {/* Border Radius Tokens */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Border Radius Tokens</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((key) => {
            const val = layout.borderRadius[key];
            return (
              <div key={key} className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-400 uppercase">{key}</span>
                  <div
                    className="w-5 h-5 bg-zinc-800 border border-zinc-700"
                    style={{ borderRadius: val }}
                  />
                </div>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleRadiusChange(key, e.target.value)}
                  placeholder="0.5rem"
                  className="w-full px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Shadows */}
      <div className="border-t border-zinc-800 pt-5 space-y-3">
        <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Shadow & Elevation Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            [
              { key: 'sm', label: 'Small Shadow (sm)' },
              { key: 'md', label: 'Medium Shadow (md)' },
              { key: 'lg', label: 'Large Elevation (lg)' },
              { key: 'glow', label: 'Glow / Ambient (glow)' },
            ] as const
          ).map(({ key, label }) => {
            const val = layout.shadows[key];
            return (
              <div key={key} className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2">
                <div className="text-xs font-medium text-zinc-300">{label}</div>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleShadowChange(key, e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Spacing Multiplier */}
      <div className="border-t border-zinc-800 pt-5 space-y-2 max-w-lg">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-zinc-300">Global Spacing Scale</label>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
            {layout.spacingScale || 1}x
          </span>
        </div>
        <input
          type="range"
          min="0.8"
          max="1.3"
          step="0.05"
          value={layout.spacingScale || 1}
          onChange={(e) => onChange({ ...layout, spacingScale: parseFloat(e.target.value) })}
          className="w-full accent-zinc-200 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
          <span>0.8x (Compact)</span>
          <span>1.0x (Standard)</span>
          <span>1.3x (Spacious)</span>
        </div>
      </div>
    </div>
  );
}
