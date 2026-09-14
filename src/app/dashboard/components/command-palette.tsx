'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Layers,
  Palette,
  Type,
  Sparkles,
  Navigation,
  Sliders,
  Database,
  Sun,
  Moon,
  Save,
  RotateCcw,
  ExternalLink,
  LogOut,
  X,
  ArrowRight,
  Command as CommandIcon,
  Briefcase,
  MessageSquareQuote,
} from 'lucide-react';
import {
  SiteConfigData,
  HeroBackgroundVariant,
  NavbarStyleVariant,
} from '@/lib/theme-config/types';
import { toast } from '@/components/ui/sonner';

export type DashboardTabId =
  | 'brand'
  | 'colors'
  | 'typography'
  | 'hero'
  | 'navbar'
  | 'projects'
  | 'clientStories'
  | 'layout'
  | 'database';

interface CommandItem {
  id: string;
  category: 'Tabs' | 'Navbar Styles' | 'Hero Visuals' | 'Theme' | 'Actions';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  badge?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: DashboardTabId) => void;
  onUpdateConfig: (updater: (prev: SiteConfigData) => SiteConfigData) => void;
  onSave: () => void;
  onReset: () => void;
  onLogout: () => void;
  config: SiteConfigData;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectTab,
  onUpdateConfig,
  onSave,
  onReset,
  onLogout,
  config,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Define commands list
  const commands: CommandItem[] = [
    // Tabs Navigation
    {
      id: 'tab-brand',
      category: 'Tabs',
      title: 'General & Brand',
      subtitle: 'Name, logo, tagline, status badge text',
      icon: <Layers className="w-4 h-4 text-blue-400" />,
      action: () => {
        onSelectTab('brand');
        onClose();
      },
    },
    {
      id: 'tab-colors',
      category: 'Tabs',
      title: 'Colors & Palette',
      subtitle: 'Neon accents, dark and light theme background & borders',
      icon: <Palette className="w-4 h-4 text-purple-400" />,
      action: () => {
        onSelectTab('colors');
        onClose();
      },
    },
    {
      id: 'tab-typography',
      category: 'Tabs',
      title: 'Typography & Fonts',
      subtitle: 'Headings, body font, brand font, Origin Tech accent',
      icon: <Type className="w-4 h-4 text-amber-400" />,
      action: () => {
        onSelectTab('typography');
        onClose();
      },
    },
    {
      id: 'tab-hero',
      category: 'Tabs',
      title: 'Hero Visuals & Shaders',
      subtitle: 'Color Bends, Acid Squares, Prism, Side Rays, Pixel Blast...',
      icon: <Sparkles className="w-4 h-4 text-[#aeff00]" />,
      badge: config.heroBackground || config.layout?.heroBackground,
      action: () => {
        onSelectTab('hero');
        onClose();
      },
    },
    {
      id: 'tab-navbar',
      category: 'Tabs',
      title: 'Navbar Style Variations',
      subtitle: 'Floating Pill, Minimal Dock, Cyber HUD, Glassmorphism, Bento Island',
      icon: <Navigation className="w-4 h-4 text-[#aeff00]" />,
      badge: config.navbarStyle || config.layout?.navbarStyle,
      action: () => {
        onSelectTab('navbar');
        onClose();
      },
    },
    {
      id: 'tab-projects',
      category: 'Tabs',
      title: 'Projects & Work Portfolio',
      subtitle: 'Add, edit, re-order, images, categories, tags & live links',
      icon: <Briefcase className="w-4 h-4 text-[#aeff00]" />,
      badge: `${config.projects?.length || 0} projects`,
      action: () => {
        onSelectTab('projects');
        onClose();
      },
    },
    {
      id: 'tab-client-stories',
      category: 'Tabs',
      title: 'Client Stories & Testimonials',
      subtitle: 'Manage client reviews, metrics, ratings & 3D globe coordinates',
      icon: <MessageSquareQuote className="w-4 h-4 text-[#aeff00]" />,
      badge: `${config.clientStories?.length || 0} stories`,
      action: () => {
        onSelectTab('clientStories');
        onClose();
      },
    },
    {
      id: 'tab-layout',
      category: 'Tabs',
      title: 'Shapes & Spacing',
      subtitle: 'Border radius tokens, shadow elevations, spacing scale',
      icon: <Sliders className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onSelectTab('layout');
        onClose();
      },
    },
    {
      id: 'tab-database',
      category: 'Tabs',
      title: 'Database & Raw JSON',
      subtitle: 'Inspect live Neon PostgreSQL configuration payload',
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onSelectTab('database');
        onClose();
      },
    },

    // Navbar Variants Direct Switch
    {
      id: 'nav-floating-pill',
      category: 'Navbar Styles',
      title: 'Switch Navbar: Floating Frosted Capsule',
      subtitle: 'Suspended pill capsule, Linear / Vercel aesthetic',
      icon: <Navigation className="w-4 h-4 text-[#aeff00]" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          navbarStyle: 'floating-pill',
          layout: { ...prev.layout, navbarStyle: 'floating-pill' },
        }));
        onSelectTab('navbar');
        toast.info('Navbar set to Floating Frosted Capsule', {
          description: 'Click Save Changes in the dashboard to persist to database.',
        });
        onClose();
      },
    },
    {
      id: 'nav-minimal-dock',
      category: 'Navbar Styles',
      title: 'Switch Navbar: Raycast Floating Dock',
      subtitle: 'Centered dock with live availability beacon dot',
      icon: <Navigation className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          navbarStyle: 'minimal-dock',
          layout: { ...prev.layout, navbarStyle: 'minimal-dock' },
        }));
        onSelectTab('navbar');
        toast.info('Navbar set to Raycast Floating Dock', {
          description: 'Click Save Changes in the dashboard to persist to database.',
        });
        onClose();
      },
    },
    {
      id: 'nav-cyber-hud',
      category: 'Navbar Styles',
      title: 'Switch Navbar: Industrial Cyber HUD',
      subtitle: 'Telemetry header, corner brackets [ ], 01// monospace tags',
      icon: <Navigation className="w-4 h-4 text-[#aeff00]" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          navbarStyle: 'cyber-hud',
          layout: { ...prev.layout, navbarStyle: 'cyber-hud' },
        }));
        onSelectTab('navbar');
        toast.info('Navbar set to Industrial Cyber HUD', {
          description: 'Click Save Changes in the dashboard to persist to database.',
        });
        onClose();
      },
    },
    {
      id: 'nav-glass-morphism',
      category: 'Navbar Styles',
      title: 'Switch Navbar: Edge-to-Edge Glassmorphism',
      subtitle: 'Full width frosted bar with neon laser hairline border',
      icon: <Navigation className="w-4 h-4 text-blue-400" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          navbarStyle: 'glass-morphism',
          layout: { ...prev.layout, navbarStyle: 'glass-morphism' },
        }));
        onSelectTab('navbar');
        toast.info('Navbar set to Edge-to-Edge Glassmorphism', {
          description: 'Click Save Changes in the dashboard to persist to database.',
        });
        onClose();
      },
    },
    {
      id: 'nav-compact-island',
      category: 'Navbar Styles',
      title: 'Switch Navbar: Modular Bento Island',
      subtitle: '3-piece split floating pods with negative space',
      icon: <Navigation className="w-4 h-4 text-purple-400" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          navbarStyle: 'compact-island',
          layout: { ...prev.layout, navbarStyle: 'compact-island' },
        }));
        onSelectTab('navbar');
        toast.info('Navbar set to Modular Bento Island', {
          description: 'Click Save Changes in the dashboard to persist to database.',
        });
        onClose();
      },
    },

    // Hero Visuals Direct Switch
    {
      id: 'hero-color-bends',
      category: 'Hero Visuals',
      title: 'Switch Hero: Color Bends (WebGL)',
      subtitle: 'Procedural ribbon flows with interactive physics and glow',
      icon: <Sparkles className="w-4 h-4 text-[#aeff00]" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          heroBackground: 'color-bends',
          layout: { ...prev.layout, heroBackground: 'color-bends' },
        }));
        onSelectTab('hero');
        toast.info('Hero visual set to Color Bends', {
          description: 'Click Save Changes to save.',
        });
        onClose();
      },
    },
    {
      id: 'hero-acid-squares',
      category: 'Hero Visuals',
      title: 'Switch Hero: Acid Squares',
      subtitle: 'Distorted neon liquid grid ripples and waves',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          heroBackground: 'acid-squares',
          layout: { ...prev.layout, heroBackground: 'acid-squares' },
        }));
        onSelectTab('hero');
        toast.info('Hero visual set to Acid Squares', {
          description: 'Click Save Changes to save.',
        });
        onClose();
      },
    },
    {
      id: 'hero-prism',
      category: 'Hero Visuals',
      title: 'Switch Hero: Prism Refraction',
      subtitle: 'Rotating optical crystal with light dispersion',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          heroBackground: 'prism',
          layout: { ...prev.layout, heroBackground: 'prism' },
        }));
        onSelectTab('hero');
        toast.info('Hero visual set to Prism Refraction', {
          description: 'Click Save Changes to save.',
        });
        onClose();
      },
    },
    {
      id: 'hero-pixel-blast',
      category: 'Hero Visuals',
      title: 'Switch Hero: Pixel Blast',
      subtitle: 'Interactive matrix of diamond particles reacting to mouse',
      icon: <Sparkles className="w-4 h-4 text-lime-400" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          heroBackground: 'pixel-blast',
          layout: { ...prev.layout, heroBackground: 'pixel-blast' },
        }));
        onSelectTab('hero');
        toast.info('Hero visual set to Pixel Blast', {
          description: 'Click Save Changes to save.',
        });
        onClose();
      },
    },
    {
      id: 'hero-dither',
      category: 'Hero Visuals',
      title: 'Switch Hero: Cyber Dither',
      subtitle: 'Retro 90s digital dither shader with wave displacement',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: () => {
        onUpdateConfig((prev) => ({
          ...prev,
          heroBackground: 'dither',
          layout: { ...prev.layout, heroBackground: 'dither' },
        }));
        onSelectTab('hero');
        toast.info('Hero visual set to Cyber Dither', {
          description: 'Click Save Changes to save.',
        });
        onClose();
      },
    },

    // Theme Mode
    {
      id: 'theme-dark',
      category: 'Theme',
      title: 'Switch to Dark Mode',
      subtitle: 'Set obsidian dark theme as default for the portfolio',
      icon: <Moon className="w-4 h-4 text-zinc-300" />,
      action: () => {
        onUpdateConfig((prev) => ({ ...prev, themeMode: 'dark' }));
        toast.info('Switched theme mode to Dark', {
          description: 'Remember to save changes to persist.',
        });
        onClose();
      },
    },
    {
      id: 'theme-light',
      category: 'Theme',
      title: 'Switch to Light Mode',
      subtitle: 'Set sleek high-contrast light theme as default',
      icon: <Sun className="w-4 h-4 text-amber-400" />,
      action: () => {
        onUpdateConfig((prev) => ({ ...prev, themeMode: 'light' }));
        toast.info('Switched theme mode to Light', {
          description: 'Remember to save changes to persist.',
        });
        onClose();
      },
    },

    // Actions
    {
      id: 'action-save',
      category: 'Actions',
      title: 'Save Changes to Database',
      subtitle: 'Persist current design tokens to Neon PostgreSQL',
      icon: <Save className="w-4 h-4 text-[#aeff00]" />,
      action: () => {
        onClose();
        onSave();
      },
    },
    {
      id: 'action-reset',
      category: 'Actions',
      title: 'Reset to Factory Defaults',
      subtitle: 'Restore initial design tokens, colors and layouts',
      icon: <RotateCcw className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        onReset();
      },
    },
    {
      id: 'action-view-site',
      category: 'Actions',
      title: 'View Live Portfolio Site',
      subtitle: 'Open homepage in new browser tab',
      icon: <ExternalLink className="w-4 h-4 text-zinc-400" />,
      action: () => {
        window.open('/', '_blank');
        onClose();
      },
    },
    {
      id: 'action-logout',
      category: 'Actions',
      title: 'Sign Out Admin Session',
      subtitle: 'End session and return to login',
      icon: <LogOut className="w-4 h-4 text-red-400" />,
      action: () => {
        onClose();
        onLogout();
      },
    },
  ];

  // Filter commands by query
  const filtered = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q))
    );
  });

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4 bg-black/75 backdrop-blur-md transition-all duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-zinc-800 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800/80 bg-zinc-900/50">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search settings, tabs, navbar styles, shaders, or actions..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-zinc-300 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 shrink-0">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-500">
              No matching settings or actions found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-zinc-800/90 text-white shadow-sm'
                      : 'text-zinc-300 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSelected
                          ? 'border-zinc-600 bg-zinc-900 text-white'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
                      }`}
                    >
                      {cmd.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{cmd.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {cmd.category}
                        </span>
                      </div>
                      {cmd.subtitle && (
                        <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {cmd.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#aeff00]/10 text-[#aeff00] border border-[#aeff00]/20">
                        {cmd.badge}
                      </span>
                    )}
                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#aeff00] transition-transform group-hover:translate-x-0.5" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2.5 border-t border-zinc-800/80 bg-zinc-950 text-[11px] text-zinc-500 flex items-center justify-between font-mono">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] border border-zinc-700">
                ↑
              </kbd>{' '}
              <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] border border-zinc-700">
                ↓
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] border border-zinc-700">
                ↵
              </kbd>{' '}
              Select
            </span>
          </div>
          <span>Quick search</span>
        </div>
      </div>
    </div>
  );
}
