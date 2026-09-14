import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const token = process.env.CALENDLY_API_TOKEN;
    const eventTypeUri =
      process.env.CALENDLY_EVENT_TYPE_URI ||
      'https://api.calendly.com/event_types/c521d7d5-7b28-4988-a0fb-48f09a36b698';

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Calendly token not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const now = new Date();

    // Default: Next 7 days from today
    const startTimeParam =
      searchParams.get('start_time') || now.toISOString();

    const endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const endTimeParam =
      searchParams.get('end_time') || endDate.toISOString();

    const apiUrl = new URL('https://api.calendly.com/event_type_available_times');
    apiUrl.searchParams.set('event_type', eventTypeUri);
    apiUrl.searchParams.set('start_time', startTimeParam);
    apiUrl.searchParams.set('end_time', endTimeParam);

    const response = await fetch(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { success: false, error: 'Calendly API error', details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const rawSlots: Array<{
      status: string;
      start_time: string;
      scheduling_url: string;
      invitees_remaining: number;
    }> = data.collection || [];

    // Group live slots by YYYY-MM-DD
    const slotsByDate: Record<
      string,
      Array<{
        id: string;
        time: string;
        iso: string;
        schedulingUrl: string;
      }>
    > = {};

    rawSlots.forEach((slot) => {
      if (slot.status === 'available' && slot.invitees_remaining > 0) {
        const slotDate = new Date(slot.start_time);
        const dateKey = slotDate.toISOString().split('T')[0]; // YYYY-MM-DD

        // Format to 12h time (e.g. "10:00 AM")
        const timeLabel = slotDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        if (!slotsByDate[dateKey]) {
          slotsByDate[dateKey] = [];
        }

        slotsByDate[dateKey].push({
          id: slot.start_time,
          time: timeLabel,
          iso: slot.start_time,
          schedulingUrl: slot.scheduling_url,
        });
      }
    });

    return NextResponse.json({
      success: true,
      availableDates: Object.keys(slotsByDate).sort(),
      slotsByDate,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
