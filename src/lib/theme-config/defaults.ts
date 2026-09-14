import { SiteConfigData, AvailableFontKey } from './types';

export const FONT_OPTIONS: Array<{
  id: AvailableFontKey;
  label: string;
  variable: string;
  category: 'Serif' | 'Sans' | 'Display' | 'Mono' | 'Tech';
}> = [
  { id: 'clash', label: 'Clash Display (High Contrast Display)', variable: 'var(--font-clash)', category: 'Display' },
  { id: 'cabinet', label: 'Cabinet Grotesk (Modern Neo-Grotesque)', variable: 'var(--font-cabinet)', category: 'Sans' },
  { id: 'satoshi', label: 'Satoshi (Clean Geometric)', variable: 'var(--font-satoshi)', category: 'Sans' },
  { id: 'syne', label: 'Syne (Futuristic Wide Sans)', variable: 'var(--font-syne)', category: 'Display' },
  { id: 'hatton', label: 'Hatton (Editorial Luxury Serif)', variable: 'var(--font-hatton)', category: 'Serif' },
  { id: 'origin-tech', label: 'Origin Tech (Modern Rounded Tech)', variable: 'var(--font-origin-tech)', category: 'Tech' },
  { id: 'avtech', label: 'Avtech (Expanded Slanted Tech)', variable: 'var(--font-avtech)', category: 'Tech' },
  { id: 'motech', label: 'Motech (Geometric Brand Display)', variable: 'var(--font-motech)', category: 'Tech' },
  { id: 'elegtro', label: 'Elegtro Volt (Signature Electric)', variable: 'var(--font-elegtro)', category: 'Display' },
  { id: 'jetbrains', label: 'JetBrains Mono (Developer Code Mono)', variable: 'var(--font-jetbrains)', category: 'Mono' },
  { id: 'jakarta', label: 'Plus Jakarta Sans (SaaS Tech Sans)', variable: 'var(--font-jakarta)', category: 'Sans' },
  { id: 'geist-sans', label: 'Geist Sans (Clean Neutral Sans)', variable: 'var(--font-geist-sans)', category: 'Sans' },
  { id: 'geist-mono', label: 'Geist Mono (Neutral Mono)', variable: 'var(--font-geist-mono)', category: 'Mono' },
];

export const DEFAULT_SITE_CONFIG: SiteConfigData = {
  themeMode: 'dark',
  brand: {
    name: 'helloworld',
    tagline: 'Engineering high-converting, resilient digital systems on autopilot',
    logoType: 'text',
    logoUrl: '',
    badgeText: 'AVAILABLE FOR SELECT PROJECTS',
  },
  colors: {
    light: {
      background: '#fdfcf8',
      foreground: '#0d1310',
      card: '#ffffff',
      cardForeground: '#0d1310',
      cardMuted: '#f5f4ed',
      popover: '#ffffff',
      popoverForeground: '#0d1310',
      muted: '#f0efe8',
      mutedForeground: '#5a645d',
      subtleForeground: '#848f87',
      border: '#e3e2d8',
      borderSubtle: '#eeede4',
      brandNeon: '#aeff00',
      brandNeonText: '#244900',
      brandDark: '#101612',
      brandMuted: '#f0f0ea',
      glowColor: 'rgba(92, 246, 41, 0.12)',
      shadowColor: 'rgba(0, 0, 0, 0.06)',
    },
    dark: {
      background: '#090d0b',
      foreground: '#fdfcf8',
      card: '#121815',
      cardForeground: '#fdfcf8',
      cardMuted: '#17201b',
      popover: '#121815',
      popoverForeground: '#fdfcf8',
      muted: '#1a231e',
      mutedForeground: '#9ca79f',
      subtleForeground: '#6c776f',
      border: '#232f27',
      borderSubtle: '#19221c',
      brandNeon: '#aeff00',
      brandNeonText: '#aeff00',
      brandDark: '#101612',
      brandMuted: '#1a231e',
      glowColor: 'rgba(92, 246, 41, 0.05)',
      shadowColor: 'rgba(0, 0, 0, 0.4)',
    },
  },
  typography: {
    heading: 'clash',
    body: 'cabinet',
    mono: 'jetbrains',
    brand: 'motech',
    accent: 'origin-tech',
    data: 'avtech',
  },
  layout: {
    borderRadius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      glow: '0 0 25px rgba(174, 255, 0, 0.25)',
    },
    spacingScale: 1,
  },
};
