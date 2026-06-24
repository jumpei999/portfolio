export const PROFILE_IMAGES = [
  {
    src: "/profile/ghibli-style.webp",
    imageKey: "ghibli",
    weight: 60,
  },
  {
    src: "/profile/berserk-style.webp",
    imageKey: "berserk",
    weight: 5,
  },
  {
    src: "/profile/gundam-style.webp",
    imageKey: "gundam",
    weight: 15,
  },
  {
    src: "/profile/hokuto-no-ken-style.webp",
    imageKey: "hokuto",
    weight: 5,
  },
  {
    src: "/profile/saint-seiya-style.webp",
    imageKey: "seiya",
    weight: 15,
  },
] as const

const WEIGHTS = PROFILE_IMAGES.map((img) => img.weight)

export function pickInitialProfileIndex() {
  return pickWeightedRandomProfileIndex(WEIGHTS)
}

export function pickRandomProfileIndex(excludeIndex?: number): number {
  if (PROFILE_IMAGES.length <= 1) return 0

  let nextIndex = Math.floor(Math.random() * PROFILE_IMAGES.length)

  while (nextIndex === excludeIndex) {
    nextIndex = Math.floor(Math.random() * PROFILE_IMAGES.length)
  }

  return nextIndex
}

function pickWeightedRandomProfileIndex(
  weights: readonly number[],
  excludeIndex?: number,
): number {
  const candidates = weights
    .map((weight, index) => ({ index, weight }))
    .filter(({ index }) => index !== excludeIndex)

  const total = candidates.reduce((sum, { weight }) => sum + weight, 0)
  if (total <= 0) return candidates[0]?.index ?? 0

  let r = Math.random() * total
  for (const { index, weight } of candidates) {
    r -= weight
    if (r < 0) return index
  }
  return candidates.at(-1)?.index ?? 0
}

export function clampProfileImageIndex(index: number) {
  return (
    ((index % PROFILE_IMAGES.length) + PROFILE_IMAGES.length) %
    PROFILE_IMAGES.length
  )
}
