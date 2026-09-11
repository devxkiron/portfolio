export interface NavItem {
  label: string;
  href: string;
}

export interface MetricStat {
  value: string;
  label: string;
  sublabel?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  graphicType: 'audit' | 'prototype' | 'code' | 'integration' | 'metrics';
}

export interface WorkflowTab {
  id: string;
  label: string;
  description: string;
  badge: string;
}

export interface WorkflowFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ImpactStat {
  value: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatarSeed: string;
  status: string;
}

export interface ClientStory {
  category: string;
  company: string;
  quote: string;
  author: string;
  authorRole: string;
  metrics: string;
  city: string;
  coordinates: [number, number]; // lat, lng
}

export interface TechTool {
  name: string;
  category: string;
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
