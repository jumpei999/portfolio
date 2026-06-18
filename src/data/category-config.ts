export const CATEGORIES = [
  "skill",
  "personality",
  "language",
  "infra",
] as const

export type Category = (typeof CATEGORIES)[number]
