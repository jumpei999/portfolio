'use client';

import { useEffect, useRef, useState } from 'react';
import type { PlacedTag } from '@/components/constituents/types';
import { usePlacementTier } from '@/hooks/use-placement-tier';
import {
  buildPlacedTags,
  getPlacementConfig,
  getPlacementTier,
  type PlacementTier,
} from '@/lib/constituents/placement';

const RESIZE_DEBOUNCE_MS = 150;

function buildTagsForTier(tier: PlacementTier): PlacedTag[] {
  return buildPlacedTags(getPlacementConfig(tier));
}

export function usePlacedTags(): { placedTags: PlacedTag[] } {
  const tier = usePlacementTier();
  const [placedTags, setPlacedTags] = useState(() =>
    buildTagsForTier(getPlacementTier(globalThis.innerWidth)),
  );
  const prevTierRef = useRef(tier);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevTierRef.current = tier;
      return;
    }

    if (tier === prevTierRef.current) return;

    const timeoutId = setTimeout(() => {
      prevTierRef.current = tier;
      setPlacedTags(buildTagsForTier(tier));
    }, RESIZE_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [tier]);

  return { placedTags };
}
