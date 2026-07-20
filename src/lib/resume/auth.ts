import { cookies } from 'next/headers';
import { signResumeSession, verifyResumeSession } from '@/lib/resume/crypto';
import {
  getCurrentAuthEpoch,
  getPasswordSecretFromEnv,
  verifyMonthlyPassword,
} from '@/lib/resume/monthly-password';

export const RESUME_SESSION_COOKIE = 'resume_private_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type ResumeSessionPayload = {
  epoch: string;
  exp: number;
};

function getSessionSecretFromEnv(): string {
  const secret = process.env.RESUME_SESSION_SECRET;
  if (!secret) {
    throw new Error('RESUME_SESSION_SECRET is not set');
  }
  return secret;
}

function encodeSession(payload: ResumeSessionPayload, secret: string): string {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    'base64url',
  );
  const signature = signResumeSession(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

function decodeSession(
  value: string,
  secret: string,
): ResumeSessionPayload | null {
  const [encodedPayload, signature] = value.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  if (!verifyResumeSession(encodedPayload, signature, secret)) {
    return null;
  }

  try {
    return JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    ) as ResumeSessionPayload;
  } catch {
    return null;
  }
}

export async function isResumeAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(RESUME_SESSION_COOKIE)?.value;
  if (!value) {
    return false;
  }

  const payload = decodeSession(value, getSessionSecretFromEnv());
  if (!payload) {
    return false;
  }

  if (payload.epoch !== getCurrentAuthEpoch()) {
    return false;
  }

  return payload.exp > Math.floor(Date.now() / 1000);
}

export function createResumeSessionCookieValue(now = new Date()): string {
  const payload: ResumeSessionPayload = {
    epoch: getCurrentAuthEpoch(now),
    exp: Math.floor(now.getTime() / 1000) + SESSION_MAX_AGE_SECONDS,
  };

  return encodeSession(payload, getSessionSecretFromEnv());
}

export function verifyResumeLoginPassword(
  password: string,
  now = new Date(),
): boolean {
  return verifyMonthlyPassword(password, getPasswordSecretFromEnv(), now);
}

export function getResumeSessionCookieOptions(now = new Date()) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
    expires: new Date(now.getTime() + SESSION_MAX_AGE_SECONDS * 1000),
  };
}
