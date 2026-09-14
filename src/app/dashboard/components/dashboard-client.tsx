'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteConfigData } from '@/lib/theme-config/types';
import { BrandTab } from './brand-tab';
import { ColorsTab } from './colors-tab';
import { TypographyTab } from './typography-tab';
import { LayoutTab } from './layout-tab';
import { HeroTab } from './hero-tab';
import { NavbarTab } from './navbar-tab';
import { ProjectsTab } from './projects-tab';
import { ClientStoriesTab } from './client-stories-tab';
import { DatabaseTab } from './database-tab';
import { LivePreview } from './live-preview';
import { CommandPalette, DashboardTabId } from './command-palette';
import { Toaster, toast } from '@/components/ui/sonner';
import {
  Layers,
  Palette,
  Type,
  Database,
  Sliders,
  LogOut,
  ExternalLink,
  Save,
  RotateCcw,
  Sun,
  Moon,
  Shield,
  Sparkles,
  Navigation,
  Briefcase,
  MessageSquareQuote,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface DashboardClientProps {
  initialConfig: SiteConfigData;
  adminEmail: string;
}

export function DashboardClient({ initialConfig, adminEmail }: DashboardClientProps) {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfigData>(initialConfig);
  const [savedConfig, setSavedConfig] = useState<SiteConfigData>(initialConfig);
  const [activeTab, setActiveTab] = useState<DashboardTabId>('brand');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isDirty = JSON.stringify(config) !== JSON.stringify(savedConfig);

  // Restore sidebar preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_admin_sidebar_collapsed');
      if (saved !== null) {
        setIsSidebarCollapsed(saved === 'true');
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('portfolio_admin_sidebar_collapsed', String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleSave = async (customConfig?: SiteConfigData) => {
    const configToSave = customConfig || config;
    setIsSaving(true);
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configToSave),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSavedConfig(json.data);
        setConfig(json.data);
        toast.success('Configuration Saved', {
          description: 'All changes successfully synchronized with Neon PostgreSQL.',
        });
      } else {
        throw new Error(json.error || 'Failed to save configuration');
      }
    } catch (err: any) {
      toast.error('Save Failed', {
        description: err.message || 'An error occurred while updating the database.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all design tokens back to factory defaults?')) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/config/reset', { method: 'POST' });
      const json = await res.json();
      if (res.ok && json.success) {
        setConfig(json.data);
        setSavedConfig(json.data);
        toast.success('Factory Reset Completed', {
          description: 'All design tokens have been restored to initial defaults.',
        });
      }
    } catch (err: any) {
      toast.error('Reset Failed', {
        description: err.message || 'Failed to reset configuration.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    toast.info('Signed Out', {
      description: 'Redirecting to login...',
    });
    router.push('/dashboard/login');
    router.refresh();
  };

  // Keyboard shortcuts listener: Cmd+K, Cmd+S, /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInputFocused =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        if (isDirty) {
          e.preventDefault();
          handleSave();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config, isDirty]);

  const navItems: Array<{ id: DashboardTabId; label: string; icon: React.ReactNode }> = [
    { id: 'brand', label: 'General & Brand', icon: <Layers className="w-4 h-4" /> },
    { id: 'colors', label: 'Colors & Palette', icon: <Palette className="w-4 h-4" /> },
    { id: 'typography', label: 'Typography', icon: <Type className="w-4 h-4" /> },
    { id: 'hero', label: 'Hero Visuals', icon: <Sparkles className="w-4 h-4 text-[#aeff00]" /> },
    { id: 'navbar', label: 'Navbar Style', icon: <Navigation className="w-4 h-4 text-[#aeff00]" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4 text-[#aeff00]" /> },
    { id: 'clientStories', label: 'Client Stories', icon: <MessageSquareQuote className="w-4 h-4 text-[#aeff00]" /> },
    { id: 'layout', label: 'Shapes & Spacing', icon: <Sliders className="w-4 h-4" /> },
    { id: 'database', label: 'Database & Raw JSON', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans antialiased">
      {/* Sonner Floating Toast Notifications */}
      <Toaster position="bottom-right" />

      {/* Global Command Palette Search */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={(tabId) => setActiveTab(tabId)}
        onUpdateConfig={(updater) => setConfig((prev) => updater(prev))}
        onSave={() => handleSave()}
        onReset={handleReset}
        onLogout={handleLogout}
        config={config}
      />

      {/* Desktop Collapsible Sidebar */}
      <aside
        className={`border-r border-zinc-800/80 bg-zinc-900/60 flex flex-col justify-between shrink-0 hidden md:flex transition-all duration-200 z-30 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div>
          {/* Admin Header & Collapse Toggle */}
          <div
            className={`h-16 border-b border-zinc-800/80 flex items-center ${
              isSidebarCollapsed ? 'justify-center px-0' : 'justify-between px-4'
            }`}
          >
            {!isSidebarCollapsed ? (
              <>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 shadow-sm">
                    <Shield className="w-3.5 h-3.5 text-[#aeff00]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-white tracking-tight truncate block">
                      Admin Console
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono block">
                      Portfolio CMS
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={toggleSidebar}
                className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm"
                title="Expand sidebar"
              >
                <PanelLeftOpen className="w-4 h-4 text-[#aeff00]" />
              </button>
            )}
          </div>

          {/* Sidebar Quick Search Trigger */}
          <div className="p-2.5">
            {!isSidebarCollapsed ? (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 hover:border-zinc-700 text-xs text-zinc-400 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                  <span>Quick Search...</span>
                </div>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-zinc-300">
                  ⌘K
                </kbd>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-center h-10 rounded-lg border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all cursor-pointer"
                title="Quick Search (⌘K)"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className={`space-y-1 ${isSidebarCollapsed ? 'p-2' : 'px-3 py-1'}`}>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isSidebarCollapsed
                      ? 'justify-center h-10 p-0'
                      : 'gap-2.5 px-3 py-2 text-left'
                  } ${
                    isActive
                      ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-zinc-500'}>
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div
          className={`border-t border-zinc-800/80 space-y-1 pb-16 ${
            isSidebarCollapsed ? 'p-2' : 'p-3'
          }`}
        >
          {!isSidebarCollapsed ? (
            <>
              <div className="px-3 py-1.5 text-[11px] text-zinc-400 font-mono truncate">
                {adminEmail}
              </div>
              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Link
                href="/"
                target="_blank"
                title="View Live Site"
                className="w-full h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign Out"
                className="w-full h-10 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-zinc-800/80 bg-zinc-900/40 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          {/* Mobile Tab Selector & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as DashboardTabId)}
              className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-200 focus:outline-none"
            >
              <option value="brand">Brand</option>
              <option value="colors">Colors</option>
              <option value="typography">Typography</option>
              <option value="hero">Hero Visuals</option>
              <option value="navbar">Navbar Style</option>
              <option value="projects">Projects</option>
              <option value="clientStories">Client Stories</option>
              <option value="layout">Layout</option>
              <option value="database">Database</option>
            </select>

            <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setConfig({ ...config, themeMode: 'dark' });
                  setPreviewTheme('dark');
                  toast.info('Theme set to Dark Mode', {
                    description: 'Remember to save changes to persist.',
                  });
                }}
                className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                  config.themeMode === 'dark' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
                }`}
                title="Dark Theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfig({ ...config, themeMode: 'light' });
                  setPreviewTheme('light');
                  toast.info('Theme set to Light Mode', {
                    description: 'Remember to save changes to persist.',
                  });
                }}
                className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                  config.themeMode === 'light' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
                }`}
                title="Light Theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Desktop Left: Global Search Input Button & Status */}
          <div className="hidden md:flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs transition-all cursor-pointer group"
            >
              <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
              <span>Search settings & actions...</span>
              <kbd className="inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 ml-2 group-hover:text-zinc-200">
                ⌘K
              </kbd>
            </button>

            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="text-zinc-500 font-mono text-[11px]">Neon DB:</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Connected
              </span>
            </div>

            {/* Direct Global Site Theme Switcher */}
            <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setConfig({ ...config, themeMode: 'dark' });
                  setPreviewTheme('dark');
                  toast.info('Theme set to Dark Mode', {
                    description: 'Remember to save changes to persist.',
                  });
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  config.themeMode === 'dark'
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Set entire site to Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfig({ ...config, themeMode: 'light' });
                  setPreviewTheme('light');
                  toast.info('Theme set to Light Mode', {
                    description: 'Remember to save changes to persist.',
                  });
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  config.themeMode === 'light'
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Set entire site to Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
            </div>

            {isDirty && (
              <span className="text-amber-400 font-mono text-[11px] bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50 animate-pulse">
                Unsaved edits
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
              <span className="sm:hidden">Reset</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave()}
              disabled={isSaving || !isDirty}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer shrink-0 ${
                isDirty
                  ? 'bg-white text-zinc-900 hover:bg-zinc-200 shadow-sm'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
              }`}
              title={isDirty ? 'Save Changes (⌘S)' : 'No unsaved edits'}
            >
              {isSaving ? (
                <div className="w-3.5 h-3.5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save Changes'}</span>
              <span className="sm:hidden">{isSaving ? '...' : 'Save'}</span>
            </button>
          </div>
        </header>

        {/* Dashboard Workspace */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
            {/* Left/Middle Active Tab Content Panel */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {activeTab === 'brand' && (
                <BrandTab
                  brand={config.brand}
                  onChange={(updated) =>
                    setConfig({
                      ...config,
                      brand: {
                        ...config.brand,
                        ...updated,
                      },
                    })
                  }
                />
              )}

              {activeTab === 'colors' && (
                <ColorsTab
                  colors={config.colors}
                  themeMode={config.themeMode}
                  onThemeModeChange={(mode) => {
                    setConfig({ ...config, themeMode: mode });
                    setPreviewTheme(mode);
                  }}
                  onChange={(updated) => setConfig({ ...config, colors: updated })}
                />
              )}

              {activeTab === 'typography' && (
                <TypographyTab
                  typography={config.typography}
                  onChange={(updated) => setConfig({ ...config, typography: updated })}
                />
              )}

              {activeTab === 'hero' && (
                <HeroTab
                  currentVariant={
                    config.heroBackground || config.layout?.heroBackground || 'color-bends'
                  }
                  onChange={(variant) =>
                    setConfig({
                      ...config,
                      heroBackground: variant,
                      layout: {
                        ...config.layout,
                        heroBackground: variant,
                      },
                    })
                  }
                />
              )}

              {activeTab === 'navbar' && (
                <NavbarTab
                  currentVariant={
                    config.navbarStyle || config.layout?.navbarStyle || 'floating-pill'
                  }
                  onChange={(variant) =>
                    setConfig({
                      ...config,
                      navbarStyle: variant,
                      layout: {
                        ...config.layout,
                        navbarStyle: variant,
                      },
                    })
                  }
                />
              )}

              {activeTab === 'projects' && (
                <ProjectsTab
                  projects={config.projects}
                  onChange={(updated) => setConfig({ ...config, projects: updated })}
                />
              )}

              {activeTab === 'clientStories' && (
                <ClientStoriesTab
                  stories={config.clientStories}
                  onChange={(updated) => setConfig({ ...config, clientStories: updated })}
                />
              )}

              {activeTab === 'layout' && (
                <LayoutTab
                  layout={config.layout}
                  onChange={(updated) => setConfig({ ...config, layout: updated })}
                />
              )}

              {activeTab === 'database' && <DatabaseTab config={config} />}
            </div>

            {/* Right Side Live Specimen Preview */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-3 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">Specimen Preview</span>

                {/* Theme mode toggle */}
                <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded">
                  <button
                    type="button"
                    onClick={() => setPreviewTheme('dark')}
                    className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                      previewTheme === 'dark'
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    title="Dark Preview"
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTheme('light')}
                    className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                      previewTheme === 'light'
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    title="Light Preview"
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <LivePreview config={config} previewMode={previewTheme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
