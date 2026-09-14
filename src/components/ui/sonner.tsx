'use client';

import React from 'react';
import { Toaster as SonnerToaster, toast } from 'sonner';
import 'sonner/dist/styles.css';

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      position="bottom-right"
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-950/95 text-zinc-100 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl font-sans text-xs',
          description: 'text-zinc-400 text-[11px] mt-0.5 leading-relaxed font-sans',
          actionButton:
            'bg-[#aeff00] text-black font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[#b8ff1a]',
          cancelButton:
            'bg-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded-lg hover:bg-zinc-700',
          success:
            'border-emerald-500/30 text-emerald-300 [&>svg]:text-emerald-400',
          error:
            'border-red-500/30 text-red-300 [&>svg]:text-red-400',
          info:
            'border-[#aeff00]/30 text-zinc-100 [&>svg]:text-[#aeff00]',
          warning:
            'border-amber-500/30 text-amber-300 [&>svg]:text-amber-400',
        },
      }}
      {...props}
    />
  );
};

export { toast };
