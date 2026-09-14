'use client';

import React, { useState, useEffect } from 'react';
import { NavbarStyleVariant } from '@/lib/theme-config/types';
import { navbarConfig } from './navbar.config';
import { NavbarFloatingPill } from './variants/navbar-floating-pill';
import { NavbarMinimalDock } from './variants/navbar-minimal-dock';
import { NavbarCyberHud } from './variants/navbar-cyber-hud';
import { NavbarGlassmorphism } from './variants/navbar-glass-morphism';
import { NavbarCompactIsland } from './variants/navbar-compact-island';

export interface NavbarProps {
  navbarStyle?: NavbarStyleVariant;
  brandOverride?: {
    name?: string;
    logoType?: string;
    logoUrl?: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  navbarStyle = 'floating-pill',
  brandOverride,
}) => {
  const { links } = navbarConfig;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [links]);

  const variantProps = {
    brandOverride,
    activeSection,
    mobileMenuOpen,
    setMobileMenuOpen,
  };

  switch (navbarStyle) {
    case 'minimal-dock':
      return <NavbarMinimalDock {...variantProps} />;
    case 'cyber-hud':
      return <NavbarCyberHud {...variantProps} />;
    case 'glass-morphism':
      return <NavbarGlassmorphism {...variantProps} />;
    case 'compact-island':
      return <NavbarCompactIsland {...variantProps} />;
    case 'floating-pill':
    default:
      return <NavbarFloatingPill {...variantProps} />;
  }
};
