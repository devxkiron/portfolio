'use client';

import React, { useState, useCallback, useMemo } from 'react';
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

  // Derive unique cities list directly from client reviews/stories
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

  // Selected city & active story state (defaulting to San Francisco)
  const [selectedCityId, setSelectedCityId] = useState<string>('sf');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(3); // 1 to 5

  const selectedCity = useMemo(
    () => cities.find((c) => c.id === selectedCityId) || cities[0],
    [cities, selectedCityId]
  );

  const activeStoryIndex = useMemo(() => {
    const idx = stories.findIndex((s) => s.cityId === selectedCityId);
    return idx !== -1 ? idx : 0;
  }, [stories, selectedCityId]);

  const activeStory = stories[activeStoryIndex] || stories[0];

  // City selection handler
  const handleSelectCity = useCallback((city: City) => {
    setSelectedCityId(city.id);
  }, []);

  // Previous / Next testimonial navigation
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

  // Camera toolbar handlers
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
      className="relative w-full h-[700px] sm:h-[760px] lg:h-[840px] bg-black text-white scroll-mt-20 overflow-hidden"
    >
      {/* Full-Width 3D Interactive Dotted Globe (Shifted 22px lower) */}
      <div className="absolute inset-0 top-[22px] h-full w-full">
        <GlobeCanvas
          cities={cities}
          stories={stories}
          arcs={arcs}
          selectedCity={selectedCity}
          autoRotate={autoRotate}
          zoomLevel={zoomLevel}
          dotsColor={dotsColor}
          dotDensity={dotDensity}
          globeRadius={globeRadius}
          glowRadius={glowRadius}
          glowColor={glowColor}
          globeBgColor={globeBgColor}
          arcColor={arcColor}
          arcWidth={arcWidth}
          arcHeight={arcHeight}
          arcOpacity={arcOpacity}
          beaconRadius={beaconRadius}
          beaconGlowRadius={beaconGlowRadius}
          beaconColor={beaconColor}
          beaconActiveColor={beaconActiveColor}
          onSelectCity={handleSelectCity}
        />
      </div>

      {/* Subtle Ambient Radial Glow (Soft & reduced) */}
      <div className="pointer-events-none absolute inset-0 top-[22px] bg-[radial-gradient(circle_at_50%_48%,rgba(174,255,0,0.02),transparent_65%)]" />

      {/* Content Layer (Constrained to max-w-7xl, No Border) */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-6 sm:px-6 sm:py-8 lg:px-8 pointer-events-none">
        {/* Top Bar: Stylized Brand Header & City Selector Rows */}
        <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-4 pointer-events-none">
          {/* Stylized CLIENT STORIES Brand Title */}
          <div className="pointer-events-auto select-none pt-1">
            <h2 className="font-black italic tracking-tighter text-3xl sm:text-4xl lg:text-5xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-lime-400 to-[#e2f952] drop-shadow-[0_0_24px_rgba(174,255,0,0.6)]">
              CLIENT STORIES
            </h2>
          </div>

          {/* City Selection Pills (Two Rows Aligned to Right) */}
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
