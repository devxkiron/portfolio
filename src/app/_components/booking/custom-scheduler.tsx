'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Globe, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendlyModal } from './calendly-modal';
import { ThankYouModal } from './thank-you-modal';

interface LiveSlot {
  id: string;
  time: string;
  iso: string;
  schedulingUrl: string;
}

interface CustomSchedulerProps {
  calendlyUrl: string;
  defaultTimezone?: string;
}

export const CustomScheduler: React.FC<CustomSchedulerProps> = ({
  calendlyUrl,
  defaultTimezone = 'Asia/Dhaka (Local)',
}) => {
  const [loading, setLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [slotsByDate, setSlotsByDate] = useState<Record<string, LiveSlot[]>>({});

  const [selectedDateStr, setSelectedDateStr] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<LiveSlot | null>(null);

  // Form inputs & states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [lastBookingData, setLastBookingData] = useState<{
    name: string;
    email: string;
    date: string;
    time: string;
    iso?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch live availability from Next.js API route
  useEffect(() => {
    let isMounted = true;

    async function fetchAvailability() {
      try {
        setLoading(true);
        const res = await fetch('/api/calendly/availability');
        const data = await res.json();

        if (isMounted && data.success) {
          const dates: string[] = data.availableDates || [];
          const slots: Record<string, LiveSlot[]> = data.slotsByDate || {};

          setAvailableDates(dates);
          setSlotsByDate(slots);

          if (dates.length > 0) {
            const firstDate = dates[0];
            setSelectedDateStr(firstDate);
            if (slots[firstDate] && slots[firstDate].length > 0) {
              setSelectedSlot(slots[firstDate][0]);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load Calendly live availability:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAvailability();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update selected slot when selected date changes
  const currentDaySlots = useMemo(() => {
    return slotsByDate[selectedDateStr] || [];
  }, [slotsByDate, selectedDateStr]);

  const handleSelectDate = (dateStr: string) => {
    setSelectedDateStr(dateStr);
    const slots = slotsByDate[dateStr] || [];
    if (slots.length > 0) {
      setSelectedSlot(slots[0]);
    } else {
      setSelectedSlot(null);
    }
  };

  // Month & Year of selected date
  const { displayMonthName, displayYear, calendarDays } = useMemo(() => {
    const refDate = selectedDateStr ? new Date(`${selectedDateStr}T00:00:00`) : new Date();
    const year = refDate.getFullYear();
    const month = refDate.getMonth();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const firstDayIndex = new Date(year, month, 1).getDay();
    // Monday-first offset: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
    const startOffset = (firstDayIndex + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: {
      dayNumber: number | null;
      dateStr: string | null;
      hasLiveSlots: boolean;
    }[] = [];

    for (let i = 0; i < startOffset; i++) {
      days.push({ dayNumber: null, dateStr: null, hasLiveSlots: false });
    }

    for (let d = 1; d <= totalDays; d++) {
      const monthPadded = String(month + 1).padStart(2, '0');
      const dayPadded = String(d).padStart(2, '0');
      const dStr = `${year}-${monthPadded}-${dayPadded}`;
      const hasLiveSlots = availableDates.includes(dStr);

      days.push({
        dayNumber: d,
        dateStr: dStr,
        hasLiveSlots,
      });
    }

    return {
      displayMonthName: monthNames[month],
      displayYear: year,
      calendarDays: days,
    };
  }, [selectedDateStr, availableDates]);

  // Formatted date label for header
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDateStr) return '';
    const d = new Date(`${selectedDateStr}T00:00:00`);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const mName = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return `${dayName}, ${mName} ${d.getDate()}`;
  }, [selectedDateStr]);

  // Construct target slot Calendly URL for direct confirmation modal
  const targetSchedulingUrl = useMemo(() => {
    const baseUrl = selectedSlot?.schedulingUrl || calendlyUrl;
    try {
      const u = new URL(baseUrl);
      u.searchParams.set('embed_domain', typeof window !== 'undefined' ? window.location.host : '1');
      u.searchParams.set('embed_type', 'Inline');
      u.searchParams.set('hide_landing_page_details', '1');
      u.searchParams.set('hide_gdpr_banner', '1');
      u.searchParams.set('background_color', '0d0d0e');
      u.searchParams.set('text_color', 'ffffff');
      u.searchParams.set('primary_color', 'aeff00');
      if (name.trim()) u.searchParams.set('name', name.trim());
      if (email.trim()) u.searchParams.set('email', email.trim());
      return u.toString();
    } catch {
      return baseUrl;
    }
  }, [selectedSlot, calendlyUrl, name, email]);

  // Show Thank You Modal directly when event is scheduled
  const handleBookingCompleted = () => {
    setIsModalOpen(false);

    setLastBookingData({
      name: name.trim() || 'Client',
      email: email.trim(),
      date: formattedSelectedDate,
      time: selectedSlot?.time || '',
      iso: selectedSlot?.iso,
    });

    setShowThankYouModal(true);
    setName('');
    setEmail('');
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid work email.');
      return;
    }

    if (!selectedSlot) {
      setErrorMsg('Please select an available time slot.');
      return;
    }

    setErrorMsg('');
    // Open the sleek in-page Calendly modal with name & email prefilled
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-5xl lg:max-w-6xl min-h-[580px] sm:min-h-[620px] rounded-2xl border border-zinc-800/90 bg-[#0a0a0a] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.85)] transition-all duration-300">
      {/* Sleek Dark Calendly In-Page Modal */}
      <CalendlyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        url={targetSchedulingUrl}
        slotDetails={{
          date: formattedSelectedDate,
          time: selectedSlot?.time || '',
        }}
        onEventScheduled={handleBookingCompleted}
      />

      {/* Animated Thank You Modal */}
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        bookingData={lastBookingData}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Column: Calendar Grid */}
        <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-zinc-800/80 flex flex-col justify-between">
          <div>
            {/* Top Bar: Month Title & Duration */}
            <div className="pb-5 flex items-center justify-between border-b border-zinc-800/80">
              {loading ? (
                <div className="h-6 w-36 bg-zinc-800/60 rounded-md animate-pulse" />
              ) : (
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {displayMonthName} {displayYear}
                </h3>
              )}

              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#aeff00]/80 px-3 py-1 rounded-full bg-[#162118]/40 border border-[#27382b]/50">
                30 min
              </span>
            </div>

            {/* Weekday Names */}
            <div className="grid grid-cols-7 gap-2 mt-6 mb-3 text-center">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName) => (
                <span
                  key={dayName}
                  className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-wider"
                >
                  {dayName}
                </span>
              ))}
            </div>

            {/* Calendar Grid with Skeleton Loader */}
            {loading ? (
              <div className="grid grid-cols-7 gap-2 sm:gap-2.5">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={`skel-day-${i}`}
                    className="h-11 sm:h-12 rounded-xl bg-zinc-900/80 border border-zinc-800/60 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-2 sm:gap-2.5">
                {calendarDays.map((item, index) => {
                  if (item.dayNumber === null) {
                    return <div key={`empty-${index}`} className="h-11 sm:h-12" />;
                  }

                  const isSelected = selectedDateStr === item.dateStr;
                  const isSelectable = item.hasLiveSlots;

                  return (
                    <button
                      key={`day-${item.dayNumber}`}
                      type="button"
                      disabled={!isSelectable}
                      onClick={() => item.dateStr && handleSelectDate(item.dateStr)}
                      className={`relative h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#aeff00] text-black font-extrabold shadow-[0_0_20px_rgba(174,255,0,0.45)] scale-[1.04] z-10 cursor-pointer'
                          : isSelectable
                          ? 'bg-zinc-900/70 hover:bg-zinc-800 text-zinc-100 border border-zinc-800/80 hover:border-zinc-600 cursor-pointer'
                          : 'text-zinc-700 cursor-not-allowed opacity-25 select-none'
                      }`}
                    >
                      <span>{item.dayNumber}</span>
                      {isSelectable && !isSelected && (
                        <span className="absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-[#aeff00]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Timezone Footer */}
          <div className="mt-8 pt-5 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-zinc-400">
            <Globe className="h-4 w-4 text-[#aeff00]" />
            <span className="font-medium">Timezone:</span>
            <span className="text-zinc-200 font-semibold">{defaultTimezone}</span>
          </div>
        </div>

        {/* Right Column: Time Slots & Confirmation */}
        <div className="lg:col-span-5 p-6 sm:p-10 bg-zinc-950 flex flex-col justify-between">
          <form onSubmit={handleConfirm} className="flex flex-col h-full justify-between">
            <div>
              {/* Active Date Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                {loading ? (
                  <div className="h-5 w-32 bg-zinc-800/60 rounded-md animate-pulse" />
                ) : (
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-200">
                    {formattedSelectedDate || 'SELECT A DATE'}
                  </span>
                )}

                {loading ? (
                  <div className="h-4 w-20 bg-zinc-800/60 rounded-md animate-pulse" />
                ) : (
                  <span className="text-xs font-semibold text-zinc-400">
                    {currentDaySlots.length} open slots
                  </span>
                )}
              </div>

              {/* Slots Grid with Custom Dark Scrollbar */}
              {loading ? (
                <div className="grid grid-cols-2 gap-2.5 mt-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`skel-slot-${i}`}
                      className="h-10 rounded-xl bg-zinc-900 border border-zinc-800/60 animate-pulse"
                    />
                  ))}
                </div>
              ) : currentDaySlots.length === 0 ? (
                <div className="py-14 text-center text-xs text-zinc-500">
                  No open slots for this date. Please select another highlighted day.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 mt-4 max-h-[260px] overflow-y-auto pr-1.5 custom-dark-scrollbar">
                  {currentDaySlots.map((slot) => {
                    const isSelected = selectedSlot?.id === slot.id;

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#aeff00] text-black font-extrabold shadow-[0_0_15px_rgba(174,255,0,0.35)]'
                            : 'bg-zinc-900/70 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-white'
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Inputs & Primary Button */}
            <div className="mt-6 pt-5 border-t border-zinc-800/80 space-y-3">
              <div>
                <label
                  htmlFor="client-name"
                  className="block text-xs font-semibold text-zinc-300 mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivers"
                  className="w-full rounded-xl bg-zinc-900/90 border border-zinc-800 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#aeff00] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="client-email"
                  className="block text-xs font-semibold text-zinc-300 mb-1.5"
                >
                  Work Email <span className="text-[#aeff00]">*</span>
                </label>
                <input
                  id="client-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@company.com"
                  className="w-full rounded-xl bg-zinc-900/90 border border-zinc-800 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#aeff00] transition-colors"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-400 font-semibold">{errorMsg}</p>
              )}

              {/* Official Primary Button */}
              <Button
                variant="neon"
                size="md"
                type="submit"
                disabled={!selectedSlot}
                className="w-full mt-2 py-3 text-xs sm:text-sm font-extrabold shadow-[0_0_20px_rgba(174,255,0,0.25)] hover:shadow-[0_0_30px_rgba(174,255,0,0.4)] disabled:opacity-30 disabled:cursor-not-allowed"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Confirm {selectedSlot ? selectedSlot.time : ''} Meeting
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
