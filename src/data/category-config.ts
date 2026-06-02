export const CATEGORY_CONFIG = {
  skill: {
    chipClass:
      "data-[active=true]:border-sky-500 data-[active=true]:bg-sky-500/20",
  },
  personality: {
    chipClass:
      "data-[active=true]:border-violet-500 data-[active=true]:bg-violet-500/20",
  },
  language: {
    chipClass:
      "data-[active=true]:border-amber-500 data-[active=true]:bg-amber-500/20",
  },
  infra: {
    chipClass:
      "data-[active=true]:border-emerald-500 data-[active=true]:bg-emerald-500/20",
  },
} as const

export type Category = keyof typeof CATEGORY_CONFIG

export const CATEGORIES = Object.keys(CATEGORY_CONFIG) as Category[]

export function getCategoryChipClass(category: Category): string {
  return CATEGORY_CONFIG[category].chipClass
}
