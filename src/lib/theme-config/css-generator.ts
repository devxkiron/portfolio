import { SiteConfigData, AvailableFontKey } from './types';

const FONT_VAR_MAP: Record<AvailableFontKey, string> = {
  clash: 'var(--font-face-clash)',
  cabinet: 'var(--font-face-cabinet)',
  satoshi: 'var(--font-face-satoshi)',
  syne: 'var(--font-face-syne)',
  hatton: 'var(--font-face-hatton)',
  'origin-tech': 'var(--font-face-origin-tech)',
  avtech: 'var(--font-face-avtech)',
  motech: 'var(--font-face-motech)',
  elegtro: 'var(--font-face-elegtro)',
  jetbrains: 'var(--font-face-jetbrains)',
  jakarta: 'var(--font-face-jakarta)',
  'geist-sans': 'var(--font-face-geist-sans)',
  'geist-mono': 'var(--font-face-geist-mono)',
};

export function generateThemeCss(config: SiteConfigData): string {
  const { colors, typography, layout } = config;

  const headingFont = FONT_VAR_MAP[typography.heading] || 'var(--font-face-clash)';
  const bodyFont = FONT_VAR_MAP[typography.body] || 'var(--font-face-cabinet)';
  const monoFont = FONT_VAR_MAP[typography.mono] || 'var(--font-face-jetbrains)';
  const brandFont = FONT_VAR_MAP[typography.brand] || 'var(--font-face-motech)';
  const accentFont = FONT_VAR_MAP[typography.accent] || 'var(--font-face-origin-tech)';
  const dataFont = FONT_VAR_MAP[typography.data] || 'var(--font-face-avtech)';

  return `
:root {
  /* Light Theme Colors */
  --background: ${colors.light.background};
  --foreground: ${colors.light.foreground};
  --card: ${colors.light.card};
  --card-foreground: ${colors.light.cardForeground};
  --card-muted: ${colors.light.cardMuted};
  --popover: ${colors.light.popover};
  --popover-foreground: ${colors.light.popoverForeground};
  --muted: ${colors.light.muted};
  --muted-foreground: ${colors.light.mutedForeground};
  --subtle-foreground: ${colors.light.subtleForeground};
  --border: ${colors.light.border};
  --border-subtle: ${colors.light.borderSubtle};
  --brand-neon: ${colors.light.brandNeon};
  --brand-neon-text: ${colors.light.brandNeonText};
  --brand-dark: ${colors.light.brandDark};
  --brand-muted: ${colors.light.brandMuted};
  --glow-color: ${colors.light.glowColor};
  --shadow-color: ${colors.light.shadowColor};

  /* Physical Font Face Mappings (prevents circular variables) */
  --font-clash: var(--font-face-clash);
  --font-cabinet: var(--font-face-cabinet);
  --font-satoshi: var(--font-face-satoshi);
  --font-syne: var(--font-face-syne);
  --font-hatton: var(--font-face-hatton);
  --font-origin-tech: var(--font-face-origin-tech);
  --font-avtech: var(--font-face-avtech);
  --font-motech: var(--font-face-motech);
  --font-elegtro: var(--font-face-elegtro);
  --font-jetbrains: var(--font-face-jetbrains);
  --font-jakarta: var(--font-face-jakarta);
  --font-geist-sans: var(--font-face-geist-sans);
  --font-geist-mono: var(--font-face-geist-mono);

  /* Typography Roles */
  --font-sans: ${bodyFont}, sans-serif;
  --font-mono: ${monoFont}, monospace;
  --font-display: ${headingFont}, sans-serif;

  /* Border Radius */
  --radius-sm: ${layout.borderRadius.sm};
  --radius-md: ${layout.borderRadius.md};
  --radius-lg: ${layout.borderRadius.lg};
  --radius-xl: ${layout.borderRadius.xl};
  --radius-full: ${layout.borderRadius.full};

  /* Shadows */
  --shadow-sm: ${layout.shadows.sm};
  --shadow-md: ${layout.shadows.md};
  --shadow-lg: ${layout.shadows.lg};
  --shadow-glow: ${layout.shadows.glow};
  --spacing-scale: ${layout.spacingScale || 1};
}

[data-theme="dark"],
.dark {
  /* Dark Theme Colors */
  --background: ${colors.dark.background};
  --foreground: ${colors.dark.foreground};
  --card: ${colors.dark.card};
  --card-foreground: ${colors.dark.cardForeground};
  --card-muted: ${colors.dark.cardMuted};
  --popover: ${colors.dark.popover};
  --popover-foreground: ${colors.dark.popoverForeground};
  --muted: ${colors.dark.muted};
  --muted-foreground: ${colors.dark.mutedForeground};
  --subtle-foreground: ${colors.dark.subtleForeground};
  --border: ${colors.dark.border};
  --border-subtle: ${colors.dark.borderSubtle};
  --brand-neon: ${colors.dark.brandNeon};
  --brand-neon-text: ${colors.dark.brandNeonText};
  --brand-dark: ${colors.dark.brandDark};
  --brand-muted: ${colors.dark.brandMuted};
  --glow-color: ${colors.dark.glowColor};
  --shadow-color: ${colors.dark.shadowColor};
}

body {
  font-family: ${bodyFont}, sans-serif !important;
}

h1, h2, h3, h4, .font-clash, .font-display {
  font-family: ${headingFont}, sans-serif !important;
}

.font-motech {
  font-family: var(--font-face-motech), sans-serif !important;
  font-weight: 400 !important;
}

.font-origin-tech {
  font-family: var(--font-face-origin-tech), sans-serif !important;
  font-weight: 400 !important;
}

.font-avtech {
  font-family: var(--font-face-avtech), sans-serif !important;
  font-weight: 400 !important;
}
`.trim();
}
