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

  // Softer, eye-friendly connection dot style (very low opacity, no glare)
  const handleDotStyle = '!h-2 !w-2 !bg-[#aeff00]/30 !border !border-zinc-800 shadow-none hover:!bg-[#aeff00]/80 transition-colors';

  // Info HoverCard Tooltip Popover
  const renderInfoBadge = () => {
    if (!infoClickable) return null;

    return (
      <HoverCard openDelay={100} closeDelay={150}>
        <HoverCardTrigger asChild>
          <button
            type="button"
            className="absolute -top-1.5 -right-1.5 z-20 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-yellow-400/50 bg-black/90 text-[9px] font-bold text-yellow-300 hover:scale-110 transition-transform cursor-pointer shadow-sm"
          >
            i
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          side="top"
          align="center"
          className="z-50 w-72 rounded-lg border border-zinc-800 bg-[#0c130e]/95 p-3 text-zinc-100 shadow-xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 pb-1.5">
            <span className="font-bold text-xs text-white tracking-tight">{title}</span>
            {tag && (
              <span className="rounded bg-[#aeff00]/10 px-1.5 py-0.2 font-mono text-[9px] font-bold text-[#aeff00] border border-[#aeff00]/20">
                {tag}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-300">
            {details || 'Executes automated data transformation and sync across active connected pipelines.'}
          </p>
          <div className="mt-2 flex items-center justify-between border-t border-zinc-800/60 pt-1.5 font-mono text-[10px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
        <div className="relative flex min-w-[195px] flex-col rounded-xl border border-emerald-500/30 bg-[#101b13] p-3 shadow-none">
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
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-950/60 text-indigo-300">
              <Bot className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold tracking-tight text-white">{title}</span>
          </div>

          {/* Bottom Sub-pins Row */}
          <div className="mt-2.5 flex items-center justify-between gap-1.5 border-t border-white/10 pt-1.5 font-mono text-[9px] text-zinc-400">
            {/* Chat Model sub-pin with bottom handle */}
            <div className="relative flex items-center gap-1 rounded border border-white/10 bg-black/60 px-1.5 py-0.5">
              <span>Chat Model*</span>
              <Handle
                type="source"
                id="chat-model-handle"
                position={Position.Bottom}
                className="!h-2 !w-2 !bg-[#aeff00]/30 !border !border-zinc-800 !-bottom-1 hover:!bg-[#aeff00]/80 transition-colors"
              />
            </div>
            <span className="rounded border border-white/10 bg-black/60 px-1.5 py-0.5">
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
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#141b16] shadow-none">
          {renderInfoBadge()}
          <Handle
            type="target"
            position={Position.Top}
            className={`${handleDotStyle} !-top-1`}
          />
          <OpenRouterIcon className="h-5 w-5" />
        </div>

        <div className="mt-1.5 flex flex-col items-center text-center">
          <span className="text-[11px] font-bold tracking-tight text-white">{title}</span>
          {subtitle && (
            <span className="mt-0.5 font-mono text-[9px] font-medium text-[#aeff00]/80">
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
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-[#221a0f] shadow-none">
          {renderInfoBadge()}
          {nodeType === 'webhook' ? <WebhookIcon className="h-5 w-5" /> : <TriggerIcon className="h-5 w-5" />}
          <Handle
            type="source"
            position={Position.Right}
            className={`${handleDotStyle} !-right-1`}
          />
        </div>

        <div className="mt-1.5 max-w-[110px] text-center">
          <span className="text-[11px] font-bold tracking-tight text-white leading-tight block">
            {title}
          </span>
          {subtitle && (
            <p className="mt-0.5 font-mono text-[9px] text-zinc-400 leading-tight">
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
        return 'border-zinc-700/80 bg-[#191919] text-white';
      case 'sheets':
        return 'border-emerald-600/40 bg-[#0e2319] text-emerald-300';
      case 'postgres':
        return 'border-sky-600/40 bg-[#0d1d2b] text-sky-300';
      case 'python':
        return 'border-blue-500/30 bg-[#0f1b29] text-blue-300';
      case 'pinecone':
        return 'border-emerald-500/30 bg-[#0b1c14] text-emerald-300';
      case 'apollo':
        return 'border-purple-500/30 bg-[#161226] text-purple-300';
      case 'slack':
        return 'border-pink-500/30 bg-[#23121d] text-pink-300';
      case 'stripe':
        return 'border-indigo-500/30 bg-[#18142a] text-indigo-300';
      case 'crm':
        return 'border-orange-500/30 bg-[#26160f] text-orange-300';
      case 'edit':
        return 'border-indigo-500/30 bg-[#17162b] text-indigo-300';
      case 'filter':
        return 'border-blue-500/40 bg-[#0f1d2e] text-blue-300';
      default:
        return 'border-zinc-700 bg-[#141b16] text-zinc-200';
    }
  };

  const renderIcon = () => {
    switch (nodeType) {
      case 'notion':
        return <NotionIcon className="h-5 w-5 text-white" />;
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
          <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600/90 text-white shadow-sm">
            <Filter className="h-3.5 w-3.5" />
          </div>
        );
      default:
        return <Info className="h-4 w-4 text-zinc-300" />;
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`relative flex h-11 w-11 items-center justify-center rounded-xl border shadow-none transition-colors ${getNodeTileStyle()}`}
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
        <span className="text-[11px] font-bold tracking-tight text-white leading-tight block">
          {title}
        </span>
        {subtitle && (
          <p className="mt-0.5 font-mono text-[9px] text-zinc-400 leading-tight">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
