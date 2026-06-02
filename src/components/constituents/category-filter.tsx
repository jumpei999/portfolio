"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import {
  CATEGORIES,
  getCategoryChipClass,
  type Category,
} from "@/data/category-config"

type CategoryFilterProps = {
  selected: ReadonlySet<Category>
  onToggle: (category: Category) => void
  onClear: () => void
}

export default function CategoryFilter({
  selected,
  onToggle,
  onClear,
}: Readonly<CategoryFilterProps>) {
  const t = useTranslations("constituents")

  return (
    <div className="pointer-events-auto flex flex-col items-center gap-3">
      <p className="text-xs tracking-wider text-foreground/50 uppercase">
        {t("filterLabel")}
      </p>
      <motion.div
        layout
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {CATEGORIES.map((category) => {
          const active = selected.has(category)
          return (
            <button
              key={category}
              type="button"
              data-active={active}
              aria-pressed={active}
              onClick={() => onToggle(category)}
              className={cn(
                "rounded-full border border-foreground/20 bg-background/70 px-3 py-1.5 text-sm",
                "transition-colors hover:border-foreground/40",
                getCategoryChipClass(category),
              )}
            >
              {t(`categories.${category}`)}
            </button>
          )
        })}
        {selected.size > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-full px-2 py-1.5 text-xs text-foreground/50 underline-offset-2 hover:underline"
          >
            {t("clear")}
          </button>
        )}
      </motion.div>
    </div>
  )
}
