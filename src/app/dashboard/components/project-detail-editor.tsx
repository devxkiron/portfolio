'use client';

import React, { useState } from 'react';
import {
  FileText,
  Palette,
  Type as TypeIcon,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import type { ProjectItem, ProjectDetails, ProjectDetailDesign } from '@/app/_components/projects/types';
import { TiptapEditor } from './tiptap-editor';
import { ALL_PATTERN_KEYS, getPatternLabel, type BackgroundPatternKey } from '@/app/project/[id]/background-patterns';

interface ProjectDetailEditorProps {
  project: ProjectItem;
  onUpdate: (details: ProjectDetails) => void;
}

const ANIMATION_OPTIONS: { value: ProjectDetailDesign['animation']; label: string }[] = [
  { value: 'fade-up', label: 'Fade Up' },
  { value: 'slide-in', label: 'Slide In' },
  { value: 'scale-up', label: 'Scale Up' },
  { value: 'stagger', label: 'Stagger Reveal' },
  { value: 'none', label: 'No Animation' },
];

const FONT_OPTIONS = [
  { value: '', label: 'Default (Inherit Theme)' },
  { value: 'clash', label: 'Clash Display' },
  { value: 'cabinet', label: 'Cabinet Grotesk' },
  { value: 'satoshi', label: 'Satoshi' },
  { value: 'syne', label: 'Syne' },
  { value: 'hatton', label: 'Hatton' },
  { value: 'elegtro', label: 'Elegtro' },
  { value: 'origin-tech', label: 'Origin Tech' },
  { value: 'avtech', label: 'Avtech' },
  { value: 'motech', label: 'Motech' },
  { value: 'jetbrains', label: 'JetBrains Mono' },
  { value: 'jakarta', label: 'Plus Jakarta Sans' },
  { value: 'geist-sans', label: 'Geist Sans' },
  { value: 'geist-mono', label: 'Geist Mono' },
];

export function ProjectDetailEditor({ project, onUpdate }: ProjectDetailEditorProps) {
  const currentDetails = project.details || { content: '', design: {} };
  const [content, setContent] = useState(currentDetails.content || '');
  const [design, setDesign] = useState<ProjectDetailDesign>(currentDetails.design || {});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    editor: true,
    design: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateDesign = (partial: Partial<ProjectDetailDesign>) => {
    const updated = { ...design, ...partial };
    setDesign(updated);
    onUpdate({ content, design: updated });
  };

  const handleContentChange = (html: string) => {
    setContent(html);
    onUpdate({ content: html, design });
  };

  const SectionToggle: React.FC<{
    label: string;
    sectionKey: string;
    icon: React.ReactNode;
  }> = ({ label, sectionKey, icon }) => (
    <button
      type="button"
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
    >
      <span className="flex items-center gap-2 text-xs font-medium text-zinc-200">
        {icon}
        {label}
      </span>
      {expandedSections[sectionKey] ? (
        <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
      ) : (
        <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
      )}
    </button>
  );

  return (
    <div className="space-y-4 mt-4 pt-4 border-t border-zinc-800/60">
      {/* Page Preview Link */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#aeff00]" />
          Project Detail Page & Design
        </span>
        <a
          href={`/project/${project.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 underline transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Preview Page
        </a>
      </div>

      {/* ── Content Editor ── */}
      <SectionToggle
        label="Rich Content Editor (TipTap)"
        sectionKey="editor"
        icon={<FileText className="w-3.5 h-3.5 text-[#aeff00]" />}
      />
      {expandedSections.editor && (
        <div className="space-y-2">
          <p className="text-[10px] text-zinc-500">
            Write the project case study. Use the toolbar for formatting, images, code blocks, etc.
          </p>
          <TiptapEditor
            content={content}
            onChange={handleContentChange}
            placeholder="Write your project case study, technical details, challenges solved..."
            design={design}
          />
        </div>
      )}

      {/* ── Design Customization ── */}
      <SectionToggle
        label="Page Design & Customization"
        sectionKey="design"
        icon={<Palette className="w-3.5 h-3.5 text-[#aeff00]" />}
      />
      {expandedSections.design && (
        <div className="space-y-5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
          {/* Background */}
          <div className="space-y-3">
            <span className="text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#aeff00]" />
              Background
            </span>

            <div className="grid grid-cols-2 gap-3">
              {/* Background Color */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Page Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.backgroundColor || '#09090b'}
                    onChange={(e) => updateDesign({ backgroundColor: e.target.value })}
                    className="w-8 h-8 rounded-md border border-zinc-700 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={design.backgroundColor || ''}
                    onChange={(e) => updateDesign({ backgroundColor: e.target.value })}
                    placeholder="#09090b"
                    className="flex-1 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-100 font-mono focus:outline-none focus:border-[#aeff00]"
                  />
                </div>
              </div>

              {/* SVG Pattern */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Background Pattern</label>
                <select
                  value={design.backgroundPattern || 'none'}
                  onChange={(e) => updateDesign({ backgroundPattern: e.target.value as BackgroundPatternKey })}
                  className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-100 focus:outline-none focus:border-[#aeff00] cursor-pointer"
                >
                  {ALL_PATTERN_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {getPatternLabel(key)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <span className="text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#aeff00]" />
              Colors
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Primary / Heading Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.primaryColor || '#ffffff'}
                    onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                    className="w-8 h-8 rounded-md border border-zinc-700 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={design.primaryColor || ''}
                    onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                    placeholder="Default"
                    className="flex-1 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-100 font-mono focus:outline-none focus:border-[#aeff00]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.accentColor || '#aeff00'}
                    onChange={(e) => updateDesign({ accentColor: e.target.value })}
                    className="w-8 h-8 rounded-md border border-zinc-700 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={design.accentColor || ''}
                    onChange={(e) => updateDesign({ accentColor: e.target.value })}
                    placeholder="Default"
                    className="flex-1 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-100 font-mono focus:outline-none focus:border-[#aeff00]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3">
            <span className="text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">
              <TypeIcon className="w-3.5 h-3.5 text-[#aeff00]" />
              Typography
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Heading Font</label>
                <select
                  value={design.headingFont || ''}
                  onChange={(e) => updateDesign({ headingFont: e.target.value })}
                  className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-100 focus:outline-none focus:border-[#aeff00] cursor-pointer"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Body Font</label>
                <select
                  value={design.bodyFont || ''}
                  onChange={(e) => updateDesign({ bodyFont: e.target.value })}
                  className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-100 focus:outline-none focus:border-[#aeff00] cursor-pointer"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Animation */}
          <div className="space-y-3">
            <span className="text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#aeff00]" />
              Entry Animation
            </span>

            <div className="flex flex-wrap gap-1.5">
              {ANIMATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateDesign({ animation: opt.value })}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-lg border transition-all cursor-pointer ${
                    (design.animation || 'fade-up') === opt.value
                      ? 'border-[#aeff00]/60 bg-[#aeff00]/10 text-[#aeff00]'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
