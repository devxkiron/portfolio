'use client';

import React from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NavbarVariantProps } from '../types';
import { navbarConfig } from '../navbar.config';

export const NavbarGlassmorphism: React.FC<NavbarVariantProps> = ({
  brandOverride,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { brand, links, cta } = navbarConfig;
  const activeBrandName = brandOverride?.name || brand.name;

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full transition-all duration-300">
      <div className="relative border-b border-border/80 bg-background/80 backdrop-blur-2xl">
        {/* Luminous Neon Gradient Hairline Indicator on the bottom edge */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-neon/60 to-transparent" />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <a href={brand.href} className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-neon to-emerald-500 flex items-center justify-center text-black font-bold text-sm shadow-[0_0_12px_rgba(174,255,0,0.3)]">
              {activeBrandName.slice(0, 1).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-motech text-base font-bold tracking-wider uppercase text-foreground group-hover:text-brand-neon transition-colors">
                {activeBrandName}
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-mono">
                AI Engineering
              </span>
            </div>
          </a>

          {/* Center Links with Smooth Neon Underline Indicator */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-brand-neon shadow-[0_0_8px_var(--brand-neon)] animate-in fade-in duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={cta.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-foreground text-background hover:bg-brand-neon hover:text-brand-dark transition-all duration-200 shadow-sm"
            >
              <span>{cta.text}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={cta.href}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-neon text-brand-dark"
            >
              {cta.text}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background/95 p-4 backdrop-blur-2xl md:hidden">
            <div className="flex flex-col space-y-1">
              {links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
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
      </div>
    </header>
  );
};
