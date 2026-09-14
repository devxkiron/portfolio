'use client';

import React from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NavbarVariantProps } from '../types';
import { navbarConfig } from '../navbar.config';

export const NavbarMinimalDock: React.FC<NavbarVariantProps> = ({
  brandOverride,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { brand, links, cta } = navbarConfig;
  const activeBrandName = brandOverride?.name || brand.name;

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 pointer-events-none transition-all duration-300">
      <div className="mx-auto max-w-3xl pointer-events-auto">
        <div className="flex h-12 items-center justify-between rounded-xl border border-border/80 bg-background/90 px-3 sm:px-4 shadow-[0_12px_24px_-6px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-200">
          {/* Brand & Availability Status */}
          <a href={brand.href} className="flex items-center gap-2 group">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-motech text-xs font-bold tracking-wider uppercase text-foreground group-hover:text-brand-neon transition-colors">
              {activeBrandName}
            </span>
          </a>

          {/* Minimalist Center Dock Links with Micro Dot */}
          <nav className="hidden md:flex items-center gap-5">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs tracking-tight transition-colors py-1 ${
                    isActive
                      ? 'text-brand-neon font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-neon shadow-[0_0_6px_var(--brand-neon)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Minimal Button */}
          <div className="hidden md:flex items-center">
            <a
              href={cta.href}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-brand-neon hover:text-brand-dark transition-all"
            >
              <span>{cta.text}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-1.5">
            <a
              href={cta.href}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-foreground text-background"
            >
              {cta.text}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-1.5 rounded-lg border border-border text-foreground hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-2xl md:hidden">
            <div className="flex flex-col space-y-0.5">
              {links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-2 text-xs transition-colors ${
                      isActive
                        ? 'bg-muted text-brand-neon font-medium'
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
      </div>
    </header>
  );
};
