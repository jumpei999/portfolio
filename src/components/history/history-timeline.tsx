"use client"

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { scrollTrackHeight } from "@/components/history/constants"
import HistoryCommitList from "@/components/history/history-commit-list"
import HistoryDetailPanel from "@/components/history/history-detail-panel"
import HistoryBackButton from "@/components/history/history-back-button"
import HistorySkipButton from "@/components/history/history-skip-button"
import { useActiveCommit } from "@/components/history/use-active-commit"
import { useEntranceAnimation } from "@/hooks/use-entrance-animation"
import { historyItems } from "@/data/history"

const commitIds = historyItems.map((item) => item.id)

type EntrancePropsFn = ReturnType<typeof useEntranceAnimation>["entranceProps"]

type HistoryHeadingProps = {
  entranceProps: EntrancePropsFn
}

function HistoryHeading({ entranceProps }: Readonly<HistoryHeadingProps>) {
  const t = useTranslations("history")

  return (
    <header className="mb-4 shrink-0 sm:mb-6">
      <motion.div className="mb-4 flex justify-center" {...entranceProps(0)}>
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
      className="mt-auto flex shrink-0 justify-center pt-4"
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

export default function HistoryTimeline() {
  const t = useTranslations("history")
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const { sectionRef, started, entranceProps } = useEntranceAnimation()

  const scrollDriven = !reduceMotion

  const { activeId, activeIndex, scrollToCommit } = useActiveCommit({
    commitIds,
    trackRef,
    defaultId: commitIds[0],
    scrollDriven,
  })

  const footerDelayIndex = 4

  const timelineContent = (
    <div className="grid w-full min-w-0 items-start gap-10 lg:grid-cols-[35%_65%] lg:gap-12">
      <motion.div {...entranceProps(2)}>
        <HistoryCommitList
          items={historyItems}
          activeId={activeId}
          activeIndex={activeIndex}
          timelineLabel={t("timelineAria")}
          animationStarted={started}
          onSelect={scrollToCommit}
        />
      </motion.div>
      <motion.div {...entranceProps(3)}>
        <HistoryDetailPanel activeId={activeId} />
      </motion.div>
    </div>
  )

  if (!scrollDriven) {
    return (
      <div ref={sectionRef}>
        <HistoryBody
          entranceProps={entranceProps}
          footerDelayIndex={footerDelayIndex}
        >
          {timelineContent}
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
        className="sticky top-(--site-header-height) flex h-[calc(100svh-var(--site-header-height))] flex-col overflow-x-hidden overflow-hidden py-6 sm:py-8"
      >
        <div className="flex min-h-0 flex-1 flex-col w-full">
          <HistoryBody
            entranceProps={entranceProps}
            footerDelayIndex={footerDelayIndex}
          >
            <div className="min-h-0 flex-1 overflow-hidden py-2 sm:py-4">
              {timelineContent}
            </div>
          </HistoryBody>
        </div>
      </div>
    </div>
  )
}
