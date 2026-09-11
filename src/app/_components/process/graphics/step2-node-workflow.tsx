'use client';

import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Zap, Filter, Bot, Globe } from 'lucide-react';
import {
  HubSpotIcon,
  StripeIcon,
  ClearbitIcon,
  GPT4oSwirlIcon,
} from '../icons/brand-icons';

interface WorkflowNodeData extends Record<string, unknown> {
  title: string;
  subtitle: string;
  iconType: 'webhook' | 'hubspot' | 'clearbit' | 'stripe' | 'verify' | 'filter' | 'ai-agent' | 'router';
}

type WorkflowNode = Node<WorkflowNodeData, 'workflowNode'>;

// Authentic n8n-style Glassy Node Renderer with Center-Aligned Handles
const CustomWorkflowNode: React.FC<NodeProps<WorkflowNode>> = ({ data }) => {
  const { title, subtitle, iconType } = data;

  // 1. AI Agent: Wide rectangular glassmorphic card
  if (iconType === 'ai-agent') {
    return (
      <div className="relative flex flex-col items-center">
        {/* Main Card with Glassmorphic Effect */}
        <div className="relative flex flex-col rounded-2xl border border-white/15 bg-[#142318]/75 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md min-w-[170px]">
          {/* Target Handle: Centered on the left */}
          <Handle
            type="target"
            position={Position.Left}
            className="!h-2 !w-2 !-left-1 !bg-brand-neon/50 !border !border-black/70 shadow-sm"
          />

          {/* Top Row: Icon + Title */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-950/60 text-indigo-300 shadow-md">
              <Bot className="h-5 w-5" />
            </div>
            <span className="text-sm font-extrabold tracking-tight text-white">{title}</span>
          </div>

          {/* Bottom Row: Sub-pins */}
          <div className="mt-2.5 flex items-center gap-1.5 font-mono text-[9px] text-zinc-400">
            <span className="rounded border border-white/10 bg-black/50 px-2 py-0.5">
              Chat Model*
            </span>
            <span className="rounded border border-white/10 bg-black/50 px-2 py-0.5">
              Memory Tool
            </span>
          </div>

          {/* Source Handle: Centered at the bottom */}
          <Handle
            type="source"
            position={Position.Bottom}
            className="!h-2 !w-2 !-bottom-1 !bg-brand-neon/50 !border !border-black/70 shadow-sm"
          />
        </div>
      </div>
    );
  }

  // 2. GPT-4o Router: Circular node with authentic swirl icon
  if (iconType === 'router') {
    return (
      <div className="relative flex flex-col items-center">
        {/* Main Circular Glass Tile */}
        <div className="relative flex h-13 w-13 items-center justify-center rounded-full border border-emerald-500/40 bg-[#0d1c12]/80 text-brand-neon shadow-[0_0_18px_rgba(174,255,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-md">
          {/* Target Handle: Centered at the top */}
          <Handle
            type="target"
            position={Position.Top}
            className="!h-2 !w-2 !-top-1 !bg-brand-neon/50 !border !border-black/70 shadow-sm"
          />

          <GPT4oSwirlIcon className="h-6 w-6 text-brand-neon" />
        </div>

        {/* Labels below */}
        <div className="mt-1.5 flex flex-col items-center">
          <span className="font-mono text-[10px] font-bold text-white tracking-tight">
            {title}
          </span>
          <span className="font-mono text-[8px] font-medium text-brand-neon">
            {subtitle}
          </span>
        </div>
      </div>
    );
  }

  // 3. Standard n8n squircle node tile
  const renderIconBadge = () => {
    switch (iconType) {
      case 'webhook':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-950/40 text-amber-400 shadow-md">
            <Zap className="h-5 w-5 fill-amber-400" />
          </div>
        );
      case 'hubspot':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff7a59] text-white shadow-md">
            <HubSpotIcon className="h-5 w-5" />
          </div>
        );
      case 'clearbit':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1b68f5] text-white shadow-md">
            <ClearbitIcon className="h-5 w-5" />
          </div>
        );
      case 'stripe':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#635bff] text-white shadow-md">
            <StripeIcon className="h-5 w-5" />
          </div>
        );
      case 'verify':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00875a] text-white shadow-md">
            <Globe className="h-5 w-5" />
          </div>
        );
      case 'filter':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0052cc] text-white shadow-md">
            <Filter className="h-5 w-5" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Main squircle card with glassmorphism */}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-[#142217]/75 shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-md transition-transform hover:scale-105">
        {/* Target Handle (Left) — located INSIDE the squircle for perfect vertical centering */}
        {iconType !== 'webhook' && (
          <Handle
            type="target"
            position={Position.Left}
            className="!h-2 !w-2 !-left-1 !bg-brand-neon/50 !border !border-black/70 shadow-sm"
          />
        )}

        {renderIconBadge()}

        {/* Source Handle (Right) — located INSIDE the squircle for perfect vertical centering */}
        <Handle
          type="source"
          position={Position.Right}
          className="!h-2 !w-2 !-right-1 !bg-brand-neon/50 !border !border-black/70 shadow-sm"
        />
      </div>

      {/* Labels below the node */}
      <div className="mt-2 flex flex-col items-center text-center">
        <span className="whitespace-nowrap text-[11px] font-bold tracking-tight text-white">
          {title}
        </span>
        <span className="whitespace-nowrap font-mono text-[9px] text-zinc-500">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

const initialNodes: WorkflowNode[] = [
  {
    id: 'webhook',
    type: 'workflowNode',
    position: { x: 25, y: 125 },
    data: {
      title: 'Inbound Webhook',
      subtitle: "'new_lead_event'",
      iconType: 'webhook',
    },
  },
  {
    id: 'hubspot',
    type: 'workflowNode',
    position: { x: 185, y: 30 },
    data: {
      title: 'HubSpot CRM',
      subtitle: 'get: contact_info',
      iconType: 'hubspot',
    },
  },
  {
    id: 'clearbit',
    type: 'workflowNode',
    position: { x: 335, y: 30 },
    data: {
      title: 'Enrich Company',
      subtitle: 'clearbit / api',
      iconType: 'clearbit',
    },
  },
  {
    id: 'stripe',
    type: 'workflowNode',
    position: { x: 185, y: 215 },
    data: {
      title: 'Stripe Billing',
      subtitle: 'read: history',
      iconType: 'stripe',
    },
  },
  {
    id: 'verify',
    type: 'workflowNode',
    position: { x: 335, y: 215 },
    data: {
      title: 'Verify Domain',
      subtitle: 'dns: secure',
      iconType: 'verify',
    },
  },
  {
    id: 'filter',
    type: 'workflowNode',
    position: { x: 485, y: 125 },
    data: {
      title: 'Lead Filter',
      subtitle: 'score: >= 80',
      iconType: 'filter',
    },
  },
  {
    id: 'ai-agent',
    type: 'workflowNode',
    position: { x: 635, y: 100 },
    data: {
      title: 'AI Agent',
      subtitle: '',
      iconType: 'ai-agent',
    },
  },
  {
    id: 'router',
    type: 'workflowNode',
    position: { x: 660, y: 245 },
    data: {
      title: 'GPT-4o Router',
      subtitle: 'deepseek / gpt-4o',
      iconType: 'router',
    },
  },
];

// Refined soft connection edge style
const edgeStyle = {
  stroke: 'rgba(174, 255, 0, 0.4)',
  strokeWidth: 1.5,
  strokeDasharray: '4 4',
};

const initialEdges: Edge[] = [
  {
    id: 'e-webhook-hubspot',
    source: 'webhook',
    target: 'hubspot',
    animated: true,
    style: edgeStyle,
  },
  {
    id: 'e-webhook-stripe',
    source: 'webhook',
    target: 'stripe',
    animated: true,
    style: edgeStyle,
  },
  {
    id: 'e-hubspot-clearbit',
    source: 'hubspot',
    target: 'clearbit',
    animated: true,
    style: edgeStyle,
  },
  {
    id: 'e-stripe-verify',
    source: 'stripe',
    target: 'verify',
    animated: true,
    style: edgeStyle,
  },
  {
    id: 'e-clearbit-filter',
    source: 'clearbit',
    target: 'filter',
    animated: true,
    style: edgeStyle,
  },
  {
    id: 'e-verify-filter',
    source: 'verify',
    target: 'filter',
    animated: true,
    style: edgeStyle,
  },
  {
    id: 'e-filter-agent',
    source: 'filter',
    target: 'ai-agent',
    animated: true,
    label: (
      <span className="rounded border border-brand-neon/30 bg-black/90 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-brand-neon/70 shadow-sm">
        Kept
      </span>
    ),
    labelStyle: { fill: '#aeff00' },
    style: {
      stroke: 'rgba(174, 255, 0, 0.45)',
      strokeWidth: 1.6,
      strokeDasharray: '4 4',
    },
  },
  {
    id: 'e-agent-router',
    source: 'ai-agent',
    target: 'router',
    animated: true,
    style: edgeStyle,
  },
];

export const Step2NodeWorkflow: React.FC = () => {
  const nodeTypes = useMemo(() => ({ workflowNode: CustomWorkflowNode }), []);

  return (
    <div
      className="relative h-[440px] w-full min-h-[420px] sm:h-[460px] lg:h-[480px] overflow-hidden bg-[#080d09]"
      style={{
        backgroundImage: 'radial-gradient(rgba(174, 255, 0, 0.2) 1.2px, transparent 1.2px)',
        backgroundSize: '20px 20px',
      }}
    >
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.16 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={false}
        preventScrolling={false}
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.2}
          color="rgba(174, 255, 0, 0.2)"
        />
      </ReactFlow>
    </div>
  );
};
