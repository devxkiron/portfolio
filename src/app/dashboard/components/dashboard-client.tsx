'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteConfigData } from '@/lib/theme-config/types';
import { BrandTab } from './brand-tab';
import { ColorsTab } from './colors-tab';
import { TypographyTab } from './typography-tab';
import { LayoutTab } from './layout-tab';
import { DatabaseTab } from './database-tab';
import { LivePreview } from './live-preview';
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
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  Shield,
} from 'lucide-react';

type TabId = 'brand' | 'colors' | 'typography' | 'layout' | 'database';

interface DashboardClientProps {
  initialConfig: SiteConfigData;
  adminEmail: string;
}

export function DashboardClient({ initialConfig, adminEmail }: DashboardClientProps) {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfigData>(initialConfig);
  const [savedConfig, setSavedConfig] = useState<SiteConfigData>(initialConfig);
  const [activeTab, setActiveTab] = useState<TabId>('brand');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isDirty = JSON.stringify(config) !== JSON.stringify(savedConfig);

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSavedConfig(json.data);
        setStatusMessage({ type: 'success', text: 'Changes saved to database' });
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        throw new Error(json.error || 'Failed to save configuration');
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error saving changes' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all design tokens back to factory defaults?')) return;

    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/config/reset', { method: 'POST' });
      const json = await res.json();
      if (res.ok && json.success) {
        setConfig(json.data);
        setSavedConfig(json.data);
        setStatusMessage({ type: 'success', text: 'Reset to factory defaults completed' });
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Failed to reset configuration' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/dashboard/login');
    router.refresh();
  };

  const navItems: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
    { id: 'brand', label: 'General & Brand', icon: <Layers className="w-4 h-4" /> },
    { id: 'colors', label: 'Colors & Palette', icon: <Palette className="w-4 h-4" /> },
    { id: 'typography', label: 'Typography', icon: <Type className="w-4 h-4" /> },
    { id: 'layout', label: 'Shapes & Spacing', icon: <Sliders className="w-4 h-4" /> },
    { id: 'database', label: 'Database & Raw JSON', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/60 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Admin Header */}
          <div className="h-16 px-6 border-b border-zinc-800 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-sm font-semibold text-white tracking-tight">Admin Console</span>
              <span className="block text-[10px] text-zinc-500 font-mono">Portfolio CMS</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-zinc-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-zinc-800 space-y-1">
          <div className="px-3 py-2 text-[11px] text-zinc-400 font-mono truncate">
            {adminEmail}
          </div>
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-md transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-md transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-zinc-800 bg-zinc-900/40 px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-sm">
          {/* Mobile Tab Selector & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TabId)}
              className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-200"
            >
              {navItems.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>

            <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setConfig({ ...config, themeMode: 'dark' });
                  setPreviewTheme('dark');
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

          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-mono">Neon DB:</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
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
              <span className="text-amber-400 font-mono text-[11px] bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                Unsaved edits
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {statusMessage && (
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-300'
                    : 'bg-red-950/50 border-red-800/60 text-red-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                isDirty
                  ? 'bg-white text-zinc-900 hover:bg-zinc-200 shadow-sm'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
              }`}
            >
              {isSaving ? (
                <div className="w-3.5 h-3.5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </header>

        {/* Dashboard Workspace */}
        <div className="p-6 max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Main Form Editor */}
            <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 shadow-sm">
              {activeTab === 'brand' && (
                <BrandTab
                  brand={config.brand}
                  onChange={(updated) => setConfig({ ...config, brand: { ...config.brand, ...updated } })}
                />
              )}

              {activeTab === 'colors' && (
                <ColorsTab
                  colors={config.colors}
                  themeMode={config.themeMode || 'dark'}
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

              {activeTab === 'layout' && (
                <LayoutTab
                  layout={config.layout}
                  onChange={(updated) => setConfig({ ...config, layout: updated })}
                />
              )}

              {activeTab === 'database' && <DatabaseTab config={config} />}
            </div>

            {/* Right Side Live Specimen Preview */}
            <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">Specimen Preview</span>

                {/* Theme mode toggle */}
                <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded">
                  <button
                    type="button"
                    onClick={() => setPreviewTheme('dark')}
                    className={`p-1 rounded text-xs transition-colors ${
                      previewTheme === 'dark' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    title="Dark Preview"
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTheme('light')}
                    className={`p-1 rounded text-xs transition-colors ${
                      previewTheme === 'light' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
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
