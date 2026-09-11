'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ProcessStep } from './types';

interface ProcessCardTextProps {
  step: ProcessStep;
  className?: string;
}

export const ProcessCardText: React.FC<ProcessCardTextProps> = ({
  step,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const el = textRef.current;
      if (!el) return;
      // When clamped to 3 lines, scrollHeight will exceed clientHeight if text is longer
      if (!isExpanded) {
        setHasOverflow(el.scrollHeight > el.clientHeight + 1);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [step.description, isExpanded]);

  return (
    <div
      className={`flex h-full flex-col justify-between bg-[#111912] p-4 sm:p-6 lg:p-8 text-left ${className}`}
    >
      <div>
        {/* Step Number & Title */}
        <h3 className="font-extrabold tracking-tight text-white text-lg sm:text-2xl lg:text-3xl">
          {step.stepNumber}. {step.title}
        </h3>

        {/* Step Description — high contrast and legible on all devices */}
        <p
          ref={textRef}
          className={`mt-2 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-zinc-300 transition-all duration-300 ${
            isExpanded ? 'line-clamp-none' : 'line-clamp-2 sm:line-clamp-3 lg:line-clamp-4'
          }`}
        >
          {step.description}
        </p>

        {/* Dynamic "See more ↓" / "See less ↑" — ONLY shown if text exceeds lines */}
        {(hasOverflow || isExpanded) && (
          <div className="mt-2 sm:mt-3">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 font-mono text-xs sm:text-sm font-bold text-brand-neon transition-opacity hover:opacity-80 cursor-pointer"
            >
              {isExpanded ? 'See less ↑' : 'See more ↓'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
