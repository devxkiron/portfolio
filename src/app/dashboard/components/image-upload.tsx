'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  X,
  CheckCircle2,
  ExternalLink,
  Link as LinkIcon,
  AlertCircle,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  placeholder?: string;
  helpText?: string;
  aspectRatio?: 'video' | 'square' | 'auto';
}

export function ImageUpload({
  value,
  onChange,
  folder = 'portfolio/projects',
  label = 'Project Preview Image',
  placeholder = 'https://images.unsplash.com/... or upload a file',
  helpText = 'Upload high-res PNG, JPG, WEBP, or SVG. Automatically hosted & optimized via Cloudinary.',
  aspectRatio = 'video',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(!value || !value.includes('cloudinary.com'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Check size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Image file size must be less than 10MB.',
      });
      return;
    }

    // Check type
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type', {
        description: 'Please upload a valid image file (PNG, JPG, WEBP, SVG, GIF).',
      });
      return;
    }

    setIsUploading(true);
    const uploadToastId = toast.loading('Uploading to Cloudinary...', {
      description: file.name,
    });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to upload image.');
      }

      const uploadedUrl = json.data.url;
      onChange(uploadedUrl);
      toast.success('Image Uploaded Successfully!', {
        id: uploadToastId,
        description: 'Image is now hosted on Cloudinary and ready to save.',
      });
    } catch (err: any) {
      console.error('Image upload failed:', err);
      toast.error('Upload Failed', {
        id: uploadToastId,
        description:
          err.message ||
          'Could not upload image. Please verify your Cloudinary credentials in .env.',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const isCloudinary = value?.includes('res.cloudinary.com') || value?.includes('cloudinary');

  return (
    <div className="space-y-2.5">
      {/* Label & Switch */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#aeff00]" />
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 underline transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? 'Hide URL field' : 'Edit direct URL'}
        </button>
      </div>

      {/* Main Upload Dropzone + Preview Container */}
      <div className="space-y-3">
        {/* If an image exists, show Preview */}
        {value ? (
          <div className="relative group rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5 transition-all hover:border-zinc-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Image Preview Thumbnail */}
              <div
                className={`relative rounded-md overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0 ${
                  aspectRatio === 'video'
                    ? 'w-24 h-16 sm:w-28 sm:h-18'
                    : aspectRatio === 'square'
                    ? 'w-16 h-16'
                    : 'w-20 h-16'
                }`}
              >
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.3';
                  }}
                />
              </div>

              {/* Image Details / Status */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-200 truncate">
                    {value.split('/').pop() || 'Image'}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono truncate mt-0.5 max-w-md">
                  {value}
                </p>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isUploading ? (
                      <Loader2 className="w-3 h-3 animate-spin text-[#aeff00]" />
                    ) : (
                      <UploadCloud className="w-3 h-3 text-[#aeff00]" />
                    )}
                    <span>{isUploading ? 'Uploading...' : 'Replace Image'}</span>
                  </button>

                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded hover:bg-zinc-800/60 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open Full</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="inline-flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-950/30 transition-colors ml-auto cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State / Dropzone */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-xl p-5 text-center transition-all ${
              isDragging
                ? 'border-[#aeff00] bg-[#aeff00]/5 scale-[0.99]'
                : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-[#aeff00] transition-colors">
                {isUploading ? (
                  <Loader2 className="w-5 h-5 text-[#aeff00] animate-spin" />
                ) : (
                  <UploadCloud className="w-5 h-5 text-[#aeff00]" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-200">
                  {isUploading ? (
                    'Uploading to Cloudinary...'
                  ) : (
                    <>
                      Click to upload image or <span className="text-[#aeff00]">drag & drop</span>
                    </>
                  )}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  PNG, JPG, WEBP, SVG up to 10MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hidden native file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml, image/avif"
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Manual URL Input (Fallback & direct link editing) */}
        {showUrlInput && (
          <div className="space-y-1 pt-1">
            <div className="relative">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#aeff00] font-mono text-[11px]"
              />
            </div>
            <p className="text-[10px] text-zinc-500">{helpText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
