import { routing } from '@/i18n/routing';

const DEFAULT_SITE_URL = 'http://localhost:3000';

export function getSiteUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL);
}

export function getSiteOrigin(): string {
  return getSiteUrl().origin;
}

export function getLocalizedPath(locale: string): string {
  return locale === routing.defaultLocale ? '/' : `/${locale}`;
}

export function getAbsoluteLocalizedUrl(locale: string): string {
  return new URL(getLocalizedPath(locale), getSiteUrl()).toString();
}
