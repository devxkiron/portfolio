'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { WorkflowTab } from './types';
import { ArchitectureCustomNode } from './nodes/architecture-node';

interface ArchitectureCanvasProps {
  activeTab: WorkflowTab;
}

const CanvasInner: React.FC<ArchitectureCanvasProps> = ({ activeTab }) => {
  const nodeTypes = useMemo(() => ({ architectureNode: ArchitectureCustomNode }), []);
  const { fitView } = useReactFlow();
  const prevTabIdRef = useRef(activeTab.id);

  // Controlled node & edge states for full drag & drop interactivity
  const [nodes, setNodes, onNodesChange] = useNodesState(activeTab.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(activeTab.edges);

  useEffect(() => {
    setNodes(activeTab.nodes);
    setEdges(activeTab.edges);

    if (prevTabIdRef.current !== activeTab.id) {
      prevTabIdRef.current = activeTab.id;
      const timer = setTimeout(() => {
        fitView({ duration: 400, padding: 0.16 });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [activeTab, setNodes, setEdges, fitView]);

  return (
    <div className="relative flex h-[380px] sm:h-[430px] lg:h-[470px] w-full flex-col overflow-hidden rounded-2xl border border-[#b8d4ab] dark:border-border bg-[#f2f7ec] dark:bg-[#0c130e] shadow-[0_16px_36px_-10px_rgba(36,73,0,0.08),0_2px_6px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors duration-200">
      {/* Dynamic Keyframes for silky smooth edge flow with subtle, low-opacity strokes */}
      <style>{`
        @keyframes smoothFlow {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .smooth-flow-edge path,
        .react-flow__edge.smooth-flow-edge path,
        .smooth-flow-edge path.react-flow__edge-path {
          stroke: rgba(30, 70, 24, 0.35) !important;
          stroke-width: 1.2px !important;
          stroke-dasharray: 4 4 !important;
          animation: smoothFlow 1.2s linear infinite !important;
          will-change: stroke-dashoffset;
        }
        .dark .smooth-flow-edge path,
        .dark .react-flow__edge.smooth-flow-edge path,
        .dark .smooth-flow-edge path.react-flow__edge-path {
          stroke: rgba(174, 255, 0, 0.35) !important;
          stroke-width: 1.2px !important;
        }
        .react-flow__background-pattern.dots,
        .react-flow__background circle,
        .react-flow__background pattern circle {
          fill: rgba(28, 64, 22, 0.65) !important;
        }
        .dark .react-flow__background-pattern.dots,
        .dark .react-flow__background circle,
        .dark .react-flow__background pattern circle {
          fill: rgba(174, 255, 0, 0.45) !important;
        }
      `}</style>

      {/* Top Header Bar inside Canvas */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-[#b8d4ab] dark:border-border bg-[#e2edd7] dark:bg-card/70 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
          <span className="font-bold text-zinc-950 dark:text-foreground">Live Architecture:</span>
          <span className="font-bold text-emerald-900 dark:text-brand-neon">{activeTab.headerTitle}</span>
        </div>
        <p className="font-mono text-[11px] text-zinc-700 dark:text-muted-foreground hidden sm:block">
          Drag nodes or zoom canvas to inspect pipeline connections
        </p>
      </div>

      {/* Interactive React Flow Canvas */}
      <div className="relative flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.16 }}
          minZoom={0.4}
          maxZoom={1.8}
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          zoomOnScroll={true}
          panOnDrag={true}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={3.5}
            color="rgba(28, 64, 22, 0.65)"
            className="text-[#1c4016] dark:text-brand-neon"
          />

          {/* Styled Controls in bottom-left */}
          <Controls
            showInteractive={false}
            className="!left-4 !bottom-4 !border !border-[#b8d4ab] dark:!border-border !bg-white dark:!bg-card !rounded-lg !overflow-hidden shadow-xs [&>button]:!bg-white dark:[&>button]:!bg-card [&>button]:!border-[#b8d4ab] dark:[&>button]:!border-border [&>button]:!fill-zinc-800 dark:[&>button]:!fill-foreground [&>button:hover]:!fill-emerald-800 dark:[&>button:hover]:!fill-brand-neon"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export const ArchitectureCanvas: React.FC<ArchitectureCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <CanvasInner {...props} />
    </ReactFlowProvider>
  );
};
