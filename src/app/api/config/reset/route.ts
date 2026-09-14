import { NextResponse } from 'next/server';
import { resetSiteConfig } from '@/lib/theme-config/service';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const reset = await resetSiteConfig();
    return NextResponse.json({ success: true, data: reset, message: 'Configuration reset to defaults' });
  } catch (error) {
    console.error('Error in POST /api/config/reset:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset configuration' },
      { status: 500 }
    );
  }
}
