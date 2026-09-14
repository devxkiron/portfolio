'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqConfig as defaultFaqConfig } from './faq.config';
import { FaqAccordionItem } from './faq-accordion-item';
import { FaqSectionProps } from './types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  id,
  sectionId,
  config,
  title,
  titleLines,
  subtitle,
  badge,
  contactPrompt,
  contactEmail,
  showContact,
  contactNode,
  items: propsItems,
  defaultOpenId: propsDefaultOpenId,
  allowMultiple = false,
  animated = true,
  className = '',
  containerClassName = '',
  titleClassName = '',
  itemsClassName = '',
}) => {
  const mergedSectionId = id ?? sectionId ?? config?.sectionId ?? defaultFaqConfig.sectionId;
  const activeTitleLines = titleLines ?? config?.titleLines ?? defaultFaqConfig.titleLines;
  const activeContactPrompt = contactPrompt ?? config?.contactPrompt ?? defaultFaqConfig.contactPrompt;
  const activeContactEmail = contactEmail ?? config?.contactEmail ?? defaultFaqConfig.contactEmail;
  const items = propsItems ?? config?.items ?? defaultFaqConfig.items;

  const initialOpenId =
    propsDefaultOpenId !== undefined
      ? propsDefaultOpenId
      : config?.defaultOpenId !== undefined
      ? config.defaultOpenId
      : defaultFaqConfig.defaultOpenId;

  const [openIds, setOpenIds] = useState<string[]>(() =>
    initialOpenId ? [initialOpenId] : []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!animated) return;

    const sectionEl = sectionRef.current;
    const leftColEl = leftColRef.current;
    const rightColEl = rightColRef.current;
    if (!sectionEl || !leftColEl || !rightColEl) return;

    const ctx = gsap.context(() => {
      // 1. Left column elements entrance
      const leftItems = leftColEl.querySelectorAll('.faq-left-anim');
      if (leftItems.length > 0) {
        gsap.fromTo(
          leftItems,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColEl,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Right column accordion cards staggered cascade
      const cards = rightColEl.querySelectorAll('.faq-accordion-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightColEl,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [animated]);

  const handleToggle = (itemId: string) => {
    setOpenIds((prev) => {
      if (allowMultiple) {
        return prev.includes(itemId)
          ? prev.filter((openId) => openId !== itemId)
          : [...prev, itemId];
      }
      return prev.includes(itemId) ? [] : [itemId];
    });
  };

  const shouldRenderContact =
    showContact !== undefined
      ? showContact
      : Boolean(activeContactEmail || contactNode);

  return (
    <section
      ref={sectionRef}
      id={mergedSectionId}
      className={`relative w-full bg-background text-foreground py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-border scroll-mt-20 overflow-hidden transition-colors duration-200 ${className}`.trim()}
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(92,246,41,0.03),transparent_70%)]" />

      <div className={`relative mx-auto max-w-7xl ${containerClassName}`.trim()}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading, Badge, Subtitle & Contact Note */}
          <div ref={leftColRef} className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Optional Badge */}
            {badge && (
              <div className="faq-left-anim mb-4">
                {typeof badge === 'string' ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-card text-muted-foreground border border-border">
                    {badge}
                  </span>
                ) : (
                  badge
                )}
              </div>
            )}

            {/* Main Headline */}
            {title ? (
              typeof title === 'string' ? (
                <h2
                  className={`faq-left-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12] ${titleClassName}`.trim()}
                >
                  {title}
                </h2>
              ) : (
                <div className={`faq-left-anim ${titleClassName}`.trim()}>{title}</div>
              )
            ) : (
              <h2
                className={`faq-left-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12] ${titleClassName}`.trim()}
              >
                {activeTitleLines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < activeTitleLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
            )}

            {/* Optional Subtitle */}
            {subtitle && (
              <div className="faq-left-anim mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm">
                {typeof subtitle === 'string' ? <p>{subtitle}</p> : subtitle}
              </div>
            )}

            {/* Direct contact line or custom contact node */}
            {shouldRenderContact && (
              contactNode ? (
                <div className="faq-left-anim mt-6">{contactNode}</div>
              ) : activeContactEmail ? (
                <p className="faq-left-anim mt-6 text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed max-w-sm">
                  {activeContactPrompt}{' '}
                  <a
                    href={`mailto:${activeContactEmail}`}
                    className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-brand-neon-text dark:hover:text-brand-neon transition-colors"
                  >
                    {activeContactEmail}
                  </a>
                </p>
              ) : null
            )}
          </div>

          {/* Right Column: Accordion Items Stack */}
          <div ref={rightColRef} className={`lg:col-span-7 space-y-3 ${itemsClassName}`.trim()}>
            {items.map((item, idx) => {
              const itemId = item.id || `faq-item-${idx}`;
              return (
                <FaqAccordionItem
                  key={itemId}
                  item={item}
                  isOpen={openIds.includes(itemId)}
                  onToggle={() => handleToggle(itemId)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
