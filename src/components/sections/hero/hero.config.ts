import type { ColorBendsConfig } from '@/components/ui/color-bends';

/**
 * Hero Section Configuration
 * 
 * Customize the ColorBends WebGL shader effect and hero presentation content here.
 * Any edits in this file take effect immediately across the hero section.
 */
export const heroConfig = {
  /**
   * WebGL ColorBends Shader Parameters
   */
  shader: {
    // Primary accent color (hex string)
    color: '#b5f57c',

    // Rotation angle in degrees (0 to 360)
    rotation: 1,

    // Continuous auto-rotation speed in deg/sec (-5 to 5, 0 = off)
    autoRotate: 0,

    // Motion animation speed multiplier (recommended 0.1 to 1.5)
    speed: 0.39,

    // Wave scale / zoom factor (recommended 0.5 to 3.0)
    scale: 1.7,

    // Wave frequency / density (recommended 0.5 to 2.5)
    frequency: 1.2,

    // Distortion wave warp intensity (0 = gentle, 1 = normal, >1 = deep distortion)
    warpStrength: 1,

    // Pointer hover influence on fluid displacement
    mouseInfluence: 1.7,

    // Parallax response strength to cursor position
    parallax: 1.15,

    // Film grain / noise texture strength (0 to 1)
    noise: 0.46,

    // Internal wave iterations / complexity passes (1 to 5)
    iterations: 2,

    // Glow and color brightness multiplier
    intensity: 0.5,

    // Width of color ribbons (recommended 2 to 10)
    bandWidth: 3,

    // Enable transparent alpha blending over background
    transparent: true,
  } satisfies ColorBendsConfig,

  /**
   * Hero Presentation Content & Typography
   */
  content: {
    statusBadge: 'AI Development Agency • ⭐ 5.0 Clutch • 24 Reviews',
    title: {
      line1: 'We Build Software That',
      line2: 'Runs Your Business',
      highlighted: 'ON AUTOPILOT',
    },
    subtitle:
      'From AI-powered tools to custom automation — we help ambitious companies save thousands of hours, cut costs, and scale faster. No buzzwords, just production software.',
    cta: {
      primary: {
        text: 'Book a Free Strategy Call',
        href: '#contact',
      },
      secondary: {
        text: 'See Our Work',
        href: '#work',
      },
    },
    stats: [
      { value: '14,750+', label: 'HOURS SAVED' },
      { value: '2.4x', label: 'CLIENT ROI' },
      { value: '15 min', label: 'AVG RESPONSE TIME' },
      { value: '5.0', label: 'CLUTCH RATING' },
    ],
  },
};
