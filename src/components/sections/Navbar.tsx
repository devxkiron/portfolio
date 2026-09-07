"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import { Button } from "../common/Button";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/90 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-dark)] flex items-center justify-center text-[var(--brand-neon)] shadow-[0_2px_10px_rgba(174,255,0,0.2)] group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 fill-[var(--brand-neon)]" />
          </div>
          <span className="text-xl font-black tracking-tight text-[var(--foreground)]">
            Built<span className="text-[#7bbd00] dark:text-[var(--brand-neon)]">Scale</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[var(--brand-neon)] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            href="#booking"
            variant="primary"
            size="sm"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Book a Call
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[var(--foreground)] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-black/[0.08] dark:border-white/[0.1] bg-[var(--background)] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[var(--foreground)]/80 hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
            <Button
              href="#booking"
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Book a Strategy Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
