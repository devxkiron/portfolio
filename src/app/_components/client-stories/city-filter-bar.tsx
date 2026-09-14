'use client';

import React from 'react';
import type { City } from './types';

interface CityFilterBarProps {
  cities: City[];
  selectedCityId: string;
  onSelectCity: (city: City) => void;
}

export const CityFilterBar: React.FC<CityFilterBarProps> = ({
  cities,
  selectedCityId,
  onSelectCity,
}) => {
  const half = Math.ceil(cities.length / 2);
  const row1 = cities.slice(0, half);
  const row2 = cities.slice(half);

  const renderPill = (city: City) => {
    const isSelected = city.id === selectedCityId;
    return (
      <button
        key={city.id}
        type="button"
        onClick={() => onSelectCity(city)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
          isSelected
            ? 'bg-brand-neon text-black shadow-[0_0_16px_rgba(174,255,0,0.35)] scale-105'
            : 'border border-border bg-card/90 text-foreground/80 dark:text-muted-foreground backdrop-blur-md hover:border-border-subtle hover:text-foreground hover:bg-muted'
        }`}
      >
        <span className="text-xs">{city.flag}</span>
        <span>{city.name}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        {row1.map(renderPill)}
      </div>
      {/* Row 2 */}
      {row2.length > 0 && (
        <div className="flex flex-wrap items-center justify-end gap-2">
          {row2.map(renderPill)}
        </div>
      )}
    </div>
  );
};
