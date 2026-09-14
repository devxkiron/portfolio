'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Check, Mail, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    name: string;
    email: string;
    date: string;
    time: string;
    iso?: string;
  } | null;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  onClose,
  bookingData,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const checkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const modalEl = modalRef.current;
    const checkEl = checkRef.current;
    if (!modalEl) return;

    const ctx = gsap.context(() => {
      // Entrance pop
      gsap.fromTo(
        modalEl,
        { scale: 0.88, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
      );

      // Checkmark bounce
      if (checkEl) {
        gsap.fromTo(
          checkEl,
          { scale: 0, rotate: -45 },
          { scale: 1, rotate: 0, duration: 0.5, delay: 0.15, ease: 'elastic.out(1, 0.6)' }
        );
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen || !bookingData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      {/* Backdrop Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0d0d0e] p-6 sm:p-8 text-center shadow-[0_0_80px_rgba(174,255,0,0.15)] overflow-hidden"
      >
        {/* Subtle top neon ambient glow */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-48 rounded-full bg-[#aeff00]/15 blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Animated Checkmark Badge */}
        <div
          ref={checkRef}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#162217] border-2 border-[#aeff00] text-[#aeff00] shadow-[0_0_25px_rgba(174,255,0,0.35)]"
        >
          <Check className="h-8 w-8 stroke-[3]" />
        </div>

        {/* Headline */}
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Thank You, {bookingData.name.split(' ')[0]}!
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Your 30-Minute Strategy Call has been automatically scheduled in Google Calendar.
        </p>

        {/* Booking Details Card */}
        <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-left text-xs space-y-2.5 font-medium">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Date:</span>
            <span className="font-bold text-white">{bookingData.date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Time:</span>
            <span className="font-bold text-[#aeff00]">{bookingData.time}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Email:</span>
            <span className="font-mono text-zinc-200 truncate max-w-[190px]">
              {bookingData.email}
            </span>
          </div>
          <div className="pt-2 border-t border-zinc-800/80 space-y-1.5 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5 text-[#aeff00]">
              <Video className="h-3.5 w-3.5 shrink-0" />
              <span>Google Meet link created automatically.</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span>Calendar invite sent to your inbox.</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="w-full py-3 text-xs font-bold text-black shadow-[0_0_20px_rgba(174,255,0,0.25)]"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
