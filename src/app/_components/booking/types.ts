export type BookingViewMode = 'custom' | 'calendly';

export interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  available: boolean;
}

export interface BookingConfig {
  sectionId: string;
  badgeText?: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  hostName: string;
  meetingTitle: string;
  meetingDuration: string;
  calendlyUrl: string;
  defaultTimezone: string;
  defaultMode: BookingViewMode;
  availableTimeSlots: TimeSlot[];
}
