"use client";

import React from "react";
import Link from "next/link";
import { ProcessStep } from "@/types";
import { ArrowRight, CheckCircle, Cpu, LineChart, Network, Search } from "lucide-react";

interface ProcessStepCardProps {
  step: ProcessStep;
  index?: number;
  reversed?: boolean;
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  step,
  reversed = false,
}) => {
  // Render specific visual mockup based on step type
  const renderVisual = () => {
    switch (step.graphicType) {
      case "audit":
        return (
          <div className="w-full h-full bg-[#131c15] rounded-xl p-5 border border-white/[0.08] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono text-white/60">AUDIT_ANALYZER_V1</span>
              <span className="text-xs font-mono text-[var(--brand-neon)] flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> 14 Bottlenecks Mapped
              </span>
            </div>
            {/* Circular Gauge and Bars */}
            <div className="my-5 flex items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#1e2d21"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#aeff00"
                    strokeWidth="3.5"
                    strokeDasharray="92, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-bold font-mono text-white">92%</span>
                  <span className="text-[9px] font-mono text-white/50">LEVERAGE</span>
                </div>
              </div>
              <div className="flex-1 space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs font-mono text-white/70 mb-1">
                    <span>Manual Ingestion</span>
                    <span className="text-[var(--brand-neon)]">-85% Time</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-[var(--brand-neon)] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono text-white/70 mb-1">
                    <span>Data Discrepancy</span>
                    <span className="text-[var(--brand-neon)]">0% Error</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-[var(--brand-neon)] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[11px] font-mono text-white/40 pt-2 border-t border-white/[0.06] flex justify-between">
              <span>Status: Ready for Architecture</span>
              <span className="text-white/60">Execution Plan ✓</span>
            </div>
          </div>
        );

      case "prototype":
        return (
          <div className="w-full h-full bg-[#131c15] rounded-xl p-5 border border-white/[0.08] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono text-white/60">SANDBOX_POC_DEPLOYMENT</span>
              <span className="text-xs font-mono text-[var(--brand-neon)] flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5" /> 7-Day Sprint Live
              </span>
            </div>
            {/* Visual Node Flow */}
            <div className="my-6 flex items-center justify-between gap-2 px-2">
              <div className="p-3 rounded-lg bg-black/50 border border-white/10 text-center flex-1">
                <span className="text-[10px] font-mono text-white/50 block">INPUT</span>
                <span className="text-xs font-bold text-white">Gmail / Webhook</span>
              </div>
              <span className="text-[var(--brand-neon)] font-mono text-sm">➔</span>
              <div className="p-3 rounded-lg bg-[var(--brand-neon)]/10 border border-[var(--brand-neon)]/30 text-center flex-1">
                <span className="text-[10px] font-mono text-[var(--brand-neon)] block">AI ENGINE</span>
                <span className="text-xs font-bold text-white">GPT-4o Triage</span>
              </div>
              <span className="text-[var(--brand-neon)] font-mono text-sm">➔</span>
              <div className="p-3 rounded-lg bg-black/50 border border-white/10 text-center flex-1">
                <span className="text-[10px] font-mono text-white/50 block">SYNC</span>
                <span className="text-xs font-bold text-white">CRM & Slack</span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-white/40 pt-2 border-t border-white/[0.06] flex justify-between">
              <span>Latency: 140ms</span>
              <span className="text-[var(--brand-neon)]">Zero Cold Start</span>
            </div>
          </div>
        );

      case "code":
        return (
          <div className="w-full h-full bg-[#0d140f] rounded-xl p-4 sm:p-5 border border-white/[0.08] font-mono text-xs flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="text-[11px] text-white/60 ml-2">agent.orchestrator.ts</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                TypeScript 5.0
              </span>
            </div>
            <div className="my-3 space-y-1 text-[11px] leading-5 overflow-x-auto text-white/70">
              <p className="text-purple-400">
                export async function <span className="text-blue-400">handlePipeline</span>(input: Event) &#123;
              </p>
              <p className="pl-4 text-white/60">
                const agent = <span className="text-[var(--brand-neon)]">new AutonomousWorker</span>(&#123; role: &quot;Finance&quot; &#125;);
              </p>
              <p className="pl-4 text-white/60">
                const result = await agent.<span className="text-yellow-300">executeTask</span>(input);
              </p>
              <p className="pl-4 text-emerald-400">
                await db.auditLog.<span className="text-blue-300">insert</span>(&#123; status: &quot;VERIFIED&quot;, result &#125;);
              </p>
              <p className="pl-4 text-purple-400">return result;</p>
              <p className="text-purple-400">&#125;</p>
            </div>
            <div className="text-[11px] text-white/40 pt-2 border-t border-white/[0.06] flex justify-between">
              <span>Build: Passing (0 errors)</span>
              <span className="text-[var(--brand-neon)]">Deploy: Cloudflare Edge</span>
            </div>
          </div>
        );

      case "integration":
        return (
          <div className="w-full h-full bg-[#131c15] rounded-xl p-5 border border-white/[0.08] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono text-white/60">INTEGRATION_HEALTH</span>
              <span className="text-xs font-mono text-[var(--brand-neon)] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> 100% Operational
              </span>
            </div>
            <div className="my-4 space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded bg-black/40 border border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[var(--brand-neon)]" />
                  <span className="text-xs font-semibold text-white">HubSpot CRM Pipeline</span>
                </div>
                <span className="text-[11px] font-mono text-white/50">Auto-Synced</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-black/40 border border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[var(--brand-neon)]" />
                  <span className="text-xs font-semibold text-white">Stripe Invoicing Gateway</span>
                </div>
                <span className="text-[11px] font-mono text-white/50">Realtime</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-black/40 border border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[var(--brand-neon)]" />
                  <span className="text-xs font-semibold text-white">Slack Alert Channels</span>
                </div>
                <span className="text-[11px] font-mono text-white/50">Sub-second</span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-white/40 pt-2 border-t border-white/[0.06] flex justify-between">
              <span>Security: SOC2 Ready</span>
              <span className="text-[var(--brand-neon)]">Zero Downtime</span>
            </div>
          </div>
        );

      case "metrics":
        return (
          <div className="w-full h-full bg-[#131c15] rounded-xl p-5 border border-white/[0.08] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono text-white/60">SCALING_DASHBOARD</span>
              <span className="text-xs font-mono text-[var(--brand-neon)] flex items-center gap-1.5">
                <LineChart className="w-3.5 h-3.5" /> High ROI Multiplier
              </span>
            </div>
            <div className="my-5 grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--brand-neon)] block">
                  +384h
                </span>
                <span className="text-xs text-white/60 mt-1 block">Hours Saved / Month</span>
              </div>
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/10">
                <span className="text-2xl sm:text-3xl font-black font-mono text-white block">
                  +$48.5K
                </span>
                <span className="text-xs text-white/60 mt-1 block">Direct Operational ROI</span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-white/40 pt-2 border-t border-white/[0.06] flex justify-between">
              <span>Growth: Linear to Exponential</span>
              <span className="text-[var(--brand-neon)]">Scale Free ✓</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#101612] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.4)] p-6 sm:p-8 lg:p-10 transition-all hover:border-[var(--brand-neon)]/30">
      <div
        className={`flex flex-col ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-stretch gap-8 lg:gap-12`}
      >
        {/* Text Content Column */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm sm:text-base font-mono font-bold text-[var(--brand-neon)] bg-[var(--brand-neon)]/10 px-2.5 py-0.5 rounded border border-[var(--brand-neon)]/20">
                Step {step.number}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              {step.number}. {step.title}
            </h3>

            <p className="text-base text-white/70 leading-relaxed font-normal mb-6">
              {step.description}
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <Link
              href={step.ctaHref || "#process"}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-neon)] hover:text-white transition-colors group"
            >
              <span>{step.ctaText || "Read more"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {step.metrics && step.metrics.length > 0 && (
              <div className="flex gap-4 text-xs font-mono">
                {step.metrics.map((m) => (
                  <span key={m.label} className="text-white/50">
                    {m.label}: <strong className="text-white">{m.value}</strong>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Visual Graphic Mockup Column */}
        <div className="flex-1 min-h-[220px] sm:min-h-[260px] flex items-center justify-center">
          {renderVisual()}
        </div>
      </div>
    </div>
  );
};
