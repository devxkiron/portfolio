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
  steps: ProcessStep[];
}
