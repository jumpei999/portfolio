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
import { useEntranceAnimation } from "@/hooks/use-entrance-animation"
import { historyItems } from "@/data/history"
import { cn } from "@/lib/utils"

const commitIds = historyItems.map((item) => item.id)

type EntrancePropsFn = ReturnType<typeof useEntranceAnimation>["entranceProps"]

type HistoryHeadingProps = {
  entranceProps: EntrancePropsFn
}

function HistoryHeading({ entranceProps }: Readonly<HistoryHeadingProps>) {
  const t = useTranslations("history")

  return (
    <header className="max-lg:mb-2 mb-4 shrink-0 sm:mb-6">
      <motion.div
        className="mb-4 hidden justify-center lg:flex"
        {...entranceProps(0)}
      >
        <HistoryBackButton />
      </motion.div>
      <motion.h2
        className="text-3xl font-bold tracking-tight sm:text-4xl"
        {...entranceProps(1)}
      >
        {t("heading")}
      </motion.h2>
    </header>
  )
}

type HistorySkipFooterProps = {
  entranceProps: EntrancePropsFn
  delayIndex: number
}

function HistorySkipFooter({
  entranceProps,
  delayIndex,
}: Readonly<HistorySkipFooterProps>) {
  return (
    <motion.div
      className="mt-auto hidden shrink-0 justify-center pt-4 lg:flex"
      {...entranceProps(delayIndex)}
    >
      <HistorySkipButton />
    </motion.div>
  )
}

function HistoryBody({
  children,
  entranceProps,
  footerDelayIndex,
}: Readonly<{
  children: ReactNode
  entranceProps: EntrancePropsFn
  footerDelayIndex: number
}>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <HistoryHeading entranceProps={entranceProps} />
      {children}
      <HistorySkipFooter
        entranceProps={entranceProps}
        delayIndex={footerDelayIndex}
      />
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
  animationStarted: boolean
  entranceProps: EntrancePropsFn
  onSelect: (id: string) => void
}

function HistoryTimelinePanels({
  scrollDriven,
  activeId,
  activeIndex,
  fractionalIndex,
  scrollYProgress,
  timelineLabel,
  animationStarted,
  entranceProps,
  onSelect,
}: Readonly<HistoryTimelinePanelsProps>) {
  const stageRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

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
        <motion.div {...entranceProps(2)}>
          <HistoryCommitList layout="default" {...listProps} />
        </motion.div>
        <motion.div {...entranceProps(3)}>
          <HistoryDetailPanel activeId={activeId} />
        </motion.div>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col lg:hidden">
        <motion.div
          className="relative min-h-0 flex-1 overflow-hidden"
          {...entranceProps(2)}
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
        </motion.div>
        <motion.div
          className="shrink-0 border-t border-border py-4"
          {...entranceProps(3)}
        >
          <HistoryDetailPanel activeId={activeId} variant="dock" />
        </motion.div>
      </div>
    </>
  )
}

export default function HistoryTimeline() {
  const t = useTranslations("history")
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const { sectionRef, started, entranceProps } = useEntranceAnimation()

  const scrollDriven = !reduceMotion

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

  const footerDelayIndex = 4

  const timelineContent = (
    <HistoryTimelinePanels
      scrollDriven={scrollDriven}
      activeId={activeId}
      activeIndex={activeIndex}
      fractionalIndex={fractionalIndex}
      scrollYProgress={scrollDriven ? scrollYProgress : undefined}
      timelineLabel={t("timelineAria")}
      animationStarted={started}
      entranceProps={entranceProps}
      onSelect={scrollToCommit}
    />
  )

  if (!scrollDriven) {
    return (
      <div ref={sectionRef}>
        <HistoryBody
          entranceProps={entranceProps}
          footerDelayIndex={footerDelayIndex}
        >
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
        ref={sectionRef}
        className={cn(
          "sticky top-(--site-header-height) flex flex-col overflow-x-hidden overflow-hidden max-lg:py-0 lg:py-8",
          "h-[calc(100svh-var(--site-header-height))]",
          "max-md:h-[calc(100svh-var(--site-header-height)-var(--site-bottom-nav-height)-env(safe-area-inset-bottom,0))]",
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col w-full">
          <HistoryBody
            entranceProps={entranceProps}
            footerDelayIndex={footerDelayIndex}
          >
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden max-lg:py-0 lg:py-4">
              {timelineContent}
            </div>
          </HistoryBody>
        </div>
      </div>
    </div>
  )
}
