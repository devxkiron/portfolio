'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from './types';

interface ProjectCardInfoProps {
  project: ProjectItem;
  infoRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const ProjectCardInfo: React.FC<ProjectCardInfoProps> = ({
  project,
  infoRef,
  className = '',
}) => {
  return (
    <div
      ref={infoRef}
      className={`relative isolate flex flex-col items-start justify-start text-left space-y-4 pt-1 sm:pt-2 lg:pt-3 ${className}`}
    >
      {/* Background Watermark / Shade Index */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -left-2 z-0 select-none font-mono text-7xl font-black tracking-tighter text-brand-neon/15 lg:text-brand-neon/5 sm:-top-10 sm:-left-3 sm:text-8xl lg:-top-12 lg:text-9xl leading-none"
      >
        {project.index}
      </span>

      {/* Category */}
      {project.category && (
        <div className="project-info-item bg-black/30 backdrop-blur-sm relative z-10 flex items-center gap-2">

          <span className="font-mono text-xs font-medium tracking-widest uppercase text-zinc-400">
            {project.category}
          </span>
        </div>
      )}

      {/* Project Title */}
      <h3 className="project-info-item relative z-10 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
        <a
          href={project.href || '#'}
          className="group inline-flex items-center gap-2 transition-colors hover:text-brand-neon"
        >
          <span>{project.title}</span>
          <ArrowUpRight
            size={22}
            className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
          />
        </a>
      </h3>

      {/* Project Description */}
      <p className="project-info-item relative z-10 text-sm leading-relaxed text-zinc-400 sm:text-base">
        {project.description}
      </p>

      {/* Tag Pills */}
      <div className="project-info-item relative z-10 flex flex-wrap gap-2 pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-zinc-800 bg-zinc-900/80 px-3 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
