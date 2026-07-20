import { createHmac, timingSafeEqual } from 'node:crypto';

const AUTH_TIME_ZONE = 'Asia/Tokyo';
const GRACE_PERIOD_DAYS = 3;
const PASSWORD_LENGTH = 24;

export function getCurrentAuthEpoch(now = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: AUTH_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
  });
  const parts = formatter.formatToParts(now);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;

  if (!year || !month) {
    throw new Error('Failed to resolve auth epoch');
  }

  return `${year}-${month}`;
}

export function getPreviousAuthEpoch(now = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: AUTH_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(now);
  const year = Number(parts.find((part) => part.type === 'year')?.value);
  const month = Number(parts.find((part) => part.type === 'month')?.value);
  const day = Number(parts.find((part) => part.type === 'day')?.value);

  if (!year || !month || !day) {
    throw new Error('Failed to resolve previous auth epoch');
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCMonth(date.getUTCMonth() - 1);

  const previousFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: AUTH_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
  });
  const previousParts = previousFormatter.formatToParts(date);
  const previousYear = previousParts.find(
    (part) => part.type === 'year',
  )?.value;
  const previousMonth = previousParts.find(
    (part) => part.type === 'month',
  )?.value;

  if (!previousYear || !previousMonth) {
    throw new Error('Failed to resolve previous auth epoch');
  }

  return `${previousYear}-${previousMonth}`;
}

export function getJstDayOfMonth(now = new Date()): number {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: AUTH_TIME_ZONE,
    day: '2-digit',
  });
  const day = formatter
    .formatToParts(now)
    .find((part) => part.type === 'day')?.value;

  if (!day) {
    throw new Error('Failed to resolve JST day of month');
  }

  return Number(day);
}

export function isWithinGracePeriod(now = new Date()): boolean {
  return getJstDayOfMonth(now) <= GRACE_PERIOD_DAYS;
}

export function deriveMonthlyPassword(secret: string, epoch: string): string {
  return createHmac('sha256', secret)
    .update(`resume-auth:${epoch}`)
    .digest('base64url')
    .slice(0, PASSWORD_LENGTH);
}

function passwordsMatch(candidate: string, expected: string): boolean {
  const candidateBuffer = Buffer.from(candidate);
  const expectedBuffer = Buffer.from(expected);

  if (candidateBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateBuffer, expectedBuffer);
}

export function verifyMonthlyPassword(
  candidate: string,
  secret: string,
  now = new Date(),
): boolean {
  const currentEpoch = getCurrentAuthEpoch(now);
  const currentPassword = deriveMonthlyPassword(secret, currentEpoch);

  if (passwordsMatch(candidate, currentPassword)) {
    return true;
  }

  if (!isWithinGracePeriod(now)) {
    return false;
  }

  const previousEpoch = getPreviousAuthEpoch(now);
  const previousPassword = deriveMonthlyPassword(secret, previousEpoch);
  return passwordsMatch(candidate, previousPassword);
}

export function getPasswordSecretFromEnv(): string {
  const secret = process.env.RESUME_PASSWORD_SECRET;
  if (!secret) {
    throw new Error('RESUME_PASSWORD_SECRET is not set');
  }
  return secret;
}

export function getLastDayOfMonth(epoch: string): string {
  const [year, month] = epoch.split('-').map(Number);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return `${epoch}-${String(lastDay).padStart(2, '0')}`;
}
