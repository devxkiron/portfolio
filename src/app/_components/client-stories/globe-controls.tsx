'use client';

import React from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface GlobeControlsProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const GlobeControls: React.FC<GlobeControlsProps> = ({
  autoRotate,
  onToggleAutoRotate,
  onZoomIn,
  onZoomOut,
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-800/90 bg-[#08120b]/90 p-2 shadow-2xl backdrop-blur-xl">
      {/* Auto Rotate Toggle */}
      <button
        type="button"
        onClick={onToggleAutoRotate}
        title={autoRotate ? 'Pause auto-rotation' : 'Resume auto-rotation'}
        className={`flex items-center justify-center gap-1 rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-all duration-200 cursor-pointer ${
          autoRotate
            ? 'bg-[#e2f952] text-black shadow-[0_0_16px_rgba(226,249,82,0.45)]'
            : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white hover:border-zinc-700'
        }`}
      >
        <span>Auto</span>
        <span className="text-[10px] tracking-widest">{autoRotate ? '||' : '▶'}</span>
      </button>

      <div className="h-px w-full bg-zinc-800/80" />

      {/* Zoom In */}
      <button
        type="button"
        onClick={onZoomIn}
        title="Zoom In"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-white active:scale-95 cursor-pointer"
      >
        <Plus className="h-4 w-4" />
      </button>

      {/* Zoom Out */}
      <button
        type="button"
        onClick={onZoomOut}
        title="Zoom Out"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-white active:scale-95 cursor-pointer"
      >
        <Minus className="h-4 w-4" />
      </button>

      <div className="h-px w-full bg-zinc-800/80" />

      {/* Reset Camera */}
      <button
        type="button"
        onClick={onReset}
        title="Reset Camera View"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-[#e2f952] active:scale-95 cursor-pointer"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
