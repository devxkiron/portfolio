'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { clientStoriesConfig } from './client-stories.config';
import { CityFilterBar } from './city-filter-bar';
import { GlobeCanvas } from './globe-canvas';
import { GlobeControls } from './globe-controls';
import { TestimonialCard } from './testimonial-card';
import type { City } from './types';

export const ClientStoriesSection: React.FC = () => {
  const {
    stories,
    arcs,
    dotsColor,
    dotDensity,
    globeRadius,
    glowRadius,
    glowColor,
    globeBgColor,
    arcColor,
    arcWidth,
    arcHeight,
    arcOpacity,
    beaconRadius,
    beaconGlowRadius,
    beaconColor,
    beaconActiveColor,
  } = clientStoriesConfig;

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const checkTheme = () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  const isLight = theme === 'light';

  // In dark mode: keep the exact original configuration (zero changes to dark mode)
  // In light mode: use colors consistent with the light theme palette
  const activeGlobeBgColor = isLight ? '#eae8df' : globeBgColor;
  const activeDotsColor = isLight ? '#168028' : dotsColor;
  const activeArcColor = isLight ? '#168028' : arcColor;
  const activeArcOpacity = isLight ? 0.55 : arcOpacity;
  const activeBeaconColor = isLight ? '#168028' : beaconColor;
  const activeBeaconActiveColor = isLight ? '#0d1310' : beaconActiveColor;

  const cities: City[] = useMemo(() => {
    const map = new Map<string, City>();
    stories.forEach((s) => {
      if (!map.has(s.cityId)) {
        map.set(s.cityId, {
          id: s.cityId,
          name: s.cityName,
          country: s.country,
          flag: s.flag,
          lat: s.lat,
          lon: s.lon,
        });
      }
    });
    return Array.from(map.values());
  }, [stories]);

  const [selectedCityId, setSelectedCityId] = useState<string>('sf');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(3);

  const selectedCity = useMemo(
    () => cities.find((c) => c.id === selectedCityId) || cities[0],
    [cities, selectedCityId]
  );

  const activeStoryIndex = useMemo(() => {
    const idx = stories.findIndex((s) => s.cityId === selectedCityId);
    return idx !== -1 ? idx : 0;
  }, [stories, selectedCityId]);

  const activeStory = stories[activeStoryIndex] || stories[0];

  const handleSelectCity = useCallback((city: City) => {
    setSelectedCityId(city.id);
  }, []);

  const handlePrevStory = useCallback(() => {
    const nextIdx = (activeStoryIndex - 1 + stories.length) % stories.length;
    const nextStory = stories[nextIdx];
    setSelectedCityId(nextStory.cityId);
  }, [activeStoryIndex, stories]);

  const handleNextStory = useCallback(() => {
    const nextIdx = (activeStoryIndex + 1) % stories.length;
    const nextStory = stories[nextIdx];
    setSelectedCityId(nextStory.cityId);
  }, [activeStoryIndex, stories]);

  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(5, prev + 1));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(1, prev - 1));
  }, []);

  const handleReset = useCallback(() => {
    setSelectedCityId('sf');
    setZoomLevel(3);
    setAutoRotate(true);
  }, []);

  return (
    <section
      id="stories"
      className="relative w-full h-[700px] sm:h-[760px] lg:h-[840px] bg-background text-foreground scroll-mt-20 overflow-hidden transition-colors duration-200"
    >
      {/* Full-Width 3D Interactive Dotted Globe */}
      <div className="absolute inset-0 top-[22px] h-full w-full">
        <GlobeCanvas
          cities={cities}
          stories={stories}
          arcs={arcs}
          selectedCity={selectedCity}
          autoRotate={autoRotate}
          zoomLevel={zoomLevel}
          dotsColor={activeDotsColor}
          dotDensity={dotDensity}
          globeRadius={globeRadius}
          glowRadius={glowRadius}
          glowColor={glowColor}
          globeBgColor={activeGlobeBgColor}
          isLight={isLight}
          arcColor={activeArcColor}
          arcWidth={arcWidth}
          arcHeight={arcHeight}
          arcOpacity={activeArcOpacity}
          beaconRadius={beaconRadius}
          beaconGlowRadius={beaconGlowRadius}
          beaconColor={activeBeaconColor}
          beaconActiveColor={activeBeaconActiveColor}
          onSelectCity={handleSelectCity}
        />
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div className="pointer-events-none absolute inset-0 top-[22px] bg-[radial-gradient(circle_at_50%_48%,rgba(174,255,0,0.03),transparent_65%)]" />

      {/* Content Layer */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-6 sm:px-6 sm:py-8 lg:px-8 pointer-events-none">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-4 pointer-events-none">
          <div className="pointer-events-auto select-none pt-1">
            <h2 className="font-origin-tech tracking-tighter text-3xl sm:text-4xl lg:text-5xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-lime-500 to-[#b8ff1a] drop-shadow-[0_0_24px_rgba(174,255,0,0.3)]">
              CLIENT STORIES
            </h2>
          </div>

          <div className="pointer-events-auto max-w-full overflow-x-auto pb-1 md:pb-0 scrollbar-none self-end md:self-auto">
            <CityFilterBar
              cities={cities}
              selectedCityId={selectedCityId}
              onSelectCity={handleSelectCity}
            />
          </div>
        </div>

        {/* Floating Camera Controls on Right */}
        <div className="absolute top-28 right-4 sm:top-32 sm:right-6 lg:right-8 z-20 pointer-events-auto">
          <GlobeControls
            autoRotate={autoRotate}
            onToggleAutoRotate={handleToggleAutoRotate}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
          />
        </div>

        {/* Bottom Floating Testimonial Card */}
        <div className="pointer-events-auto max-w-lg pb-2 sm:pb-4">
          <TestimonialCard
            story={activeStory}
            currentIndex={activeStoryIndex}
            totalStories={stories.length}
            onPrev={handlePrevStory}
            onNext={handleNextStory}
          />
        </div>
      </div>
    </section>
  );
};
