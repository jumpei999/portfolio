'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { BsLightningFill } from 'react-icons/bs';
import {
  FOOTER_ICON_BUTTON_CLASS,
  FOOTER_ICON_CLASS,
} from '@/components/footer/footer-icon-styles';
import {
  FOOTER_TOOLTIP_OFFSET,
  FOOTER_TOOLTIP_SIDE,
} from '@/components/footer/footer-tooltip';
import SiteTechStackIcons from '@/components/footer/site-tech-stack-icons';
import SiteTechStackIconsMarquee from '@/components/footer/site-tech-stack-icons-marquee';
import SocialIconLinks from '@/components/social-icon-links';
import { useMaxWidth } from '@/hooks/use-max-width';
import { Link } from '@/i18n/navigation';
import { MOBILE_MAX_WIDTH_PX } from '@/lib/media-queries';
import { scrollToHome } from '@/lib/scroll-to-home';
import { HOME_SECTION_ID, scrollToSectionById } from '@/lib/scroll-to-section';
import { MOBILE_BOTTOM_SPACER_HEIGHT_MAX_MD } from '@/lib/section-shell';
import { cn } from '@/lib/utils';

const MOBILE_SCROLL_DELAY_MS = 800;

export default function FooterClient() {
  const t = useTranslations('footer');
  const isMobile = useMaxWidth(MOBILE_MAX_WIDTH_PX);
  const reduceMotion = useReducedMotion();
  const [panelOpen, setPanelOpen] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const handleBackToTopClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      scrollToHome(event);
      return;
    }

    event.preventDefault();
    setPanelOpen(true);
    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      scrollToSectionById(HOME_SECTION_ID);
      setPanelOpen(false);
    }, MOBILE_SCROLL_DELAY_MS);
  };

  return (
    <>
      <Link
        href="#home"
        onClick={handleBackToTopClick}
        aria-label={t('backToTopAria')}
        className={cn(
          'peer/backToTop absolute left-1/2 top-0 z-30 -translate-x-1/2 translate-y-[-40%]',
          'inline-flex size-12 items-center justify-center rounded-full sm:size-14',
          'border-2 border-foreground bg-foreground text-background',
          'transition-transform duration-300 hover:scale-105',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background',
        )}
      >
        <BsLightningFill
          className="size-7 -translate-x-0.5 -translate-y-0.5 rotate-180 text-background sm:size-8"
          aria-hidden
        />
      </Link>

      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-full z-5 overflow-hidden',
          'md:peer-hover/backToTop:[&>div]:translate-y-0',
          'md:peer-focus-visible/backToTop:[&>div]:translate-y-0',
        )}
      >
        <motion.div
          animate={isMobile ? { y: panelOpen ? '0%' : '100%' } : false}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
          className={cn(
            'w-full bg-footer-elevated',
            'px-8 py-10 sm:px-12 sm:py-14',
            'md:translate-y-full md:transition-transform md:duration-300 md:ease-out',
            'motion-reduce:md:transition-none',
          )}
        >
          <p
            className={cn(
              'mx-auto max-w-4xl text-center font-bold tracking-tight text-background',
              'text-2xl sm:text-3xl md:text-4xl',
            )}
          >
            {t('backToTopHover')}
          </p>
        </motion.div>
      </div>

      <footer className="relative bg-foreground text-background">
        <div
          className={cn('mx-auto w-full py-4 md:w-3/4', 'min-h-12 sm:min-h-14')}
        >
          <div className="flex w-full items-center gap-2 md:justify-between">
            <div className="relative z-40 w-full min-w-0 md:hidden">
              <SiteTechStackIconsMarquee className="w-full min-w-0" />
            </div>
            <SiteTechStackIcons className="hidden md:flex" />
            <SocialIconLinks
              className="hidden shrink-0 md:flex"
              buttonSize="icon"
              iconClassName={FOOTER_ICON_CLASS}
              buttonClassName={FOOTER_ICON_BUTTON_CLASS}
              tooltipSide={FOOTER_TOOLTIP_SIDE}
              tooltipSideOffset={FOOTER_TOOLTIP_OFFSET}
            />
          </div>
        </div>
      </footer>
      <div
        aria-hidden
        className={cn(
          'bg-background md:hidden',
          MOBILE_BOTTOM_SPACER_HEIGHT_MAX_MD,
        )}
      />
    </>
  );
}
