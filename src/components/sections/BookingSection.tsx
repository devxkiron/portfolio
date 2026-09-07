"use client";

import React, { useState } from "react";
import { SectionHeader } from "../common/SectionHeader";
import { ScrollReveal } from "../common/ScrollReveal";
import { Button } from "../common/Button";
import { Calendar, Clock, Video, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export const BookingSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(21);
  const [selectedTime, setSelectedTime] = useState<string>("02:00 PM");
  const [email, setEmail] = useState<string>("");
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsBooked(true);
  };

  return (
    <section id="booking" className="py-20 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up">
          <SectionHeader
            badge="DIRECT ACCESS"
            titlePrefix="Book a"
            highlightText="FREE STRATEGY CALL"
            subtitle="Pick a time on the calendar below to speak directly with an engineer. No pitch, just architecture."
            align="center"
            className="mb-14"
          />
        </ScrollReveal>

        {/* Dual-Pane Booking Widget Card */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden bg-white dark:bg-[#121a14] flex flex-col md:flex-row">
            {/* Left Pane: Dark Calendar Widget */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 bg-[#101612] text-white flex flex-col justify-between">
              <div>
                {/* Meeting Meta */}
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[var(--brand-neon)]/10 text-[var(--brand-neon)] flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">30-Minute Intro Call</h4>
                      <p className="text-xs text-white/50">Via Google Meet</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[var(--brand-neon)] bg-[var(--brand-neon)]/10 px-2.5 py-1 rounded">
                    Free
                  </span>
                </div>

                {/* Month Title */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold tracking-wider font-mono text-white/90">
                    AUGUST 2026
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                    <Calendar className="w-3.5 h-3.5" /> Select Date
                  </div>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono text-white/40 mb-2">
                  <span>MO</span>
                  <span>TU</span>
                  <span>WE</span>
                  <span>TH</span>
                  <span>FR</span>
                  <span>SA</span>
                  <span>SU</span>
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {daysInMonth.slice(0, 28).map((day) => {
                    const isSelected = selectedDay === day;
                    const isAvailable = day % 2 === 1 && day >= 10;

                    return (
                      <button
                        key={day}
                        disabled={!isAvailable}
                        onClick={() => setSelectedDay(day)}
                        className={`h-8 sm:h-9 rounded-lg text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? "bg-[var(--brand-neon)] text-[var(--brand-dark)] font-bold shadow-[0_0_12px_rgba(174,255,0,0.4)]"
                            : isAvailable
                            ? "bg-white/[0.05] text-white hover:bg-white/15"
                            : "opacity-20 text-white/30 cursor-not-allowed"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Call Details Bottom */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--brand-neon)]" /> 30 mins
                </span>
                <span className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-[var(--brand-neon)]" /> Video Call
                </span>
              </div>
            </div>

            {/* Right Pane: Timeslot & Form */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 bg-[var(--background)] flex flex-col justify-between">
              {isBooked ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-neon)] text-[var(--brand-dark)] flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[var(--foreground)]">Meeting Scheduled!</h4>
                  <p className="text-sm text-[var(--foreground)]/70 mt-2 max-w-xs">
                    We have sent a calendar invite for August {selectedDay} at {selectedTime} to{" "}
                    <strong>{email}</strong>.
                  </p>
                  <button
                    onClick={() => setIsBooked(false)}
                    className="mt-6 text-xs font-bold text-[#6dae00] dark:text-[var(--brand-neon)] underline"
                  >
                    Book another time
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="flex flex-col justify-between h-full space-y-6">
                  <div>
                    <h4 className="text-base font-bold text-[var(--foreground)] mb-1">
                      Available Slots for August {selectedDay}
                    </h4>
                    <p className="text-xs text-[var(--foreground)]/60 mb-5">
                      Times displayed in your local timezone.
                    </p>

                    {/* Timeslot Pills */}
                    <div className="grid grid-cols-2 gap-2.5 mb-6">
                      {timeSlots.map((time) => {
                        const isTimeSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                              isTimeSelected
                                ? "bg-[var(--brand-dark)] text-[var(--brand-neon)] border-[var(--brand-neon)]/50 shadow-sm"
                                : "bg-[var(--brand-muted)] text-[var(--foreground)]/80 border-black/[0.08] dark:border-white/[0.08] hover:border-black/20"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/70 mb-2 font-mono">
                        Work Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.12] dark:border-white/[0.15] bg-white dark:bg-black/30 text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--brand-neon)] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Confirm Booking for Aug {selectedDay}
                    </Button>
                    <p className="text-[11px] text-center text-[var(--foreground)]/50 mt-3 font-mono">
                      No spam • Instant Google Calendar invite
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
