'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { LuLanguages } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale: Locale = locale === 'ja' ? 'en' : 'ja';

  const handleSwitch = useCallback(() => {
    router.replace(pathname, { locale: otherLocale });
    globalThis.scrollTo({ top: 0, behavior: 'auto' });
  }, [otherLocale, pathname, router]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={t('localeToggleAria')}
          onClick={handleSwitch}
        >
          <LuLanguages className="size-3.5" aria-hidden />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{t('localeToggleLabel')}</TooltipContent>
    </Tooltip>
  );
}
