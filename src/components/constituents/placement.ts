import { CONSTITUENT_TAGS } from "@/data/constituent-tags"
import type { PlacedTag } from "./types"

const TAG_EDGE_PADDING = {
  desktop: { x: 8, y: 8 },
  mobile: { x: 8, y: 2 },
} as const

function isInCenterExclusion(left: number, top: number, radius = 18) {
  return Math.hypot(left - 50, top - 50) < radius
}

function getTagEdgePadding() {
  if (typeof globalThis.matchMedia !== "function") {
    return TAG_EDGE_PADDING.desktop
  }

  return globalThis.matchMedia("(max-width: 767px)").matches
    ? TAG_EDGE_PADDING.mobile
    : TAG_EDGE_PADDING.desktop
}

export function buildPlacedTags(
  edgePadding = getTagEdgePadding(),
): PlacedTag[] {
  const { x: paddingX, y: paddingY } = edgePadding
  const minDistance = 9
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
      (isInCenterExclusion(left, top) ||
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
