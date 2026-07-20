export const THEME_STORAGE_KEY = 'portfolio-theme';

export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type Theme = 'light' | 'dark' | 'system';

export function parseTheme(value: string | undefined | null): Theme {
  if (value === 'light' || value === 'dark' || value === 'system') {
    return value;
  }
  return 'system';
}

export function getThemeHtmlClass(theme: Theme): string | undefined {
  if (theme === 'light') return 'light';
  if (theme === 'dark') return 'dark';
  return undefined;
}

export function getThemeColorScheme(
  theme: Theme,
): 'light' | 'dark' | undefined {
  if (theme === 'light') return 'light';
  if (theme === 'dark') return 'dark';
  return undefined;
}

export function writeThemeCookie(theme: Theme): void {
  if (typeof document === 'undefined') return;

  const secure = globalThis.location?.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${THEME_STORAGE_KEY}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}
