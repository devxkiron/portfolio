"use client";

import React from "react";
import Link from "next/link";
import { ProcessStep } from "@/types";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Check,
  Radio,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import { OpenAIIcon, SlackIcon, PythonIcon } from "../common/BrandIcons";
import { ProcessWorkflowFlow } from "../ui/ProcessWorkflowFlow";

interface ProcessStepCardProps {
  step: ProcessStep;
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ step }) => {
  const renderVisual = () => {
    switch (step.graphicType) {
      case "audit":
        return (
          <div className="w-full h-full flex flex-col sm:flex-row items-center justify-between gap-5 py-1">
            {/* Left Radar Scanner */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full border border-emerald-500/40 flex items-center justify-center bg-[#0d1610] shadow-[0_0_20px_rgba(16,185,129,0.15)] overflow-hidden">
                <div className="absolute w-18 h-18 rounded-full border border-emerald-500/20" />
                <div className="absolute w-10 h-10 rounded-full border border-emerald-500/30" />
                <div className="absolute w-full h-[1px] bg-emerald-500/20" />
                <div className="absolute h-full w-[1px] bg-emerald-500/20" />
                {/* Rotating Sonar Beam */}
                <div
                  className="absolute inset-0 origin-center animate-spin"
                  style={{ animationDuration: "3.2s" }}
                >
                  <div
                    className="w-1/2 h-1/2 origin-bottom-right"
                    style={{
                      background:
                        "conic-gradient(from 180deg at 100% 100%, rgba(174,255,0,0.4) 0deg, rgba(16,185,129,0.15) 45deg, transparent 90deg)",
                    }}
                  />
                </div>
                <span className="absolute top-6 right-7 w-1.5 h-1.5 rounded-full bg-[var(--brand-neon)] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[var(--brand-neon)] shadow-[0_0_8px_#aeff00]" />
              </div>
              <span className="mt-2.5 text-[10px] font-mono text-white/70 tracking-tight flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-[var(--brand-neon)] animate-pulse" />
                Analyzing Workflows...
              </span>
            </div>

            {/* Right Checklist */}
            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#142318] border border-emerald-500/30 text-[11px] sm:text-xs text-white">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-neon)] flex-shrink-0" />
                  Lead Capture & Instant Routing
                </span>
                <Check className="w-3 h-3 text-[var(--brand-neon)] flex-shrink-0" />
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#142318] border border-emerald-500/30 text-[11px] sm:text-xs text-white">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-neon)] flex-shrink-0" />
                  Spreadsheet & Manual Data Entry
                </span>
                <Check className="w-3 h-3 text-[var(--brand-neon)] flex-shrink-0" />
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0e1611]/80 border border-white/10 text-[11px] sm:text-xs text-white/50">
                <span className="flex items-center gap-2 font-medium">
                  <Circle className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                  Cross-Tool CRM Synchronization
                </span>
                <Circle className="w-3 h-3 text-white/30 flex-shrink-0" />
              </div>
            </div>
          </div>
        );

      case "prototype":
        // Interactive React Flow Diagram
        return <ProcessWorkflowFlow />;

      case "code":
        return (
          <div className="w-full h-full flex flex-col justify-between font-mono text-[10px] sm:text-[11px] leading-4.5">
            {/* Window Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/60">
                <PythonIcon className="w-3.5 h-3.5" />
                <span>custom_ai_engine.py</span>
              </div>
            </div>

            {/* Python Code Block */}
            <div className="my-1.5 space-y-0.5 text-white/80 overflow-x-auto">
              <p>
                <span className="text-white/30 mr-2 select-none">1</span>
                <span className="text-purple-400">@agent.route</span>(
                <span className="text-emerald-300">&quot;/pipeline/execute&quot;</span>, methods=[
                <span className="text-emerald-300">&quot;POST&quot;</span>])
              </p>
              <p>
                <span className="text-white/30 mr-2 select-none">2</span>
                <span className="text-purple-400">async def</span>{" "}
                <span className="text-blue-300">handle_lead_event</span>(payload:{" "}
                <span className="text-yellow-300">WebhookPayload</span>):
              </p>
              <p className="pl-3.5">
                <span className="text-white/30 mr-2 select-none">3</span>
                <span className="text-white/40"># 1. Ingest & enrich incoming contact data</span>
              </p>
              <p className="pl-3.5">
                <span className="text-white/30 mr-2 select-none">4</span>
                lead = <span className="text-purple-400">await</span> CRM.
                <span className="text-blue-300">enrich_contact</span>(payload.email)
              </p>
              <p className="pl-3.5">
                <span className="text-white/30 mr-2 select-none">5</span>
                <span className="text-white/40"># 2. Neural intent classification & smart routing</span>
              </p>
              <p className="pl-3.5">
                <span className="text-white/30 mr-2 select-none">6</span>
                intent = <span className="text-purple-400">await</span> llm.
                <span className="text-blue-300">classify</span>(lead.notes, model=
                <span className="text-emerald-300">&quot;gpt-4o&quot;</span>)
              </p>
              <p className="pl-3.5">
                <span className="text-white/30 mr-2 select-none">7</span>
                <span className="text-white/40"># 3. Trigger autonomous multi-channel dispatch</span>
              </p>
              <p className="pl-3.5">
                <span className="text-white/30 mr-2 select-none">8</span>
                <span className="text-purple-400">await</span> n8n.
                <span className="text-blue-300">trigger_workflow</span>(
                <span className="text-emerald-300">&quot;auto_outreach&quot;</span>, context=intent)
                <span className="inline-block w-1.5 h-3 bg-[var(--brand-neon)] ml-1 animate-pulse" />
              </p>
            </div>

            {/* Bottom Status Line */}
            <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.08] text-[9.5px] text-white/50">
              <span className="text-[var(--brand-neon)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-neon)] animate-ping" />
                Self-Healing Triggers Active
              </span>
              <span>Zero-Downtime Engine</span>
            </div>
          </div>
        );

      case "integration":
        return (
          <div className="w-full h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-neon)] animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wide">
                Live Ecosystem Integration Bridge
              </span>
            </div>

            {/* Visual Stream Bridge */}
            <div className="my-2.5 flex items-center justify-between gap-3">
              {/* OpenAI Official Node */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-black/70 border border-emerald-500/40 flex items-center justify-center text-[var(--brand-neon)] shadow-sm">
                  <OpenAIIcon className="w-5 h-5 text-[var(--brand-neon)]" />
                </div>
                <span className="text-[11px] font-bold text-white mt-1">OpenAI GPT-4o</span>
                <span className="text-[9px] font-mono text-white/50">Neural Classifier</span>
              </div>

              {/* Data Stream Lines */}
              <div className="flex-1 space-y-1.5 px-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 w-1/3 bg-[var(--brand-neon)] rounded-full animate-marquee"
                      style={{ animationDuration: `${1.4 + i * 0.3}s` }}
                    />
                  </div>
                ))}
              </div>

              {/* Slack Official Node */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-black/70 border border-white/20 flex items-center justify-center shadow-sm">
                  <SlackIcon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white mt-1">Slack Ops</span>
                <span className="text-[9px] font-mono text-white/50">Instant Alert Feed</span>
              </div>
            </div>

            {/* Bottom 2 Status Cards */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-mono text-white/40 block">DEPLOY STATUS</span>
                  <span className="text-[11px] font-bold text-white flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[var(--brand-neon)]" /> Zero Downtime
                  </span>
                </div>
              </div>
              <div className="px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-mono text-white/40 block">API LATENCY</span>
                  <span className="text-[11px] font-bold text-white flex items-center gap-1 mt-0.5">
                    <Zap className="w-3 h-3 text-[var(--brand-neon)]" /> 84ms Average
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "metrics":
        return (
          <div className="w-full h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[var(--brand-neon)]" />
                ROI & Time Saved Telemetry
              </span>
              <span className="text-[9px] font-mono text-[var(--brand-neon)] bg-[var(--brand-neon)]/10 px-2 py-0.5 rounded border border-[var(--brand-neon)]/20 font-bold">
                24/7 Autonomous
              </span>
            </div>

            {/* Stat Boxes */}
            <div className="my-2.5 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                <span className="text-[9px] font-mono text-white/50 uppercase block tracking-wider">
                  Weekly Time Saved
                </span>
                <span className="text-2xl font-black font-mono text-[var(--brand-neon)] block mt-0.5">
                  41+ hrs
                </span>
                <span className="text-[10px] text-white/60 mt-0.5 block truncate">
                  Automated spreadsheet & admin
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                <span className="text-[9px] font-mono text-white/50 uppercase block tracking-wider">
                  Monthly Added Value
                </span>
                <span className="text-2xl font-black font-mono text-white block mt-0.5">
                  +$18.4k
                </span>
                <span className="text-[10px] text-white/60 mt-0.5 block truncate">
                  Eliminated human friction
                </span>
              </div>
            </div>

            {/* Bottom Status Line */}
            <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.08] text-[9.5px] font-mono text-white/50">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[var(--brand-neon)]" />
                Self-Healing Runtime Active
              </span>
              <span className="text-[var(--brand-neon)] font-bold">100% Zero-Loss</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      data-process-card
      className="process-card w-full rounded-2xl bg-[#354338] dark:bg-[#2c3a30] border border-[#445548] dark:border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.4)] p-3.5 sm:p-4 lg:p-5 will-change-transform"
    >
      <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-7">
        {/* Left Column: Text & CTA */}
        <div className="w-full lg:w-[38%] flex flex-col justify-between py-1">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#f1f6f2] mb-2">
              {step.number}. {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#a3b8aa] leading-relaxed font-normal max-w-sm">
              {step.description}
            </p>
          </div>

          <div className="mt-3">
            <Link
              href={step.ctaHref || "#process"}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--brand-neon)] hover:text-white transition-colors group"
            >
              <span>{step.ctaText || "See more"}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: Deep dark inner canvas with compact padding */}
        <div className="w-full lg:w-[62%] min-h-[175px] sm:min-h-[195px] rounded-xl bg-[#101712] border border-white/[0.08] p-2.5 sm:p-3.5 shadow-inner flex items-center justify-center overflow-hidden">
          {renderVisual()}
        </div>
      </div>
    </div>
  );
};
