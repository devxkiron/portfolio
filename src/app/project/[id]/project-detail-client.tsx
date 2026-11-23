'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from 'lucide-react';
import type { ProjectItem } from '@/app/_components/projects/types';
import { BackgroundPattern, isLightColor } from './background-patterns';

interface ProjectDetailClientProps {
  project: ProjectItem;
  prevProject?: { id: string; title: string } | null;
  nextProject?: { id: string; title: string } | null;
  brandOverride?: { name?: string; logoType?: string; logoUrl?: string };
}

export const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({
  project,
  prevProject,
  nextProject,
  brandOverride,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: string[]; activeIndex: number } | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const checkTheme = () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  const design = project.details?.design || {};
  const animation = design.animation || 'fade-up';
  const customBg = design.backgroundColor;
  const isCustomDarkDefault = customBg === '#09090b' || customBg === '#000000';
  // If the user selected an intentional custom color, respect it; if empty or default #09090b, adapt to system theme
  const hasCustomBg = customBg && !isCustomDarkDefault;
  const bgColor = hasCustomBg ? customBg : (theme === 'light' ? 'var(--background)' : customBg || '');

  const pattern = design.backgroundPattern || 'none';
  const primaryClr = design.primaryColor || '';
  const textClr = design.textColor || '';
  const accentClr = design.accentColor || '';
  const headingFont = design.headingFont || '';
  const bodyFont = design.bodyFont || '';

  const isLightBg = hasCustomBg ? isLightColor(customBg) : theme === 'light';

  // Compute adaptive defaults based on background lightness
  const defaultHeadingColor = isLightBg ? '#0d1310' : '#fdfcf8';
  const defaultTextColor = isLightBg ? '#1f2937' : '#d4d4d8';
  const defaultBorderColor = isLightBg ? 'rgba(0, 0, 0, 0.14)' : 'rgba(255, 255, 255, 0.1)';
  const defaultCardBg = isLightBg ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.04)';

  // Contrast safety guard: if user manually picked a color that clashes with light/dark background, ensure it remains legible
  const getLegibleColor = (color: string | undefined, defaultColor: string) => {
    if (!color) return defaultColor;
    const isColorLight = isLightColor(color);
    // If background is light but text color is also light, fallback to dark legible color
    if (isLightBg && isColorLight) return defaultColor;
    // If background is dark but text color is also dark, fallback to light legible color
    if (!isLightBg && !isColorLight) return defaultColor;
    return color;
  };

  const effectiveHeadingColor = getLegibleColor(primaryClr, defaultHeadingColor);
  const effectiveTextColor = getLegibleColor(textClr, defaultTextColor);

  const effectiveAccentColor = accentClr || (isLightBg ? '#15803d' : '#aeff00');

  // Build inline style overrides with CSS custom properties
  const pageStyle: React.CSSProperties & Record<string, string> = {
    '--project-primary': effectiveHeadingColor,
    '--project-accent': effectiveAccentColor,
    '--project-text': effectiveTextColor,
    '--project-border': defaultBorderColor,
    '--project-card-bg': defaultCardBg,
  };
  if (hasCustomBg) {
    pageStyle.backgroundColor = customBg;
  }

  const headingStyle: React.CSSProperties = {
    color: effectiveHeadingColor,
  };
  if (headingFont) headingStyle.fontFamily = `var(--font-${headingFont}, inherit)`;

  const bodyStyle: React.CSSProperties = {
    color: effectiveTextColor,
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  };
  if (bodyFont) bodyStyle.fontFamily = `var(--font-${bodyFont}), var(--font-face-${bodyFont}), sans-serif`;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                activeIndex: prev.activeIndex === 0 ? prev.images.length - 1 : prev.activeIndex - 1,
              }
            : null
        );
      }
      if (e.key === 'ArrowRight') {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                activeIndex: prev.activeIndex === prev.images.length - 1 ? 0 : prev.activeIndex + 1,
              }
            : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  // GSAP entry animation
  useEffect(() => {
    if (animation === 'none') return;

    const ctx = gsap.context(() => {
      const heroItems = heroRef.current?.querySelectorAll('.anim-item') || [];
      const contentItems = contentRef.current?.querySelectorAll('.anim-content-item') || [];

      const allItems = [...Array.from(heroItems), ...Array.from(contentItems)];
      if (allItems.length === 0) return;

      const baseProps: gsap.TweenVars = { duration: 0.8, ease: 'power3.out' };

      switch (animation) {
        case 'fade-up':
          gsap.fromTo(allItems, { opacity: 0, y: 40 }, { ...baseProps, opacity: 1, y: 0, stagger: 0.1 });
          break;
        case 'slide-in':
          gsap.fromTo(allItems, { opacity: 0, x: -60 }, { ...baseProps, opacity: 1, x: 0, stagger: 0.08 });
          break;
        case 'scale-up':
          gsap.fromTo(allItems, { opacity: 0, scale: 0.85 }, { ...baseProps, opacity: 1, scale: 1, stagger: 0.1 });
          break;
        case 'stagger':
          gsap.fromTo(allItems, { opacity: 0, y: 50, rotateX: 8 }, { ...baseProps, opacity: 1, y: 0, rotateX: 0, stagger: 0.12, duration: 1 });
          break;
      }
    }, pageRef);

    return () => ctx.revert();
  }, [animation]);

  const validImageSrc =
    project.imageUrl && project.imageUrl.trim() !== ''
      ? project.imageUrl
      : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop';

  // Hydrate Interactive Carousels and Facebook Smart Collages
  useEffect(() => {
    if (!contentRef.current) return;

    // 1. Hydrate Interactive Carousel Sliders
    const carouselWrappers = contentRef.current.querySelectorAll<HTMLElement>('.project-carousel-wrapper');
    carouselWrappers.forEach((wrapper) => {
      const dataImages = wrapper.getAttribute('data-images');
      let imageList: string[] = [];

      if (dataImages) {
        try {
          if (dataImages.startsWith('[')) {
            imageList = JSON.parse(dataImages);
          } else if (dataImages.includes('|||')) {
            imageList = dataImages.split('|||').filter(Boolean);
          } else {
            imageList = dataImages.split(',').filter(Boolean);
          }
        } catch (e) {
          imageList = dataImages.split(',').filter(Boolean);
        }
      }

      if (!imageList || imageList.length === 0) {
        const imgs = wrapper.querySelectorAll<HTMLImageElement>('img');
        imageList = Array.from(imgs).map((i) => i.src).filter(Boolean);
      }

      if (imageList.length === 0) {
        wrapper.style.display = 'none';
        return;
      }

      let currentIdx = 0;
      let autoPlayTimer: any = null;

      wrapper.innerHTML = `
        <div class="carousel-track relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 rounded-xl border border-zinc-800 group">
          ${imageList
            .map(
              (src, idx) => `
            <div
              class="carousel-slide absolute inset-0 transition-opacity duration-300 ${
                idx === 0 ? 'opacity-100 active-slide pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
              }"
              data-slide-index="${idx}"
              data-active="${idx === 0 ? 'true' : 'false'}"
              style="opacity: ${idx === 0 ? '1' : '0'}; pointer-events: ${idx === 0 ? 'auto' : 'none'}; z-index: ${idx === 0 ? '10' : '0'};"
            >
              <img src="${src}" alt="Slide ${idx + 1}" class="w-full h-full object-cover object-center select-none cursor-pointer" draggable="false" />
            </div>
          `
            )
            .join('')}

          ${
            imageList.length > 1
              ? `
            <div class="carousel-controls absolute inset-0 flex items-center justify-between p-3 sm:p-4 pointer-events-none z-20">
              <button type="button" class="carousel-btn-prev pointer-events-auto p-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all cursor-pointer" title="Previous Slide">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button type="button" class="carousel-btn-next pointer-events-auto p-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all cursor-pointer" title="Next Slide">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>

            <div class="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span class="carousel-current-counter font-semibold text-white">1</span> of <span>${imageList.length}</span>
            </div>

            <div class="carousel-indicators absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800 z-20">
              ${imageList
                .map(
                  (_, idx) => `
                <button type="button" class="carousel-dot h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === 0 ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }" data-dot-index="${idx}"></button>
              `
                )
                .join('')}
            </div>
          `
              : ''
          }
        </div>
      `;

      const slides = wrapper.querySelectorAll<HTMLElement>('.carousel-slide');
      const dots = wrapper.querySelectorAll<HTMLElement>('.carousel-dot');
      const prevBtn = wrapper.querySelector<HTMLElement>('.carousel-btn-prev');
      const nextBtn = wrapper.querySelector<HTMLElement>('.carousel-btn-next');
      const counterEl = wrapper.querySelector<HTMLElement>('.carousel-current-counter');

      slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          setLightbox({ images: imageList, activeIndex: idx });
        });
      });

      if (slides.length <= 1) return;

      const updateSlides = (newIdx: number) => {
        currentIdx = (newIdx + slides.length) % slides.length;
        slides.forEach((s, idx) => {
          const isActive = idx === currentIdx;
          s.setAttribute('data-active', isActive ? 'true' : 'false');
          s.style.opacity = isActive ? '1' : '0';
          s.style.pointerEvents = isActive ? 'auto' : 'none';
          s.style.zIndex = isActive ? '10' : '0';
          if (isActive) {
            s.classList.add('active-slide');
          } else {
            s.classList.remove('active-slide');
          }
        });

        dots.forEach((d, idx) => {
          if (idx === currentIdx) {
            d.className = 'carousel-dot h-1.5 rounded-full transition-all duration-300 cursor-pointer w-5 bg-white';
          } else {
            d.className = 'carousel-dot h-1.5 rounded-full transition-all duration-300 cursor-pointer w-1.5 bg-white/40 hover:bg-white/70';
          }
        });

        if (counterEl) {
          counterEl.textContent = String(currentIdx + 1);
        }
      };

      const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayTimer = setInterval(() => {
          updateSlides(currentIdx + 1);
        }, 5000);
      };

      const stopAutoPlay = () => {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
      };

      prevBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateSlides(currentIdx - 1);
        startAutoPlay();
      });

      nextBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateSlides(currentIdx + 1);
        startAutoPlay();
      });

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          updateSlides(idx);
          startAutoPlay();
        });
      });

      wrapper.addEventListener('mouseenter', stopAutoPlay);
      wrapper.addEventListener('mouseleave', startAutoPlay);

      startAutoPlay();
    });

    // 2. Hydrate Facebook Smart Collages
    const collageWrappers = contentRef.current.querySelectorAll<HTMLElement>(
      '.project-facebook-collage, .tiptap-image-grid'
    );
    collageWrappers.forEach((wrapper) => {
      const dataImages = wrapper.getAttribute('data-images');
      let imageList: string[] = [];

      if (dataImages) {
        imageList = dataImages.split(',').filter(Boolean);
      } else {
        const imgs = wrapper.querySelectorAll<HTMLImageElement>('img');
        imageList = Array.from(imgs).map((i) => i.src).filter(Boolean);
      }

      if (imageList.length === 0) {
        wrapper.style.display = 'none';
        return;
      }

      const count = imageList.length;
      const layout = wrapper.getAttribute('data-layout') || 'auto';
      let gridHTML = '';

      const makeSlot = (src: string, idx: number, extraClasses = '', badge = 0) => `
        <div class="facebook-slot relative rounded-xl overflow-hidden border border-zinc-800/90 group bg-zinc-950 cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${extraClasses}" data-index="${idx}">
          <img src="${src}" alt="Gallery Visual ${idx + 1}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none block" draggable="false" />
          ${
            badge > 0
              ? `<div class="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-colors group-hover:bg-black/60 pointer-events-none">
                  <span class="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">+${badge}</span>
                  <span class="text-xs text-zinc-300 font-medium mt-1">View All Photos</span>
                 </div>`
              : `<div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div class="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
                  </div>
                 </div>`
          }
        </div>
      `;

      if (layout === '2-cols') {
        gridHTML = `<div class="grid grid-cols-2 gap-2.5">
          ${imageList.slice(0, 2).map((src, idx) => makeSlot(src, idx, 'aspect-[16/10]', idx === 1 && count > 2 ? count - 1 : 0)).join('')}
        </div>`;
      } else if (layout === '3-cols') {
        gridHTML = `<div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          ${imageList.slice(0, 3).map((src, idx) => makeSlot(src, idx, 'aspect-[16/10]', idx === 2 && count > 3 ? count - 2 : 0)).join('')}
        </div>`;
      } else if (layout === '1-left-2-right') {
        gridHTML = `<div class="grid grid-cols-2 grid-rows-2 gap-2.5 h-72 sm:h-[400px]">
          ${makeSlot(imageList[0], 0, 'row-span-2 col-span-1 h-full')}
          ${imageList[1] ? makeSlot(imageList[1], 1, 'row-span-1 col-span-1 h-full') : ''}
          ${imageList[2] ? makeSlot(imageList[2], 2, 'row-span-1 col-span-1 h-full', count > 3 ? count - 2 : 0) : ''}
        </div>`;
      } else if (layout === '1-top-3-bottom') {
        gridHTML = `<div class="grid grid-cols-3 gap-2.5 h-84 sm:h-[440px]">
          ${makeSlot(imageList[0], 0, 'col-span-3 h-52 sm:h-64')}
          ${imageList[1] ? makeSlot(imageList[1], 1, 'col-span-1 h-28 sm:h-36') : ''}
          ${imageList[2] ? makeSlot(imageList[2], 2, 'col-span-1 h-28 sm:h-36') : ''}
          ${imageList[3] ? makeSlot(imageList[3], 3, 'col-span-1 h-28 sm:h-36', count > 4 ? count - 3 : 0) : ''}
        </div>`;
      } else if (layout === '2x2') {
        gridHTML = `<div class="grid grid-cols-2 grid-rows-2 gap-2.5 h-80 sm:h-[420px]">
          ${imageList.slice(0, 4).map((src, idx) => makeSlot(src, idx, 'h-full', idx === 3 && count > 4 ? count - 3 : 0)).join('')}
        </div>`;
      } else {
        // 'auto' - Facebook collage
        if (count === 1) {
          gridHTML = `<div class="w-full aspect-[16/10] sm:aspect-[16/9]">${makeSlot(imageList[0], 0, 'w-full h-full')}</div>`;
        } else if (count === 2) {
          gridHTML = `<div class="grid grid-cols-2 gap-2.5 aspect-[16/10] sm:aspect-[16/9]">${makeSlot(imageList[0], 0, 'h-full')}${makeSlot(imageList[1], 1, 'h-full')}</div>`;
        } else if (count === 3) {
          gridHTML = `<div class="grid grid-cols-2 grid-rows-2 gap-2.5 h-72 sm:h-[400px]">${makeSlot(imageList[0], 0, 'row-span-2 col-span-1 h-full')}${makeSlot(imageList[1], 1, 'row-span-1 col-span-1 h-full')}${makeSlot(imageList[2], 2, 'row-span-1 col-span-1 h-full')}</div>`;
        } else if (count === 4) {
          gridHTML = `<div class="grid grid-cols-2 grid-rows-2 gap-2.5 h-80 sm:h-[420px]">${makeSlot(imageList[0], 0, 'h-full')}${makeSlot(imageList[1], 1, 'h-full')}${makeSlot(imageList[2], 2, 'h-full')}${makeSlot(imageList[3], 3, 'h-full')}</div>`;
        } else {
          gridHTML = `<div class="grid grid-cols-6 grid-rows-2 gap-2.5 h-84 sm:h-[460px]">
            ${makeSlot(imageList[0], 0, 'col-span-3 row-span-1 h-full')}
            ${makeSlot(imageList[1], 1, 'col-span-3 row-span-1 h-full')}
            ${makeSlot(imageList[2], 2, 'col-span-2 row-span-1 h-full')}
            ${makeSlot(imageList[3], 3, 'col-span-2 row-span-1 h-full')}
            ${makeSlot(imageList[4], 4, 'col-span-2 row-span-1 h-full', count > 5 ? count - 4 : 0)}
          </div>`;
        }
      }

      wrapper.innerHTML = gridHTML;

      // Attach click handlers to open Lightbox
      const slots = wrapper.querySelectorAll<HTMLElement>('.facebook-slot');
      slots.forEach((slot) => {
        const idx = parseInt(slot.getAttribute('data-index') || '0', 10);
        slot.addEventListener('click', () => {
          setLightbox({ images: imageList, activeIndex: idx });
        });
      });
    });

    // 3. Allow clicking individual figure images to open in Lightbox
    const singleFigures = contentRef.current.querySelectorAll<HTMLImageElement>('.tiptap-media-figure img');
    singleFigures.forEach((img) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        setLightbox({ images: [img.src], activeIndex: 0 });
      });
    });
  }, [project.details?.content]);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-background text-foreground transition-colors duration-200"
      style={pageStyle}
    >
      {/* Background Pattern */}
      <BackgroundPattern
        pattern={pattern}
        primaryColor={primaryClr ? `${primaryClr}12` : undefined}
        accentColor={accentClr ? `${accentClr}08` : undefined}
      />

      {/* Top Bar */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 w-full">
        <Link
          href="/#projects"
          className="anim-item inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 w-full">
        {/* Category */}
        {project.category && (
          <div className="anim-item mb-3">
            <span
              className="inline-block font-mono text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur-sm"
              style={accentClr ? { color: accentClr, borderColor: `${accentClr}30` } : {}}
            >
              {project.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className="anim-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4"
          style={headingStyle}
        >
          {project.title}
        </h1>

        {/* Description */}
        <p
          className="anim-item text-base sm:text-lg leading-relaxed max-w-4xl mb-6"
          style={bodyStyle}
        >
          {project.description}
        </p>

        {/* Tags & Demo Link */}
        <div className="anim-item flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-md border px-3 py-1 font-mono text-xs transition-colors ${
                isLightBg
                  ? 'border-zinc-300/80 bg-zinc-100/90 text-zinc-700 hover:border-zinc-400'
                  : 'border-border bg-card/80 text-muted-foreground hover:border-border-subtle hover:text-foreground'
              }`}
            >
              {tag}
            </span>
          ))}

          {/* External link if href is external */}
          {project.href && project.href !== '#' && !project.href.startsWith('/project') && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-brand-neon/30 bg-brand-neon/10 px-3 py-1 font-mono text-xs text-brand-neon hover:bg-brand-neon/20 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Live Demo
            </a>
          )}
        </div>

        {/* Hero Image */}
        <div
          onClick={() => setLightbox({ images: [validImageSrc], activeIndex: 0 })}
          className={`anim-item relative aspect-[21/9] sm:aspect-[2.2/1] w-full max-h-[520px] overflow-hidden rounded-2xl border cursor-zoom-in group ${
            isLightBg ? 'border-zinc-300/80 bg-zinc-100' : 'border-border bg-card'
          }`}
        >
          {!imageError ? (
            <Image
              src={validImageSrc}
              alt={project.imageAlt || project.title}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-zinc-500 text-sm">
              Image unavailable
            </div>
          )}
          <div className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Rich Content Section */}
      {project.details?.content && (
        <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <div
            className="anim-content-item tiptap-content max-w-none w-full"
            style={bodyStyle}
            dangerouslySetInnerHTML={{ __html: project.details.content }}
          />
        </div>
      )}

      {/* Fallback — when no TipTap content exists, just show spacer */}
      {!project.details?.content && (
        <div className="py-8" />
      )}

      {/* Project Navigation */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className={`border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${isLightBg ? 'border-zinc-300' : 'border-zinc-800'}`}>
          {prevProject ? (
            <Link
              href={`/project/${prevProject.id}`}
              className={`group flex items-center gap-3.5 px-4 py-2.5 rounded-lg border transition-all w-full sm:w-auto ${
                isLightBg
                  ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-900'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-600 text-white'
              }`}
            >
              <ArrowLeft className={`w-4 h-4 transition-all group-hover:-translate-x-1 ${isLightBg ? 'text-zinc-600 group-hover:text-zinc-900' : 'text-zinc-400 group-hover:text-white'}`} />
              <div className="text-left">
                <div className={`text-[10px] font-mono uppercase tracking-wider ${isLightBg ? 'text-zinc-500' : 'text-zinc-400'}`}>Previous Project</div>
                <div className={`text-xs font-semibold ${isLightBg ? 'text-zinc-900' : 'text-white'}`}>{prevProject.title}</div>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          <Link
            href="/#projects"
            className={`px-5 py-2.5 rounded-lg border text-xs font-mono font-semibold uppercase tracking-wider transition-all text-center ${
              isLightBg
                ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-900'
                : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-600 text-zinc-200 hover:text-white'
            }`}
          >
            All Projects
          </Link>

          {nextProject ? (
            <Link
              href={`/project/${nextProject.id}`}
              className={`group flex items-center justify-end gap-3.5 px-4 py-2.5 rounded-lg border transition-all w-full sm:w-auto text-right ${
                isLightBg
                  ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-900'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-600 text-white'
              }`}
            >
              <div className="text-right">
                <div className={`text-[10px] font-mono uppercase tracking-wider ${isLightBg ? 'text-zinc-500' : 'text-zinc-400'}`}>Next Project</div>
                <div className={`text-xs font-semibold ${isLightBg ? 'text-zinc-900' : 'text-white'}`}>{nextProject.title}</div>
              </div>
              <ArrowRight className={`w-4 h-4 transition-all group-hover:translate-x-1 ${isLightBg ? 'text-zinc-600 group-hover:text-zinc-900' : 'text-zinc-400 group-hover:text-white'}`} />
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </div>

      {/* Fullscreen Interactive Clean Minimalist Lightbox Modal */}
      {lightbox && (
        <div
          style={{
            backgroundColor: bgColor ? `${bgColor}fa` : 'rgba(9, 13, 11, 0.98)',
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-4 sm:p-6 transition-all"
          onClick={() => setLightbox(null)}
        >
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between text-white w-full max-w-7xl mx-auto z-10 px-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                Photo {lightbox.activeIndex + 1} of {lightbox.images.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              title="Close (Escape)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Photo Stage (Clean, Crisp, No Glow, No Heavy Shadows) */}
          <div
            className="relative flex-1 flex items-center justify-center my-3 w-full max-w-7xl mx-auto overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.images.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightbox((prev) =>
                    prev
                      ? {
                          ...prev,
                          activeIndex:
                            prev.activeIndex === 0
                              ? prev.images.length - 1
                              : prev.activeIndex - 1,
                        }
                      : null
                  )
                }
                className="absolute left-2 sm:left-4 z-20 p-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div className="relative w-full h-full max-h-[78vh] flex items-center justify-center">
              <img
                src={lightbox.images[lightbox.activeIndex]}
                alt={`Photo ${lightbox.activeIndex + 1}`}
                className="w-full h-full max-h-[78vh] max-w-full object-contain rounded-lg border border-zinc-800/80 select-none"
              />
            </div>

            {lightbox.images.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightbox((prev) =>
                    prev
                      ? {
                          ...prev,
                          activeIndex:
                            prev.activeIndex === prev.images.length - 1
                              ? 0
                              : prev.activeIndex + 1,
                        }
                      : null
                  )
                }
                className="absolute right-2 sm:right-4 z-20 p-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip (Clean Flat Crisp Borders) */}
          {lightbox.images.length > 1 && (
            <div
              className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 max-w-4xl mx-auto w-full z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.images.map((url, idx) => {
                const isActive = idx === lightbox.activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setLightbox((prev) => (prev ? { ...prev, activeIndex: idx } : null))
                    }
                    className={`relative shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-colors cursor-pointer bg-zinc-900 ${
                      isActive ? 'border-white opacity-100' : 'border-zinc-800 opacity-40 hover:opacity-80'
                    }`}
                  >
                    <img src={url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
