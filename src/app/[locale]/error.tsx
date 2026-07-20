'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: Readonly<ErrorProps>) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-bold">{t('genericTitle')}</h1>
      <p className="max-w-md text-muted-foreground">
        {t('genericDescription')}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-none border border-border px-4 py-2 text-sm font-normal hover:bg-muted"
      >
        {t('retry')}
      </button>
    </main>
  );
}
