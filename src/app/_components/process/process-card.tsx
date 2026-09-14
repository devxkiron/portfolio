import React from 'react';
import type { ProcessStep } from './types';
import { ProcessCardText } from './process-card-text';
import {
  Step1AuditRadar,
  Step2NodeWorkflow,
  Step3CodeEditor,
  Step4DeployStatus,
  Step5RoiMetrics,
} from './graphics';

interface ProcessCardProps {
  step: ProcessStep;
  isReversed?: boolean;
  className?: string;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({
  step,
  isReversed = false,
  className = '',
}) => {
  const renderGraphic = () => {
    switch (step.graphicType) {
      case 'radar':
        return <Step1AuditRadar />;
      case 'workflow':
        return <Step2NodeWorkflow />;
      case 'code':
        return <Step3CodeEditor />;
      case 'deploy':
        return <Step4DeployStatus />;
      case 'roi':
        return <Step5RoiMetrics />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-neon/30 dark:border-border bg-[#e0eed0] dark:bg-card shadow-[0_16px_36px_-10px_rgba(36,73,0,0.08),0_2px_6px_rgba(0,0,0,0.03)] dark:shadow-2xl divide-y lg:divide-y-0 lg:divide-x divide-brand-neon/25 dark:divide-border lg:flex-row transition-all duration-300 ${
        isReversed ? 'lg:flex-row-reverse' : ''
      } ${className}`}
    >
      {/* Text Info Section */}
      <div className="flex w-full lg:w-[40%] flex-col shrink-0 bg-[#e0eed0] dark:bg-card">
        <ProcessCardText step={step} className="h-full bg-transparent" />
      </div>

      {/* Graphic Illustration Section */}
      <div className="flex w-full lg:w-[60%] flex-1 flex-col justify-start overflow-hidden bg-[#1a2e21] dark:bg-[#090d0a]">
        {renderGraphic()}
      </div>
    </div>
  );
};
