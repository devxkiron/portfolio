import React from 'react';
import { Shield, RefreshCw, Cpu, CheckCircle2, Circle } from 'lucide-react';

export const Step1AuditRadar: React.FC = () => {
  return (
    <div className="relative flex h-full min-h-[420px] sm:min-h-[460px] lg:min-h-[480px] w-full flex-col items-center justify-center gap-8 bg-[#090d0a] p-6 sm:flex-row sm:gap-10 sm:p-8 lg:p-10">
      {/* Radar Section */}
      <div className="flex flex-col items-center justify-center">
        {/* Radar Scanner Visual with Continuous Rotation */}
        <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-brand-neon/30 bg-[#0c140e] shadow-[0_0_24px_rgba(174,255,0,0.08)]">
          {/* Outer ring */}
          <div className="absolute inset-3 rounded-full border border-brand-neon/20" />
          {/* Middle ring */}
          <div className="absolute inset-8 rounded-full border border-brand-neon/25" />
          {/* Inner ring */}
          <div className="absolute inset-13 rounded-full border border-brand-neon/30" />

          {/* Crosshairs */}
          <div className="absolute h-full w-[1px] bg-brand-neon/20" />
          <div className="absolute h-[1px] w-full bg-brand-neon/20" />

          {/* Rotating Radar Sweep Arc */}
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              animationDuration: '4s',
              background:
                'conic-gradient(from 0deg at 50% 50%, rgba(174, 255, 0, 0.45) 0deg, rgba(174, 255, 0, 0) 90deg, transparent 360deg)',
            }}
          />

          {/* Center ping dot with pulse glow */}
          <div className="relative z-10 h-2 w-2 rounded-full bg-brand-neon shadow-[0_0_12px_#aeff00] animate-ping" />
          <div className="absolute z-10 h-2 w-2 rounded-full bg-brand-neon shadow-[0_0_10px_#aeff00]" />
        </div>

        {/* Status Text with subtle pulse */}
        <p className="mt-4 font-mono text-xs tracking-wider text-zinc-300">
          Analyzing Workflows..
        </p>
      </div>

      {/* Diagnostic Checklist Items */}
      <div className="flex w-full max-w-sm flex-col gap-3">
        {/* Item 1 */}
        <div className="flex items-center justify-between gap-3 rounded-lg border border-brand-neon/60 bg-[#0d170f]/90 px-4 py-2.5 shadow-[0_0_10px_rgba(174,255,0,0.06)] transition-transform hover:scale-[1.02]">
          <div className="flex items-center gap-3">
            <Shield className="h-4 w-4 text-brand-neon" />
            <span className="font-mono text-xs font-bold tracking-tight text-white sm:text-sm">
              Lead Capture &amp; Instant Routing
            </span>
          </div>
          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-neon animate-pulse" />
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-between gap-3 rounded-lg border border-brand-neon/60 bg-[#0d170f]/90 px-4 py-2.5 shadow-[0_0_10px_rgba(174,255,0,0.06)] transition-transform hover:scale-[1.02]">
          <div className="flex items-center gap-3">
            <RefreshCw className="h-4 w-4 text-brand-neon animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-mono text-xs font-bold tracking-tight text-white sm:text-sm">
              Spreadsheet &amp; Manual Data Entry
            </span>
          </div>
          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-neon animate-pulse" />
        </div>

        {/* Item 3 */}
        <div className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-[#0d130f]/60 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Cpu className="h-4 w-4 text-zinc-500" />
            <span className="font-mono text-xs font-medium tracking-tight text-zinc-400 sm:text-sm">
              Cross-Tool CRM Synchronization
            </span>
          </div>
          <Circle className="h-4 w-4 shrink-0 text-zinc-600" />
        </div>
      </div>
    </div>
  );
};
