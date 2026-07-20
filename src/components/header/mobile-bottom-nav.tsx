'use client';

import { useTranslations } from 'next-intl';
import SiteNavLinks from '@/components/header/site-nav-links';
import { MOBILE_NAV_ITEMS } from '@/data/nav-items';

export default function MobileBottomNav() {
  const t = useTranslations('nav');

  return (
    <nav
      className="site-chrome-surface fixed inset-x-0 bottom-0 z-50 border-t border-border/60 pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label={t('sectionsAria')}
    >
      <SiteNavLinks items={MOBILE_NAV_ITEMS} orientation="bottom" />
    </nav>
  );
}
