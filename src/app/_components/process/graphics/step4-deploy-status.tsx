'use client';

import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';
import { OpenAIIcon, SlackIcon } from '../icons/brand-icons';

export const Step4DeployStatus: React.FC = () => {
  return (
    <div className="relative flex h-full min-h-[220px] w-full flex-col justify-center gap-3 sm:gap-5 bg-[#090d0a] p-4 sm:p-6 lg:p-8">
      {/* Dynamic Keyframes for Left-to-Right Stream Movement */}
      <style>{`
        @keyframes streamFlow {
          0% {
            transform: translateX(-130%);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateX(320%);
            opacity: 0;
          }
        }
        .animate-stream-1 {
          animation: streamFlow 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-stream-2 {
          animation: streamFlow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.8s;
        }
        .animate-stream-3 {
          animation: streamFlow 2.1s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.5s;
        }
      `}</style>

      {/* Top Stream Panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 rounded-xl ">
        {/* Left: OpenAI GPT-4o */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-teal-500/30 bg-[#0d1d18] text-teal-400 shadow-[0_0_14px_rgba(20,184,166,0.2)]">
            <OpenAIIcon className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400" />
           
          </div>
          <div>
            <h4 className="font-mono text-xs sm:text-sm font-bold tracking-tight text-white">
              OpenAI GPT-4o
            </h4>
            <p className="font-mono text-[9px] sm:text-[11px] text-zinc-500">
              Neural Classifier
            </p>
          </div>
        </div>

        {/* Center: 3 Animated Left-to-Right Telemetry Data Stream Progress Bars */}
        <div className="flex w-full flex-1 flex-col gap-3 px-2 max-w-[250px]">
          {/* Stream Line 1 */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/90 shadow-inner">
            <div className="absolute inset-0 bg-brand-neon/10" />
            <div className="animate-stream-1 absolute top-0 bottom-0 left-0 w-28 rounded-full bg-gradient-to-r from-transparent via-brand-neon to-white shadow-[0_0_10px_#aeff00]" />
          </div>

          {/* Stream Line 2 */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/90 shadow-inner">
            <div className="absolute inset-0 bg-brand-neon/10" />
            <div className="animate-stream-2 absolute top-0 bottom-0 left-0 w-32 rounded-full bg-gradient-to-r from-transparent via-brand-neon to-white shadow-[0_0_10px_#aeff00]" />
          </div>

          {/* Stream Line 3 */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/90 shadow-inner">
            <div className="absolute inset-0 bg-brand-neon/10" />
            <div className="animate-stream-3 absolute top-0 bottom-0 left-0 w-24 rounded-full bg-gradient-to-r from-transparent via-brand-neon to-white shadow-[0_0_10px_#aeff00]" />
          </div>
        </div>

        {/* Right: Slack Ops */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-pink-500/30 bg-[#1e1319] shadow-[0_0_14px_rgba(236,72,153,0.2)]">
            <SlackIcon className="h-6 w-6" />
           
          </div>
          <div>
            <h4 className="font-mono text-xs sm:text-sm font-bold tracking-tight text-white">
              Slack Ops
            </h4>
            <p className="font-mono text-[10px] sm:text-xs text-zinc-500">
              Instant Alert Feed
            </p>
          </div>
        </div>
      </div>

      {/* Bottom 2 Telemetry Status Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Status 1: Deploy Status */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800/90 bg-[#111813] p-4 transition-all hover:border-brand-neon/40 hover:shadow-[0_0_12px_rgba(174,255,0,0.05)]">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              DEPLOY STATUS
            </span>
            <div className="mt-1 font-mono text-sm sm:text-base font-bold text-brand-neon">
              Zero Downtime
            </div>
          </div>
          <CheckCircle2 className="h-5 w-5 text-brand-neon" />
        </div>

        {/* Status 2: API Latency */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800/90 bg-[#111813] p-4 transition-all hover:border-zinc-700">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              API LATENCY
            </span>
            <div className="mt-1 font-mono text-sm sm:text-base font-bold text-white">
              8ms Average
            </div>
          </div>
          <Zap className="h-5 w-5 fill-brand-neon text-brand-neon" />
        </div>
      </div>
    </div>
  );
};
