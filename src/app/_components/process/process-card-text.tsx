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
      className={`flex h-full flex-col justify-between bg-[#2d3829] p-6 sm:p-8 lg:p-10 text-left ${className}`}
    >
      <div>
        {/* Step Number & Title */}
        <h3 className="font-extrabold tracking-tight text-[#e6f0de] text-2xl sm:text-3xl lg:text-4xl">
          {step.stepNumber}. {step.title}
        </h3>

        {/* Step Description — initially clamped to max 3 lines */}
        <p
          ref={textRef}
          className={`mt-4 text-sm sm:text-base leading-relaxed text-[#9fb09a] transition-all duration-300 ${
            isExpanded ? 'line-clamp-none' : 'line-clamp-3'
          }`}
        >
          {step.description}
        </p>

        {/* Dynamic "See more ↓" / "See less ↑" — ONLY shown if text exceeds 3 lines */}
        {(hasOverflow || isExpanded) && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 font-mono text-sm sm:text-base font-bold text-brand-neon transition-opacity hover:opacity-80 cursor-pointer"
            >
              {isExpanded ? 'See less ↑' : 'See more ↓'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
