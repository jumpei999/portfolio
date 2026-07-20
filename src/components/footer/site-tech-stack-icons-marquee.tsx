'use client';

import { useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  type CSSProperties,
  type Ref,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FOOTER_ICON_CLASS } from '@/components/footer/footer-icon-styles';
import { TechStackIcon } from '@/components/footer/site-tech-stack-icon-item';
import { SITE_TECH_STACK } from '@/data/site-tech-stack';
import { cn } from '@/lib/utils';

const MARQUEE_SPEED_PX_PER_SEC = 12;
const MARQUEE_COPY_BUFFER = 2;
const MARQUEE_FALLBACK_COPY_COUNT = 5;

type SiteTechStackIconsMarqueeProps = Readonly<{
  className?: string;
}>;

type MarqueeMetrics = Readonly<{
  shiftPx: number;
  copyCount: number;
}>;

type FooterMarqueeTrackStyle = CSSProperties & {
  '--footer-marquee-shift': string;
  '--footer-marquee-duration': string;
};

function getFooterMarqueeTrackStyle(shiftPx: number): FooterMarqueeTrackStyle {
  return {
    '--footer-marquee-shift': `${shiftPx}px`,
    '--footer-marquee-duration': `${shiftPx / MARQUEE_SPEED_PX_PER_SEC}s`,
  };
}

const MARQUEE_SEGMENT_CLASS =
  'flex shrink-0 flex-nowrap items-center gap-1 pr-1';

function getMarqueeCopyCount(
  viewportWidth: number,
  segmentWidth: number,
): number {
  if (segmentWidth <= 0) {
    return 2;
  }

  return Math.max(
    2,
    Math.ceil(viewportWidth / segmentWidth) + MARQUEE_COPY_BUFFER,
  );
}

function MarqueeIconSegment({
  idPrefix,
  ref,
}: Readonly<{
  idPrefix: string;
  ref?: Ref<HTMLDivElement>;
}>) {
  return (
    <div ref={ref} className={MARQUEE_SEGMENT_CLASS} aria-hidden>
      {SITE_TECH_STACK.map((item) => (
        <span
          key={`${idPrefix}-${item.slug}`}
          className="inline-flex size-8 shrink-0 items-center justify-center"
        >
          <TechStackIcon slug={item.slug} className={FOOTER_ICON_CLASS} />
        </span>
      ))}
    </div>
  );
}

export default function SiteTechStackIconsMarquee({
  className,
}: SiteTechStackIconsMarqueeProps) {
  const t = useTranslations('footer');
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);
  const metricsLockedRef = useRef(false);
  const [metrics, setMetrics] = useState<MarqueeMetrics | null>(null);

  useLayoutEffect(() => {
    if (reduceMotion || metricsLockedRef.current) {
      return;
    }

    const viewport = viewportRef.current;
    const segment = segmentRef.current;
    if (!viewport || !segment) {
      return;
    }

    let cancelled = false;

    const measureOnce = () => {
      if (cancelled || metricsLockedRef.current) {
        return;
      }

      const shiftPx = Math.round(segment.getBoundingClientRect().width);
      const viewportWidth = Math.round(viewport.getBoundingClientRect().width);

      if (shiftPx <= 0 || viewportWidth <= 0) {
        return;
      }

      metricsLockedRef.current = true;
      setMetrics({
        shiftPx,
        copyCount: getMarqueeCopyCount(viewportWidth, shiftPx),
      });
    };

    if (document.fonts.status === 'loaded') {
      measureOnce();
    } else {
      void document.fonts.ready.then(measureOnce);
    }

    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section
        className={cn('pointer-events-none overflow-x-auto', className)}
        aria-label={t('techStackAria')}
      >
        <div className="mx-auto flex w-max justify-center">
          <MarqueeIconSegment idPrefix="static" />
        </div>
      </section>
    );
  }

  const shiftPx = metrics?.shiftPx ?? null;
  const copyCount = metrics?.copyCount ?? MARQUEE_FALLBACK_COPY_COUNT;

  return (
    <section
      ref={viewportRef}
      className={cn('pointer-events-none overflow-hidden', className)}
      aria-label={t('techStackAria')}
    >
      <div
        className={cn(
          'footer-marquee-track flex w-max items-center',
          shiftPx !== null && 'footer-marquee-track--active',
        )}
        style={
          shiftPx === null ? undefined : getFooterMarqueeTrackStyle(shiftPx)
        }
      >
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <MarqueeIconSegment
            key={`marquee-copy-${copyIndex}`}
            idPrefix={`${copyIndex}`}
            ref={copyIndex === 0 ? segmentRef : undefined}
          />
        ))}
      </div>
    </section>
  );
}
