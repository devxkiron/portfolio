'use client';

import React from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NavbarVariantProps } from '../types';
import { navbarConfig } from '../navbar.config';

export const NavbarCompactIsland: React.FC<NavbarVariantProps> = ({
  brandOverride,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { brand, links, cta } = navbarConfig;
  const activeBrandName = brandOverride?.name || brand.name;

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between pointer-events-auto">
        {/* Island 1: Brand Chip */}
        <div className="flex items-center rounded-2xl border border-border/80 bg-card/85 px-4 py-2 shadow-lg backdrop-blur-xl transition-transform hover:scale-[1.02]">
          <a href={brand.href} className="flex items-center">
            {brandOverride?.logoType === 'image' && brandOverride.logoUrl ? (
              <img
                src={brandOverride.logoUrl}
                alt={activeBrandName}
                className="h-6 w-auto object-contain"
              />
            ) : (
              <span className="font-motech text-sm font-bold tracking-wider uppercase text-foreground">
                {activeBrandName}
              </span>
            )}
          </a>
        </div>

        {/* Island 2: Centered Floating Navigation Capsule */}
        <nav className="hidden md:flex items-center gap-1 rounded-2xl border border-border/80 bg-card/85 p-1.5 shadow-lg backdrop-blur-xl">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1 text-xs font-medium rounded-xl transition-all duration-200 ${
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

        {/* Island 3: Right CTA Island & Mobile Menu */}
        <div className="flex items-center gap-2">
          <div className="rounded-2xl border border-border/80 bg-card/85 p-1 shadow-lg backdrop-blur-xl">
            <a
              href={cta.href}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-neon text-brand-dark hover:shadow-[0_0_15px_rgba(174,255,0,0.4)] transition-all"
            >
              <span>{cta.text}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-2xl border border-border/80 bg-card/85 text-foreground backdrop-blur-xl"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto max-w-sm mt-3 rounded-2xl border border-border/80 bg-card/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden pointer-events-auto">
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
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
