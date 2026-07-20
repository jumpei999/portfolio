'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { MOBILE_NAV_ICONS } from '@/data/nav-icons';
import type { NavItem } from '@/data/nav-items';
import { Link } from '@/i18n/navigation';
import { scrollToSection } from '@/lib/scroll-to-section';
import { cn } from '@/lib/utils';

type SiteNavLinksProps = Readonly<{
  items: readonly NavItem[];
  orientation: 'horizontal' | 'bottom';
  onNavigate?: () => void;
}>;

export default function SiteNavLinks({
  items,
  orientation,
  onNavigate,
}: SiteNavLinksProps) {
  const t = useTranslations('nav');
  const isBottom = orientation === 'bottom';

  return (
    <ul
      className={cn(
        isBottom
          ? 'flex w-full min-h-(--site-bottom-nav-height) items-stretch'
          : 'flex items-center gap-1',
      )}
    >
      {items.map((item) => {
        const MobileIcon =
          isBottom && item.key !== 'home' ? MOBILE_NAV_ICONS[item.key] : null;

        return (
          <li
            key={item.key}
            className={cn(isBottom ? 'flex min-w-0 flex-1' : 'py-3')}
          >
            <Button
              asChild
              variant="ghost"
              size={isBottom ? 'default' : 'sm'}
              className={cn(
                isBottom &&
                  'size-full min-h-(--site-bottom-nav-height) rounded-none px-1 py-1.5',
              )}
            >
              <Link
                href={item.href}
                title={t(item.key)}
                onClick={(event) => {
                  scrollToSection(event, item.href);
                  onNavigate?.();
                }}
                className={cn(
                  isBottom &&
                    'flex w-full flex-col items-center justify-center gap-0.5',
                )}
              >
                {MobileIcon ? (
                  <>
                    <MobileIcon className="size-5 shrink-0" aria-hidden />
                    <span className="max-w-full truncate text-[10px] leading-tight sm:text-xs">
                      {t(item.key)}
                    </span>
                  </>
                ) : (
                  t(item.key)
                )}
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
