'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { ProjectCard } from './project-card';
import { projectsConfig } from './projects.config';

export const ProjectsSection: React.FC = () => {
  const { sectionTitle, subtitle, projects } = projectsConfig;

  return (
    <section
      id="projects"
      className="relative w-full bg-black px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <SectionHeader title={sectionTitle} subtitle={subtitle} />


        {/* Alternating Project Cards List */}
        <div className="space-y-12 sm:space-y-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
