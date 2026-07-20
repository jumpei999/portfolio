import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { resolveLocaleFromAcceptLanguage } from './lib/resolve-locale-from-accept-language';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

const handleI18nRouting = createMiddleware(routing);

function pathnameHasExplicitLocale(pathname: string): boolean {
  return routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export default function proxy(request: NextRequest) {
  const hasLocaleCookie = request.cookies.has(LOCALE_COOKIE_NAME);
  const hasLocalePrefix = pathnameHasExplicitLocale(request.nextUrl.pathname);

  if (!hasLocaleCookie && !hasLocalePrefix) {
    const locale = resolveLocaleFromAcceptLanguage(
      request.headers.get('accept-language'),
    );
    const headers = new Headers(request.headers);
    headers.set('accept-language', locale);

    return handleI18nRouting(
      new NextRequest(request.url, {
        headers,
        method: request.method,
      }),
    );
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|sentry-tunnel|.*[.].*).*)'],
};
