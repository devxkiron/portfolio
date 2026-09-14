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

export interface LayoutConfig {
  borderRadius: BorderRadiusTokens;
  shadows: ShadowTokens;
  spacingScale: number;
}

export interface SiteConfigData {
  themeMode: 'dark' | 'light';
  brand: BrandConfig;
  colors: ColorsConfig;
  typography: TypographyConfig;
  layout: LayoutConfig;
  updatedAt?: string;
}

