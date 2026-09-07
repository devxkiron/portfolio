"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../common/Button";
import { ArrowUpRight, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#101612] text-[#fdfcf8] pt-16 sm:pt-24 pb-12 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Banner Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2.5 mb-3 group">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-neon)] text-[var(--brand-dark)] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Built<span className="text-[var(--brand-neon)]">Scale</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Custom AI systems & workflow engineering for high-growth businesses. Zero fluff,
              production-grade code.
            </p>
          </div>

          <Button
            href="#booking"
            variant="primary"
            size="md"
            icon={<ArrowUpRight className="w-4 h-4" />}
          >
            Start a Project
          </Button>
        </div>

        {/* Link Columns Grid */}
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1 */}
          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-neon)] mb-4">
              Solutions
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li>
                <Link href="#workflows" className="hover:text-white transition-colors">
                  Lead Pipelines
                </Link>
              </li>
              <li>
                <Link href="#workflows" className="hover:text-white transition-colors">
                  Document Triage
                </Link>
              </li>
              <li>
                <Link href="#workflows" className="hover:text-white transition-colors">
                  Support AI Agents
                </Link>
              </li>
              <li>
                <Link href="#workflows" className="hover:text-white transition-colors">
                  Custom ERP Flows
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-neon)] mb-4">
              Tech Stack
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li>
                <span className="hover:text-white transition-colors">Next.js & React 19</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Python & FastAPI</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Supabase & Vector</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">OpenAI & Anthropic</span>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-neon)] mb-4">
              Company
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li>
                <Link href="#team" className="hover:text-white transition-colors">
                  Engineering Team
                </Link>
              </li>
              <li>
                <Link href="#stories" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-white transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="#booking" className="hover:text-white transition-colors">
                  Schedule Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-neon)] mb-4">
              Legal
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Security Overview
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="col-span-2 md:col-span-1">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-neon)] mb-4">
              Connect
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li className="text-xs font-mono text-[var(--brand-neon)] pt-1">
                hello@builtscale.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 font-mono gap-4">
          <p>© 2026 BuiltScale Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-neon)] animate-pulse" />
            <span className="text-white/70">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
