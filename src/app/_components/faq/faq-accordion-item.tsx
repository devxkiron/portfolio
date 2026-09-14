'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Minus, Plus } from 'lucide-react';
import { FaqItem } from './types';

export interface FaqAccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  className = '',
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const contentEl = contentRef.current;
    const iconEl = iconRef.current;
    if (!contentEl) return;

    if (isOpen) {
      gsap.fromTo(
        contentEl,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      if (iconEl) {
        gsap.fromTo(iconEl, { rotate: -90 }, { rotate: 0, duration: 0.25, ease: 'power2.out' });
      }
    } else {
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`faq-accordion-card rounded-xl transition-colors duration-200 border overflow-hidden ${
        isOpen
          ? 'bg-zinc-900/70 border-zinc-700/80 shadow-[0_0_20px_rgba(174,255,0,0.04)]'
          : 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700/60'
      } ${className}`.trim()}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-5.5 text-left cursor-pointer select-none"
      >
        <span
          className={`text-sm sm:text-base font-semibold tracking-tight leading-snug transition-colors ${
            isOpen ? 'text-white' : 'text-zinc-200'
          }`}
        >
          {item.question}
        </span>

        <span
          ref={iconRef}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-150 ${
            isOpen
              ? 'bg-[#aeff00] text-black shadow-[0_0_10px_rgba(174,255,0,0.3)]'
              : 'bg-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
          ) : (
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          )}
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 sm:px-5.5 sm:pb-5.5 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed border-t border-zinc-800/50 mt-1 pt-3">
          {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
        </div>
      </div>
    </div>
  );
};
