"use client"

import { useRef } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "motion/react"
import { useTranslations } from "next-intl"
import { MOBILE_DOCK_MAX_HEIGHT_PX } from "@/components/history/constants"
import { useDockNeedsScroll } from "@/hooks/use-dock-needs-scroll"
import {
  ENTRANCE_EASE,
  ENTRANCE_STAGGER_SEC,
  HISTORY_ARTICLE_DOCK_DURATION_SEC,
  HISTORY_ARTICLE_SWITCH_DURATION_SEC,
} from "@/hooks/use-entrance-animation"
import type { HistoryItem } from "@/data/history"
import { findHistoryItemById } from "@/lib/history-commit-label"
import { cn } from "@/lib/utils"

type HistoryDetailPanelProps = {
  activeId: string
  items: HistoryItem[]
  variant?: "default" | "dock"
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

const detailItemHidden = { opacity: 0, y: 8 }
const detailItemVisible = { opacity: 1, y: 0 }
const DETAIL_STAGGER_DURATION_SEC = 0.25

function detailItemTransition(delayIndex: number) {
  return {
    duration: DETAIL_STAGGER_DURATION_SEC,
    ease: ENTRANCE_EASE,
    delay: delayIndex * ENTRANCE_STAGGER_SEC,
  }
}

type HistoryDetailContentProps = {
  item: HistoryItem
  isDock: boolean
  techStackLabel: string
  reduceMotion: boolean | null
}

function HistoryDetailContent({
  item,
  isDock,
  techStackLabel,
  reduceMotion,
}: Readonly<HistoryDetailContentProps>) {
  if (reduceMotion) {
    return (
      <>
        <header className={cn("space-y-2", isDock ? "mb-3" : "mb-4")}>
          <h3
            className={cn(
              "w-full wrap-break-word font-bold tracking-tight",
              isDock ? "text-lg" : "text-2xl",
            )}
          >
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground">{item.date}</p>
        </header>

        <p className="w-full wrap-break-word text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {item.tags.length > 0 && (
          <div className={cn(isDock ? "mt-4" : "mt-6")}>
            <p className="mb-3 text-xs font-normal tracking-wide text-muted-foreground uppercase">
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

  return (
    <>
      <header className={cn("space-y-2", isDock ? "mb-3" : "mb-4")}>
        <motion.h3
          className={cn(
            "w-full wrap-break-word font-bold tracking-tight",
            isDock ? "text-lg" : "text-2xl",
          )}
          initial={detailItemHidden}
          animate={detailItemVisible}
          transition={detailItemTransition(0)}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="text-sm text-muted-foreground"
          initial={detailItemHidden}
          animate={detailItemVisible}
          transition={detailItemTransition(1)}
        >
          {item.date}
        </motion.p>
      </header>

      <motion.p
        className="w-full wrap-break-word text-sm leading-relaxed text-muted-foreground"
        initial={detailItemHidden}
        animate={detailItemVisible}
        transition={detailItemTransition(2)}
      >
        {item.description}
      </motion.p>

      {item.tags.length > 0 && (
        <motion.div
          className={cn(isDock ? "mt-4" : "mt-6")}
          initial={detailItemHidden}
          animate={detailItemVisible}
          transition={detailItemTransition(3)}
        >
          <p className="mb-3 text-xs font-normal tracking-wide text-muted-foreground uppercase">
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
        </motion.div>
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
          : "h-fit max-w-full p-6 sm:p-8",
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
                "min-h-0 min-w-0 w-full flex-1",
                needsScroll
                  ? "overflow-y-auto overscroll-y-auto"
                  : "overflow-hidden",
              ),
          )}
          initial={getArticleMotionInitial(reduceMotion, isDock)}
          animate={isDock ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={getArticleMotionExit(reduceMotion, isDock)}
          transition={{
            duration: isDock
              ? HISTORY_ARTICLE_DOCK_DURATION_SEC
              : HISTORY_ARTICLE_SWITCH_DURATION_SEC,
            ease: ENTRANCE_EASE,
          }}
        >
          <HistoryDetailContent
            item={item}
            isDock={isDock}
            techStackLabel={t("detail.techStack")}
            reduceMotion={reduceMotion}
          />
        </motion.article>
      </AnimatePresence>
    </div>
  )
}
