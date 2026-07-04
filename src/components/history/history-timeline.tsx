"use client"

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, type MotionValue } from "motion/react"
import { useTranslations } from "next-intl"
import { scrollTrackHeight } from "@/components/history/constants"
import HistoryCommitList from "@/components/history/history-commit-list"
import HistoryDetailPanel from "@/components/history/history-detail-panel"
import HistoryBackButton from "@/components/history/history-back-button"
import HistorySkipButton from "@/components/history/history-skip-button"
import { useActiveCommit } from "@/hooks/use-active-commit"
import EntranceMotion from "@/components/entrance-motion"
import {
  ENTRANCE_DURATION_SEC,
  ENTRANCE_EASE,
  ENTRANCE_ITEM_HIDDEN,
  ENTRANCE_ITEM_VISIBLE,
  useEntranceInView,
} from "@/hooks/use-entrance-animation"
import { useHistoryItems } from "@/hooks/use-history-items"
import { HISTORY_ITEM_IDS } from "@/data/history"
import type { HistoryItem } from "@/data/history"
import { cn } from "@/lib/utils"
import { SECTION_VIEWPORT_HEIGHT } from "@/lib/section-shell"

const commitIds = HISTORY_ITEM_IDS

function HistoryHeading() {
  const t = useTranslations("history")

  return (
    <header className="max-lg:mb-2 mb-4 shrink-0 sm:mb-6">
      <EntranceMotion className="mb-4 hidden justify-center lg:flex" delayIndex={0}>
        <HistoryBackButton />
      </EntranceMotion>
      <EntranceMotion
        as="h2"
        delayIndex={1}
        className="text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {t("heading")}
      </EntranceMotion>
    </header>
  )
}

function HistorySkipFooter({ visible }: Readonly<{ visible: boolean }>) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className="mt-auto hidden shrink-0 justify-center pt-4 lg:flex">
        <HistorySkipButton />
      </div>
    )
  }

  return (
    <motion.div
      className="mt-auto hidden shrink-0 justify-center pt-4 lg:flex"
      initial={ENTRANCE_ITEM_HIDDEN}
      animate={visible ? ENTRANCE_ITEM_VISIBLE : ENTRANCE_ITEM_HIDDEN}
      transition={{ duration: ENTRANCE_DURATION_SEC, ease: ENTRANCE_EASE }}
    >
      <HistorySkipButton />
    </motion.div>
  )
}

function HistoryBody({
  children,
  sectionStarted,
}: Readonly<{ children: ReactNode; sectionStarted: boolean }>) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <HistoryHeading />
      {children}
      <HistorySkipFooter visible={sectionStarted} />
    </div>
  )
}

type HistoryTimelinePanelsProps = {
  items: HistoryItem[]
  scrollDriven: boolean
  activeId: string
  activeIndex: number
  clickNavActive: boolean
  fractionalIndex: number
  scrollYProgress?: MotionValue<number>
  timelineLabel: string
  onSelect: (id: string) => void
}

function HistoryTimelinePanels({
  items,
  scrollDriven,
  activeId,
  activeIndex,
  clickNavActive,
  fractionalIndex,
  scrollYProgress,
  timelineLabel,
  onSelect,
}: Readonly<HistoryTimelinePanelsProps>) {
  const stageRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const { ref: desktopListRef, started: desktopListStarted } =
    useEntranceInView()
  const { ref: mobileListRef, started: mobileListStarted } =
    useEntranceInView()
  const animationStarted = desktopListStarted || mobileListStarted

  const listProps = {
    items,
    activeId,
    activeIndex,
    timelineLabel,
    animationStarted,
    scrollDriven,
    clickNavActive,
    fractionalIndex,
    scrollYProgress,
    onSelect,
    stageRef,
    itemRefs,
  }

  return (
    <>
      <div className="hidden min-h-0 w-full min-w-0 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,13fr)] lg:items-start lg:gap-12">
        <div ref={desktopListRef} className="min-w-0">
          <HistoryCommitList layout="default" {...listProps} />
        </div>
        <div className="min-w-0 overflow-hidden">
          <EntranceMotion className="min-w-0 w-full max-w-full" delayIndex={2}>
            <HistoryDetailPanel activeId={activeId} items={items} />
          </EntranceMotion>
        </div>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col lg:hidden">
        <div
          ref={mobileListRef}
          className="relative min-h-0 flex-1 overflow-hidden"
        >
          <div
            ref={stageRef}
            className={cn(
              "h-full min-h-0 pb-5",
              scrollDriven
                ? "overflow-hidden"
                : "overflow-y-auto overscroll-y-contain",
            )}
          >
            <HistoryCommitList layout="mobileStage" {...listProps} />
          </div>
        </div>
        <EntranceMotion className="shrink-0 border-t border-border py-4" delayIndex={2}>
          <HistoryDetailPanel activeId={activeId} items={items} variant="dock" />
        </EntranceMotion>
      </div>
    </>
  )
}

export default function HistoryTimeline() {
  const t = useTranslations("history")
  const items = useHistoryItems()
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollDriven = !reduceMotion
  const { ref: sectionRef, started: sectionStarted } = useEntranceInView()

  const {
    activeId,
    activeIndex,
    clickNavActive,
    fractionalIndex,
    scrollYProgress,
    scrollToCommit,
  } = useActiveCommit({
    commitIds,
    trackRef,
    defaultId: commitIds[0],
    scrollDriven,
  })

  const timelineContent = (
    <HistoryTimelinePanels
      items={items}
      scrollDriven={scrollDriven}
      activeId={activeId}
      activeIndex={activeIndex}
      clickNavActive={clickNavActive}
      fractionalIndex={fractionalIndex}
      scrollYProgress={scrollDriven ? scrollYProgress : undefined}
      timelineLabel={t("timelineAria")}
      onSelect={scrollToCommit}
    />
  )

  if (!scrollDriven) {
    return (
      <div ref={sectionRef}>
        <HistoryBody sectionStarted={sectionStarted}>
          <div className="flex min-h-0 min-w-0 flex-col max-lg:py-0 sm:min-h-[70svh] lg:min-h-0 lg:py-4">
            {timelineContent}
          </div>
        </HistoryBody>
      </div>
    )
  }

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: scrollTrackHeight(items.length) }}
    >
      <div
        className={cn(
          "sticky top-(--site-header-height) flex flex-col overflow-x-hidden overflow-hidden max-lg:py-0 lg:py-8",
          SECTION_VIEWPORT_HEIGHT,
        )}
      >
        <div ref={sectionRef} className="flex min-h-0 min-w-0 flex-1 flex-col w-full">
          <HistoryBody sectionStarted={sectionStarted}>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden max-lg:py-0 lg:py-4">
              {timelineContent}
            </div>
          </HistoryBody>
        </div>
      </div>
    </div>
  )
}
