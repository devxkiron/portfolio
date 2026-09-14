'use client';

import React from 'react';
import { Menu, X, Terminal, Cpu } from 'lucide-react';
import { NavbarVariantProps } from '../types';
import { navbarConfig } from '../navbar.config';

export const NavbarCyberHud: React.FC<NavbarVariantProps> = ({
  brandOverride,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { brand, links, cta } = navbarConfig;
  const activeBrandName = brandOverride?.name || brand.name;

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all duration-200">
      {/* Top telemetry status bar */}
      <div className="hidden lg:flex h-6 items-center justify-between border-b border-border/40 bg-card/40 px-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            SYS.STATUS: OPERATIONAL
          </span>
          <span>PROTOCOL: AUTOPILOT.v2</span>
        </div>
        <div className="flex items-center gap-4">
          <span>LATENCY: 18MS</span>
          <span className="text-zinc-500">UTC: 2026.09.14</span>
        </div>
      </div>

      {/* Main HUD Bar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Brand with Cyber Brackets */}
        <a href={brand.href} className="flex items-center gap-2 group font-mono">
          <span className="text-brand-neon font-bold text-xs">[</span>
          <Cpu className="w-4 h-4 text-brand-neon group-hover:rotate-90 transition-transform" />
          <span className="font-origin-tech text-sm sm:text-base font-normal tracking-widest uppercase text-foreground group-hover:text-brand-neon transition-colors">
            {activeBrandName}
          </span>
          <span className="text-brand-neon font-bold text-xs">]</span>
        </a>

        {/* Center Monospace Numbered Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          {links.map((link, idx) => {
            const isActive = activeSection === link.href.replace('#', '');
            const num = String(idx + 1).padStart(2, '0');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-1.5 transition-colors py-1 ${
                  isActive
                    ? 'text-brand-neon font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-[10px] text-zinc-500 group-hover:text-brand-neon">{num}</span>
                <span className="tracking-wider uppercase">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right HUD Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={cta.href}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded border border-brand-neon/60 bg-brand-neon/10 text-brand-neon hover:bg-brand-neon hover:text-brand-dark transition-all shadow-[0_0_12px_rgba(174,255,0,0.2)]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{cta.text}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={cta.href}
            className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded border border-brand-neon bg-brand-neon text-brand-dark"
          >
            {cta.text}
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-1.5 rounded border border-border text-foreground hover:bg-muted font-mono"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background/95 p-4 font-mono text-xs md:hidden">
          <div className="flex flex-col space-y-2">
            {links.map((link, idx) => {
              const isActive = activeSection === link.href.replace('#', '');
              const num = String(idx + 1).padStart(2, '0');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded ${
                    isActive ? 'bg-muted text-brand-neon font-bold' : 'text-muted-foreground'
                  }`}
                >
                  <span className="text-zinc-500">{num} //</span>
                  <span className="uppercase">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
