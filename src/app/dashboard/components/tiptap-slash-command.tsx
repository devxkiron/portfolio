'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Extension } from '@tiptap/core';
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Image as ImageIcon,
  LayoutGrid,
  Sliders,
  Type,
  Sparkles,
} from 'lucide-react';

export interface SlashCommandItem {
  title: string;
  description: string;
  category: 'Media & Layouts' | 'Basic Blocks';
  icon: React.ComponentType<{ className?: string }>;
  aliases?: string[];
  command: (props: { editor: any; range: any }) => void;
}

export const getSlashCommands = (onTriggerImageUpload?: () => void): SlashCommandItem[] => [
  {
    title: 'Single Image',
    description: 'Insert an image with resize and alignment controls',
    category: 'Media & Layouts',
    icon: ImageIcon,
    aliases: ['image', 'img', 'upload', 'photo', 'picture'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      if (onTriggerImageUpload) {
        onTriggerImageUpload();
      } else {
        editor.chain().focus().insertContent({
          type: 'resizableImage',
          attrs: { src: '', width: '100%', alignment: 'center' },
        }).run();
      }
    },
  },
  {
    title: '2-Column Image Grid',
    description: 'Side-by-side two column image layout',
    category: 'Media & Layouts',
    icon: LayoutGrid,
    aliases: ['grid', 'grid2', 'col2', '2col', 'columns'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent({
        type: 'imageGrid',
        attrs: { columns: 2, images: [] },
      }).run();
    },
  },
  {
    title: '3-Column Image Grid',
    description: 'Responsive three column image layout',
    category: 'Media & Layouts',
    icon: LayoutGrid,
    aliases: ['grid3', 'col3', '3col'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent({
        type: 'imageGrid',
        attrs: { columns: 3, images: [] },
      }).run();
    },
  },
  {
    title: 'Image Carousel Slider',
    description: 'Interactive swipeable image carousel',
    category: 'Media & Layouts',
    icon: Sliders,
    aliases: ['carousel', 'slider', 'gallery', 'slides'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent({
        type: 'imageCarousel',
        attrs: { images: [] },
      }).run();
    },
  },
  {
    title: 'Heading 1',
    description: 'Large main section title',
    category: 'Basic Blocks',
    icon: Heading1,
    aliases: ['h1', 'title', 'big'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
    },
  },
  {
    title: 'Heading 2',
    description: 'Medium sub-section header',
    category: 'Basic Blocks',
    icon: Heading2,
    aliases: ['h2', 'subtitle', 'header'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
    },
  },
  {
    title: 'Heading 3',
    description: 'Small topic heading',
    category: 'Basic Blocks',
    icon: Heading3,
    aliases: ['h3', 'subheading'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
    },
  },
  {
    title: 'Paragraph',
    description: 'Plain body text paragraph',
    category: 'Basic Blocks',
    icon: Type,
    aliases: ['p', 'text', 'body', 'plain'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    title: 'Bullet List',
    description: 'Create an unordered bulleted list',
    category: 'Basic Blocks',
    icon: List,
    aliases: ['bullet', 'ul', 'list', 'points'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: 'Numbered List',
    description: 'Create a sequential numbered list',
    category: 'Basic Blocks',
    icon: ListOrdered,
    aliases: ['numbered', 'ol', 'order', 'num'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: 'Quote Block',
    description: 'Highlighted callout or quotation block',
    category: 'Basic Blocks',
    icon: Quote,
    aliases: ['quote', 'blockquote', 'callout'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: 'Code Block',
    description: 'Preformatted code snippet container',
    category: 'Basic Blocks',
    icon: Code,
    aliases: ['code', 'snippet', 'syntax'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: 'Divider Line',
    description: 'Horizontal line separator',
    category: 'Basic Blocks',
    icon: Minus,
    aliases: ['divider', 'line', 'separator', 'hr'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
];

// Floating Command List Component
export interface CommandListProps {
  items: SlashCommandItem[];
  command: (item: SlashCommandItem) => void;
}

export const CommandList = forwardRef<any, CommandListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev <= 0 ? props.items.length - 1 : prev - 1));
        return true;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev >= props.items.length - 1 ? 0 : prev + 1));
        return true;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  if (props.items.length === 0) {
    return (
      <div className="w-64 p-3 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl text-xs text-zinc-500 text-center font-mono">
        No commands found
      </div>
    );
  }

  return (
    <div className="w-80 max-h-84 overflow-y-auto p-2 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-700/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-1 z-[9999]">
      <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 flex items-center justify-between mb-1">
        <span className="flex items-center gap-1.5 font-bold text-zinc-200">
          <Sparkles className="w-3 h-3 text-[#aeff00]" />
          Notion Blocks
        </span>
        <span className="text-[#aeff00] text-[9px]">↑↓ navigate • ↵ select</span>
      </div>

      {props.items.map((item, index) => {
        const Icon = item.icon;
        const isSelected = index === selectedIndex;

        return (
          <button
            key={item.title}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              selectItem(index);
            }}
            onClick={() => selectItem(index)}
            onMouseEnter={() => setSelectedIndex(index)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
              isSelected
                ? 'bg-zinc-800 text-zinc-100 ring-1 ring-[#aeff00]/60 shadow-md'
                : 'text-zinc-300 hover:bg-zinc-900/90'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                isSelected
                  ? 'bg-[#aeff00] text-black shadow-md shadow-[#aeff00]/30'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                <span>{item.title}</span>
                {item.category === 'Media & Layouts' && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#aeff00]/15 text-[#aeff00] font-normal">
                    Media
                  </span>
                )}
              </div>
              <div className="text-[10px] text-zinc-400 truncate mt-0.5">
                {item.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
});

CommandList.displayName = 'CommandList';

// Slash Commands TipTap Extension
export const createSlashCommandExtension = (onTriggerImageUpload?: () => void) => {
  const allCommands = getSlashCommands(onTriggerImageUpload);

  return Extension.create({
    name: 'slashCommands',

    addOptions() {
      return {
        suggestion: {
          char: '/',
          allowSpaces: false,
          allowedPrefixes: null,
          startOfLine: false,
          floatingUi: {
            strategy: 'fixed',
          },
          command: ({ editor, range, props }: any) => {
            props.command({ editor, range });
          },
          items: ({ query }: { query: string }) => {
            const q = query.toLowerCase().trim();
            if (!q) return allCommands;
            return allCommands.filter(
              (item) =>
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.aliases?.some((a) => a.includes(q))
            );
          },
          render: () => {
            let component: ReactRenderer<any> | null = null;
            let unmount: (() => void) | null = null;

            return {
              onStart: (props: any) => {
                component = new ReactRenderer(CommandList, {
                  props,
                  editor: props.editor,
                });

                if (props.mount) {
                  unmount = props.mount(component.element, {
                    onPosition: ({ x, y }: any) => {
                      if (component?.element) {
                        component.element.style.position = 'fixed';
                        component.element.style.left = `${Math.max(16, x)}px`;
                        component.element.style.top = `${y + 4}px`;
                        component.element.style.zIndex = '99999';
                        component.element.style.visibility = 'visible';
                        component.element.style.pointerEvents = 'auto';
                      }
                    },
                  });
                }
              },

              onUpdate(props: any) {
                component?.updateProps(props);
              },

              onKeyDown(props: any) {
                if (props.event.key === 'Escape') {
                  unmount?.();
                  return true;
                }
                return component?.ref?.onKeyDown(props) || false;
              },

              onExit() {
                unmount?.();
                component?.destroy();
                component = null;
                unmount = null;
              },
            };
          },
        } as Partial<SuggestionOptions>,
      };
    },

    addProseMirrorPlugins() {
      return [
        Suggestion({
          editor: this.editor,
          ...this.options.suggestion,
        }),
      ];
    },
  });
};
