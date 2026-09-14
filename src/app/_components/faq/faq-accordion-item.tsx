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
          ? 'bg-card border-border shadow-md'
          : 'bg-card/50 border-border/70 hover:border-border hover:bg-card'
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
            isOpen ? 'text-foreground' : 'text-foreground/80'
          }`}
        >
          {item.question}
        </span>

        <span
          ref={iconRef}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-150 ${
            isOpen
              ? 'bg-brand-neon text-black shadow-[0_0_10px_rgba(174,255,0,0.3)]'
              : 'bg-muted text-muted-foreground hover:text-foreground'
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
        <div className="px-5 pb-5 sm:px-5.5 sm:pb-5.5 text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed border-t border-border/50 mt-1 pt-3">
          {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
        </div>
      </div>
    </div>
  );
};
