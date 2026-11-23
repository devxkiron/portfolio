'use client';

import React, { useState, useRef, useEffect } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import {
  LayoutGrid,
  Trash2,
  UploadCloud,
  Plus,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Move,
  Grid2X2,
  Columns2,
  Columns3,
  LayoutPanelLeft,
  LayoutPanelTop,
  Sparkles,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export type GridLayoutTemplate =
  | 'auto'
  | '2-cols'
  | '3-cols'
  | '1-left-2-right'
  | '1-top-3-bottom'
  | '2x2';

interface TemplateOption {
  id: GridLayoutTemplate;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'auto',
    title: 'Facebook Collage (Auto)',
    subtitle: 'Smart responsive collage with +N count badge',
    icon: <Sparkles className="w-4 h-4 text-[#aeff00]" />,
  },
  {
    id: '2-cols',
    title: '2 Columns (50 / 50)',
    subtitle: 'Side-by-side equal showcase photos',
    icon: <Columns2 className="w-4 h-4 text-sky-400" />,
  },
  {
    id: '3-cols',
    title: '3 Columns (1/3 Equal)',
    subtitle: 'Triple column photo card gallery',
    icon: <Columns3 className="w-4 h-4 text-purple-400" />,
  },
  {
    id: '1-left-2-right',
    title: 'Editorial Showcase',
    subtitle: '1 large hero on left + 2 stacked on right',
    icon: <LayoutPanelLeft className="w-4 h-4 text-amber-400" />,
  },
  {
    id: '1-top-3-bottom',
    title: 'Banner + Thumbs',
    subtitle: '1 wide top hero + 3 smaller cards below',
    icon: <LayoutPanelTop className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: '2x2',
    title: '2x2 Quad Grid',
    subtitle: 'Balanced 4-quadrant photo collage',
    icon: <Grid2X2 className="w-4 h-4 text-rose-400" />,
  },
];

export function TiptapGridNodeView({
  node,
  updateAttributes,
  deleteNode,
  getPos,
  editor,
  selected,
}: NodeViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(100);

  const [isResizing, setIsResizing] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const activeSlotIndexRef = useRef<number>(0);
  const isReplacingRef = useRef<boolean>(false);

  const {
    images = [],
    layout = 'auto',
    width = '100%',
    alignment = 'center',
  } = node.attrs;

  const imageList: string[] = Array.isArray(images) ? images : [];
  const currentLayout: GridLayoutTemplate = layout || 'auto';

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((curr) => (curr === null || curr === 0 ? imageList.length - 1 : curr - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((curr) => (curr === null || curr === imageList.length - 1 ? 0 : curr + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, imageList.length]);

  // Drag-to-resize logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    startXRef.current = e.clientX;

    const currentWidthNum = parseInt(String(width).replace('%', ''), 10) || 100;
    startWidthRef.current = currentWidthNum;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startXRef.current;
      const parentWidth = containerRef.current?.parentElement?.clientWidth || 800;
      const deltaPercent = (deltaX / parentWidth) * 100;
      const newWidth = Math.min(100, Math.max(25, Math.round(startWidthRef.current + deltaPercent)));
      updateAttributes({ width: `${newWidth}%` });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
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

  const handleUploadSlots = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    const toastId = toast.loading(`Uploading ${fileArray.length} image${fileArray.length > 1 ? 's' : ''}...`);
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

      let updated = [...imageList];
      if (isReplacingRef.current && uploadedUrls.length === 1) {
        updated[activeSlotIndexRef.current] = uploadedUrls[0];
      } else {
        updated = [...updated, ...uploadedUrls];
      }

      updateAttributes({ images: updated });
      toast.success(`${uploadedUrls.length} Image${uploadedUrls.length > 1 ? 's' : ''} added to layout!`, { id: toastId });
    } catch (err: any) {
      toast.error('Upload Failed', { id: toastId, description: err.message });
    } finally {
      isReplacingRef.current = false;
    }
  };

  const removeSlot = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = imageList.filter((_, i) => i !== idx);
    updateAttributes({ images: updated });
  };

  const addSlot = () => {
    isReplacingRef.current = false;
    activeSlotIndexRef.current = imageList.length;
    fileInputRef.current?.click();
  };

  const replaceSlot = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    isReplacingRef.current = true;
    activeSlotIndexRef.current = idx;
    fileInputRef.current?.click();
  };

  const openLightbox = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxIndex(idx);
  };

  const isFloatRight = alignment === 'right' && width !== '100%';
  const isFloatLeft = alignment === 'left' && width !== '100%';

  const wrapperStyle: React.CSSProperties = {
    width: width || '100%',
  };

  if (isFloatRight) {
    wrapperStyle.float = 'right';
    wrapperStyle.marginLeft = '1.75rem';
    wrapperStyle.marginBottom = '1.25rem';
    wrapperStyle.clear = 'none';
  } else if (isFloatLeft) {
    wrapperStyle.float = 'left';
    wrapperStyle.marginRight = '1.75rem';
    wrapperStyle.marginBottom = '1.25rem';
    wrapperStyle.clear = 'none';
  } else {
    wrapperStyle.float = 'none';
    wrapperStyle.margin = '1.75rem auto';
    wrapperStyle.clear = 'both';
    wrapperStyle.display = 'block';
  }

  // Render individual slot item with Facebook +N count badge and controls
  const renderSlot = (src: string, idx: number, extraClasses = '', showCountBadge = 0) => (
    <div
      key={idx}
      onClick={() => openLightbox(idx)}
      className={`relative rounded-xl overflow-hidden border border-zinc-800/80 group bg-zinc-900 cursor-pointer ${extraClasses}`}
    >
      <img
        src={src}
        alt={`Visual ${idx + 1}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
        draggable={false}
      />

      {/* +N Facebook Badge Overlay */}
      {showCountBadge > 0 && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-all group-hover:bg-black/60">
          <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">+{showCountBadge}</span>
          <span className="text-xs text-zinc-300 font-medium mt-1">View All Photos</span>
        </div>
      )}

      {/* Hover Actions Toolbar */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/70 backdrop-blur-md p-1 rounded-lg border border-white/10">
        <button
          type="button"
          onClick={(e) => replaceSlot(idx, e)}
          className="px-2 py-0.5 rounded text-[10px] text-zinc-200 hover:text-black hover:bg-[#aeff00] transition-colors cursor-pointer"
          title="Replace Image"
        >
          Replace
        </button>
        <button
          type="button"
          onClick={(e) => removeSlot(idx, e)}
          className="p-1 rounded text-red-400 hover:text-red-200 hover:bg-red-950/60 transition-colors cursor-pointer"
          title="Delete this image"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* View Icon */}
      <div className="absolute bottom-2 left-2 p-1 rounded-md bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <Maximize2 className="w-3 h-3" />
      </div>
    </div>
  );

  const count = imageList.length;

  return (
    <NodeViewWrapper
      style={wrapperStyle}
      className={`relative group my-4 transition-[width] duration-75 cursor-default ${
        isFloatRight ? 'tiptap-float-right' : isFloatLeft ? 'tiptap-float-left' : 'tiptap-block-center'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleUploadSlots(e.target.files);
          }
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
        className="hidden"
      />

      <div ref={containerRef} className="relative w-full">
        {/* Floating Controls Bar (Move Up/Down, Templates, Widths, Alignment, +Text Beside, Delete) */}
        <div
          className={`absolute -top-11 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1 bg-zinc-900/98 border border-zinc-700 rounded-xl shadow-2xl backdrop-blur-md transition-all ${
            selected || isResizing || showTemplateMenu
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
          }`}
        >
          {/* Move Up / Down Buttons */}
          <div className="flex items-center gap-0.5 bg-zinc-800/80 rounded-lg p-0.5 border border-zinc-700/60">
            <button
              type="button"
              onClick={handleMoveUp}
              className="p-1 text-zinc-400 hover:text-[#aeff00] hover:bg-zinc-700/80 rounded transition-colors cursor-pointer"
              title="Move grid up (↑)"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleMoveDown}
              className="p-1 text-zinc-400 hover:text-[#aeff00] hover:bg-zinc-700/80 rounded transition-colors cursor-pointer"
              title="Move grid down (↓)"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-px h-4 bg-zinc-700 mx-0.5" />

          {/* Predefined Template Selector Dropdown / Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTemplateMenu((prev) => !prev)}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium border border-zinc-700/60 cursor-pointer"
              title="Change layout template"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#aeff00]" />
              <span className="capitalize">{currentLayout.replace(/-/g, ' ')}</span>
            </button>

            {/* Template Selection Popup */}
            {showTemplateMenu && (
              <div className="absolute top-8 left-0 w-64 p-2 bg-zinc-950/95 border border-zinc-700 rounded-xl shadow-2xl backdrop-blur-xl z-50 space-y-1">
                <div className="text-[10px] font-mono uppercase text-zinc-500 px-2 py-1 border-b border-zinc-800">
                  Select Predefined Layout
                </div>
                {TEMPLATE_OPTIONS.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => {
                      updateAttributes({ layout: tmpl.id });
                      setShowTemplateMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                      currentLayout === tmpl.id
                        ? 'bg-[#aeff00]/15 border border-[#aeff00]/30 text-[#aeff00]'
                        : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div className="shrink-0">{tmpl.icon}</div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-[11px] truncate">{tmpl.title}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{tmpl.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-4 bg-zinc-700 mx-0.5" />

          {/* Quick Width Presets */}
          <div className="flex items-center gap-0.5 border-r border-zinc-700/80 pr-1 mr-0.5">
            {(['25%', '50%', '75%', '100%'] as const).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => updateAttributes({ width: w })}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                  (width || '100%') === w
                    ? 'bg-[#aeff00] text-black font-bold'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          {/* Alignment Controls (Left, Center, Right) */}
          <div className="flex items-center gap-0.5 border-r border-zinc-700/80 pr-1 mr-0.5">
            <button
              type="button"
              onClick={() => updateAttributes({ alignment: 'left' })}
              title="Align Left (Float text beside)"
              className={`p-1 rounded transition-colors cursor-pointer ${
                alignment === 'left'
                  ? 'bg-[#aeff00]/20 text-[#aeff00]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => updateAttributes({ alignment: 'center' })}
              title="Align Center"
              className={`p-1 rounded transition-colors cursor-pointer ${
                alignment === 'center'
                  ? 'bg-[#aeff00]/20 text-[#aeff00]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => updateAttributes({ alignment: 'right' })}
              title="Align Right (Float text beside)"
              className={`p-1 rounded transition-colors cursor-pointer ${
                alignment === 'right'
                  ? 'bg-[#aeff00]/20 text-[#aeff00]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Write Beside Button (when floated) */}
          {(alignment === 'right' || alignment === 'left') && (
            <button
              type="button"
              onClick={() => {
                if (!editor) return;
                const pos = typeof getPos === 'function' ? getPos() : undefined;
                if (typeof pos === 'number') {
                  const targetPos = pos + node.nodeSize;
                  editor
                    .chain()
                    .insertContentAt(targetPos, { type: 'paragraph', content: [] })
                    .setTextSelection(targetPos + 1)
                    .focus()
                    .run();
                } else {
                  editor.chain().focus('end').insertContent({ type: 'paragraph', content: [] }).run();
                }
              }}
              className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#aeff00]/15 text-[#aeff00] hover:bg-[#aeff00]/30 transition-colors cursor-pointer flex items-center gap-1 border border-[#aeff00]/30 mr-1"
              title="Add editable text paragraph beside this grid"
            >
              <Plus className="w-3 h-3" />
              <span>+ Text Beside</span>
            </button>
          )}

          {/* Add Photos Button */}
          <button
            type="button"
            onClick={addSlot}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 hover:border-[#aeff00] text-[#aeff00] text-[10px] font-medium cursor-pointer"
            title="Upload more photos"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>

          {/* Delete Grid Block */}
          <button
            type="button"
            onClick={deleteNode}
            title="Delete Image Grid"
            className="p-1 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main Grid Container with Selected Highlight & Drag Resizer */}
        <div
          className={`relative rounded-xl p-3 border transition-all ${
            selected || isResizing
              ? 'border-zinc-400 bg-zinc-950/95'
              : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
          }`}
        >
          {/* Empty State: Predefined Layout Chooser Cards */}
          {count === 0 && (
            <div className="py-6 px-4">
              <div className="text-center mb-5">
                <LayoutGrid className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white tracking-tight">Choose a Grid Layout Template</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Select your preferred layout to begin uploading photos</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-w-2xl mx-auto">
                {TEMPLATE_OPTIONS.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => {
                      updateAttributes({ layout: tmpl.id });
                      addSlot();
                    }}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                      currentLayout === tmpl.id
                        ? 'border-zinc-300 bg-zinc-900/90'
                        : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-1.5 rounded-md bg-zinc-800/80 border border-zinc-700/60">{tmpl.icon}</span>
                      <span className="text-[10px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        Select →
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-100">{tmpl.title}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{tmpl.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Render Templates according to currentLayout */}
          {count > 0 && currentLayout === 'auto' && (
            <>
              {count === 1 && (
                <div className="w-full aspect-[16/10] sm:aspect-[16/9]">{renderSlot(imageList[0], 0, 'w-full h-full')}</div>
              )}
              {count === 2 && (
                <div className="grid grid-cols-2 gap-2.5 aspect-[16/10] sm:aspect-[16/9]">
                  {renderSlot(imageList[0], 0, 'h-full')}
                  {renderSlot(imageList[1], 1, 'h-full')}
                </div>
              )}
              {count === 3 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-2.5 h-72 sm:h-96">
                  {renderSlot(imageList[0], 0, 'row-span-2 col-span-1 h-full')}
                  {renderSlot(imageList[1], 1, 'row-span-1 col-span-1 h-full')}
                  {renderSlot(imageList[2], 2, 'row-span-1 col-span-1 h-full')}
                </div>
              )}
              {count === 4 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-2.5 h-80 sm:h-[420px]">
                  {renderSlot(imageList[0], 0, 'h-full')}
                  {renderSlot(imageList[1], 1, 'h-full')}
                  {renderSlot(imageList[2], 2, 'h-full')}
                  {renderSlot(imageList[3], 3, 'h-full')}
                </div>
              )}
              {count >= 5 && (
                <div className="grid grid-cols-6 grid-rows-2 gap-2.5 h-84 sm:h-[440px]">
                  {renderSlot(imageList[0], 0, 'col-span-3 row-span-1 h-full')}
                  {renderSlot(imageList[1], 1, 'col-span-3 row-span-1 h-full')}
                  {renderSlot(imageList[2], 2, 'col-span-2 row-span-1 h-full')}
                  {renderSlot(imageList[3], 3, 'col-span-2 row-span-1 h-full')}
                  {renderSlot(imageList[4], 4, 'col-span-2 row-span-1 h-full', count > 5 ? count - 4 : 0)}
                </div>
              )}
            </>
          )}

          {count > 0 && currentLayout === '2-cols' && (
            <div className="grid grid-cols-2 gap-2.5">
              {imageList.slice(0, 2).map((url, idx) =>
                renderSlot(url, idx, 'aspect-[16/10]', idx === 1 && count > 2 ? count - 1 : 0)
              )}
            </div>
          )}

          {count > 0 && currentLayout === '3-cols' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {imageList.slice(0, 3).map((url, idx) =>
                renderSlot(url, idx, 'aspect-[16/10]', idx === 2 && count > 3 ? count - 2 : 0)
              )}
            </div>
          )}

          {count > 0 && currentLayout === '1-left-2-right' && (
            <div className="grid grid-cols-2 grid-rows-2 gap-2.5 h-72 sm:h-[400px]">
              {renderSlot(imageList[0], 0, 'row-span-2 col-span-1 h-full')}
              {imageList[1] && renderSlot(imageList[1], 1, 'row-span-1 col-span-1 h-full')}
              {imageList[2] &&
                renderSlot(
                  imageList[2],
                  2,
                  'row-span-1 col-span-1 h-full',
                  count > 3 ? count - 2 : 0
                )}
            </div>
          )}

          {count > 0 && currentLayout === '1-top-3-bottom' && (
            <div className="grid grid-cols-3 gap-2.5 h-84 sm:h-[440px]">
              {renderSlot(imageList[0], 0, 'col-span-3 h-52 sm:h-64')}
              {imageList[1] && renderSlot(imageList[1], 1, 'col-span-1 h-28 sm:h-36')}
              {imageList[2] && renderSlot(imageList[2], 2, 'col-span-1 h-28 sm:h-36')}
              {imageList[3] &&
                renderSlot(
                  imageList[3],
                  3,
                  'col-span-1 h-28 sm:h-36',
                  count > 4 ? count - 3 : 0
                )}
            </div>
          )}

          {count > 0 && currentLayout === '2x2' && (
            <div className="grid grid-cols-2 grid-rows-2 gap-2.5 h-80 sm:h-[420px]">
              {imageList.slice(0, 4).map((url, idx) =>
                renderSlot(url, idx, 'h-full', idx === 3 && count > 4 ? count - 3 : 0)
              )}
            </div>
          )}

          {/* Interactive Drag-to-Resize Handle */}
          <div
            onMouseDown={handleMouseDown}
            title="Drag horizontally to resize grid"
            className={`absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-black text-[#aeff00] border border-white/20 shadow-xl cursor-ew-resize transition-all z-20 ${
              selected || isResizing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <Move className="w-3.5 h-3.5" />
          </div>

          {/* Width Display Badge during resizing */}
          {isResizing && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-[#aeff00] border border-[#aeff00]/40 backdrop-blur-md z-20">
              Width: {width}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Interactive Clean Minimalist Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col justify-between p-4 sm:p-6 transition-all"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-white w-full max-w-7xl mx-auto z-10 px-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                Photo {lightboxIndex + 1} of {count}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              title="Close (Escape)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Lightbox Main Image Stage (Clean, Crisp, Full-Width) */}
          <div
            className="relative flex-1 flex items-center justify-center my-3 w-full max-w-7xl mx-auto overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {count > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((curr) => (curr === null || curr === 0 ? count - 1 : curr - 1))
                }
                className="absolute left-2 sm:left-4 z-20 p-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div className="relative w-full h-full max-h-[78vh] flex items-center justify-center">
              <img
                src={imageList[lightboxIndex]}
                alt={`Photo ${lightboxIndex + 1}`}
                className="w-full h-full max-h-[78vh] max-w-full object-contain rounded-lg border border-zinc-800/80 select-none"
              />
            </div>

            {count > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((curr) => (curr === null || curr === count - 1 ? 0 : curr + 1))
                }
                className="absolute right-2 sm:right-4 z-20 p-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip (Clean Flat Crisp Borders) */}
          {count > 1 && (
            <div
              className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 max-w-4xl mx-auto w-full z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {imageList.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-colors cursor-pointer bg-zinc-900 ${
                    idx === lightboxIndex
                      ? 'border-white opacity-100'
                      : 'border-zinc-800 opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </NodeViewWrapper>
  );
}
