'use client';

import React, { useState } from 'react';
import { ColorsConfig, ThemePalette } from '@/lib/theme-config/types';

interface ColorsTabProps {
  colors: ColorsConfig;
  themeMode: 'dark' | 'light';
  onThemeModeChange: (mode: 'dark' | 'light') => void;
  onChange: (updated: ColorsConfig) => void;
}

export function ColorsTab({ colors, themeMode, onThemeModeChange, onChange }: ColorsTabProps) {
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');

  const currentPalette = activeTheme === 'dark' ? colors.dark : colors.light;

  const handleFieldChange = (field: keyof ThemePalette, value: string) => {
    onChange({
      ...colors,
      [activeTheme]: {
        ...colors[activeTheme],
        [field]: value,
      },
    });
  };

  const fields: Array<{ key: keyof ThemePalette; label: string; desc: string }> = [
    { key: 'background', label: 'Background', desc: 'Main page background' },
    { key: 'foreground', label: 'Foreground', desc: 'Primary text color' },
    { key: 'card', label: 'Card Surface', desc: 'Panels and card containers' },
    { key: 'cardMuted', label: 'Muted Card', desc: 'Inner cards and code blocks' },
    { key: 'border', label: 'Border', desc: 'Main dividing borders' },
    { key: 'borderSubtle', label: 'Subtle Border', desc: 'Secondary borders' },
    { key: 'mutedForeground', label: 'Muted Text', desc: 'Secondary text and captions' },
    { key: 'subtleForeground', label: 'Subtle Text', desc: 'Tertiary text and icons' },
    { key: 'brandNeon', label: 'Brand Accent', desc: 'Highlight and active state accent' },
    { key: 'brandNeonText', label: 'Brand Accent Text', desc: 'Text color when on accent badge' },
    { key: 'glowColor', label: 'Glow / Aura', desc: 'RGBA color for subtle lighting' },
    { key: 'shadowColor', label: 'Shadow Tone', desc: 'RGBA shadow tint' },
  ];

  return (
    <div className="space-y-6">
      {/* Global Enforced Site Theme */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <label className="text-xs font-semibold text-zinc-200 block">Enforced Site Theme</label>
          <span className="text-[11px] text-zinc-500">
            Selected theme is locked for all visitors. The user-end theme toggle has been disabled.
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="radio"
              name="enforcedSiteTheme"
              value="dark"
              checked={themeMode === 'dark'}
              onChange={() => onThemeModeChange('dark')}
              className="accent-white cursor-pointer"
            />
            <span>Dark Theme</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="radio"
              name="enforcedSiteTheme"
              value="light"
              checked={themeMode === 'light'}
              onChange={() => onThemeModeChange('light')}
              className="accent-white cursor-pointer"
            />
            <span>Light Theme</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-100">Tokens Palette Editor</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Customize individual token values for each theme mode.
          </p>
        </div>

        {/* Standard Tab Pill */}
        <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-lg self-start">
          <button
            type="button"
            onClick={() => setActiveTheme('dark')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
              activeTheme === 'dark' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Dark Theme
          </button>
          <button
            type="button"
            onClick={() => setActiveTheme('light')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
              activeTheme === 'light' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Light Theme
          </button>
        </div>
      </div>

      {/* Grid of standard color inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ key, label, desc }) => {
          const val = currentPalette[key] || '';
          const isHex = val.startsWith('#') && (val.length === 7 || val.length === 4);

          return (
            <div key={key} className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-medium text-zinc-200 block">{label}</label>
                  <span className="text-[11px] text-zinc-500">{desc}</span>
                </div>
                <div
                  className="w-6 h-6 rounded border border-zinc-700 shrink-0"
                  style={{ backgroundColor: val }}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                {isHex && (
                  <input
                    type="color"
                    value={val.length === 7 ? val : '#000000'}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer p-0 shrink-0"
                  />
                )}
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                  placeholder="#000000 or rgba(...)"
                  className="flex-1 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
