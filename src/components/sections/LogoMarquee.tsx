"use client";

import React from "react";
import { marqueeLogos } from "@/data/navigation";

export const LogoMarquee: React.FC = () => {
  return (
    <div className="w-full bg-[var(--brand-dark)] py-4 overflow-hidden border-y border-white/[0.08]">
      <div className="flex w-max animate-marquee">
        {/* Repeating array twice for infinite seamless loop */}
        {[...marqueeLogos, ...marqueeLogos].map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="flex items-center gap-3 mx-6 sm:mx-10 opacity-70 hover:opacity-100 transition-opacity cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-neon)]" />
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-white/80 font-medium">
              {item.name}
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.08] text-white/40">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
