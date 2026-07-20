'use client';

import { useSyncExternalStore } from 'react';
import {
  getPlacementTier,
  type PlacementTier,
} from '@/lib/constituents/placement';
import {
  DESKTOP_MIN_MEDIA_QUERY,
  MOBILE_MAX_WIDTH_PX,
  NARROW_MAX_WIDTH_PX,
} from '@/lib/media-queries';

function subscribe(onStoreChange: () => void) {
  const queries = [
    globalThis.matchMedia(`(max-width: ${NARROW_MAX_WIDTH_PX}px)`),
    globalThis.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`),
    globalThis.matchMedia(DESKTOP_MIN_MEDIA_QUERY),
  ];

  queries.forEach((mq) => {
    mq.addEventListener('change', onStoreChange);
  });

  return () => {
    queries.forEach((mq) => {
      mq.removeEventListener('change', onStoreChange);
    });
  };
}

function getTierSnapshot(): PlacementTier {
  return getPlacementTier(globalThis.innerWidth);
}

function getTierServerSnapshot(): PlacementTier {
  return 'desktop';
}

export function usePlacementTier(): PlacementTier {
  return useSyncExternalStore(
    subscribe,
    getTierSnapshot,
    getTierServerSnapshot,
  );
}
