'use client';

import React, { useState } from 'react';
import { ProjectItem, ProjectDetailDesign, ProjectDetails } from '@/app/_components/projects/types';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit3,
  ExternalLink,
  Check,
  FolderGit2,
  Image as ImageIcon,
  Tag,
  Palette,
  FileText,
  Sparkles,
  Layers,
  Globe,
  Eye,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { ImageUpload } from './image-upload';
import { TiptapEditor } from './tiptap-editor';
import {
  ALL_PATTERN_KEYS,
  getPatternLabel,
} from '@/app/project/[id]/background-patterns';

interface ProjectsTabProps {
  projects?: ProjectItem[];
  onChange: (projects: ProjectItem[]) => void;
  onSave?: (updatedProjects: ProjectItem[]) => Promise<void>;
  isSaving?: boolean;
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

const BG_COLOR_PRESETS = [
  '#09090b',
  '#000000',
  '#ffffff',
  '#fdfcf8',
  '#f8f9fa',
  '#0f172a',
  '#022c22',
  '#18181b',
];

const HEADING_COLOR_PRESETS = [
  '#ffffff',
  '#0d1310',
  '#111827',
  '#fdfcf8',
  '#aeff00',
  '#10b981',
  '#38bdf8',
  '#f59e0b',
];

const TEXT_COLOR_PRESETS = [
  '#d4d4d8',
  '#374151',
  '#111827',
  '#4b5563',
  '#f4f4f5',
  '#9ca3af',
  '#6b7280',
  '#e4e4e7',
];

const ACCENT_COLOR_PRESETS = [
  '#aeff00',
  '#10b981',
  '#168028',
  '#06b6d4',
  '#6366f1',
  '#ec4899',
  '#f59e0b',
  '#ef4444',
];

export function ProjectsTab({
  projects = [],
  onChange,
}: ProjectsTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedDesignId, setExpandedDesignId] = useState<string | null>(null);

  const handleUpdateField = (id: string, field: keyof ProjectItem, value: any) => {
    const updated = projects.map((p) => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    onChange(updated);
  };

  const handleUpdateDetails = (id: string, partialDetails: Partial<ProjectDetails>) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    const existingDetails: ProjectDetails = project.details || { content: '', design: {} };
    const updatedDetails: ProjectDetails = {
      ...existingDetails,
      ...partialDetails,
      design: {
        ...(existingDetails.design || {}),
        ...(partialDetails.design || {}),
      },
    };

    handleUpdateField(id, 'details', updatedDetails);
  };

  const handleUpdateTags = (id: string, tagsString: string) => {
    const tags = tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    handleUpdateField(id, 'tags', tags);
  };

  const handleAddProject = () => {
    const newIndex = String(projects.length + 1).padStart(2, '0');
    const newProject: ProjectItem = {
      id: `project-${Date.now()}`,
      index: newIndex,
      title: 'New Showcase Project',
      category: 'ENTERPRISE AI',
      description:
        'High-impact modern digital product engineered with cutting-edge architecture and responsive design.',
      tags: ['Next.js 16', 'TypeScript', 'TailwindCSS'],
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'Project preview visual',
      href: '#',
      details: {
        content: `<h2>Project Overview</h2><p>Describe your project motivation, goals, and technical architectural highlights here.</p>`,
        design: {
          backgroundColor: '#09090b',
          backgroundPattern: 'grid',
          primaryColor: '',
          textColor: '',
          accentColor: '#aeff00',
          animation: 'fade-up',
        },
      },
    };

    const updated = [newProject, ...projects].map((p, idx) => ({
      ...p,
      index: String(idx + 1).padStart(2, '0'),
    }));

    onChange(updated);
    setEditingId(newProject.id);
    toast.success('New Project Added', {
      description: 'Fill in details and click Save Changes (⌘S) to persist to DB.',
    });
  };

  const handleDeleteProject = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const filtered = projects.filter((p) => p.id !== id);
    const reIndexed = filtered.map((p, idx) => ({
      ...p,
      index: String(idx + 1).padStart(2, '0'),
    }));
    onChange(reIndexed);
    if (editingId === id) setEditingId(null);
    toast.info('Project Deleted', {
      description: 'Remember to save changes to update database.',
    });
  };

  const handleMove = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const copy = [...projects];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);

    const reIndexed = copy.map((p, idx) => ({
      ...p,
      index: String(idx + 1).padStart(2, '0'),
    }));
    onChange(reIndexed);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[#aeff00]" />
            Projects Showcase ({projects.length})
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Configure featured projects, Cloudinary media, TipTap case studies, and custom page themes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#aeff00] hover:bg-[#b8ff1a] text-black text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="py-16 text-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40">
          <p className="text-xs text-zinc-500 mb-3">No projects currently configured.</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 text-xs hover:bg-zinc-700 transition-colors"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => {
            const isEditing = editingId === project.id;
            const hasCaseStudy = !!project.details?.content;
            const isDesignExpanded = expandedDesignId === project.id;

            return (
              <div
                key={project.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isEditing
                    ? 'border-[#aeff00]/60 bg-zinc-900/90 shadow-[0_0_25px_rgba(174,255,0,0.06)]'
                    : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
                }`}
              >
                {/* Project Header Row */}
                <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Image Thumbnail */}
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-16 h-10 rounded-lg object-cover border border-zinc-800 shrink-0 bg-zinc-900"
                      />
                    ) : (
                      <div className="w-16 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 text-[10px] font-mono shrink-0">
                        No IMG
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#aeff00]">
                          #{project.index}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                          {project.title || 'Untitled Project'}
                        </h4>
                        {project.category && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[11px] text-zinc-400 truncate max-w-sm sm:max-w-md">
                          {project.description}
                        </p>
                        {hasCaseStudy && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#aeff00] px-1.5 py-0.2 rounded bg-[#aeff00]/10 border border-[#aeff00]/20">
                            <Sparkles className="w-2.5 h-2.5" />
                            Case Study
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {/* Reorder Up/Down */}
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={(e) => handleMove(index, 'up', e)}
                      title="Move Up"
                      className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === projects.length - 1}
                      onClick={(e) => handleMove(index, 'down', e)}
                      title="Move Down"
                      className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`/project/${project.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                      title="Preview Page"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setEditingId(isEditing ? null : project.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                        isEditing
                          ? 'bg-[#aeff00] text-black font-semibold'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                      <span>{isEditing ? 'Close' : 'Edit'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="p-1.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline Edit Form */}
                {isEditing && (
                  <div className="p-4 sm:p-6 border-t border-zinc-800/80 bg-zinc-950/90 space-y-6">
                    {/* Row 1: Title, Category, Link */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Project Title <span className="text-[#aeff00]">*</span>
                        </label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleUpdateField(project.id, 'title', e.target.value)}
                          placeholder="e.g. AI Autonomous Architecture"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Category
                        </label>
                        <input
                          type="text"
                          value={project.category || ''}
                          onChange={(e) => handleUpdateField(project.id, 'category', e.target.value)}
                          placeholder="e.g. ENTERPRISE AI"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block flex items-center gap-1">
                          <Globe className="w-3 h-3 text-[#aeff00]" />
                          Live Demo URL
                        </label>
                        <input
                          type="text"
                          value={project.href || ''}
                          onChange={(e) => handleUpdateField(project.id, 'href', e.target.value)}
                          placeholder="https://... or #"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 font-mono text-[11px] focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>
                    </div>

                    {/* Row 2: Description & Tags */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Short Description (for cards)
                        </label>
                        <textarea
                          rows={2}
                          value={project.description}
                          onChange={(e) =>
                            handleUpdateField(project.id, 'description', e.target.value)
                          }
                          placeholder="1-2 sentences summarizing the project..."
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00] resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#aeff00]" />
                          Technology Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={project.tags.join(', ')}
                          onChange={(e) => handleUpdateTags(project.id, e.target.value)}
                          placeholder="Next.js 16, TypeScript, TailwindCSS"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 font-mono text-[11px] focus:outline-none focus:border-[#aeff00]"
                        />
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {project.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300 border border-zinc-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Primary Showcase Image Upload (Cloudinary) */}
                    <div className="pt-2 border-t border-zinc-800/60">
                      <ImageUpload
                        value={project.imageUrl}
                        onChange={(url) => handleUpdateField(project.id, 'imageUrl', url)}
                        folder="portfolio/projects"
                        label="Primary Project Image"
                        placeholder="https://res.cloudinary.com/..."
                        aspectRatio="video"
                      />
                    </div>

                    {/* Row 4: Notion-style TipTap Rich Case Study Editor */}
                    <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#aeff00]" />
                          Full Case Study (TipTap Notion-Style)
                        </label>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          Drag & drop or Paste Ctrl+V images anywhere
                        </span>
                      </div>

                      <TiptapEditor
                        content={project.details?.content || ''}
                        onChange={(html) => handleUpdateDetails(project.id, { content: html })}
                        design={project.details?.design}
                        minHeight="min-h-[320px]"
                      />
                    </div>

                    {/* Row 5: Page Design & Visuals (Collapsible Section) */}
                    <div className="pt-2 border-t border-zinc-800/60 space-y-3">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedDesignId(isDesignExpanded ? null : project.id)
                        }
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer text-left"
                      >
                        <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                          <Palette className="w-4 h-4 text-[#aeff00]" />
                          Page Visuals, Background Pattern & Typography
                        </span>
                        {isDesignExpanded ? (
                          <ChevronUp className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>

                      {isDesignExpanded && (
                        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-4">
                          {/* Color Palette Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 1. Background Color */}
                            <div className="space-y-1.5 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                              <label className="text-[11px] font-medium text-zinc-300 flex items-center justify-between">
                                <span>Page Background Color</span>
                                <span className="text-[10px] text-zinc-500 font-mono">
                                  {project.details?.design?.backgroundColor || '#09090b'}
                                </span>
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={project.details?.design?.backgroundColor || '#09090b'}
                                  onChange={(e) =>
                                    handleUpdateDetails(project.id, {
                                      design: { backgroundColor: e.target.value },
                                    })
                                  }
                                  className="w-8 h-8 rounded-lg border border-zinc-700 cursor-pointer bg-transparent p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  placeholder="#09090b"
                                  value={project.details?.design?.backgroundColor || ''}
                                  onChange={(e) =>
                                    handleUpdateDetails(project.id, {
                                      design: { backgroundColor: e.target.value },
                                    })
                                  }
                                  className="w-24 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100"
                                />
                                <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                                  {BG_COLOR_PRESETS.map((c) => (
                                    <button
                                      key={c}
                                      type="button"
                                      title={c}
                                      onClick={() =>
                                        handleUpdateDetails(project.id, {
                                          design: { backgroundColor: c },
                                        })
                                      }
                                      style={{ backgroundColor: c }}
                                      className="w-4 h-4 rounded border border-zinc-700 hover:scale-125 transition-transform cursor-pointer shrink-0"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* 2. Title & Heading Color */}
                            <div className="space-y-1.5 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                              <label className="text-[11px] font-medium text-zinc-300 flex items-center justify-between">
                                <span>Title & Heading Color</span>
                                <span className="text-[10px] text-zinc-500 font-mono">
                                  {project.details?.design?.primaryColor || 'Auto contrast'}
                                </span>
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={project.details?.design?.primaryColor || '#ffffff'}
                                  onChange={(e) =>
                                    handleUpdateDetails(project.id, {
                                      design: { primaryColor: e.target.value },
                                    })
                                  }
                                  className="w-8 h-8 rounded-lg border border-zinc-700 cursor-pointer bg-transparent p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  placeholder="Default"
                                  value={project.details?.design?.primaryColor || ''}
                                  onChange={(e) =>
                                    handleUpdateDetails(project.id, {
                                      design: { primaryColor: e.target.value },
                                    })
                                  }
                                  className="w-24 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100"
                                />
                                <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                                  {HEADING_COLOR_PRESETS.map((c) => (
                                    <button
                                      key={c}
                                      type="button"
                                      title={c}
                                      onClick={() =>
                                        handleUpdateDetails(project.id, {
                                          design: { primaryColor: c },
                                        })
                                      }
                                      style={{ backgroundColor: c }}
                                      className="w-4 h-4 rounded border border-zinc-700 hover:scale-125 transition-transform cursor-pointer shrink-0"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* 3. Description & Body Text Color */}
                            <div className="space-y-1.5 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                              <label className="text-[11px] font-medium text-zinc-300 flex items-center justify-between">
                                <span>Description & Body Text Color</span>
                                <span className="text-[10px] text-zinc-500 font-mono">
                                  {project.details?.design?.textColor || 'Auto contrast'}
                                </span>
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={project.details?.design?.textColor || '#d4d4d8'}
                                  onChange={(e) =>
                                    handleUpdateDetails(project.id, {
                                      design: { textColor: e.target.value },
                                    })
                                  }
                                  className="w-8 h-8 rounded-lg border border-zinc-700 cursor-pointer bg-transparent p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  placeholder="Default"
                                  value={project.details?.design?.textColor || ''}
                                  onChange={(e) =>
                                    handleUpdateDetails(project.id, {
                                      design: { textColor: e.target.value },
                                    })
                                  }
                                  className="w-24 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100"
                                />
                                <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                                  {TEXT_COLOR_PRESETS.map((c) => (
                                    <button
                                      key={c}
                                      type="button"
                                      title={c}
                                      onClick={() =>
                                        handleUpdateDetails(project.id, {
                                          design: { textColor: c },
                                        })
                                      }
                                      style={{ backgroundColor: c }}
                                      className="w-4 h-4 rounded border border-zinc-700 hover:scale-125 transition-transform cursor-pointer shrink-0"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* 4. Category & Accent Color */}
                            <div className="space-y-1.5 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                              <label className="text-[11px] font-medium text-zinc-300 flex items-center justify-between">
                                <span>Category & Accent Highlights Color</span>
                                <span className="text-[10px] text-zinc-500 font-mono">
                                  {project.details?.design?.accentColor || '#aeff00'}
                                </span>
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={project.details?.design?.accentColor || '#aeff00'}
                                  onChange={(e) =>
                                    handleUpdateDetails(project.id, {
                                      design: { accentColor: e.target.value },
                                    })
                                  }
                                  className="w-8 h-8 rounded-lg border border-zinc-700 cursor-pointer bg-transparent p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  placeholder="#aeff00"
                                  value={project.details?.design?.accentColor || ''}
                                  onChange={(e) =>
                                    handleUpdateDetails(project.id, {
                                      design: { accentColor: e.target.value },
                                    })
                                  }
                                  className="w-24 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100"
                                />
                                <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                                  {ACCENT_COLOR_PRESETS.map((c) => (
                                    <button
                                      key={c}
                                      type="button"
                                      title={c}
                                      onClick={() =>
                                        handleUpdateDetails(project.id, {
                                          design: { accentColor: c },
                                        })
                                      }
                                      style={{ backgroundColor: c }}
                                      className="w-4 h-4 rounded border border-zinc-700 hover:scale-125 transition-transform cursor-pointer shrink-0"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* SVG Pattern */}
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-medium text-zinc-300 block">
                              Background SVG Pattern
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {ALL_PATTERN_KEYS.map((key) => {
                                const isSelected =
                                  (project.details?.design?.backgroundPattern || 'none') === key;
                                return (
                                  <button
                                    key={key}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateDetails(project.id, {
                                        design: { backgroundPattern: key },
                                      })
                                    }
                                    className={`px-3 py-1.5 rounded-lg border text-xs text-left transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'border-[#aeff00] bg-[#aeff00]/10 text-zinc-100 font-medium'
                                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                                    }`}
                                  >
                                    {getPatternLabel(key)}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Typography */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800/60">
                            <div className="space-y-1">
                              <label className="text-[11px] font-medium text-zinc-300 block">
                                Heading Typography
                              </label>
                              <select
                                value={project.details?.design?.headingFont || ''}
                                onChange={(e) =>
                                  handleUpdateDetails(project.id, {
                                    design: { headingFont: e.target.value },
                                  })
                                }
                                className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-[#aeff00]"
                              >
                                {FONT_OPTIONS.map((f) => (
                                  <option key={f.value} value={f.value}>
                                    {f.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-medium text-zinc-300 block">
                                Body Typography
                              </label>
                              <select
                                value={project.details?.design?.bodyFont || ''}
                                onChange={(e) =>
                                  handleUpdateDetails(project.id, {
                                    design: { bodyFont: e.target.value },
                                  })
                                }
                                className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-[#aeff00]"
                              >
                                {FONT_OPTIONS.map((f) => (
                                  <option key={f.value} value={f.value}>
                                    {f.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Animation */}
                          <div className="space-y-1.5 pt-2 border-t border-zinc-800/60">
                            <label className="text-[11px] font-medium text-zinc-300 block">
                              Entrance Animation
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {ANIMATION_OPTIONS.map((anim) => {
                                const isSelected =
                                  (project.details?.design?.animation || 'fade-up') === anim.value;
                                return (
                                  <button
                                    key={anim.value}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateDetails(project.id, {
                                        design: { animation: anim.value },
                                      })
                                    }
                                    className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#aeff00] text-black font-semibold'
                                        : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                                    }`}
                                  >
                                    {anim.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
