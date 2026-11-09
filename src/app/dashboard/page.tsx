import { redirect } from 'next/navigation';
import { isAuthenticated, getAdminCredentials } from '@/lib/auth';
import { getSiteConfig } from '@/lib/theme-config/service';
import { isCloudinaryConfigured } from '@/lib/cloudinary';
import { DashboardClient } from './components/dashboard-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const auth = await isAuthenticated();

  if (!auth) {
    redirect('/dashboard/login');
  }

  const config = await getSiteConfig();
  const { email } = getAdminCredentials();
  const cloudinaryReady = isCloudinaryConfigured();

  return (
    <DashboardClient
      initialConfig={config}
      adminEmail={email}
      isCloudinaryReady={cloudinaryReady}
    />
  );
}
