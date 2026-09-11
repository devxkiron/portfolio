'use client';

import React from 'react';
import Image from 'next/image';

interface ProjectCardImageProps {
  imageUrl: string;
  imageAlt: string;
  imageRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const ProjectCardImage: React.FC<ProjectCardImageProps> = ({
  imageUrl,
  imageAlt,
  imageRef,
  containerRef,
  className = '',
}) => {
  return (
    <div
      ref={containerRef}
      className={`group relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950 will-change-transform sm:aspect-[16/10] ${className}`}
    >
      {/* Parallax & Scaling Image Container */}
      <div
        ref={imageRef}
        className="absolute -top-[12%] -left-[5%] h-[124%] w-[110%] will-change-transform"
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 60vw"
          className="object-cover object-center transition-filter duration-300"
          priority={false}
        />
      </div>

      {/* Subtle border highlight on hover without heavy shadow */}
      <div className="pointer-events-none absolute inset-0 rounded-sm border border-white/5 transition-colors duration-300 group-hover:border-white/15" />
    </div>
  );
};
