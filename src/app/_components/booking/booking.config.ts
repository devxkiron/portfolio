import { BookingConfig } from './types';

export const bookingConfig: BookingConfig = {
  sectionId: 'booking',
  badgeText: 'SCHEDULE A CALL',
  titlePrefix: 'Book a',
  titleHighlight: 'FREE STRATEGY CALL',
  subtitle:
    'Pick a date and time to discuss your product architecture, roadmap, and scope directly with our lead engineer.',
  hostName: 'Kiron',
  meetingTitle: '30 Minute Strategy Call',
  meetingDuration: '30 min',
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    'https://calendly.com/devxkiron/30min',
  defaultTimezone: 'UTC (London / Remote)',
  defaultMode: 'custom',
  availableTimeSlots: [
    { id: 'slot-0900', time: '09:00 AM', period: 'morning', available: true },
    { id: 'slot-1000', time: '10:00 AM', period: 'morning', available: true },
    { id: 'slot-1130', time: '11:30 AM', period: 'morning', available: true },
    { id: 'slot-1300', time: '01:00 PM', period: 'afternoon', available: true },
    { id: 'slot-1430', time: '02:30 PM', period: 'afternoon', available: true },
    { id: 'slot-1600', time: '04:00 PM', period: 'afternoon', available: true },
    { id: 'slot-1730', time: '05:30 PM', period: 'evening', available: true },
    { id: 'slot-1900', time: '07:00 PM', period: 'evening', available: true },
  ],
};
