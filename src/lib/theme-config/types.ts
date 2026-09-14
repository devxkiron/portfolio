export type LogoType = 'text' | 'image';

export interface BrandConfig {
  name: string;
  tagline: string;
  logoType: LogoType;
  logoUrl?: string;
  badgeText?: string;
}

export interface ThemePalette {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  cardMuted: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  subtleForeground: string;
  border: string;
  borderSubtle: string;
  brandNeon: string;
  brandNeonText: string;
  brandDark: string;
  brandMuted: string;
  glowColor: string;
  shadowColor: string;
}

export interface ColorsConfig {
  light: ThemePalette;
  dark: ThemePalette;
}

export type AvailableFontKey =
  | 'clash'
  | 'cabinet'
  | 'satoshi'
  | 'syne'
  | 'hatton'
  | 'elegtro'
  | 'origin-tech'
  | 'avtech'
  | 'motech'
  | 'jetbrains'
  | 'jakarta'
  | 'geist-sans'
  | 'geist-mono';

export interface TypographyConfig {
  heading: AvailableFontKey;
  body: AvailableFontKey;
  mono: AvailableFontKey;
  brand: AvailableFontKey;
  accent: AvailableFontKey;
  data: AvailableFontKey;
}

export interface BorderRadiusTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  glow: string;
}

export type HeroBackgroundVariant =
  | 'color-bends'
  | 'acid-squares'
  | 'prism'
  | 'side-rays'
  | 'light-rays'
  | 'pixel-blast'
  | 'dither';

export type NavbarStyleVariant =
  | 'floating-pill'
  | 'minimal-dock'
  | 'cyber-hud'
  | 'glass-morphism'
  | 'compact-island';

export interface LayoutConfig {
  borderRadius: BorderRadiusTokens;
  shadows: ShadowTokens;
  spacingScale: number;
  heroBackground: HeroBackgroundVariant;
  navbarStyle: NavbarStyleVariant;
}

import { ProjectItem } from '@/app/_components/projects/types';
import { ClientStory } from '@/app/_components/client-stories/types';

export interface SiteConfigData {
  themeMode: 'dark' | 'light';
  brand: BrandConfig;
  colors: ColorsConfig;
  typography: TypographyConfig;
  layout: LayoutConfig;
  heroBackground?: HeroBackgroundVariant;
  navbarStyle?: NavbarStyleVariant;
  projects?: ProjectItem[];
  clientStories?: ClientStory[];
  updatedAt?: string;
}


