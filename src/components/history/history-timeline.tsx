"use client"

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, type MotionValue } from "motion/react"
import { useTranslations } from "next-intl"
import { scrollTrackHeight } from "@/components/history/constants"
import HistoryCommitList from "@/components/history/history-commit-list"
import HistoryDetailPanel from "@/components/history/history-detail-panel"
import HistoryBackButton from "@/components/history/history-back-button"
import HistorySkipButton from "@/components/history/history-skip-button"
import { useActiveCommit } from "@/components/history/use-active-commit"
import EntranceMotion from "@/components/entrance-motion"
import { useEntranceInView } from "@/hooks/use-entrance-animation"
import { historyItems } from "@/data/history"
import { cn } from "@/lib/utils"

const commitIds = historyItems.map((item) => item.id)

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
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: [0.24, 1, 0.32, 1] }}
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
    <div className="flex min-h-0 flex-1 flex-col">
      <HistoryHeading />
      {children}
      <HistorySkipFooter visible={sectionStarted} />
    </div>
  )
}

type HistoryTimelinePanelsProps = {
  scrollDriven: boolean
  activeId: string
  activeIndex: number
  fractionalIndex: number
  scrollYProgress?: MotionValue<number>
  timelineLabel: string
  onSelect: (id: string) => void
}

function HistoryTimelinePanels({
  scrollDriven,
  activeId,
  activeIndex,
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
    items: historyItems,
    activeId,
    activeIndex,
    timelineLabel,
    animationStarted,
    scrollDriven,
    fractionalIndex,
    scrollYProgress,
    onSelect,
    stageRef,
    itemRefs,
  }

  return (
    <>
      <div className="hidden min-h-0 w-full lg:grid lg:grid-cols-[35%_65%] lg:items-start lg:gap-12">
        <div ref={desktopListRef}>
          <HistoryCommitList layout="default" {...listProps} />
        </div>
        <EntranceMotion delayIndex={2}>
          <HistoryDetailPanel activeId={activeId} />
        </EntranceMotion>
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
          <HistoryDetailPanel activeId={activeId} variant="dock" />
        </EntranceMotion>
      </div>
    </>
  )
}

export default function HistoryTimeline() {
  const t = useTranslations("history")
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollDriven = !reduceMotion
  const { ref: sectionRef, started: sectionStarted } = useEntranceInView()

  const {
    activeId,
    activeIndex,
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
      scrollDriven={scrollDriven}
      activeId={activeId}
      activeIndex={activeIndex}
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
          <div className="flex min-h-0 flex-col max-lg:py-0 sm:min-h-[70svh] lg:min-h-0 lg:py-4">
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
      style={{ height: scrollTrackHeight(historyItems.length) }}
    >
      <div
        className={cn(
          "sticky top-(--site-header-height) flex flex-col overflow-x-hidden overflow-hidden max-lg:py-0 lg:py-8",
          "h-[calc(100svh-var(--site-header-height))]",
          "max-md:h-[calc(100svh-var(--site-header-height)-var(--site-bottom-nav-height)-env(safe-area-inset-bottom,0))]",
        )}
      >
        <div ref={sectionRef} className="flex min-h-0 flex-1 flex-col w-full">
          <HistoryBody sectionStarted={sectionStarted}>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden max-lg:py-0 lg:py-4">
              {timelineContent}
            </div>
          </HistoryBody>
        </div>
      </div>
    </div>
  )
}
