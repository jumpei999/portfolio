"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { formatHistoryCommitLabel } from "@/lib/history-commit-label"
import type { HistoryItem } from "@/data/history"

type HistoryCommitItemLayout = "default" | "mobile"

type HistoryCommitItemProps = {
  item: HistoryItem
  isActive: boolean
  isLast: boolean
  layout?: HistoryCommitItemLayout
  itemRef?: (element: HTMLLIElement | null) => void
  onSelect: (id: string) => void
}

export default function HistoryCommitItem({
  item,
  isActive,
  isLast,
  layout = "default",
  itemRef,
  onSelect,
}: Readonly<HistoryCommitItemProps>) {
  const reduceMotion = useReducedMotion()
  const label = formatHistoryCommitLabel(item)
  const isMobileLayout = layout === "mobile"

  return (
    <motion.li
      ref={itemRef}
      className={cn(
        "relative flex gap-4",
        !isLast && "max-lg:pb-6 lg:pb-10",
      )}
      data-active={isActive ? "" : undefined}
    >
      <div className="relative flex w-6 shrink-0 justify-center">
        <motion.button
          type="button"
          aria-current={isActive ? "step" : undefined}
          aria-label={label}
          onClick={() => onSelect(item.id)}
          className="relative z-10 mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          animate={reduceMotion ? undefined : { scale: isActive ? 1.2 : 1 }}
          transition={{ duration: 0.25, ease: [0.24, 1, 0.32, 1] }}
        >
          <span
            data-commit-dot
            className={cn(
              "block h-3 w-3 rounded-full border-2 transition-colors",
              isActive
                ? "border-foreground bg-foreground shadow-lg ring-4 ring-foreground/20"
                : "border-muted-foreground bg-background",
            )}
            aria-hidden
          />
        </motion.button>
      </div>

      <button
        type="button"
        onClick={() => onSelect(item.id)}
        className={cn(
          "min-w-0 pt-0 text-left font-mono text-sm transition-colors",
          isMobileLayout && isActive ? "whitespace-normal" : "truncate",
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {label}
      </button>
    </motion.li>
  )
}
