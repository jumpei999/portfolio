export const CATEGORIES = [
  "language",
  "stack",
  "platform",
  "life",
] as const

export type Category = (typeof CATEGORIES)[number]
