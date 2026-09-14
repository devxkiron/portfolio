'use client';

import React from 'react';
import type { City } from './types';
import { Button } from '@/components/ui/button';

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
      <Button
        key={city.id}
        variant={isSelected ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => onSelectCity(city)}
        className="!rounded-full !px-3.5 !py-1.5 !text-xs font-semibold tracking-tight !gap-1.5"
      >
        <span className="text-xs">{city.flag}</span>
        <span>{city.name}</span>
      </Button>
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
