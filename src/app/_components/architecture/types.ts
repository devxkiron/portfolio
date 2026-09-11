import type { Node, Edge } from '@xyflow/react';

export type ArchitectureNodeType =
  | 'trigger'
  | 'notion'
  | 'sheets'
  | 'postgres'
  | 'python'
  | 'edit'
  | 'filter'
  | 'pinecone'
  | 'ai-agent'
  | 'router'
  | 'webhook'
  | 'apollo'
  | 'crm'
  | 'stripe'
  | 'slack';

export interface ArchitectureNodeData extends Record<string, unknown> {
  title: string;
  subtitle?: string;
  nodeType: ArchitectureNodeType;
  badge?: string;
  tag?: string;
  details?: string;
  infoClickable?: boolean;
}

export type ArchitectureNode = Node<ArchitectureNodeData, 'architectureNode'>;

export interface WorkflowTab {
  id: string;
  label: string;
  headerTitle: string;
  nodes: ArchitectureNode[];
  edges: Edge[];
}

export interface CapabilityCard {
  id: string;
  iconType: 'sparkles' | 'workflow' | 'code' | 'dashboard';
  title: string;
  description: string;
}

export interface ArchitectureConfig {
  badgeText: string;
  sectionTitle: string;
  subtitle: string;
  tabs: WorkflowTab[];
  capabilities: CapabilityCard[];
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}
