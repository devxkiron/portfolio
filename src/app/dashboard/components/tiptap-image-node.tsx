'use client';

import React, { useState, useRef, useEffect } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import {
  Trash2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Move,
  Check,
  Plus,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

export function TiptapImageNodeView({
  node,
  updateAttributes,
  deleteNode,
  getPos,
  selected,
  editor,
}: NodeViewProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [showCaptionInput, setShowCaptionInput] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(100);

  const { src, alt, width = '100%', alignment = 'center', caption = '' } = node.attrs;

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
      const containerWidth = containerRef.current?.parentElement?.clientWidth || 800;
      const deltaPercent = (deltaX / containerWidth) * 100;
      const newWidth = Math.min(100, Math.max(20, Math.round(startWidthRef.current + deltaPercent)));
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

  return (
    <NodeViewWrapper
      style={wrapperStyle}
      className={`relative group my-3 transition-[width] duration-75 cursor-default ${
        isFloatRight ? 'tiptap-float-right' : isFloatLeft ? 'tiptap-float-left' : 'tiptap-block-center'
      }`}
    >
      <div ref={containerRef} className="relative w-full">
        {/* Floating Controls Bar with Move Up/Down Controls */}
        <div
          className={`absolute -top-11 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1 bg-zinc-900/98 border border-zinc-700 rounded-xl shadow-2xl backdrop-blur-md transition-all ${
            selected || isResizing
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
          }`}
        >
          {/* Move Up / Down Buttons */}
          <div className="flex items-center gap-0.5 bg-zinc-800/80 rounded-lg p-0.5 border border-zinc-700/60">
            <button
              type="button"
              onClick={handleMoveUp}
              className="p-1 text-zinc-400 hover:text-[#aeff00] hover:bg-zinc-700/80 rounded transition-colors cursor-pointer"
              title="Move section up (↑)"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleMoveDown}
              className="p-1 text-zinc-400 hover:text-[#aeff00] hover:bg-zinc-700/80 rounded transition-colors cursor-pointer"
              title="Move section down (↓)"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
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
                  width === w
                    ? 'bg-[#aeff00] text-black font-bold'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          {/* Alignment Controls */}
          <div className="flex items-center gap-0.5 border-r border-zinc-700/80 pr-1 mr-0.5">
            <button
              type="button"
              onClick={() => updateAttributes({ alignment: 'left' })}
              title="Align Left"
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
              title="Align Right"
              className={`p-1 rounded transition-colors cursor-pointer ${
                alignment === 'right'
                  ? 'bg-[#aeff00]/20 text-[#aeff00]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Write Beside Button */}
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
              title="Add editable text paragraph in the empty space beside this image"
            >
              <Plus className="w-3 h-3" />
              <span>+ Text Beside</span>
            </button>
          )}

          {/* Delete Image Button */}
          <button
            type="button"
            onClick={deleteNode}
            title="Remove Image (or press Backspace)"
            className="p-1 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Image Container */}
        <div
          className={`relative rounded-xl overflow-hidden border transition-all ${
            selected
              ? 'border-[#aeff00] ring-2 ring-[#aeff00]/30'
              : 'border-zinc-800 group-hover:border-zinc-700'
          }`}
        >
          <img
            src={src}
            alt={alt || 'Case study image'}
            className="w-full h-auto object-cover block select-none"
            draggable={false}
          />

          {/* Interactive Drag-to-Resize Handle */}
          <div
            onMouseDown={handleMouseDown}
            title="Drag horizontally to resize image"
            className={`absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-black text-[#aeff00] border border-white/20 shadow-xl cursor-ew-resize transition-all ${
              selected || isResizing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <Move className="w-3.5 h-3.5" />
          </div>

          {/* Width Display Badge during resizing */}
          {isResizing && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-[#aeff00] border border-[#aeff00]/40 backdrop-blur-md">
              Width: {width}
            </div>
          )}
        </div>

        {/* Caption Field */}
        <div className="mt-2 text-center">
          <input
            type="text"
            value={caption}
            onChange={(e) => updateAttributes({ caption: e.target.value })}
            placeholder="Add image caption (optional)..."
            className="w-full text-center text-xs text-zinc-400 placeholder-zinc-600 bg-transparent border-none focus:outline-none focus:text-zinc-200 italic font-mono"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}
