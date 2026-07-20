'use client';

import {
  type RefObject,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import { DESKTOP_MIN_MEDIA_QUERY } from '@/lib/media-queries';

type UseFitTextFontSizeOptions = {
  containerRef: RefObject<HTMLElement | null>;
  textRef: RefObject<HTMLElement | null>;
  minPx: number;
  maxPx: number;
  contentKey: string;
  trackingTiers: readonly number[];
};

export type FitTextFontSizeResult = {
  enabled: boolean;
  fontSizePx: number;
  letterSpacingEm: number;
  ready: boolean;
};

type Measurement = {
  contentKey: string;
  fontSizePx: number;
  letterSpacingEm: number;
};

function findMaxFontSize(
  textEl: HTMLElement,
  containerWidth: number,
  minPx: number,
  maxPx: number,
  letterSpacingEm: number,
): number {
  textEl.style.letterSpacing = `${letterSpacingEm}em`;

  let low = minPx;
  let high = maxPx;
  let best = minPx;

  while (low <= high) {
    const mid = Math.round(((low + high) / 2) * 2) / 2;
    textEl.style.fontSize = `${mid}px`;

    if (textEl.scrollWidth <= containerWidth) {
      best = mid;
      low = mid + 0.5;
    } else {
      high = mid - 0.5;
    }
  }

  return best;
}

function measureFit(
  container: HTMLElement,
  textEl: HTMLElement,
  minPx: number,
  maxPx: number,
  trackingTiers: readonly number[],
): Pick<FitTextFontSizeResult, 'fontSizePx' | 'letterSpacingEm'> {
  const width = container.clientWidth;
  let bestFontSize = minPx;
  let bestTracking = trackingTiers[0] ?? 0;

  for (const tier of trackingTiers) {
    const fontSize = findMaxFontSize(textEl, width, minPx, maxPx, tier);

    if (
      fontSize > bestFontSize ||
      (fontSize === bestFontSize && tier > bestTracking)
    ) {
      bestFontSize = fontSize;
      bestTracking = tier;
    }
  }

  return { fontSizePx: bestFontSize, letterSpacingEm: bestTracking };
}

function subscribeMobileFitEnabled(onStoreChange: () => void) {
  const mediaQuery = globalThis.matchMedia(DESKTOP_MIN_MEDIA_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getMobileFitEnabledSnapshot() {
  return !globalThis.matchMedia(DESKTOP_MIN_MEDIA_QUERY).matches;
}

function getMobileFitEnabledServerSnapshot() {
  return false;
}

export function useFitTextFontSize({
  containerRef,
  textRef,
  minPx,
  maxPx,
  contentKey,
  trackingTiers,
}: UseFitTextFontSizeOptions): FitTextFontSizeResult {
  const defaultTracking = trackingTiers[0] ?? 0;
  const enabled = useSyncExternalStore(
    subscribeMobileFitEnabled,
    getMobileFitEnabledSnapshot,
    getMobileFitEnabledServerSnapshot,
  );
  const [measurement, setMeasurement] = useState<Measurement | null>(null);

  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) {
      return;
    }

    let cancelled = false;

    const runMeasure = () => {
      if (cancelled) {
        return;
      }

      const width = container.clientWidth;
      if (width <= 0) {
        requestAnimationFrame(runMeasure);
        return;
      }

      const measured = measureFit(
        container,
        textEl,
        minPx,
        maxPx,
        trackingTiers,
      );

      if (!cancelled) {
        setMeasurement({
          contentKey,
          fontSizePx: measured.fontSizePx,
          letterSpacingEm: measured.letterSpacingEm,
        });
      }
    };

    const schedule = () => {
      void document.fonts.ready.then(runMeasure);
    };

    schedule();

    const observer = new ResizeObserver(schedule);
    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [containerRef, textRef, enabled, minPx, maxPx, contentKey, trackingTiers]);

  if (!enabled) {
    return {
      enabled: false,
      fontSizePx: minPx,
      letterSpacingEm: defaultTracking,
      ready: true,
    };
  }

  const isReady = measurement !== null && measurement.contentKey === contentKey;

  return {
    enabled: true,
    fontSizePx: isReady ? measurement.fontSizePx : minPx,
    letterSpacingEm: isReady ? measurement.letterSpacingEm : defaultTracking,
    ready: isReady,
  };
}
