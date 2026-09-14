'use client';

import React, { useState } from 'react';
import { ClientStory } from '@/app/_components/client-stories/types';
import {
  Plus,
  Trash2,
  Edit3,
  Check,
  MessageSquareQuote,
  Star,
  Globe2,
  Building2,
  User,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ClientStoriesTabProps {
  stories?: ClientStory[];
  onChange: (stories: ClientStory[]) => void;
}

export function ClientStoriesTab({
  stories = [],
  onChange,
}: ClientStoriesTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleUpdateField = (id: string, field: keyof ClientStory, value: any) => {
    const updated = stories.map((s) => {
      if (s.id === id) {
        return { ...s, [field]: value };
      }
      return s;
    });
    onChange(updated);
  };

  const handleAddStory = () => {
    const newId = `story-${Date.now()}`;
    const newStory: ClientStory = {
      id: newId,
      cityId: `city-${Date.now()}`,
      cityName: 'New City',
      country: 'Global',
      flag: '🌐',
      lat: 25.2048,
      lon: 55.2708,
      company: 'High-Growth Tech',
      rating: 5.0,
      isVerified: true,
      metricBadge: '+50% Velocity',
      quote:
        '"The engineering excellence and autonomous workflow implementation fundamentally scaled our operations."',
      authorName: 'Alex Mercer',
      authorRole: 'Chief Technology Officer',
      authorAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    };

    const updated = [...stories, newStory];
    onChange(updated);
    setEditingId(newStory.id);
    toast.success('New Client Story Added', {
      description: 'Fill in details and click Save Changes (⌘S) to persist.',
    });
  };

  const handleDeleteStory = (id: string) => {
    if (!window.confirm('Delete this client story?')) return;
    const filtered = stories.filter((s) => s.id !== id);
    onChange(filtered);
    if (editingId === id) setEditingId(null);
    toast.info('Client Story Removed', {
      description: 'Remember to save changes to update database.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <MessageSquareQuote className="w-4 h-4 text-[#aeff00]" />
            Client Stories & Testimonials
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Manage client reviews, ROI metrics, enterprise quotes, and interactive 3D globe coordinates.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddStory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#aeff00] hover:bg-[#b8ff1a] text-black text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Client Story</span>
        </button>
      </div>

      {/* Stories List */}
      {stories.length === 0 ? (
        <div className="py-16 text-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40">
          <p className="text-xs text-zinc-500 mb-3">No client stories currently configured.</p>
          <button
            type="button"
            onClick={handleAddStory}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 text-xs hover:bg-zinc-700 transition-colors"
          >
            Create your first client story
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => {
            const isEditing = editingId === story.id;

            return (
              <div
                key={story.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isEditing
                    ? 'border-[#aeff00]/60 bg-zinc-900/90 shadow-[0_0_25px_rgba(174,255,0,0.06)]'
                    : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
                }`}
              >
                {/* Story Preview Row */}
                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    {story.authorAvatar ? (
                      <img
                        src={story.authorAvatar}
                        alt={story.authorName}
                        className="w-10 h-10 rounded-full object-cover border border-zinc-800 shrink-0 bg-zinc-900"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                          {story.authorName || 'Anonymous Client'}
                        </h4>
                        <span className="text-[11px] text-zinc-400 truncate hidden sm:inline">
                          — {story.authorRole} at {story.company}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                          {story.flag} {story.cityName}
                        </span>
                        {story.metricBadge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#aeff00]/10 text-[#aeff00] border border-[#aeff00]/20 font-semibold">
                            {story.metricBadge}
                          </span>
                        )}
                        <span className="flex items-center gap-0.5 text-[10px] text-amber-400 font-mono">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {story.rating?.toFixed(1) || '5.0'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingId(isEditing ? null : story.id)}
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
                      onClick={() => handleDeleteStory(story.id)}
                      className="p-1.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors"
                      title="Delete story"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline Edit Form */}
                {isEditing && (
                  <div className="p-4 sm:p-5 border-t border-zinc-800/80 bg-zinc-950/80 space-y-4">
                    {/* Row 1: Author & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={story.authorName}
                          onChange={(e) => handleUpdateField(story.id, 'authorName', e.target.value)}
                          placeholder="e.g. Andrew Heath"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Author Role
                        </label>
                        <input
                          type="text"
                          value={story.authorRole}
                          onChange={(e) => handleUpdateField(story.id, 'authorRole', e.target.value)}
                          placeholder="e.g. Founder & CEO"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={story.company}
                          onChange={(e) => handleUpdateField(story.id, 'company', e.target.value)}
                          placeholder="e.g. SizzleKick"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>
                    </div>

                    {/* Row 2: Metric Badge & Rating */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          ROI / Metric Badge
                        </label>
                        <input
                          type="text"
                          value={story.metricBadge}
                          onChange={(e) => handleUpdateField(story.id, 'metricBadge', e.target.value)}
                          placeholder="e.g. +64% ROAS or 3.4x Velocity"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Rating (1.0 to 5.0)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={story.rating}
                          onChange={(e) =>
                            handleUpdateField(story.id, 'rating', parseFloat(e.target.value) || 5.0)
                          }
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>
                    </div>

                    {/* Row 3: Location Details & Coordinates for Globe */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div className="space-y-1 col-span-2 sm:col-span-2">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          City Name
                        </label>
                        <input
                          type="text"
                          value={story.cityName}
                          onChange={(e) => {
                            handleUpdateField(story.id, 'cityName', e.target.value);
                            handleUpdateField(story.id, 'cityId', e.target.value.toLowerCase().replace(/\s+/g, '-'));
                          }}
                          placeholder="San Francisco"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Country & Flag
                        </label>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={story.flag}
                            onChange={(e) => handleUpdateField(story.id, 'flag', e.target.value)}
                            placeholder="🇺🇸"
                            className="w-10 px-1.5 py-1.5 text-center bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={story.country}
                            onChange={(e) => handleUpdateField(story.id, 'country', e.target.value)}
                            placeholder="USA"
                            className="w-full px-2 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Globe Latitude
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={story.lat}
                          onChange={(e) =>
                            handleUpdateField(story.id, 'lat', parseFloat(e.target.value) || 0)
                          }
                          placeholder="37.7749"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-300 block">
                          Globe Longitude
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={story.lon}
                          onChange={(e) =>
                            handleUpdateField(story.id, 'lon', parseFloat(e.target.value) || 0)
                          }
                          placeholder="-122.4194"
                          className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                        />
                      </div>
                    </div>

                    {/* Row 4: Avatar URL */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-zinc-300 block">
                        Author Avatar URL
                      </label>
                      <input
                        type="text"
                        value={story.authorAvatar}
                        onChange={(e) => handleUpdateField(story.id, 'authorAvatar', e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00]"
                      />
                    </div>

                    {/* Row 5: Testimonial Quote */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-zinc-300 block">
                        Testimonial Quote
                      </label>
                      <textarea
                        rows={3}
                        value={story.quote}
                        onChange={(e) => handleUpdateField(story.id, 'quote', e.target.value)}
                        placeholder="Detailed client endorsement and results achieved..."
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-[#aeff00] leading-relaxed"
                      />
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
