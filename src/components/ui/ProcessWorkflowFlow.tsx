"use client";

import React, { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Handle,
  Position,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Zap, Filter, Bot, ShieldCheck } from "lucide-react";
import { HubSpotIcon, StripeIcon, EnrichIcon } from "../common/BrandIcons";

// Custom Webhook Trigger Node
const WebhookNode = ({ data }: { data: { label: string; sublabel: string } }) => (
  <div className="px-3 py-2 rounded-xl bg-[#262118] border border-amber-500/50 shadow-md text-center min-w-[120px]">
    <div className="w-6 h-6 mx-auto rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1">
      <Zap className="w-3.5 h-3.5" />
    </div>
    <span className="text-[11px] font-bold text-white block">{data.label}</span>
    <span className="text-[9px] font-mono text-amber-400/80">{data.sublabel}</span>
    <Handle
      type="source"
      position={Position.Right}
      className="!bg-amber-400 !w-1.5 !h-1.5 !border-none"
    />
  </div>
);

// Custom Tool Integration Node (HubSpot, Stripe, etc.)
const ToolNode = ({
  data,
}: {
  data: { label: string; icon: "hubspot" | "enrich" | "stripe" | "verify"; color: string };
}) => {
  const getIcon = () => {
    switch (data.icon) {
      case "hubspot":
        return <HubSpotIcon className="w-3 h-3 text-[#ff7a59]" />;
      case "stripe":
        return <StripeIcon className="w-3 h-3 text-[#635bff]" />;
      case "enrich":
        return <EnrichIcon className="w-3 h-3 text-[#00b4d8]" />;
      case "verify":
        return <ShieldCheck className="w-3 h-3 text-emerald-400" />;
    }
  };

  return (
    <div className="px-2.5 py-1.5 rounded-lg bg-black/80 border border-white/15 text-[10px] text-white flex items-center gap-1.5 shadow-sm min-w-[105px]">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white/40 !w-1.5 !h-1.5 !border-none"
      />
      <div className="flex-shrink-0">{getIcon()}</div>
      <span className="font-medium truncate">{data.label}</span>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-[var(--brand-neon)] !w-1.5 !h-1.5 !border-none"
      />
    </div>
  );
};

// Custom Filter Node
const FilterNode = ({ data }: { data: { label: string; sublabel: string } }) => (
  <div className="p-2 rounded-xl bg-[#0c181a] border border-cyan-500/40 text-center shadow-md min-w-[85px]">
    <Handle
      type="target"
      position={Position.Left}
      className="!bg-cyan-400 !w-1.5 !h-1.5 !border-none"
    />
    <Filter className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-0.5" />
    <span className="text-[9px] font-mono text-white/90 block font-semibold">
      {data.label}
    </span>
    <span className="text-[8px] font-mono text-cyan-400">{data.sublabel}</span>
    <Handle
      type="source"
      position={Position.Right}
      className="!bg-cyan-400 !w-1.5 !h-1.5 !border-none"
    />
  </div>
);

// Custom AI Agent Node
const AgentNode = ({ data }: { data: { label: string; sublabel: string } }) => (
  <div className="px-3 py-2 rounded-xl bg-[#142318] border border-[var(--brand-neon)]/60 text-center shadow-[0_0_15px_rgba(174,255,0,0.15)] min-w-[125px]">
    <Handle
      type="target"
      position={Position.Left}
      className="!bg-[var(--brand-neon)] !w-1.5 !h-1.5 !border-none"
    />
    <div className="flex items-center justify-center gap-1.5 mb-1">
      <Bot className="w-4 h-4 text-[var(--brand-neon)]" />
      <span className="text-[11px] font-bold text-white">{data.label}</span>
    </div>
    <span className="text-[9px] font-mono text-[var(--brand-neon)] block">
      {data.sublabel}
    </span>
    <Handle
      type="source"
      position={Position.Bottom}
      className="!bg-[var(--brand-neon)] !w-1.5 !h-1.5 !border-none"
    />
  </div>
);

// Custom Router Output Node
const RouterNode = ({ data }: { data: { label: string } }) => (
  <div className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 flex items-center gap-1 shadow-sm">
    <Handle
      type="target"
      position={Position.Top}
      className="!bg-emerald-400 !w-1.5 !h-1.5 !border-none"
    />
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-neon)] animate-ping" />
    <span>{data.label}</span>
  </div>
);

export const ProcessWorkflowFlow: React.FC = () => {
  const nodeTypes = useMemo(
    () => ({
      webhookNode: WebhookNode,
      toolNode: ToolNode,
      filterNode: FilterNode,
      agentNode: AgentNode,
      routerNode: RouterNode,
    }),
    []
  );

  const initialNodes: Node[] = [
    {
      id: "webhook",
      type: "webhookNode",
      position: { x: 10, y: 75 },
      data: { label: "Inbound Webhook", sublabel: "POST /webhook" },
    },
    {
      id: "hubspot",
      type: "toolNode",
      position: { x: 175, y: 15 },
      data: { label: "HubSpot CRM", icon: "hubspot", color: "#ff7a59" },
    },
    {
      id: "enrich",
      type: "toolNode",
      position: { x: 175, y: 65 },
      data: { label: "Enrich Company", icon: "enrich", color: "#00b4d8" },
    },
    {
      id: "stripe",
      type: "toolNode",
      position: { x: 175, y: 115 },
      data: { label: "Stripe Billing", icon: "stripe", color: "#635bff" },
    },
    {
      id: "verify",
      type: "toolNode",
      position: { x: 175, y: 165 },
      data: { label: "Verify Domain", icon: "verify", color: "#10b981" },
    },
    {
      id: "filter",
      type: "filterNode",
      position: { x: 330, y: 78 },
      data: { label: "Lead Filter", sublabel: "Score > 75" },
    },
    {
      id: "agent",
      type: "agentNode",
      position: { x: 450, y: 55 },
      data: { label: "AI Agent", sublabel: "Chat Model | Memory Tied" },
    },
    {
      id: "router",
      type: "routerNode",
      position: { x: 460, y: 165 },
      data: { label: "Auto-Router | gpt-4o" },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: "e-webhook-hubspot",
      source: "webhook",
      target: "hubspot",
      animated: true,
      style: { stroke: "#fb923c", strokeWidth: 1.5, strokeDasharray: "4 4" },
    },
    {
      id: "e-webhook-enrich",
      source: "webhook",
      target: "enrich",
      animated: true,
      style: { stroke: "#38bdf8", strokeWidth: 1.5, strokeDasharray: "4 4" },
    },
    {
      id: "e-webhook-stripe",
      source: "webhook",
      target: "stripe",
      animated: true,
      style: { stroke: "#a855f7", strokeWidth: 1.5, strokeDasharray: "4 4" },
    },
    {
      id: "e-webhook-verify",
      source: "webhook",
      target: "verify",
      animated: true,
      style: { stroke: "#34d399", strokeWidth: 1.5, strokeDasharray: "4 4" },
    },
    {
      id: "e-hubspot-filter",
      source: "hubspot",
      target: "filter",
      animated: true,
      style: { stroke: "#aeff00", strokeWidth: 1.5 },
    },
    {
      id: "e-enrich-filter",
      source: "enrich",
      target: "filter",
      animated: true,
      style: { stroke: "#aeff00", strokeWidth: 1.5 },
    },
    {
      id: "e-stripe-filter",
      source: "stripe",
      target: "filter",
      animated: true,
      style: { stroke: "#aeff00", strokeWidth: 1.5 },
    },
    {
      id: "e-verify-filter",
      source: "verify",
      target: "filter",
      animated: true,
      style: { stroke: "#aeff00", strokeWidth: 1.5 },
    },
    {
      id: "e-filter-agent",
      source: "filter",
      target: "agent",
      animated: true,
      style: { stroke: "#aeff00", strokeWidth: 2 },
    },
    {
      id: "e-agent-router",
      source: "agent",
      target: "router",
      animated: true,
      style: { stroke: "#aeff00", strokeWidth: 1.5, strokeDasharray: "3 3" },
    },
  ];

  return (
    <div className="w-full h-[185px] sm:h-[200px] relative overflow-hidden rounded-xl bg-[#101712]">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.08 }}
        panOnScroll={false}
        zoomOnScroll={false}
        panOnDrag={false}
        nodesDraggable={true}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#ffffff" gap={14} size={1} className="opacity-[0.04]" />
      </ReactFlow>
    </div>
  );
};
