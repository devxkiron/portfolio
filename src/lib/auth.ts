import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session_token';
const DEFAULT_SECRET = 'kiron_portfolio_secret_admin_token_2026_x92';
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecretKey(): string {
  return process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || 'kiron@admin.com',
    password: process.env.ADMIN_PASSWORD || 'kiron@admin',
  };
}

export function validateCredentials(email?: string, password?: string): boolean {
  const creds = getAdminCredentials();
  if (!email || !password) return false;
  return email.trim() === creds.email && password.trim() === creds.password;
}

export function createSessionToken(email: string): string {
  const expiresAt = Date.now() + TOKEN_EXPIRY_MS;
  const payload = Buffer.from(JSON.stringify({ email, exp: expiresAt })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecretKey())
    .update(payload)
    .digest('base64url');

  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): { valid: boolean; email?: string } {
  if (!token || typeof token !== 'string') return { valid: false };

  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [payload, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', getSecretKey())
    .update(payload)
    .digest('base64url');

  if (signature.length !== expectedSig.length) return { valid: false };

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);

  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false };
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (typeof data.exp !== 'number' || Date.now() > data.exp) {
      return { valid: false };
    }
    return { valid: true, email: data.email };
  } catch {
    return { valid: false };
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token).valid;
}

export { COOKIE_NAME };
