'use client';

import React from 'react';

export type BackgroundPatternKey = 'dots' | 'grid' | 'waves' | 'circuit' | 'topography' | 'noise' | 'none';

interface BackgroundPatternProps {
  pattern: BackgroundPatternKey;
  primaryColor?: string;
  accentColor?: string;
  className?: string;
}

const PATTERN_LABELS: Record<BackgroundPatternKey, string> = {
  dots: 'Dot Grid',
  grid: 'Fine Grid',
  waves: 'Organic Waves',
  circuit: 'Circuit Traces',
  topography: 'Topographic Lines',
  noise: 'Film Grain Noise',
  none: 'None (Solid)',
};

export function getPatternLabel(key: BackgroundPatternKey): string {
  return PATTERN_LABELS[key] || 'None';
}

export function isLightColor(color?: string): boolean {
  if (!color) return false;
  const c = color.trim().toLowerCase();
  if (
    c === 'white' ||
    c === '#fff' ||
    c === '#ffffff' ||
    c === '#fdfcf8' ||
    c === '#f8f9fa' ||
    c === '#fafafa' ||
    c === '#f5f5f5' ||
    c === '#eae8df'
  ) {
    return true;
  }
  if (
    c === 'black' ||
    c === '#000' ||
    c === '#000000' ||
    c === '#09090b' ||
    c === '#090d0b' ||
    c === '#121815'
  ) {
    return false;
  }

  let hex = c.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('');
  }
  if (hex.length >= 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.55;
    }
  }

  const rgbMatch = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55;
  }

  return false;
}

export const ALL_PATTERN_KEYS: BackgroundPatternKey[] = [
  'none', 'dots', 'grid', 'waves', 'circuit', 'topography', 'noise',
];

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  pattern,
  primaryColor = 'rgba(174,255,0,0.07)',
  accentColor = 'rgba(174,255,0,0.04)',
  className = '',
}) => {
  const uniqueId = React.useId().replace(/:/g, '');
  if (pattern === 'none') return null;

  const dotsId = `bg-dots-${uniqueId}`;
  const gridId = `bg-grid-${uniqueId}`;
  const wavesId = `bg-waves-${uniqueId}`;
  const circuitId = `bg-circuit-${uniqueId}`;
  const topoId = `bg-topo-${uniqueId}`;
  const noiseId = `bg-noise-${uniqueId}`;

  const svgPatterns: Record<Exclude<BackgroundPatternKey, 'none'>, React.ReactNode> = {
    dots: (
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={dotsId} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill={primaryColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${dotsId})`} />
      </svg>
    ),

    grid: (
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={gridId} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={primaryColor} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>
    ),

    waves: (
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id={wavesId} x="0" y="0" width="200" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 Q25 0 50 30 T100 30 T150 30 T200 30" fill="none" stroke={primaryColor} strokeWidth="0.8" />
            <path d="M0 45 Q25 15 50 45 T100 45 T150 45 T200 45" fill="none" stroke={accentColor} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${wavesId})`} />
      </svg>
    ),

    circuit: (
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={circuitId} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M10 10 L10 40 L40 40" fill="none" stroke={primaryColor} strokeWidth="0.6" />
            <path d="M70 10 L70 30 L50 30 L50 70" fill="none" stroke={primaryColor} strokeWidth="0.6" />
            <circle cx="10" cy="10" r="2" fill={primaryColor} />
            <circle cx="40" cy="40" r="2" fill={primaryColor} />
            <circle cx="70" cy="10" r="2" fill={accentColor} />
            <circle cx="50" cy="70" r="2" fill={accentColor} />
            <path d="M20 70 L60 70" fill="none" stroke={accentColor} strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${circuitId})`} />
      </svg>
    ),

    topography: (
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={topoId} x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M20 60 Q40 20 60 60 Q80 100 100 60" fill="none" stroke={primaryColor} strokeWidth="0.5" />
            <path d="M10 90 Q30 50 50 90 Q70 130 90 90" fill="none" stroke={accentColor} strokeWidth="0.4" />
            <path d="M30 30 Q50 -10 70 30 Q90 70 110 30" fill="none" stroke={primaryColor} strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${topoId})`} />
      </svg>
    ),

    noise: (
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={noiseId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#${noiseId})`} opacity="0.06" />
      </svg>
    ),
  };

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {svgPatterns[pattern]}
    </div>
  );
};
