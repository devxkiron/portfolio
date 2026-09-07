"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Zap, Bot, CalendarCheck, Send, Database, CheckCircle2 } from "lucide-react";

interface WorkflowCanvasProps {
  activeTabId?: string;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ activeTabId = "lead-gen" }) => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <div className="relative w-full rounded-2xl bg-[#101612] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-5 sm:p-8">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#aeff00 1px, transparent 1px), radial-gradient(#ffffff 1px, #101612 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      {/* Canvas Top Bar */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-white/50 ml-2">
            pipeline_orchestrator_{activeTabId}.ts
          </span>
        </div>

        <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-[var(--brand-neon)] animate-pulse" />
          <span className="text-xs font-mono text-[var(--brand-neon)] tracking-wide font-medium">
            PIPELINE ACTIVE • 99.98% UPTIME
          </span>
        </div>
      </div>

      {/* Nodes Graph Container */}
      <div className="relative mt-8 min-h-[360px] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 py-4">
        {/* SVG Animated Connection Lines for Desktop */}
        <svg
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 900 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Input to Qualifier Path */}
          <path
            d="M 190 180 C 260 180, 290 180, 360 180"
            stroke="rgba(174, 255, 0, 0.4)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Qualifier to High Intent Branch */}
          <path
            d="M 540 180 C 600 180, 620 90, 680 90"
            stroke="#aeff00"
            strokeWidth="2"
            className="animate-pulse"
          />
          {/* Qualifier to Nurture Branch */}
          <path
            d="M 540 180 C 600 180, 620 270, 680 270"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Pulse Particles */}
          <circle cx="275" cy="180" r="3" fill="#aeff00">
            <animate attributeName="cx" values="190;360" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="610" cy="135" r="3" fill="#aeff00">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Node 1: Inbound Lead Trigger */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => setActiveNode(1)}
          className={`relative z-10 w-full lg:w-56 p-4 rounded-xl border transition-all cursor-pointer ${
            activeNode === 1
              ? "bg-[#18241b] border-[var(--brand-neon)] shadow-[0_0_20px_rgba(174,255,0,0.2)]"
              : "bg-[#141b16] border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-lg bg-[var(--brand-neon)]/10 text-[var(--brand-neon)]">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono uppercase text-white/50">Trigger 01</span>
          </div>
          <h4 className="text-sm font-semibold text-white">Inbound Lead Capture</h4>
          <p className="text-xs text-white/60 mt-1">Form fill, Webhook, or Email</p>
          <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
            <span className="text-white/40">Latency</span>
            <span className="text-[var(--brand-neon)]">&lt; 45ms</span>
          </div>
        </motion.div>

        {/* Node 2: AI Qualification Engine (Central Hub) */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => setActiveNode(2)}
          className={`relative z-10 w-full lg:w-64 p-5 rounded-xl border transition-all cursor-pointer ${
            activeNode === 2 || activeNode === null
              ? "bg-[#19261d] border-[var(--brand-neon)] shadow-[0_0_30px_rgba(174,255,0,0.25)]"
              : "bg-[#141b16] border-white/10"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[var(--brand-neon)] text-[var(--brand-dark)]">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono uppercase text-[var(--brand-neon)] font-bold">
                AI Agent Hub
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[var(--brand-neon)] animate-ping" />
          </div>
          <h4 className="text-base font-bold text-white">Semantic Intent Evaluator</h4>
          <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
            Extracts budget, timeline & buyer intent using frontier models with RAG retrieval.
          </p>
          <div className="mt-3.5 space-y-1.5 pt-3 border-t border-white/[0.08] text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-white/40">Lead Score</span>
              <span className="text-[var(--brand-neon)] font-bold">96 / 100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Routing</span>
              <span className="text-white">VIP Priority</span>
            </div>
          </div>
        </motion.div>

        {/* Node 3: Outputs / Branches */}
        <div className="relative z-10 w-full lg:w-56 flex flex-col gap-4">
          {/* High Intent Action */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveNode(3)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeNode === 3
                ? "bg-[#18241b] border-[var(--brand-neon)] shadow-[0_0_20px_rgba(174,255,0,0.2)]"
                : "bg-[#141b16] border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-[var(--brand-neon)]/15 text-[var(--brand-neon)]">
                <CalendarCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-mono uppercase text-[var(--brand-neon)]">
                High Intent Deal
              </span>
            </div>
            <h5 className="text-xs font-semibold text-white">Auto-Book Strategy Call</h5>
            <p className="text-[11px] text-white/50 mt-0.5">Dispatched to Calendar + CRM</p>
          </motion.div>

          {/* Standard Nurture Action */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveNode(4)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeNode === 4
                ? "bg-[#18241b] border-[var(--brand-neon)] shadow-[0_0_20px_rgba(174,255,0,0.2)]"
                : "bg-[#141b16]/70 border-white/[0.07] hover:border-white/15"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-white/10 text-white/80">
                <Send className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-mono uppercase text-white/50">
                Nurture Sequence
              </span>
            </div>
            <h5 className="text-xs font-semibold text-white/90">Personalized Outreach</h5>
            <p className="text-[11px] text-white/40 mt-0.5">Dynamic drip sequence</p>
          </motion.div>
        </div>
      </div>

      {/* Footer System Status Strip */}
      <div className="relative mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs text-white/40 font-mono gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-white/70">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-neon)]" /> Zero Data Retention
          </span>
          <span className="flex items-center gap-1.5 text-white/70">
            <Database className="w-3.5 h-3.5 text-[var(--brand-neon)]" /> Encrypted KV Store
          </span>
        </div>
        <span>Executed 48,290 runs this week</span>
      </div>
    </div>
  );
};
