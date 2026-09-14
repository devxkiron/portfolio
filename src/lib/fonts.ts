import localFont from 'next/font/local';
import {
  Geist,
  Geist_Mono,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from 'next/font/google';

/**
 * ============================================================================
 * 1. GOOGLE FONTS
 * ============================================================================
 */

// Geist Sans (Clean default sans)
export const geistSans = Geist({
  variable: '--font-face-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

// Geist Mono (Clean default mono)
export const geistMono = Geist_Mono({
  variable: '--font-face-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// Plus Jakarta Sans (Modern tech-SaaS geometric sans)
export const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-face-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

// JetBrains Mono (Developer-focused technical monospace)
export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-face-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * ============================================================================
 * 2. LOCAL CUSTOM FONTS
 * ============================================================================
 */

// Hatton: Pangram Pangram's editorial display serif
export const hatton = localFont({
  src: [
    {
      path: '../../public/fonts/hatton/pp-hatton-ultralight-200.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/hatton/pp-hatton-medium-500.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/hatton/pp-hatton-bold-700.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-face-hatton',
  display: 'swap',
});

// Clash Display: Edgy, high-contrast modernist display sans
export const clashDisplay = localFont({
  src: [
    {
      path: '../../public/fonts/ClashDisplay/ClashDisplay-Extralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay/ClashDisplay-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay/ClashDisplay-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay/ClashDisplay-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay/ClashDisplay-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay/ClashDisplay-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-face-clash',
  display: 'swap',
});

// Satoshi: Clean, versatile modern geometric grotesque
export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-face-satoshi',
  display: 'swap',
});

// Cabinet Grotesk: Distinctive, quirky neo-grotesque
export const cabinetGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/CabinetGrotesk/CabinetGrotesk-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CabinetGrotesk/CabinetGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CabinetGrotesk/CabinetGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CabinetGrotesk/CabinetGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CabinetGrotesk/CabinetGrotesk-Extrabold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CabinetGrotesk/CabinetGrotesk-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-face-cabinet',
  display: 'swap',
});

// Elegtro Volt: Futuristic electric signature display font
export const elegtroVolt = localFont({
  src: [
    {
      path: '../../public/fonts/elegtro-volt/Elegtro-Volt-Trial-BF6aa74a9debc48.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/elegtro-volt/Elegtro-Volt-Trial-BF6aa74a9debc48.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-face-elegtro',
  display: 'swap',
});

// Syne: Futuristic wide geometric sans with distinctive flair
export const syne = localFont({
  src: [
    {
      path: '../../public/fonts/syne/Syne-Regular-BF642e31d37a538.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/syne/Syne-Bold-BF642e31d33338e.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/syne/Syne-Extra-BF642e31d37d3e7.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-face-syne',
  display: 'swap',
});

// Origin Tech: Clean, modern rounded futuristic tech typeface
export const originTech = localFont({
  src: [
    {
      path: '../../public/fonts/Origin-tech/OriginTech-BF69955aa27ddcd.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Origin-tech/OriginTech-BF69955aa27ddcd.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Origin-tech/OriginTech-BF69955aa27ddcd.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Origin-tech/OriginTech-BF69955aa27ddcd.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Origin-tech/OriginTech-BF69955aa27ddcd.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Origin-tech/OriginTech-BF69955aa27ddcd.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-face-origin-tech',
  display: 'swap',
});

// Avtech: Bold expanded slanted geometric tech display
export const avtech = localFont({
  src: [
    {
      path: '../../public/fonts/Avtech/Avtech-BlackExpandedSlanted.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Avtech/Avtech-BlackExpandedSlanted.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Avtech/Avtech-BlackExpandedSlanted.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Avtech/Avtech-BlackExpandedSlanted.otf',
      weight: '900',
      style: 'oblique',
    },
  ],
  variable: '--font-face-avtech',
  display: 'swap',
});

// Motech: Modern tech logo display font with rounded letterforms
export const motech = localFont({
  src: [
    {
      path: '../../public/fonts/Motech/Motech-BF69e704e1558e6.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Motech/Motech-BF69e704e1558e6.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Motech/Motech-BF69e704e1558e6.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Motech/Motech-BF69e704e1558e6.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-face-motech',
  display: 'swap',
});

/**
 * ============================================================================
 * 3. DYNAMIC FONT REGISTRY
 * ============================================================================
 * All active fonts are registered here. Next.js automatically injects
 * their CSS variables into the root <html> tag through RootLayout.
 */
export const fontRegistry = [
  geistSans,
  geistMono,
  plusJakartaSans,
  jetbrainsMono,
  hatton,
  clashDisplay,
  satoshi,
  cabinetGrotesk,
  elegtroVolt,
  syne,
  originTech,
  avtech,
  motech,
];

export const fontVariables = fontRegistry.map((font) => font.variable).join(' ');
