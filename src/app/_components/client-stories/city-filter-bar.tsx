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
  // Dynamically split all cities from config into two balanced, right-aligned rows
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
            ? 'bg-[#e2f952] text-black shadow-[0_0_18px_rgba(226,249,82,0.45)] scale-105'
            : 'border border-zinc-700/70 bg-[#08120b]/85 text-zinc-300 backdrop-blur-md hover:border-zinc-500 hover:text-white hover:bg-[#112417]'
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
