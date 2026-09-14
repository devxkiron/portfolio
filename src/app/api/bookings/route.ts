import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, date, time, iso, schedulingUrl } = body;

    if (!email || !date || !time) {
      return NextResponse.json(
        { success: false, error: 'Missing required booking fields' },
        { status: 400 }
      );
    }

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, 'bookings.json');
    let bookings: Array<any> = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        bookings = JSON.parse(fileContent);
      } catch (e) {
        bookings = [];
      }
    }

    const newBooking = {
      id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: name?.trim() || 'Anonymous Client',
      email: email.trim(),
      date,
      time,
      iso: iso || null,
      schedulingUrl: schedulingUrl || null,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      emailSent: false, // Ready for future mail functionality
    };

    bookings.unshift(newBooking);

    // Persist to disk
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Booking stored successfully',
      booking: newBooking,
    });
  } catch (error: any) {
    console.error('Error saving booking:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'bookings.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: true, bookings: [] });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const bookings = JSON.parse(fileContent);
    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
