"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import type { HistoryItem } from "@/data/history"

type HistoryCommitItemProps = {
  item: HistoryItem
  isActive: boolean
  isLast: boolean
  onSelect: (id: string) => void
}

export default function HistoryCommitItem({
  item,
  isActive,
  isLast,
  onSelect,
}: Readonly<HistoryCommitItemProps>) {
  const reduceMotion = useReducedMotion()
  const label = `${item.type}: ${item.title}`

  return (
    <motion.li className={cn("relative flex gap-4", !isLast && "pb-10")}>
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
          "min-w-0 truncate pt-0 text-left font-mono text-sm transition-colors",
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
