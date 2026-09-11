'use client';

import React, { useRef } from 'react';
import type { SliderProps } from './types';

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
  className = '',
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current || !isDraggingRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const newValue = min + percent * (max - min);

    // Snap to step and fix floating point precision
    const steppedValue = Math.round(newValue / step) * step;
    const precision = step.toString().split('.')[1]?.length || 0;
    const finalValue = Number(Math.max(min, Math.min(max, steppedValue)).toFixed(precision));

    onChange(finalValue);
  };

  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  return (
    <div
      className={`group relative flex h-13 select-none items-center justify-between overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/85 px-4 py-2.5 transition-colors duration-200 hover:border-zinc-700/80 hover:bg-zinc-900 ${className}`}
    >
      {/* Background fill track showing current percentage */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 bg-zinc-800/60 transition-[width] duration-75 ease-out"
        style={{ width: `${percentage}%` }}
      />

      {/* Control Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-between gap-3">
        <span className="min-w-28 text-sm font-medium text-zinc-300">
          {label}
        </span>

        {/* Interactive range track */}
        <div
          ref={sliderRef}
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className="relative flex h-full flex-grow cursor-pointer touch-none items-center"
          onPointerDown={(e) => {
            isDraggingRef.current = true;
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            handleMove(e.clientX);
          }}
          onPointerMove={(e) => {
            if (isDraggingRef.current) handleMove(e.clientX);
          }}
          onPointerUp={(e) => {
            isDraggingRef.current = false;
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          }}
          onPointerCancel={(e) => {
            isDraggingRef.current = false;
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          }}
        >
          {/* Faint Track Markers */}
          <div className="pointer-events-none flex h-full w-full items-center justify-between px-1 opacity-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-1.5 w-px rounded-full bg-white" />
            ))}
          </div>

          {/* Slider Thumb */}
          <div
            className="pointer-events-none absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-100 group-hover:scale-y-125"
            style={{ left: `calc(${percentage}% - 2px)` }}
          />
        </div>

        {/* Current Value Display */}
        <span className="min-w-10 text-right font-mono text-xs font-semibold tabular-nums text-zinc-100">
          {value}
        </span>
      </div>
    </div>
  );
};
