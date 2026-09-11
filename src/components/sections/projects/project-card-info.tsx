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
      className={`flex flex-col items-start justify-start text-left space-y-4 pt-1 sm:pt-2 lg:pt-3 ${className}`}
    >
      {/* Category / Index */}
      <div className="project-info-item flex items-center gap-3">
        <span className="font-mono text-xs font-semibold tracking-wider text-brand-neon">
          {project.index}
        </span>
        {project.category && (
          <>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span className="font-mono text-xs font-medium tracking-widest text-zinc-400 uppercase">
              {project.category}
            </span>
          </>
        )}
      </div>

      {/* Project Title */}
      <h3 className="project-info-item text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
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
      <p className="project-info-item text-sm leading-relaxed text-zinc-400 sm:text-base">
        {project.description}
      </p>

      {/* Tag Pills */}
      <div className="project-info-item flex flex-wrap gap-2 pt-2">
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
