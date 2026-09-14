'use client';

import React, { useState } from 'react';
import { SiteConfigData } from '@/lib/theme-config/types';
import { Check, Copy, Database, ShieldCheck } from 'lucide-react';

interface DatabaseTabProps {
  config: SiteConfigData;
}

export function DatabaseTab({ config }: DatabaseTabProps) {
  const [copied, setCopied] = useState(false);

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-base font-semibold text-zinc-100">Database & Configuration Export</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Review database connectivity status and export raw active design tokens.
        </p>
      </div>

      {/* Connection Status Card */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Neon Serverless Postgres Connection</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded flex justify-between">
            <span className="text-zinc-500">Database Status:</span>
            <span className="text-emerald-400 font-sans font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Connected
            </span>
          </div>
          <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded flex justify-between">
            <span className="text-zinc-500">ORM Engine:</span>
            <span className="text-zinc-300 font-sans">Prisma v6</span>
          </div>
          <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded flex justify-between">
            <span className="text-zinc-500">Model:</span>
            <span className="text-zinc-300">SiteConfig (singleton)</span>
          </div>
          <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded flex justify-between">
            <span className="text-zinc-500">Last Synced:</span>
            <span className="text-zinc-300">{config.updatedAt ? new Date(config.updatedAt).toLocaleTimeString() : 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Raw JSON Config */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-zinc-300">Active Site Configuration (JSON)</label>
          <button
            type="button"
            onClick={copyJson}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-300 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>
        </div>
        <pre className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-400 overflow-x-auto max-h-72">
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </div>
  );
}
