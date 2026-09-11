import type React from 'react';

export interface ColorBendsConfig {
  color: string;
  rotation: number;
  autoRotate: number;
  speed: number;
  scale: number;
  frequency: number;
  warpStrength: number;
  mouseInfluence: number;
  parallax: number;
  noise: number;
  iterations: number;
  intensity: number;
  bandWidth: number;
  transparent?: boolean;
}

export interface ColorBendsProps {
  className?: string;
  style?: React.CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
}

export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  className?: string;
}

export interface ColorBendsControlsProps {
  config: ColorBendsConfig;
  onChange: (key: keyof ColorBendsConfig, value: number | string) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}
