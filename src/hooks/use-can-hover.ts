'use client';

import { useSyncExternalStore } from 'react';
import { CAN_HOVER_MEDIA_QUERY } from '@/lib/media-queries';

function subscribeCanHover(onStoreChange: () => void) {
  const mediaQuery = globalThis.matchMedia(CAN_HOVER_MEDIA_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getCanHoverSnapshot() {
  return globalThis.matchMedia(CAN_HOVER_MEDIA_QUERY).matches;
}

function getCanHoverServerSnapshot() {
  return false;
}

export function useCanHover() {
  return useSyncExternalStore(
    subscribeCanHover,
    getCanHoverSnapshot,
    getCanHoverServerSnapshot,
  );
}
