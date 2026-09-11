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
    <div className="relative flex h-[380px] sm:h-[430px] lg:h-[470px] w-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#090d0a]">
      {/* Dynamic Keyframes for silky smooth edge flow with comfortable, low-opacity strokes */}
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
          stroke: rgba(174, 255, 0, 0.40) !important;
          stroke-width: 1.5px !important;
          stroke-dasharray: 6 6 !important;
          animation: smoothFlow 1.2s linear infinite !important;
          will-change: stroke-dashoffset;
        }
      `}</style>

      {/* Top Header Bar inside Canvas */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 bg-[#0d140f]/15 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
          <span className="font-bold text-zinc-300">Live Architecture:</span>
          <span className="font-bold text-[#aeff00]/40">{activeTab.headerTitle}</span>
        </div>
        <p className="font-mono text-[11px] text-zinc-400/80 hidden sm:block">
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
            gap={22}
            size={1}
            color="rgba(174, 255, 0, 0.14)"
          />

          {/* Styled Controls in bottom-left */}
          <Controls
            showInteractive={false}
            className="!left-4 !bottom-4 !border !border-zinc-800 !bg-[#101912] !rounded-lg !overflow-hidden [&>button]:!bg-[#101912] [&>button]:!border-zinc-800 [&>button]:!fill-zinc-300 [&>button:hover]:!fill-[#aeff00]"
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
