'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Loader2 } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  slotDetails?: {
    date: string;
    time: string;
  };
  onEventScheduled: () => void;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  url,
  slotDetails,
  onEventScheduled,
}) => {
  const [iframeLoading, setIframeLoading] = useState(true);

  // Listen for Calendly event scheduled message
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.event === 'calendly.event_scheduled') {
        onEventScheduled();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onEventScheduled]);

  // Reset loading state on open
  useEffect(() => {
    if (isOpen) {
      setIframeLoading(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-3xl h-[88vh] max-h-[720px] rounded-2xl border border-zinc-800 bg-[#0d0d0e] shadow-[0_0_80px_rgba(174,255,0,0.15)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#162217] border border-[#aeff00]/40 text-[#aeff00]">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Confirm Strategy Call
              </h3>
              {slotDetails && (
                <p className="text-[11px] text-zinc-400 font-medium">
                  {slotDetails.date} • <span className="text-[#aeff00]">{slotDetails.time}</span>
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Container with Iframe */}
        <div className="relative flex-1 w-full bg-[#0a0a0a]">
          {iframeLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] text-zinc-400 gap-3">
              <Loader2 className="h-7 w-7 animate-spin text-[#aeff00]" />
              <p className="text-xs text-zinc-400 font-medium">Loading Calendly Confirmation...</p>
            </div>
          )}

          <iframe
            src={url}
            title="Calendly Scheduling"
            className="w-full h-full border-0 bg-[#0a0a0a]"
            onLoad={() => setIframeLoading(false)}
            allow="camera; microphone; autoplay; fullscreen"
          />
        </div>
      </div>
    </div>
  );
};
