import React from 'react';

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  /** Graphic component key or component renderer */
  graphicType: 'radar' | 'workflow' | 'code' | 'deploy' | 'roi';
}

export interface ProcessConfig {
  sectionTitle: string;
  highlightedText: string;
  subtitle: string;
  badge?: string;
  steps: ProcessStep[];
}

export interface ProcessSectionProps {
  id?: string;
  config?: ProcessConfig;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  highlightedText?: string;
  steps?: ProcessStep[];
  alternating?: boolean;
  showDivider?: boolean;
  animated?: boolean;
  className?: string;
}
