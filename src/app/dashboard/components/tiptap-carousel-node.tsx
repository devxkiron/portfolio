'use client';

import React, { useState, useRef } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import {
  Sliders,
  Trash2,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export function TiptapCarouselNodeView({
  node,
  updateAttributes,
  deleteNode,
  getPos,
  editor,
  selected,
}: NodeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { images = [], aspectRatio = 'aspect-[16/9]' } = node.attrs;
  const imageList: string[] = Array.isArray(images) ? images : [];
  const handleAddSlides = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    const toastId = toast.loading(`Uploading ${fileArray.length} slide image${fileArray.length > 1 ? 's' : ''}...`);
    try {
      const uploadedUrls: string[] = [];

      for (const file of fileArray) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`File ${file.name} too large (max 10MB)`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'portfolio/case-studies');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const json = await res.json();
        if (res.ok && json.success && json.data?.url) {
          uploadedUrls.push(json.data.url);
        }
      }

      if (uploadedUrls.length === 0) {
        throw new Error('No images could be uploaded.');
      }

      const updated = [...imageList, ...uploadedUrls];
      updateAttributes({ images: updated });
      setCurrentSlide(updated.length - 1);
      toast.success(`${uploadedUrls.length} Slide${uploadedUrls.length > 1 ? 's' : ''} Added to Carousel!`, { id: toastId });
    } catch (err: any) {
      toast.error('Upload Failed', { id: toastId, description: err.message });
    }
  };

  const removeCurrentSlide = () => {
    if (imageList.length <= 1) {
      deleteNode();
      return;
    }
    const updated = imageList.filter((_, idx) => idx !== currentSlide);
    updateAttributes({ images: updated });
    setCurrentSlide(Math.max(0, currentSlide - 1));
  };

  const prev = () => {
    setCurrentSlide((curr) => (curr === 0 ? imageList.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentSlide((curr) => (curr === imageList.length - 1 ? 0 : curr + 1));
  };

  // Move section Up or Down
  const handleMoveUp = () => {
    const pos = typeof getPos === 'function' ? getPos() : undefined;
    if (typeof pos !== 'number' || !editor) return;
    const $pos = editor.state.doc.resolve(pos);
    const nodeBefore = $pos.nodeBefore;
    if (!nodeBefore) return;

    const targetPos = pos - nodeBefore.nodeSize;
    const tr = editor.state.tr;
    const nodeCopy = node.type.create(node.attrs, node.content, node.marks);
    tr.delete(pos, pos + node.nodeSize);
    tr.insert(targetPos, nodeCopy);
    editor.view.dispatch(tr);
  };

  const handleMoveDown = () => {
    const pos = typeof getPos === 'function' ? getPos() : undefined;
    if (typeof pos !== 'number' || !editor) return;
    const $pos = editor.state.doc.resolve(pos + node.nodeSize);
    const nodeAfter = $pos.nodeAfter;
    if (!nodeAfter) return;

    const tr = editor.state.tr;
    const nodeCopy = node.type.create(node.attrs, node.content, node.marks);
    tr.delete(pos, pos + node.nodeSize);
    tr.insert(pos + nodeAfter.nodeSize, nodeCopy);
    editor.view.dispatch(tr);
  };

  return (
    <NodeViewWrapper className="my-8 block clear-both cursor-default relative z-10">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleAddSlides(e.target.files);
          }
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
        className="hidden"
      />

      <div
        className={`relative p-3 rounded-2xl border transition-all ${
          selected
            ? 'border-[#aeff00] ring-2 ring-[#aeff00]/30 bg-zinc-950/90'
            : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
        }`}
      >
        {/* Carousel Header Controls */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-800 text-xs">
          <div className="flex items-center gap-2">
            {/* Move Up / Down Buttons */}
            <div className="flex items-center gap-0.5 bg-zinc-800/80 rounded-lg p-0.5 border border-zinc-700/60">
              <button
                type="button"
                onClick={handleMoveUp}
                className="p-1 text-zinc-400 hover:text-[#aeff00] hover:bg-zinc-700/80 rounded transition-colors cursor-pointer"
                title="Move carousel up (↑)"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleMoveDown}
                className="p-1 text-zinc-400 hover:text-[#aeff00] hover:bg-zinc-700/80 rounded transition-colors cursor-pointer"
                title="Move carousel down (↓)"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <Sliders className="w-4 h-4 text-[#aeff00]" />
            <span className="font-semibold text-zinc-200">Interactive Image Carousel</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
              Slide {imageList.length > 0 ? currentSlide + 1 : 0} of {imageList.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-[#aeff00] text-[#aeff00] text-[11px] font-medium cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Slide</span>
            </button>
            <button
              type="button"
              onClick={removeCurrentSlide}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-[11px] cursor-pointer"
              title="Remove current slide"
            >
              Remove Slide
            </button>
            <button
              type="button"
              onClick={deleteNode}
              className="p-1 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300 cursor-pointer"
              title="Delete Carousel Block"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Viewer */}
        {imageList.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-12 border-2 border-dashed border-zinc-800 hover:border-[#aeff00] rounded-xl text-center cursor-pointer bg-zinc-900/30 transition-colors"
          >
            <UploadCloud className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
            <p className="text-xs font-medium text-zinc-200">Click to upload your first carousel slide</p>
            <p className="text-[10px] text-zinc-500 mt-1">Add multiple images to create interactive sliders</p>
          </div>
        ) : (
          <div className={`relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-black ${aspectRatio} group`}>
            {/* Active Slide Image */}
            <img
              src={imageList[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />

            {/* Prev / Next Arrows */}
            {imageList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Indicator Dots */}
            {imageList.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                {imageList.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}
