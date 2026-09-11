'use client';

import React from 'react';
import { RefreshCw, Palette, ChevronDown, ChevronUp } from 'lucide-react';
import { Slider } from './slider';
import { PRESET_PALETTES } from './constants';
import type { ColorBendsControlsProps } from './types';

export const ColorBendsControls: React.FC<ColorBendsControlsProps> = ({
  config,
  onChange,
  onReset,
  isOpen,
  onToggle,
  className = '',
}) => {
  return (
    <div
      className={`w-full max-w-5xl rounded-2xl border border-zinc-800/80 bg-zinc-950/85 shadow-2xl backdrop-blur-xl transition-all duration-300 ${className}`}
    >
      {/* Header / Accordion Bar */}
      <div
        className="flex cursor-pointer select-none items-center justify-between p-4 transition-colors hover:bg-zinc-900/60"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2.5 font-medium text-white">
          <span className="text-zinc-400 transition-transform duration-200">
            {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </span>
          <span className="text-sm font-semibold tracking-wide">Customize Shader FX</span>
          <span className="hidden rounded-full bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400 sm:inline-block">
            WebGL Three.js
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800/70 hover:text-white"
          >
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Expandable Sliders & Palettes */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="border-t border-zinc-800/60 p-4">
          {/* Quick Color Palette Selector */}
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/80 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Palette size={16} className="text-zinc-400" />
              <span className="text-xs font-medium text-zinc-300">Color Palette</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {PRESET_PALETTES.map((preset) => {
                const isSelected = config.color.toLowerCase() === preset.hex.toLowerCase();
                return (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => onChange('color', preset.hex)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-white/30 bg-zinc-800 text-white shadow-sm'
                        : 'border-transparent text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full border border-black/40"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span>{preset.name}</span>
                  </button>
                );
              })}

              <div className="flex items-center gap-1.5 pl-1">
                <span
                  className="h-4 w-4 rounded-full border border-black/30 shadow-inner"
                  style={{ backgroundColor: config.color }}
                />
                <span className="font-mono text-xs text-zinc-300">{config.color}</span>
              </div>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
            <Slider
              label="Rotation (deg)"
              value={config.rotation}
              min={0}
              max={360}
              step={1}
              onChange={(v) => onChange('rotation', v)}
            />
            <Slider
              label="Auto Rotate"
              value={config.autoRotate}
              min={-5}
              max={5}
              step={0.1}
              onChange={(v) => onChange('autoRotate', v)}
            />
            <Slider
              label="Speed"
              value={config.speed}
              min={0}
              max={2}
              step={0.01}
              onChange={(v) => onChange('speed', v)}
            />

            <Slider
              label="Scale"
              value={config.scale}
              min={0.1}
              max={5}
              step={0.1}
              onChange={(v) => onChange('scale', v)}
            />
            <Slider
              label="Frequency"
              value={config.frequency}
              min={0}
              max={5}
              step={0.1}
              onChange={(v) => onChange('frequency', v)}
            />
            <Slider
              label="Warp Strength"
              value={config.warpStrength}
              min={0}
              max={5}
              step={0.1}
              onChange={(v) => onChange('warpStrength', v)}
            />

            <Slider
              label="Mouse Influence"
              value={config.mouseInfluence}
              min={0}
              max={5}
              step={0.1}
              onChange={(v) => onChange('mouseInfluence', v)}
            />
            <Slider
              label="Parallax"
              value={config.parallax}
              min={0}
              max={5}
              step={0.05}
              onChange={(v) => onChange('parallax', v)}
            />
            <Slider
              label="Noise"
              value={config.noise}
              min={0}
              max={2}
              step={0.01}
              onChange={(v) => onChange('noise', v)}
            />

            <Slider
              label="Iterations"
              value={config.iterations}
              min={1}
              max={5}
              step={1}
              onChange={(v) => onChange('iterations', v)}
            />
            <Slider
              label="Intensity"
              value={config.intensity}
              min={0}
              max={5}
              step={0.1}
              onChange={(v) => onChange('intensity', v)}
            />
            <Slider
              label="Band Width"
              value={config.bandWidth}
              min={1}
              max={20}
              step={0.5}
              onChange={(v) => onChange('bandWidth', v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
