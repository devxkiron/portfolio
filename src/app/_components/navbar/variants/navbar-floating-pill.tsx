'use client';

import React from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NavbarVariantProps } from '../types';
import { navbarConfig } from '../navbar.config';
import ShinyText from '@/components/ShinyText';

export const NavbarFloatingPill: React.FC<NavbarVariantProps> = ({
  brandOverride,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { brand, links, cta } = navbarConfig;
  const activeBrandName = brandOverride?.name || brand.name;

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-4 pointer-events-none transition-all duration-300">
      <div className="mx-auto max-w-5xl pointer-events-auto">
        <div className="flex h-14 items-center justify-between rounded-full border border-border/70 bg-card/75 px-4 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-200">
          {/* Brand Logo */}
          <a
            href={brand.href}
            className="flex items-center gap-2 group transition-transform hover:scale-[1.02]"
          >
            {brandOverride?.logoType === 'image' && brandOverride.logoUrl ? (
              <img
                src={brandOverride.logoUrl}
                alt={activeBrandName}
                className="h-6 w-auto object-contain"
              />
            ) : (
              <span className="font-motech text-sm sm:text-base font-bold tracking-wider uppercase text-foreground group-hover:text-brand-neon transition-colors">
                {activeBrandName}
              </span>
            )}
          </a>

          {/* Center Navigation Links in Floating Pill */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-background/50 border border-border/50">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-foreground text-background font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={cta.href}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-neon text-brand-dark shadow-[0_0_15px_rgba(174,255,0,0.3)] hover:shadow-[0_0_22px_rgba(174,255,0,0.5)] hover:scale-[1.02] transition-all"
            >
              <ShinyText text={cta.text} speed={2} color="#101612" shineColor="#ffffff" />
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Toggle & Mini CTA */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={cta.href}
              className="px-3 py-1 rounded-full text-[11px] font-semibold bg-brand-neon text-brand-dark shadow-sm"
            >
              {cta.text}
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-2xl border border-border/80 bg-card/95 p-3 shadow-xl backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-muted text-brand-neon font-semibold'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
