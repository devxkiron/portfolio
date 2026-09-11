import React from 'react';

export const Step5RoiMetrics: React.FC = () => {
  return (
    <div className="relative flex h-full min-h-[420px] sm:min-h-[460px] lg:min-h-[480px] w-full flex-col justify-between gap-6 bg-[#090d0a] p-6 sm:p-8">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-300">
          <span className="text-brand-neon font-bold">^</span>
          <span>ROI &amp; Time Saved Telemetry</span>
        </div>
        <div className="flex items-center gap-2 rounded border border-brand-neon/60 bg-[#0d170f] px-2.5 py-0.5 font-mono text-[10px] font-bold text-brand-neon shadow-[0_0_10px_rgba(174,255,0,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-neon animate-ping" />
          <span>24/7 Autonomous</span>
        </div>
      </div>

      {/* Two Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Metric 1: Weekly Time Saved */}
        <div className="group flex flex-col justify-between rounded-xl border border-brand-neon/40 bg-[#101912] p-5 shadow-[0_0_14px_rgba(174,255,0,0.05)] transition-all hover:border-brand-neon/70 hover:shadow-[0_0_20px_rgba(174,255,0,0.12)]">
          <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
            WEEKLY TIME SAVED
          </span>
          <div className="my-2 font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-neon transition-transform group-hover:scale-105">
            41+ hrs
          </div>
          <p className="font-mono text-[11px] text-zinc-400">
            Automated spreadsheet &amp; admin
          </p>
        </div>

        {/* Metric 2: Monthly Added Value */}
        <div className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#111813] p-5 transition-all hover:border-zinc-700 hover:shadow-lg">
          <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
            MONTHLY ADDED VALUE
          </span>
          <div className="my-2 font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-white transition-transform group-hover:scale-105">
            +$18.4k
          </div>
          <p className="font-mono text-[11px] text-zinc-400">
            Eliminated human friction
          </p>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-[#0d140f] px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Self-Healing Runtime Active</span>
        </div>
        <span className="font-mono text-xs font-bold text-brand-neon">
          100% Zero-Loss
        </span>
      </div>
    </div>
  );
};
