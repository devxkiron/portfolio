'use client';

import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Filter, Bot, Info } from 'lucide-react';
import type { ArchitectureNode } from '../types';
import {
  NotionIcon,
  GoogleSheetsIcon,
  PostgresIcon,
  PythonIcon,
  PineconeIcon,
  SlackIcon,
  StripeIcon,
  HubSpotIcon,
  TriggerIcon,
  WebhookIcon,
  ApolloIcon,
  OpenRouterIcon,
  PencilEditIcon,
} from '../icons/architecture-icons';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';

export const ArchitectureCustomNode: React.FC<NodeProps<ArchitectureNode>> = ({ data }) => {
  const { title, subtitle, nodeType, tag, details, infoClickable = true } = data;

  // Softer, subtle connection dot style (low opacity, smaller height)
  const handleDotStyle = '!h-1.5 !w-1.5 !bg-emerald-800/40 dark:!bg-[#aeff00]/30 !border !border-white/80 dark:!border-zinc-800 shadow-none hover:!bg-brand-neon hover:scale-125 transition-all';

  // Info HoverCard Tooltip Popover
  const renderInfoBadge = () => {
    if (!infoClickable) return null;

    return (
      <HoverCard openDelay={100} closeDelay={150}>
        <HoverCardTrigger asChild>
          <button
            type="button"
            className="absolute -top-1.5 -right-1.5 z-20 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-amber-500/60 dark:border-yellow-400/50 bg-amber-100 dark:bg-black/90 text-[9px] font-bold text-amber-900 dark:text-yellow-300 hover:scale-110 transition-transform cursor-pointer shadow-xs"
          >
            i
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          side="top"
          align="center"
          className="z-50 w-72 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#0c130e]/95 p-3 text-zinc-900 dark:text-zinc-100 shadow-xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800/80 pb-1.5">
            <span className="font-bold text-xs text-zinc-950 dark:text-white tracking-tight">{title}</span>
            {tag && (
              <span className="rounded bg-emerald-100 dark:bg-[#aeff00]/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-900 dark:text-[#aeff00] border border-emerald-300 dark:border-[#aeff00]/20">
                {tag}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {details || 'Executes automated data transformation and sync across active connected pipelines.'}
          </p>
          <div className="mt-2 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800/60 pt-1.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>Pipeline Active</span>
            </div>
            <span className="text-zinc-500">&lt; 15ms</span>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  // 1. AI AGENT WIDE CARD
  if (nodeType === 'ai-agent') {
    return (
      <div className="relative flex flex-col items-center">
        <div className="relative flex min-w-[205px] flex-col rounded-xl border-2 border-emerald-600/70 dark:border-emerald-500/30 bg-white dark:bg-[#101b13] p-3 shadow-[0_4px_16px_rgba(16,185,129,0.14),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-none transition-colors">
          {/* Target Handle: Left */}
          <Handle
            type="target"
            position={Position.Left}
            className={`${handleDotStyle} !-left-1`}
          />

          {/* Info Badge with Popover */}
          {renderInfoBadge()}

          {/* Top Row: Icon + Title */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-300 dark:border-indigo-400/20 bg-emerald-100 dark:bg-indigo-950/60 text-emerald-800 dark:text-indigo-300">
              <Bot className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold tracking-tight text-zinc-950 dark:text-white">{title}</span>
          </div>

          {/* Bottom Sub-pins Row */}
          <div className="mt-2.5 flex items-center justify-between gap-1.5 border-t border-zinc-200 dark:border-white/10 pt-2 font-mono text-[9px] text-zinc-600 dark:text-zinc-400">
            {/* Chat Model sub-pin with bottom handle */}
            <div className="relative flex items-center gap-1 rounded border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black/60 px-1.5 py-0.5 font-semibold text-zinc-800 dark:text-zinc-300">
              <span>Chat Model*</span>
              <Handle
                type="source"
                id="chat-model-handle"
                position={Position.Bottom}
                className="!h-1.5 !w-1.5 !bg-emerald-700/40 dark:!bg-[#aeff00]/30 !border !border-white/80 dark:!border-zinc-800 !-bottom-1 hover:!bg-brand-neon transition-colors"
              />
            </div>
            <span className="rounded border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black/60 px-1.5 py-0.5 font-semibold text-zinc-800 dark:text-zinc-300">
              Memory Tool
            </span>
          </div>

          {/* Source Handle: Right */}
          <Handle
            type="source"
            position={Position.Right}
            className={`${handleDotStyle} !-right-1`}
          />
        </div>
      </div>
    );
  }

  // 2. OPENROUTER / CHAT MODEL (Vertical connection to AI Agent)
  if (nodeType === 'router') {
    return (
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 dark:border-white/15 bg-white dark:bg-[#141b16] shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-none transition-colors">
          {renderInfoBadge()}
          <Handle
            type="target"
            position={Position.Top}
            className={`${handleDotStyle} !-top-1`}
          />
          <OpenRouterIcon className="h-5 w-5" />
        </div>

        <div className="mt-1.5 flex flex-col items-center text-center">
          <span className="text-[11px] font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">{title}</span>
          {subtitle && (
            <span className="mt-0.5 font-mono text-[9px] font-semibold text-emerald-900 dark:text-[#aeff00]/80">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. TRIGGER / WEBHOOK NODE
  if (nodeType === 'trigger' || nodeType === 'webhook') {
    return (
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/80 dark:border-amber-500/30 bg-amber-50 dark:bg-[#221a0f] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-none transition-colors">
          {renderInfoBadge()}
          {nodeType === 'webhook' ? <WebhookIcon className="h-5 w-5" /> : <TriggerIcon className="h-5 w-5" />}
          <Handle
            type="source"
            position={Position.Right}
            className={`${handleDotStyle} !-right-1`}
          />
        </div>

        <div className="mt-1.5 max-w-[110px] text-center">
          <span className="text-[11px] font-bold tracking-tight text-zinc-950 dark:text-white leading-tight block">
            {title}
          </span>
          {subtitle && (
            <p className="mt-0.5 font-mono text-[9px] font-medium text-zinc-700 dark:text-zinc-400 leading-tight">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 4. REGULAR INTEGRATION NODES (Realistic App Branded Tile Containers)
  const getNodeTileStyle = () => {
    switch (nodeType) {
      case 'notion':
        return 'border-zinc-300 dark:border-zinc-700/80 bg-white dark:bg-[#191919]';
      case 'sheets':
        return 'border-emerald-300 dark:border-emerald-600/40 bg-white dark:bg-[#0e2319]';
      case 'postgres':
        return 'border-sky-300 dark:border-sky-600/40 bg-white dark:bg-[#0d1d2b]';
      case 'python':
        return 'border-blue-300 dark:border-blue-500/30 bg-white dark:bg-[#0f1b29]';
      case 'pinecone':
        return 'border-emerald-300 dark:border-emerald-500/30 bg-white dark:bg-[#0b1c14]';
      case 'apollo':
        return 'border-purple-300 dark:border-purple-500/30 bg-white dark:bg-[#161226]';
      case 'slack':
        return 'border-pink-300 dark:border-pink-500/30 bg-white dark:bg-[#23121d]';
      case 'stripe':
        return 'border-indigo-300 dark:border-indigo-500/30 bg-white dark:bg-[#18142a]';
      case 'crm':
        return 'border-orange-300 dark:border-orange-500/30 bg-white dark:bg-[#26160f]';
      case 'edit':
        return 'border-indigo-300 dark:border-indigo-500/30 bg-white dark:bg-[#17162b]';
      case 'filter':
        return 'border-blue-300 dark:border-blue-500/40 bg-white dark:bg-[#0f1d2e]';
      default:
        return 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#141b16]';
    }
  };

  const renderIcon = () => {
    switch (nodeType) {
      case 'notion':
        return <NotionIcon className="h-5 w-5 text-zinc-900 dark:text-white" />;
      case 'sheets':
        return <GoogleSheetsIcon className="h-5 w-5" />;
      case 'postgres':
        return <PostgresIcon className="h-5 w-5" />;
      case 'python':
        return <PythonIcon className="h-5 w-5" />;
      case 'pinecone':
        return <PineconeIcon className="h-5 w-5" />;
      case 'apollo':
        return <ApolloIcon className="h-5 w-5" />;
      case 'slack':
        return <SlackIcon className="h-5 w-5" />;
      case 'stripe':
        return <StripeIcon className="h-5 w-5" />;
      case 'crm':
        return <HubSpotIcon className="h-5 w-5" />;
      case 'edit':
        return <PencilEditIcon className="h-5 w-5" />;
      case 'filter':
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600/90 text-white shadow-xs">
            <Filter className="h-3.5 w-3.5" />
          </div>
        );
      default:
        return <Info className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />;
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`relative flex h-11 w-11 items-center justify-center rounded-xl border shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-none transition-colors ${getNodeTileStyle()}`}
      >
        <Handle
          type="target"
          position={Position.Left}
          className={`${handleDotStyle} !-left-1`}
        />

        {renderInfoBadge()}

        {renderIcon()}

        <Handle
          type="source"
          position={Position.Right}
          className={`${handleDotStyle} !-right-1`}
        />
      </div>

      <div className="mt-1.5 max-w-[125px] text-center">
        <span className="text-[11px] font-bold tracking-tight text-zinc-950 dark:text-white leading-tight block">
          {title}
        </span>
        {subtitle && (
          <p className="mt-0.5 font-mono text-[9px] font-medium text-emerald-900 dark:text-zinc-400 leading-tight">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
