import { CONSTITUENT_TAGS } from "@/data/constituent-tags"
import { MOBILE_MAX_WIDTH_PX } from "@/lib/media-queries"
import type { PlacedTag } from "./types"

export const NARROW_MAX_WIDTH_PX = 375

export type PlacementTier = "narrow" | "mobile" | "desktop"

export type PlacementConfig = {
  edgePadding: { x: number; y: number }
  minDistance: number
  centerExclusion: { x: number; y: number }
}

const PLACEMENT_CONFIG: Record<PlacementTier, PlacementConfig> = {
  narrow: {
    edgePadding: { x: 8, y: 2 },
    minDistance: 10,
    centerExclusion: { x: 24, y: 12 },
  },
  mobile: {
    edgePadding: { x: 8, y: 2 },
    minDistance: 9,
    centerExclusion: { x: 18, y: 18 },
  },
  desktop: {
    edgePadding: { x: 8, y: 8 },
    minDistance: 9,
    centerExclusion: { x: 18, y: 18 },
  },
}

export function getPlacementTier(width: number): PlacementTier {
  if (width <= NARROW_MAX_WIDTH_PX) return "narrow"
  if (width <= MOBILE_MAX_WIDTH_PX) return "mobile"
  return "desktop"
}

export function getPlacementConfig(tier: PlacementTier): PlacementConfig {
  return PLACEMENT_CONFIG[tier]
}

function isInCenterExclusion(
  left: number,
  top: number,
  { x: radiusX, y: radiusY }: PlacementConfig["centerExclusion"],
) {
  const dx = (left - 50) / radiusX
  const dy = (top - 50) / radiusY
  return dx * dx + dy * dy < 1
}

function resolvePlacementConfig(config?: PlacementConfig): PlacementConfig {
  if (config) return config

  const width =
    typeof globalThis === "undefined"
      ? MOBILE_MAX_WIDTH_PX + 1
      : globalThis.innerWidth

  return getPlacementConfig(getPlacementTier(width))
}

export function buildPlacedTags(config?: PlacementConfig): PlacedTag[] {
  const {
    edgePadding: { x: paddingX, y: paddingY },
    minDistance,
    centerExclusion,
  } = resolvePlacementConfig(config)
  const placed: PlacedTag[] = []

  CONSTITUENT_TAGS.forEach((tag, index) => {
    let left = 0
    let top = 0
    let attempts = 0

    do {
      left = paddingX + Math.random() * (100 - paddingX * 2)
      top = paddingY + Math.random() * (100 - paddingY * 2)
      attempts++
    } while (
      attempts < 80 &&
      (isInCenterExclusion(left, top, centerExclusion) ||
        placed.some(
          (p) => Math.hypot(p.left - left, p.top - top) < minDistance,
        ))
    )

    placed.push({
      ...tag,
      left,
      top,
      driftX: 4 + Math.random() * 10,
      driftY: 3 + Math.random() * 9,
      duration: 6 + Math.random() * 7,
      popDelay: index * 0.035 + Math.random() * 0.02,
    })
  })

  return placed
}
