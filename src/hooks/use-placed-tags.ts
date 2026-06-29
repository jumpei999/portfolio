"use client"

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import {
  buildPlacedTags,
  getPlacementConfig,
  getPlacementTier,
  type PlacementTier,
} from "@/components/constituents/placement"
import type { PlacedTag } from "@/components/constituents/types"

const RESIZE_DEBOUNCE_MS = 150

function buildTagsForTier(tier: PlacementTier): PlacedTag[] {
  return buildPlacedTags(getPlacementConfig(tier))
}

function applyTierIfChanged(
  width: number,
  tierRef: { current: PlacementTier | null },
  setPlacedTags: Dispatch<SetStateAction<PlacedTag[]>>,
  setPlacementEpoch: Dispatch<SetStateAction<number>>,
) {
  const nextTier = getPlacementTier(width)
  if (nextTier === tierRef.current) return

  tierRef.current = nextTier
  setPlacementEpoch((epoch) => epoch + 1)
  setPlacedTags(buildTagsForTier(nextTier))
}

export function usePlacedTags(): {
  placedTags: PlacedTag[]
  placementEpoch: number
} {
  const [placedTags, setPlacedTags] = useState<PlacedTag[]>([])
  const [placementEpoch, setPlacementEpoch] = useState(0)
  const tierRef = useRef<PlacementTier | null>(null)

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const initialTier = getPlacementTier(window.innerWidth)
      tierRef.current = initialTier
      setPlacedTags(buildTagsForTier(initialTier))
    })

    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const onResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () =>
          applyTierIfChanged(
            window.innerWidth,
            tierRef,
            setPlacedTags,
            setPlacementEpoch,
          ),
        RESIZE_DEBOUNCE_MS,
      )
    }

    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(timeoutId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return { placedTags, placementEpoch }
}
