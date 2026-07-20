'use client';

import { useTranslations } from 'next-intl';
import { HISTORY_NEXT_SECTION_ID } from '@/components/history/constants';
import SectionScrollLink from '@/components/section-scroll-link';

export default function HistorySkipButton() {
  const t = useTranslations('history');

  return (
    <SectionScrollLink
      href={`#${HISTORY_NEXT_SECTION_ID}`}
      label={t('skipToNext')}
      ariaLabel={t('skipToNextAria')}
    />
  );
}
