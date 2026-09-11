'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCardImage } from './project-card-image';
import { ProjectCardInfo } from './project-card-info';
import type { ProjectItem } from './types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCardProps {
  project: ProjectItem;
  isReversed?: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isReversed = false,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    const containerEl = imageContainerRef.current;
    const imageEl = imageRef.current;
    const infoEl = infoRef.current;

    if (!cardEl || !containerEl || !imageEl) return;

    const ctx = gsap.context(() => {
      // 1. Image Frame Scale — starts very small, scales to full with scroll scrub.
      //    Scrolling back up shrinks it back down.
      gsap.fromTo(
        containerEl,
        {
          scale: 0.45,
          opacity: 0.7,
          // Origin on the text side → image grows OUTWARD past the page edge
          transformOrigin: isReversed ? 'left center' : 'right center',
        },
        {
          scale: 1.15,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerEl,
            start: 'top 92%',
            end: 'top 25%',
            scrub: 1,
          },
        }
      );

      // 2. Classic Parallax — inner image shifts vertically inside the frame
      gsap.fromTo(
        imageEl,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // 3. Text elements — separate subtle staggered fade/slide-in
      if (infoEl) {
        const textElements = infoEl.querySelectorAll('.project-info-item');
        gsap.fromTo(
          textElements,
          {
            opacity: 0,
            y: 32,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoEl,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [isReversed]);

  return (
    <div
      ref={cardRef}
      className={`group flex flex-col gap-6 lg:items-start lg:gap-12 ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } ${className}`}
    >
      {/* ~60% Image Frame — scales with scroll */}
      <div className="w-full lg:w-[60%]">
        <ProjectCardImage
          imageUrl={project.imageUrl}
          imageAlt={project.imageAlt}
          containerRef={imageContainerRef}
          imageRef={imageRef}
        />
      </div>

      {/* ~40% Text Info — fades/slides in separately */}
      <div className="w-full lg:w-[40%]">
        <ProjectCardInfo project={project} infoRef={infoRef} />
      </div>
    </div>
  );
};
