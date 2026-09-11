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
      className={`flex min-h-[420px] sm:min-h-[460px] lg:min-h-[480px] flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0d140e] shadow-xl divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80 ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } ${className}`}
    >
      {/* Text Info Section (approx 40%) */}
      <div className="flex w-full lg:w-[40%] flex-col">
        <ProcessCardText step={step} className="h-full" />
      </div>

      {/* Graphic Illustration Section (approx 60%) */}
      <div className="flex w-full lg:w-[60%] flex-col justify-start">
        {renderGraphic()}
      </div>
    </div>
  );
};
