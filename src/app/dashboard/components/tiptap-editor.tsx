'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Highlight } from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Highlighter,
  Undo2,
  Redo2,
  Minus,
  UploadCloud,
  Loader2,
  Sparkles,
  LayoutGrid,
  Sliders,
  Type,
  ChevronDown,
  X,
  Plus,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

import type { ProjectDetailDesign } from '@/app/_components/projects/types';
import { BackgroundPattern, getPatternLabel, isLightColor } from '@/app/project/[id]/background-patterns';
import { TiptapImageNodeView } from './tiptap-image-node';
import { TiptapGridNodeView } from './tiptap-grid-node';
import { TiptapCarouselNodeView } from './tiptap-carousel-node';
import { createSlashCommandExtension } from './tiptap-slash-command';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  design?: ProjectDetailDesign;
  minHeight?: string;
}

// ─────────────────────────────────────────────────────────────
// 1. CUSTOM NODE EXTENSIONS
// ─────────────────────────────────────────────────────────────

// A. Interactive Resizable Image Node
const ResizableImageNode = Node.create({
  name: 'resizableImage',
  group: 'block',
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: '' },
      width: { default: '100%' },
      alignment: { default: 'center' },
      caption: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure.tiptap-media-figure',
        getAttrs: (element) => {
          const el = element as HTMLElement;
          const img = el.querySelector('img');
          const figcaption = el.querySelector('figcaption');
          return {
            src: img?.getAttribute('src'),
            alt: img?.getAttribute('alt') || '',
            width: el.getAttribute('data-width') || '100%',
            alignment: el.getAttribute('data-alignment') || 'center',
            caption: figcaption?.textContent || '',
          };
        },
      },
      {
        tag: 'img',
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return {
            src: el.getAttribute('src'),
            alt: el.getAttribute('alt') || '',
            width: el.getAttribute('data-width') || el.style.width || '100%',
            alignment: el.getAttribute('data-alignment') || 'center',
            caption: '',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, alt, width = '100%', alignment = 'center', caption = '' } = HTMLAttributes;
    const isFloatRight = alignment === 'right' && width !== '100%';
    const isFloatLeft = alignment === 'left' && width !== '100%';

    const floatStyle = isFloatRight
      ? `float: right; width: ${width}; max-width: 100%; margin: 0.5rem 0 1.5rem 1.75rem; clear: none;`
      : isFloatLeft
      ? `float: left; width: ${width}; max-width: 100%; margin: 0.5rem 1.75rem 1.5rem 0; clear: none;`
      : `width: ${width}; max-width: 100%; margin: 1.75rem auto; clear: both; display: block;`;

    return [
      'figure',
      {
        class: `tiptap-media-figure tiptap-align-${alignment} ${
          isFloatRight ? 'tiptap-float-right' : isFloatLeft ? 'tiptap-float-left' : 'tiptap-block-center'
        }`,
        style: `${floatStyle} text-align: ${alignment};`,
        'data-width': width,
        'data-alignment': alignment,
      },
      [
        'img',
        {
          src,
          alt: alt || 'Case study visual',
          class: 'rounded-xl border border-zinc-800 w-full h-auto block',
        },
      ],
      ...(caption
        ? [['figcaption', { class: 'text-xs text-zinc-400 text-center mt-2 italic font-mono' }, caption]]
        : []),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TiptapImageNodeView);
  },
});

// B. Interactive Image Grid Node (Facebook Smart Collage & Predefined Templates)
const ResizableGridNode = Node.create({
  name: 'imageGrid',
  group: 'block',
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      images: {
        default: [],
        parseHTML: (element) => {
          const raw = element.getAttribute('data-images');
          if (raw) return raw.split(',').filter(Boolean);
          const imgs = Array.from(element.querySelectorAll('img')).map((i) => i.getAttribute('src') || '');
          return imgs.filter(Boolean);
        },
        renderHTML: (attrs) => ({
          'data-images': Array.isArray(attrs.images) ? attrs.images.join(',') : attrs.images || '',
        }),
      },
      layout: {
        default: 'auto',
        parseHTML: (element) => element.getAttribute('data-layout') || 'auto',
        renderHTML: (attrs) => ({
          'data-layout': attrs.layout || 'auto',
        }),
      },
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('data-width') || '100%',
        renderHTML: (attrs) => ({
          'data-width': attrs.width || '100%',
        }),
      },
      alignment: {
        default: 'center',
        parseHTML: (element) => element.getAttribute('data-alignment') || 'center',
        renderHTML: (attrs) => ({
          'data-alignment': attrs.alignment || 'center',
        }),
      },
      aspectRatio: {
        default: 'aspect-[16/10]',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.tiptap-image-grid',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const rawImages = HTMLAttributes['data-images'] || HTMLAttributes.images || '';
    const imgArray = typeof rawImages === 'string' ? rawImages.split(',').filter(Boolean) : Array.isArray(rawImages) ? rawImages : [];
    const width = HTMLAttributes['data-width'] || HTMLAttributes.width || '100%';
    const layout = HTMLAttributes['data-layout'] || HTMLAttributes.layout || 'auto';
    const alignment = HTMLAttributes['data-alignment'] || HTMLAttributes.alignment || 'center';
    const count = imgArray.length;

    if (count === 0) {
      return [
        'div',
        {
          class: 'hidden tiptap-image-grid',
          'data-images': '',
          'data-layout': layout,
          'data-width': width,
          'data-alignment': alignment,
        },
      ];
    }

    const isFloatRight = alignment === 'right' && width !== '100%';
    const isFloatLeft = alignment === 'left' && width !== '100%';

    const floatStyle = isFloatRight
      ? `float: right; width: ${width}; max-width: 100%; margin: 0.5rem 0 1.5rem 1.75rem; clear: none;`
      : isFloatLeft
      ? `float: left; width: ${width}; max-width: 100%; margin: 0.5rem 1.75rem 1.5rem 0; clear: none;`
      : `width: ${width}; max-width: 100%; margin: 1.75rem auto; clear: both; display: block;`;

    return [
      'div',
      {
        class: `tiptap-image-grid project-facebook-collage my-6 ${
          isFloatRight ? 'tiptap-float-right' : isFloatLeft ? 'tiptap-float-left' : 'tiptap-block-center'
        }`,
        style: floatStyle,
        'data-images': imgArray.join(','),
        'data-layout': layout,
        'data-width': width,
        'data-alignment': alignment,
        'data-count': String(count),
      },
      ...imgArray.map((src, idx) => [
        'div',
        { class: 'facebook-grid-item rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900', 'data-index': String(idx) },
        ['img', { src, class: 'w-full h-full object-cover block', alt: `Visual ${idx + 1}` }],
      ]),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TiptapGridNodeView);
  },
});

// C. Interactive Image Carousel Node
const InteractiveCarouselNode = Node.create({
  name: 'imageCarousel',
  group: 'block',
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      images: {
        default: [],
        parseHTML: (element) => {
          const raw = element.getAttribute('data-images');
          if (raw) {
            try {
              if (raw.startsWith('[')) return JSON.parse(raw);
              if (raw.includes('|||')) return raw.split('|||').filter(Boolean);
            } catch (e) {}
            return raw.split(',').filter(Boolean);
          }
          const imgs = Array.from(element.querySelectorAll('img')).map((i) => i.getAttribute('src') || '');
          return imgs.filter(Boolean);
        },
        renderHTML: (attrs) => ({
          'data-images': Array.isArray(attrs.images) ? attrs.images.join(',') : attrs.images || '',
        }),
      },
      aspectRatio: {
        default: 'aspect-[16/9]',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.project-carousel-wrapper',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const rawImages = HTMLAttributes['data-images'] || HTMLAttributes.images || '';
    const imgArray = typeof rawImages === 'string' ? rawImages.split(',').filter(Boolean) : Array.isArray(rawImages) ? rawImages : [];

    if (imgArray.length === 0) {
      return ['div', { class: 'hidden project-carousel-wrapper', 'data-carousel': 'true', 'data-images': '' }];
    }

    return [
      'div',
      {
        class: 'project-carousel-wrapper my-8 relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 group',
        'data-carousel': 'true',
        'data-images': imgArray.join(','),
      },
      [
        'div',
        { class: 'carousel-track relative aspect-[16/9] w-full overflow-hidden' },
        ...imgArray.map((src, idx) => [
          'div',
          {
            class: `carousel-slide absolute inset-0 transition-opacity duration-500 ${
              idx === 0 ? 'opacity-100 active-slide' : 'opacity-0 pointer-events-none'
            }`,
            'data-slide-index': String(idx),
          },
          ['img', { src, class: 'w-full h-full object-cover object-center', alt: `Slide ${idx + 1}` }],
        ]),
      ],
      [
        'div',
        { class: 'carousel-controls absolute inset-0 flex items-center justify-between p-3 pointer-events-none' },
        [
          'button',
          {
            type: 'button',
            class:
              'carousel-btn-prev pointer-events-auto p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer',
          },
          '❮',
        ],
        [
          'button',
          {
            type: 'button',
            class:
              'carousel-btn-next pointer-events-auto p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer',
          },
          '❯',
        ],
      ],
      [
        'div',
        {
          class:
            'carousel-indicators absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10',
        },
        ...imgArray.map((_, idx) => [
          'button',
          {
            type: 'button',
            class: `carousel-dot h-2 rounded-full transition-all cursor-pointer ${
              idx === 0 ? 'w-5 bg-[#aeff00]' : 'w-2 bg-white/40'
            }`,
            'data-dot-index': String(idx),
          },
        ]),
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TiptapCarouselNodeView);
  },
});

// D. Custom Text Style Extension with font-size support
const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },
});

// ─────────────────────────────────────────────────────────────
// 2. FONT & BLOCK OPTIONS
// ─────────────────────────────────────────────────────────────

const FONT_FAMILIES = [
  { label: 'Inherit Theme Font', value: '' },
  { label: 'Clash Display', value: 'var(--font-clash, inherit)' },
  { label: 'Cabinet Grotesk', value: 'var(--font-cabinet, inherit)' },
  { label: 'Satoshi', value: 'var(--font-satoshi, inherit)' },
  { label: 'Syne', value: 'var(--font-syne, inherit)' },
  { label: 'JetBrains Mono', value: 'var(--font-jetbrains, monospace)' },
  { label: 'Plus Jakarta Sans', value: 'var(--font-jakarta, sans-serif)' },
  { label: 'Geist Sans', value: 'var(--font-geist-sans, sans-serif)' },
  { label: 'Hatton Serif', value: 'var(--font-hatton, serif)' },
  { label: 'Elegtro Tech', value: 'var(--font-elegtro, sans-serif)' },
  { label: 'Origin Tech', value: 'var(--font-origin-tech, sans-serif)' },
  { label: 'Avtech Modern', value: 'var(--font-avtech, sans-serif)' },
];

const FONT_SIZES = [
  { label: 'Default Size', value: '' },
  { label: '14px (Small)', value: '14px' },
  { label: '16px (Normal / Body)', value: '16px' },
  { label: '18px (Medium)', value: '18px' },
  { label: '22px (Large)', value: '22px' },
  { label: '28px (XL Heading)', value: '28px' },
  { label: '36px (2XL Title)', value: '36px' },
];

export function TiptapEditor({
  content,
  onChange,
  placeholder = 'Write your project case study here... (Type text, drag images, or insert grids and carousels in any order)',
  design,
  minHeight = 'min-h-[400px]',
}: TiptapEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'tiptap-link' } }),
      Placeholder.configure({ placeholder }),
      Highlight.configure({ multicolor: true }),
      CustomTextStyle,
      FontFamily,
      Color,
      ResizableImageNode,
      ResizableGridNode,
      InteractiveCarouselNode,
      createSlashCommandExtension(() => fileInputRef.current?.click()),
    ],
    content: content || '',
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    editorProps: {
      attributes: {
        class: `${minHeight} max-h-[750px] overflow-y-auto px-7 py-6 text-sm leading-relaxed focus:outline-none max-w-none tiptap-live-canvas`,
      },
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            if (file) {
              event.preventDefault();
              uploadAndInsertImage(file);
              return true;
            }
          }
        }
        return false;
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
          const files = Array.from(event.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
          if (files.length > 0) {
            event.preventDefault();
            setIsDraggingOver(false);
            if (files.length === 1) {
              uploadAndInsertImage(files[0]);
            } else {
              uploadBatchImages(files);
            }
            return true;
          }
        }
        setIsDraggingOver(false);
        return false;
      },
    },
  });

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  useEffect(() => {
    if (editor && content !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(content || '', { emitUpdate: false });
    }
  }, [content, editor]);

  // Upload helper to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large', { description: 'Max image size is 10MB.' });
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'portfolio/case-studies');

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.error || 'Failed to upload image.');
    return json.data.url;
  };

  // Insert single image
  const uploadAndInsertImage = useCallback(async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsUploading(true);
    const toastId = toast.loading('Uploading image to Cloudinary...', { description: file.name });

    try {
      const url = await uploadToCloudinary(file);
      if (!url) return;

      const ed = editorRef.current;
      if (ed) {
        ed.chain().focus().insertContent({
          type: 'resizableImage',
          attrs: { src: url, width: '100%', alignment: 'center' },
        }).run();
      }
      toast.success('Image Inserted!', { id: toastId });
    } catch (err: any) {
      toast.error('Upload Failed', { id: toastId, description: err.message });
    } finally {
      setIsUploading(false);
    }
  }, []);

  // Insert multiple images as 2-Col/3-Col grid or carousel
  const uploadBatchImages = async (files: File[], layout: 'grid-2' | 'grid-3' | 'carousel' = 'grid-2') => {
    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${files.length} images to Cloudinary...`);
    const urls: string[] = [];

    try {
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        if (url) urls.push(url);
      }

      const ed = editorRef.current;
      if (ed && urls.length > 0) {
        if (layout === 'carousel') {
          ed.chain().focus().insertContent({
            type: 'imageCarousel',
            attrs: { images: urls },
          }).run();
        } else {
          ed.chain().focus().insertContent({
            type: 'imageGrid',
            attrs: { images: urls, columns: layout === 'grid-3' ? 3 : 2 },
          }).run();
        }
      }
      toast.success(`${urls.length} images inserted as ${layout}!`, { id: toastId });
    } catch (err: any) {
      toast.error('Batch Upload Error', { id: toastId, description: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  if (!editor) return null;

  // Current active block type helper
  const getActiveBlockLabel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1 (H1)';
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2 (H2)';
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3 (H3)';
    if (editor.isActive('blockquote')) return 'Quote Block';
    if (editor.isActive('codeBlock')) return 'Code Block';
    if (editor.isActive('bulletList')) return 'Bullet List';
    if (editor.isActive('orderedList')) return 'Numbered List';
    return 'Paragraph (P)';
  };

  const setBlockType = (type: string) => {
    const chain = editor.chain().focus();
    switch (type) {
      case 'p':
        chain.setParagraph().run();
        break;
      case 'h1':
        chain.toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        chain.toggleHeading({ level: 2 }).run();
        break;
      case 'h3':
        chain.toggleHeading({ level: 3 }).run();
        break;
      case 'quote':
        chain.toggleBlockquote().run();
        break;
      case 'code':
        chain.toggleCodeBlock().run();
        break;
      case 'bullet':
        chain.toggleBulletList().run();
        break;
      case 'ordered':
        chain.toggleOrderedList().run();
        break;
    }
  };

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (!url) return;
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const ToolBtn: React.FC<{
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
  }> = ({ onClick, active = false, title, children }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
        active
          ? 'bg-[#aeff00]/20 text-[#aeff00]'
          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden shadow-2xl relative">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            uploadAndInsertImage(e.target.files[0]);
          }
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
        className="hidden"
      />
      <input
        ref={multiFileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            uploadBatchImages(Array.from(e.target.files), 'grid-2');
          }
          if (multiFileInputRef.current) multiFileInputRef.current.value = '';
        }}
        className="hidden"
      />

      {/* ───────────────────────────────────────────────────────── */}
      {/* 1. TOP COMPREHENSIVE TYPOGRAPHY & MEDIA TOOLBAR          */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border-b border-zinc-800/80 bg-zinc-900/95 backdrop-blur-md text-xs">
        {/* Block Type Dropdown (P, H1, H2, H3, etc.) */}
        <select
          value={
            editor.isActive('heading', { level: 1 })
              ? 'h1'
              : editor.isActive('heading', { level: 2 })
              ? 'h2'
              : editor.isActive('heading', { level: 3 })
              ? 'h3'
              : editor.isActive('blockquote')
              ? 'quote'
              : editor.isActive('codeBlock')
              ? 'code'
              : editor.isActive('bulletList')
              ? 'bullet'
              : editor.isActive('orderedList')
              ? 'ordered'
              : 'p'
          }
          onChange={(e) => setBlockType(e.target.value)}
          className="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold focus:outline-none focus:border-[#aeff00] cursor-pointer"
        >
          <option value="p">¶ Paragraph (Body Text)</option>
          <option value="h1">H1 — Main Title Heading</option>
          <option value="h2">H2 — Section Subtitle</option>
          <option value="h3">H3 — Sub-Section Header</option>
          <option value="quote">❝ Blockquote / Callout</option>
          <option value="code">⌨ Code Block</option>
          <option value="bullet">• Bullet List</option>
          <option value="ordered">1. Numbered List</option>
        </select>

        {/* Font Family Selector Dropdown */}
        <select
          onChange={(e) => {
            if (e.target.value) {
              editor.chain().focus().setFontFamily(e.target.value).run();
            } else {
              editor.chain().focus().unsetFontFamily().run();
            }
          }}
          className="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs focus:outline-none focus:border-[#aeff00] cursor-pointer"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.label} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        {/* Font Size Selector Dropdown */}
        <select
          onChange={(e) => {
            if (e.target.value) {
              editor.chain().focus().setMark('textStyle', { fontSize: e.target.value }).run();
            } else {
              editor.chain().focus().unsetMark('textStyle').run();
            }
          }}
          className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono focus:outline-none focus:border-[#aeff00] cursor-pointer"
        >
          {FONT_SIZES.map((s) => (
            <option key={s.label} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <div className="w-px h-5 bg-zinc-800 mx-0.5" />

        {/* Basic Formatting */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold (Ctrl+B)">
          <Bold className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic (Ctrl+I)">
          <Italic className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline (Ctrl+U)">
          <UnderlineIcon className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <Strikethrough className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">
          <Highlighter className="w-3.5 h-3.5" />
        </ToolBtn>

        <div className="w-px h-5 bg-zinc-800 mx-0.5" />

        {/* Text Alignment */}
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
          <AlignLeft className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
          <AlignCenter className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
          <AlignRight className="w-3.5 h-3.5" />
        </ToolBtn>

        <div className="w-px h-5 bg-zinc-800 mx-0.5" />

        {/* Divider & Link */}
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider Line">
          <Minus className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onClick={addLink} active={editor.isActive('link')} title="Insert Link">
          <LinkIcon className="w-3.5 h-3.5" />
        </ToolBtn>

        <div className="w-px h-5 bg-zinc-800 mx-0.5" />

        {/* Media Block Tools */}
        <ToolBtn onClick={() => fileInputRef.current?.click()} title="Insert Image">
          <ImageIcon className="w-3.5 h-3.5 text-[#aeff00]" />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().insertContent({ type: 'imageGrid', attrs: { columns: 2, images: [] } }).run()}
          title="Insert 2-Column Grid"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().insertContent({ type: 'imageCarousel', attrs: { images: [] } }).run()}
          title="Insert Image Carousel"
        >
          <Sliders className="w-3.5 h-3.5" />
        </ToolBtn>

        <div className="w-px h-5 bg-zinc-800 mx-0.5" />

        {/* Color Picker */}
        <div className="flex items-center ml-0.5">
          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-5 h-5 rounded cursor-pointer bg-transparent border border-zinc-700 appearance-none p-0"
            title="Text Color"
          />
        </div>

        <div className="flex-1" />

        {/* Undo / Redo */}
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)">
          <Undo2 className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Y)">
          <Redo2 className="w-3.5 h-3.5" />
        </ToolBtn>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 2. EDITOR LIVE CANVAS                                     */}
      {/* ───────────────────────────────────────────────────────── */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('tiptap-live-canvas')) {
            editor.chain().focus().run();
          }
        }}
        onDragOver={(e) => {
          if (
            e.dataTransfer &&
            Array.from(e.dataTransfer.types || []).includes('Files') &&
            !Array.from(e.dataTransfer.types || []).includes('text/html') &&
            !Array.from(e.dataTransfer.types || []).includes('application/x-prosemirror-node-selection')
          ) {
            e.preventDefault();
            setIsDraggingOver(true);
          }
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as unknown as globalThis.Node)) {
            setIsDraggingOver(false);
          }
        }}
        className="relative overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: design?.backgroundColor || '#09090b',
        }}
      >
        {/* Live SVG Background Pattern */}
        {design?.backgroundPattern && design.backgroundPattern !== 'none' && (
          <BackgroundPattern
            pattern={design.backgroundPattern}
            primaryColor={design.primaryColor ? `${design.primaryColor}22` : 'rgba(174,255,0,0.09)'}
            accentColor={design.accentColor ? `${design.accentColor}18` : 'rgba(174,255,0,0.05)'}
          />
        )}

        {/* Drag & Drop Visual Overlay */}
        {isDraggingOver && (
          <div className="absolute inset-0 z-40 bg-zinc-950/85 backdrop-blur-sm border-2 border-dashed border-[#aeff00] rounded-lg flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150">
            <div className="w-16 h-16 rounded-full bg-[#aeff00]/15 border border-[#aeff00]/40 flex items-center justify-center text-[#aeff00] mb-3 animate-bounce shadow-lg shadow-[#aeff00]/10">
              <UploadCloud className="w-8 h-8" />
            </div>
            <p className="text-base font-semibold text-zinc-100">
              Drop image(s) here to upload to Cloudinary & insert
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Supports single images, grids, and carousels
            </p>
          </div>
        )}

        {/* Active Uploading Indicator */}
        {isUploading && (
          <div className="absolute bottom-5 right-5 z-40 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900/95 border border-[#aeff00]/50 shadow-2xl text-xs text-zinc-100 backdrop-blur-md animate-in slide-in-from-bottom-3">
            <Loader2 className="w-4 h-4 text-[#aeff00] animate-spin" />
            <span className="font-medium">Uploading to Cloudinary & staging...</span>
          </div>
        )}

        {/* Dynamic Typography & Visual Hierarchy Styles */}
        {(() => {
          const isLightBg = isLightColor(design?.backgroundColor);
          const defaultHeadingColor = isLightBg ? '#0d1310' : '#ffffff';
          const defaultTextColor = isLightBg ? '#374151' : '#f4f4f5';
          const effectiveHeadingColor = design?.primaryColor || defaultHeadingColor;
          const effectiveTextColor = design?.textColor || defaultTextColor;
          const effectiveAccentColor = design?.accentColor || (isLightBg ? '#168028' : '#aeff00');

          return (
            <style jsx global>{`
              .tiptap-live-canvas {
                font-family: ${design?.bodyFont ? `var(--font-${design.bodyFont}, inherit)` : 'inherit'};
                color: ${effectiveTextColor} !important;
              }
              .tiptap-live-canvas::after {
                content: '';
                display: table;
                clear: both;
              }
              .tiptap-live-canvas .project-carousel-wrapper {
                clear: both !important;
                margin: 2.5rem 0 !important;
                position: relative !important;
                z-index: 10 !important;
              }
              .tiptap-live-canvas .tiptap-image-grid {
                clear: both !important;
                margin: 2rem 0 !important;
                position: relative !important;
                z-index: 10 !important;
              }
              .tiptap-live-canvas .tiptap-block-center {
                clear: both !important;
              }
              .tiptap-live-canvas h1 {
                font-family: ${design?.headingFont ? `var(--font-${design.headingFont}, inherit)` : 'inherit'} !important;
                font-size: 2.25rem !important;
                font-weight: 800 !important;
                line-height: 1.2 !important;
                color: ${effectiveHeadingColor} !important;
                margin: 2rem 0 1rem 0 !important;
                border-bottom: 1px solid ${isLightBg ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.08)'};
                padding-bottom: 0.5rem;
              }
              .tiptap-live-canvas h2 {
                font-family: ${design?.headingFont ? `var(--font-${design.headingFont}, inherit)` : 'inherit'} !important;
                font-size: 1.65rem !important;
                font-weight: 700 !important;
                line-height: 1.25 !important;
                color: ${effectiveAccentColor} !important;
                margin: 1.75rem 0 0.75rem 0 !important;
              }
              .tiptap-live-canvas h3 {
                font-family: ${design?.headingFont ? `var(--font-${design.headingFont}, inherit)` : 'inherit'} !important;
                font-size: 1.25rem !important;
                font-weight: 600 !important;
                line-height: 1.35 !important;
                color: ${effectiveHeadingColor} !important;
                margin: 1.25rem 0 0.5rem 0 !important;
              }
              .tiptap-live-canvas p {
                font-size: 1.05rem !important;
                line-height: 1.8 !important;
                color: ${effectiveTextColor} !important;
                margin: 0.75rem 0 !important;
                min-height: 1.8em !important;
                word-break: break-word;
                overflow-wrap: anywhere;
              }
              .tiptap-live-canvas a {
                color: ${effectiveAccentColor} !important;
                text-decoration: underline;
              }
              .tiptap-live-canvas blockquote {
                border-left: 4px solid ${effectiveAccentColor} !important;
                background-color: ${isLightBg ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'} !important;
                border-radius: 0 0.5rem 0.5rem 0 !important;
                padding: 0.75rem 1.25rem !important;
                color: ${effectiveTextColor} !important;
                font-style: italic !important;
                color: ${effectiveTextColor} !important;
              }
              .tiptap-live-canvas code {
                color: ${effectiveAccentColor} !important;
                background-color: ${isLightBg ? 'rgba(0, 0, 0, 0.08)' : 'rgba(39, 39, 42, 0.8)'} !important;
                padding: 0.15rem 0.4rem !important;
                border-radius: 0.35rem !important;
                font-family: monospace !important;
              }
              .tiptap-live-canvas pre {
                background-color: ${isLightBg ? '#f3f4f6' : '#09090b'} !important;
                border: 1px solid ${isLightBg ? '#e5e7eb' : '#27272a'} !important;
                border-radius: 0.75rem !important;
                padding: 1rem 1.25rem !important;
                margin: 1.5rem 0 !important;
                clear: both !important;
              }
              .tiptap-live-canvas ul {
                list-style-type: disc !important;
                padding-left: 1.5rem !important;
                margin: 0.75rem 0 !important;
              }
              .tiptap-live-canvas ol {
                list-style-type: decimal !important;
                padding-left: 1.5rem !important;
                margin: 0.75rem 0 !important;
              }
              .tiptap-live-canvas li {
                margin: 0.35rem 0 !important;
              }
            `}</style>
          );
        })()}

        {/* TipTap Editor Content */}
        <div className="relative z-10">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
