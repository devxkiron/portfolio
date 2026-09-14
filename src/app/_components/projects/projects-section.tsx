'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { ProjectCard } from './project-card';
import { projectsConfig } from './projects.config';
import { ProjectItem } from './types';

interface ProjectsSectionProps {
  projectsOverride?: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projectsOverride }) => {
  const { sectionTitle, subtitle, projects } = projectsConfig;
  const activeProjects =
    projectsOverride && projectsOverride.length > 0 ? projectsOverride : projects;

  return (
    <section
      id="projects"
      className="relative w-full bg-background text-foreground px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <SectionHeader title={sectionTitle} subtitle={subtitle} />

        {/* Alternating Project Cards List */}
        <div className="space-y-12 sm:space-y-20">
          {activeProjects.map((project, index) => (
            <ProjectCard
              key={project.id || `project-${index}`}
              project={{
                ...project,
                index: project.index || String(index + 1).padStart(2, '0'),
              }}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
