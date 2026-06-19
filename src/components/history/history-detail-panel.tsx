"use client"

import { useLayoutEffect, useRef, useState, type RefObject } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "motion/react"
import { useTranslations } from "next-intl"
import { MOBILE_DOCK_MAX_HEIGHT_PX } from "@/components/history/constants"
import type { HistoryItem } from "@/data/history"
import { findHistoryItemById } from "@/lib/history-commit-label"
import { cn } from "@/lib/utils"

type HistoryDetailPanelProps = {
  activeId: string
  items: HistoryItem[]
  variant?: "default" | "dock"
}

function getVerticalPadding(element: HTMLElement): number {
  const style = getComputedStyle(element)
  return (
    Number.parseFloat(style.paddingTop) +
    Number.parseFloat(style.paddingBottom)
  )
}

function getArticleMotionInitial(
  reduceMotion: boolean | null,
  isDock: boolean,
): false | TargetAndTransition {
  if (reduceMotion) return false
  if (isDock) return { opacity: 0 }
  return { opacity: 0, x: 12 }
}

function getArticleMotionExit(
  reduceMotion: boolean | null,
  isDock: boolean,
): TargetAndTransition | undefined {
  if (reduceMotion) return undefined
  if (isDock) return { opacity: 0 }
  return { opacity: 0, x: -12 }
}

function useDockNeedsScroll(
  activeId: string,
  isDock: boolean,
  cardRef: RefObject<HTMLDivElement | null>,
  articleRef: RefObject<HTMLElement | null>,
) {
  const [needsScroll, setNeedsScroll] = useState(false)

  useLayoutEffect(() => {
    if (!isDock) return

    const measureNeedsScroll = () => {
      const card = cardRef.current
      const article = articleRef.current
      if (!card || !article) return

      const availableHeight = card.clientHeight - getVerticalPadding(card)
      setNeedsScroll(article.scrollHeight > availableHeight)
    }

    const frameId = requestAnimationFrame(measureNeedsScroll)

    const card = cardRef.current
    const article = articleRef.current
    const resizeObserver = new ResizeObserver(measureNeedsScroll)
    if (card) resizeObserver.observe(card)
    if (article) resizeObserver.observe(article)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [activeId, articleRef, cardRef, isDock])

  return isDock && needsScroll
}

type HistoryDetailContentProps = {
  item: HistoryItem
  isDock: boolean
  techStackLabel: string
}

function HistoryDetailContent({
  item,
  isDock,
  techStackLabel,
}: Readonly<HistoryDetailContentProps>) {
  return (
    <>
      <header className={cn("space-y-2", isDock ? "mb-3" : "mb-4")}>
        <h3
          className={cn(
            "font-bold tracking-tight",
            isDock ? "text-lg" : "text-2xl",
          )}
        >
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground">{item.date}</p>
      </header>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      {item.tags.length > 0 && (
        <div className={cn(isDock ? "mt-4" : "mt-6")}>
          <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {techStackLabel}
          </p>
          <ul className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-xs text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default function HistoryDetailPanel({
  activeId,
  items,
  variant = "default",
}: Readonly<HistoryDetailPanelProps>) {
  const t = useTranslations("history")
  const reduceMotion = useReducedMotion()
  const item = findHistoryItemById(items, activeId)
  const isDock = variant === "dock"
  const cardRef = useRef<HTMLDivElement>(null)
  const articleRef = useRef<HTMLElement>(null)
  const needsScroll = useDockNeedsScroll(activeId, isDock, cardRef, articleRef)

  if (!item) return null

  return (
    <div
      ref={isDock ? cardRef : undefined}
      className={cn(
        "w-full min-w-0 self-start rounded-2xl border border-border bg-card",
        isDock
          ? "flex min-h-0 flex-col overflow-hidden p-4 sm:p-5"
          : "h-fit p-6 sm:p-8",
      )}
      style={isDock ? { height: MOBILE_DOCK_MAX_HEIGHT_PX } : undefined}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          ref={isDock ? articleRef : undefined}
          key={item.id}
          className={cn(
            isDock &&
              cn(
                "min-h-0 flex-1",
                needsScroll
                  ? "overflow-y-auto overscroll-y-auto"
                  : "overflow-hidden",
              ),
          )}
          initial={getArticleMotionInitial(reduceMotion, isDock)}
          animate={isDock ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={getArticleMotionExit(reduceMotion, isDock)}
          transition={{
            duration: isDock ? 0.2 : 0.3,
            ease: [0.24, 1, 0.32, 1],
          }}
        >
          <HistoryDetailContent
            item={item}
            isDock={isDock}
            techStackLabel={t("detail.techStack")}
          />
        </motion.article>
      </AnimatePresence>
    </div>
  )
}
