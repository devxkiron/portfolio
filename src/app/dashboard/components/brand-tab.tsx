'use client';

import React from 'react';
import { BrandConfig } from '@/lib/theme-config/types';

interface BrandTabProps {
  brand: BrandConfig;
  onChange: (updated: Partial<BrandConfig>) => void;
}

export function BrandTab({ brand, onChange }: BrandTabProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-base font-semibold text-zinc-100">General & Branding</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Configure identity details, logo mode, and hero status messages.
        </p>
      </div>

      <div className="space-y-4">
        {/* Brand Name */}
        <div className="space-y-1.5 max-w-lg">
          <label className="text-xs font-medium text-zinc-300 block">Brand / Site Name</label>
          <input
            type="text"
            value={brand.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="helloworld"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
          />
          <p className="text-[11px] text-zinc-500">
            Displayed in the navigation header and footer.
          </p>
        </div>

        {/* Hero Badge */}
        <div className="space-y-1.5 max-w-lg">
          <label className="text-xs font-medium text-zinc-300 block">Hero Status Badge</label>
          <input
            type="text"
            value={brand.badgeText || ''}
            onChange={(e) => onChange({ badgeText: e.target.value })}
            placeholder="AVAILABLE FOR SELECT PROJECTS"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
          />
          <p className="text-[11px] text-zinc-500">
            Badge text shown above the main headline in the Hero section.
          </p>
        </div>

        {/* Tagline */}
        <div className="space-y-1.5 max-w-xl">
          <label className="text-xs font-medium text-zinc-300 block">Hero Subtitle / Tagline</label>
          <textarea
            rows={3}
            value={brand.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            placeholder="Engineering high-converting, resilient digital systems on autopilot."
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 leading-relaxed"
          />
          <p className="text-[11px] text-zinc-500">
            Value proposition paragraph rendered below the hero headline.
          </p>
        </div>

        {/* Logo Configuration */}
        <div className="border-t border-zinc-800 pt-5 space-y-3">
          <label className="text-xs font-medium text-zinc-300 block">Logo Display Type</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="radio"
                name="logoType"
                value="text"
                checked={brand.logoType === 'text'}
                onChange={() => onChange({ logoType: 'text' })}
                className="accent-white"
              />
              <span>Text Logo (Styled with Brand Font)</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="radio"
                name="logoType"
                value="image"
                checked={brand.logoType === 'image'}
                onChange={() => onChange({ logoType: 'image' })}
                className="accent-white"
              />
              <span>Image / SVG Logo</span>
            </label>
          </div>

          {brand.logoType === 'image' && (
            <div className="mt-3 space-y-1.5 max-w-lg">
              <label className="text-xs font-medium text-zinc-300 block">Logo Image URL</label>
              <input
                type="text"
                value={brand.logoUrl || ''}
                onChange={(e) => onChange({ logoUrl: e.target.value })}
                placeholder="https://example.com/logo.svg or /logo.png"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 font-mono text-xs"
              />
              <p className="text-[11px] text-zinc-500">
                Provide an absolute URL or local path to your SVG/PNG image.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
