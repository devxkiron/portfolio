'use client';

import React, { useState } from 'react';
import { SiteConfigData } from '@/lib/theme-config/types';
import { generateThemeCss } from '@/lib/theme-config/css-generator';
import { Navbar } from '@/app/_components/navbar/navbar';
import { HeroBackground } from '@/app/_components/hero/hero-background';
import { HeroContent } from '@/app/_components/hero/hero-content';
import { ClientStoriesSection } from '@/app/_components/client-stories/client-stories-section';
import { Monitor, Tablet, Smartphone, Sparkles, Navigation, Layers } from 'lucide-react';

interface LivePreviewProps {
  config: SiteConfigData;
  previewMode: 'dark' | 'light';
  activeTab?: string;
}

export function LivePreview({ config, previewMode, activeTab = 'brand' }: LivePreviewProps) {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const themeCss = generateThemeCss(config);

  const deviceWidthClass =
    deviceView === 'mobile'
      ? 'max-w-[375px]'
      : deviceView === 'tablet'
      ? 'max-w-[680px]'
      : 'w-full';

  return (
    <div className="space-y-2.5">
      {/* Dynamic Theme Token Injection */}
      <style dangerouslySetInnerHTML={{ __html: themeCss }} />

      {/* Live Preview Header Toolbar */}
      <div className="flex items-center justify-between px-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
            {activeTab === 'navbar' ? (
              <>
                <Navigation className="w-3.5 h-3.5 text-[#aeff00]" />
                <span>Live Navbar Preview</span>
              </>
            ) : activeTab === 'hero' ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#aeff00]" />
                <span>Live Hero Preview</span>
              </>
            ) : activeTab === 'clientStories' ? (
              <>
                <Layers className="w-3.5 h-3.5 text-[#aeff00]" />
                <span>Live Client Stories Preview</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#aeff00]" />
                <span>Live Website Preview</span>
              </>
            )}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            {previewMode.toUpperCase()}
          </span>
        </div>

        {/* Viewport Device Size Switcher */}
        <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg">
          <button
            type="button"
            onClick={() => setDeviceView('desktop')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              deviceView === 'desktop' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceView('tablet')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              deviceView === 'tablet' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceView('mobile')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              deviceView === 'mobile' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Simulated Live Viewport Stage */}
      <div className="flex justify-center w-full overflow-hidden">
        <div
          data-theme={previewMode}
          className={`${deviceWidthClass} ${
            previewMode === 'dark' ? 'dark' : 'light'
          } relative rounded-xl border border-zinc-800 bg-background text-foreground shadow-2xl transition-all duration-300 [transform:translateZ(0)] isolate overflow-hidden min-h-[480px] max-h-[640px] overflow-y-auto custom-dark-scrollbar flex flex-col`}
        >
          {/* Active Tab: Navbar Preview */}
          {activeTab === 'navbar' && (
            <div className="relative w-full min-h-[500px] flex flex-col items-center justify-start overflow-hidden">
              {/* Exact Live Navbar Component */}
              <Navbar
                navbarStyle={config.navbarStyle || config.layout?.navbarStyle || 'floating-pill'}
                brandOverride={config.brand}
              />

              {/* Exact Live Hero Background & Content Behind Navbar */}
              <div className="relative w-full min-h-[500px] flex flex-col items-center justify-center pt-24 pb-12 px-4">
                <HeroBackground variant={config.heroBackground || config.layout?.heroBackground || 'color-bends'} />
                <div className="relative z-10 scale-90 sm:scale-95 origin-top w-full">
                  <HeroContent brandOverride={config.brand} />
                </div>
              </div>
            </div>
          )}

          {/* Active Tab: Hero Visuals Preview */}
          {activeTab === 'hero' && (
            <div className="relative w-full min-h-[500px] flex flex-col items-center justify-start overflow-hidden">
              <Navbar
                navbarStyle={config.navbarStyle || config.layout?.navbarStyle || 'floating-pill'}
                brandOverride={config.brand}
              />
              <div className="relative w-full min-h-[500px] flex flex-col items-center justify-center pt-24 pb-12 px-4">
                <HeroBackground variant={config.heroBackground || config.layout?.heroBackground || 'color-bends'} />
                <div className="relative z-10 scale-90 sm:scale-95 origin-top w-full">
                  <HeroContent brandOverride={config.brand} />
                </div>
              </div>
            </div>
          )}

          {/* Active Tab: Client Stories Preview */}
          {activeTab === 'clientStories' && (
            <div className="relative w-full min-h-[480px] py-6 px-3 sm:px-6">
              <ClientStoriesSection storiesOverride={config.clientStories} />
            </div>
          )}

          {/* Default (Brand / Colors / Typography / Layout / Database) */}
          {activeTab !== 'navbar' && activeTab !== 'hero' && activeTab !== 'clientStories' && (
            <div className="relative w-full min-h-[500px] flex flex-col items-center justify-start overflow-hidden">
              <Navbar
                navbarStyle={config.navbarStyle || config.layout?.navbarStyle || 'floating-pill'}
                brandOverride={config.brand}
              />
              <div className="relative w-full min-h-[500px] flex flex-col items-center justify-center pt-24 pb-12 px-4">
                <HeroBackground variant={config.heroBackground || config.layout?.heroBackground || 'color-bends'} />
                <div className="relative z-10 scale-90 sm:scale-95 origin-top w-full">
                  <HeroContent brandOverride={config.brand} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
