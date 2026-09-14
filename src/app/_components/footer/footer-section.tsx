'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { footerConfig } from './footer.config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FooterSectionProps {
  brandOverride?: {
    name?: string;
    tagline?: string;
  };
}

export const FooterSection: React.FC<FooterSectionProps> = ({ brandOverride }) => {
  const {
    brandName,
    brandTagline,
    ctaText,
    ctaHref,
    columns,
    contact,
    copyrightText,
    legalLinks,
  } = footerConfig;

  const activeBrandName = brandOverride?.name || brandName;
  const activeBrandTagline = brandOverride?.tagline || brandTagline;

  const footerRef = useRef<HTMLElement | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const columnsGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const footerEl = footerRef.current;
    const topBarEl = topBarRef.current;
    const gridEl = columnsGridRef.current;
    if (!footerEl || !topBarEl || !gridEl) return;

    const ctx = gsap.context(() => {
      // 1. Top bar animation
      gsap.fromTo(
        topBarEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: topBarEl,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Navigation columns staggered slide-up
      const colElements = gridEl.children;
      gsap.fromTo(
        colElements,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridEl,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-card-muted/60 text-foreground border-t border-border pt-14 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Branding & Call to Action Bar */}
        <div
          ref={topBarRef}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pb-10 border-b border-border"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-neon text-black font-extrabold text-sm shadow-[0_0_12px_rgba(174,255,0,0.3)]">
                G
              </div>
              <span className="text-lg sm:text-xl font-motech tracking-tight text-foreground">
                {activeBrandName}
              </span>
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <p className="text-xs text-muted-foreground font-normal max-w-md">
              {activeBrandTagline}
            </p>
          </div>

          <div>
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-lg border border-brand-neon bg-transparent px-4 py-2 text-xs font-semibold text-brand-neon-text dark:text-brand-neon hover:bg-brand-neon hover:text-black transition-colors duration-150"
            >
              {ctaText}
            </a>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div
          ref={columnsGridRef}
          className="py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 sm:gap-8"
        >
          {/* Columns 1-4 */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3 className="text-[11px] font-bold tracking-wider text-brand-neon-text dark:text-brand-neon uppercase mb-3.5">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Contact */}
          <div className="flex flex-col col-span-2 sm:col-span-1">
            <h3 className="text-[11px] font-bold tracking-wider text-brand-neon-text dark:text-brand-neon uppercase mb-3.5">
              CONTACT
            </h3>
            <div className="space-y-2.5 text-xs">
              <a
                href={`mailto:${contact.email}`}
                className="font-semibold text-foreground hover:text-brand-neon-text dark:hover:text-brand-neon transition-colors block font-mono"
              >
                {contact.email}
              </a>
              <p className="text-muted-foreground font-normal">{contact.location}</p>
              <div className="pt-1 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-neon" />
                </span>
                <span className="text-xs font-medium text-brand-neon-text dark:text-brand-neon">
                  {contact.availabilityStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-subtle-foreground">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
