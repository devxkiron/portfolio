'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from './project-card';
import { projectsConfig } from './projects.config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsSection: React.FC = () => {
  const { sectionTitle, subtitle, projects } = projectsConfig;
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const ctx = gsap.context(() => {
      const headerItems = headerEl.querySelectorAll('.section-header-item');
      gsap.fromTo(
        headerItems,
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerEl,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full bg-black px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header — animated on scroll */}
        <div ref={headerRef} className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <span className="section-header-item mb-3 font-mono text-xs font-semibold tracking-widest text-brand-neon uppercase">
            Portfolio Showcase
          </span>
          <h2 className="section-header-item text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {sectionTitle}
          </h2>
          {subtitle && (
            <p className="section-header-item mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
              {subtitle}
            </p>
          )}
          <div className="section-header-item mt-8 h-px w-16 bg-zinc-800" />
        </div>

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
