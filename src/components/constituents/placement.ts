import { CONSTITUENT_TAGS } from "@/data/constituent-tags"
import type { PlacedTag } from "./types"

function isInCenterExclusion(left: number, top: number, radius = 18) {
  return Math.hypot(left - 50, top - 50) < radius
}

export function buildPlacedTags(): PlacedTag[] {
  const padding = 8
  const minDistance = 9
  const placed: PlacedTag[] = []

  CONSTITUENT_TAGS.forEach((tag, index) => {
    let left = 0
    let top = 0
    let attempts = 0

    do {
      left = padding + Math.random() * (100 - padding * 2)
      top = padding + Math.random() * (100 - padding * 2)
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
