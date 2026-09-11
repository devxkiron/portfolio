import type { ColorBendsConfig } from './types';

export const MAX_COLORS = 8 as const;

export const DEFAULT_COLOR_BENDS_CONFIG: ColorBendsConfig = {
  color: '#b5f57c',
  rotation: 1,
  autoRotate: 0,
  speed: 0.39,
  scale: 1.7,
  frequency: 1.2,
  warpStrength: 1,
  mouseInfluence: 1.7,
  parallax: 1.15,
  noise: 0.46,
  iterations: 2,
  intensity: 0.5,
  bandWidth: 3,
  transparent: true,
};

export const PRESET_PALETTES: { name: string; hex: string }[] = [
  { name: 'Neon Green', hex: '#b5f57c' },
  { name: 'Electric Cyan', hex: '#38bdf8' },
  { name: 'Cyber Violet', hex: '#c084fc' },
  { name: 'Amber Glow', hex: '#fbbf24' },
];
