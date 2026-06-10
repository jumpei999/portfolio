"use client"

import { motion, useReducedMotion } from "motion/react"
import HistoryCommitItem from "@/components/history/history-commit-item"
import type { HistoryItem } from "@/data/history"

type HistoryCommitListProps = {
  items: HistoryItem[]
  activeId: string
  activeIndex: number
  timelineLabel: string
  animationStarted: boolean
  onSelect: (id: string) => void
}

export default function HistoryCommitList({
  items,
  activeId,
  activeIndex,
  timelineLabel,
  animationStarted,
  onSelect,
}: Readonly<HistoryCommitListProps>) {
  const reduceMotion = useReducedMotion()

  const progress =
    items.length <= 1 ? 1 : activeIndex / (items.length - 1)

  return (
    <div className="relative min-w-0">
      <motion.div
        className="pointer-events-none absolute top-1.5 bottom-1.5 left-3 w-0.5 -translate-x-1/2 origin-top bg-border"
        aria-hidden
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{ scaleY: animationStarted ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.24, 1, 0.32, 1] }}
      />

      <motion.div
        className="pointer-events-none absolute top-1.5 left-3 w-0.5 -translate-x-1/2 origin-top bg-foreground"
        aria-hidden
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{
          scaleY: animationStarted && activeIndex >= 0 ? progress : 0,
        }}
        transition={{ duration: 0.5, ease: [0.24, 1, 0.32, 1] }}
        style={{ height: "calc(100% - 0.75rem)" }}
      />

      <ol className="relative m-0 list-none p-0" aria-label={timelineLabel}>
        {items.map((item, index) => (
          <HistoryCommitItem
            key={item.id}
            item={item}
            isActive={item.id === activeId}
            isLast={index === items.length - 1}
            onSelect={onSelect}
          />
        ))}
      </ol>
    </div>
  )
}
