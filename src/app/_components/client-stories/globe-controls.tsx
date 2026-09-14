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
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/90 p-2 shadow-xl backdrop-blur-xl">
      {/* Auto Rotate Toggle */}
      <button
        type="button"
        onClick={onToggleAutoRotate}
        title={autoRotate ? 'Pause auto-rotation' : 'Resume auto-rotation'}
        className={`flex items-center justify-center gap-1 rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-all duration-200 cursor-pointer ${
          autoRotate
            ? 'bg-brand-neon text-black shadow-[0_0_16px_rgba(174,255,0,0.35)]'
            : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:border-border-subtle'
        }`}
      >
        <span>Auto</span>
        <span className="text-[10px] tracking-widest">{autoRotate ? '||' : '▶'}</span>
      </button>

      <div className="h-px w-full bg-border" />

      {/* Zoom In */}
      <button
        type="button"
        onClick={onZoomIn}
        title="Zoom In"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95 cursor-pointer"
      >
        <Plus className="h-4 w-4" />
      </button>

      {/* Zoom Out */}
      <button
        type="button"
        onClick={onZoomOut}
        title="Zoom Out"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95 cursor-pointer"
      >
        <Minus className="h-4 w-4" />
      </button>

      <div className="h-px w-full bg-border" />

      {/* Reset Camera */}
      <button
        type="button"
        onClick={onReset}
        title="Reset Camera View"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-brand-neon-text dark:hover:text-brand-neon active:scale-95 cursor-pointer"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
