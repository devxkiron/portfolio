'use client';

import React, { useState } from 'react';
import { ProjectItem } from '@/app/_components/projects/types';
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
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ProjectsTabProps {
  projects?: ProjectItem[];
  onChange: (projects: ProjectItem[]) => void;
}

export function ProjectsTab({ projects = [], onChange }: ProjectsTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleUpdateField = (id: string, field: keyof ProjectItem, value: any) => {
    const updated = projects.map((p) => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    onChange(updated);
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
      title: 'New AI Automation System',
      category: 'ENTERPRISE AI',
      description:
        'High-impact automated digital infrastructure engineering resilient workflows and multi-system synchronization.',
      tags: ['Next.js 16', 'TypeScript', 'FastAPI'],
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'Project preview visual',
      href: '#',
    };

    const updated = [...projects, newProject];
    onChange(updated);
    setEditingId(newProject.id);
    toast.success('New Project Added', {
      description: 'Fill in details and click Save Changes (⌘S) to persist.',
    });
  };

  const handleDeleteProject = (id: string) => {
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

  const handleMove = (index: number, direction: 'up' | 'down') => {
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
      {/* Tab Header */}
      <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[#aeff00]" />
            Projects CMS
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Manage portfolio case studies, tech stacks, live links, and showcase imagery.
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

            return (
              <div
                key={project.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isEditing
                    ? 'border-[#aeff00]/60 bg-zinc-900/90 shadow-[0_0_25px_rgba(174,255,0,0.06)]'
                    : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
                }`}
              >
                {/* Project Header Bar */}
                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Index Pill */}
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-[#aeff00] font-bold border border-zinc-700 shrink-0">
                      {project.index || String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Mini Thumbnail */}
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-10 h-10 rounded-lg object-cover border border-zinc-800 shrink-0 bg-zinc-900"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                          {project.title || 'Untitled Project'}
                        </h4>
                        {project.category && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase tracking-wider shrink-0 hidden sm:inline-block">
                            {project.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
                        {(project.tags || []).slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-zinc-400 font-mono bg-zinc-900/90 px-1.5 py-0.2 rounded border border-zinc-800 shrink-0"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === projects.length - 1}
                      className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(isEditing ? null : project.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-colors ${
                        isEditing
                          ? 'bg-[#aeff00] text-black font-semibold'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                      <span>{isEditing ? 'Done' : 'Edit'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline Edit Form */}
                {isEditing && (
                  <div className="p-4 sm:p-5 border-t border-zinc-800/80 bg-zinc-950/80 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Project Title */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleUpdateField(project.id, 'title', e.target.value)}
                          placeholder="e.g. Autopilot Pipeline Engine"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Category Badge
                        </label>
                        <input
                          type="text"
                          value={project.category || ''}
                          onChange={(e) => handleUpdateField(project.id, 'category', e.target.value)}
                          placeholder="e.g. AI AUTOMATION / FINTECH SAAS"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-medium text-zinc-300 block">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={project.description}
                        onChange={(e) => handleUpdateField(project.id, 'description', e.target.value)}
                        placeholder="Detailed overview of what was engineered, automated, and delivered..."
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#aeff00] leading-relaxed"
                      />
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-medium text-zinc-300 flex items-center justify-between">
                        <span>Tech Stack Tags (Comma separated)</span>
                        <span className="text-[10px] text-zinc-500 font-mono">e.g. Next.js 16, FastAPI, PyTorch</span>
                      </label>
                      <input
                        type="text"
                        value={(project.tags || []).join(', ')}
                        onChange={(e) => handleUpdateTags(project.id, e.target.value)}
                        placeholder="Next.js, Python, OpenAI, Vector DB"
                        className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#aeff00]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Image URL */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Preview Image URL
                        </label>
                        <input
                          type="text"
                          value={project.imageUrl}
                          onChange={(e) => handleUpdateField(project.id, 'imageUrl', e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>

                      {/* Project Link */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Demo / Case Study Link
                        </label>
                        <input
                          type="text"
                          value={project.href || ''}
                          onChange={(e) => handleUpdateField(project.id, 'href', e.target.value)}
                          placeholder="https://... or #"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>
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
