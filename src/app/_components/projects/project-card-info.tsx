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
        className="pointer-events-none absolute -top-8 -left-2 z-0 select-none font-mono text-7xl font-black tracking-tighter text-foreground/10 dark:text-brand-neon/5 sm:-top-10 sm:-left-3 sm:text-8xl lg:-top-12 lg:text-9xl leading-none"
      >
        {project.index}
      </span>

      {/* Category */}
      {project.category && (
        <div className="project-info-item relative z-10 flex items-center gap-2">
          <span className="font-mono text-xs font-medium tracking-widest uppercase text-muted-foreground">
            {project.category}
          </span>
        </div>
      )}

      {/* Project Title */}
      <h3 className="project-info-item relative z-10 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
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
      <p className="project-info-item relative z-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {project.description}
      </p>

      {/* Tag Pills */}
      <div className="project-info-item relative z-10 flex flex-wrap gap-2 pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border bg-card/90 px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-border-subtle hover:text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
