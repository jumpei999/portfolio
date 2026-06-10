"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { scrollTrackHeight } from "@/components/history/constants"
import HistoryCommitList from "@/components/history/history-commit-list"
import HistoryDetailPanel from "@/components/history/history-detail-panel"
import HistorySkipButton from "@/components/history/history-skip-button"
import { useActiveCommit } from "@/components/history/use-active-commit"
import { historyItems } from "@/data/history"

const commitIds = historyItems.map((item) => item.id)

function HistoryHeading() {
  const t = useTranslations("history")

  return (
    <header className="mb-8 shrink-0 sm:mb-10">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t("heading")}
      </h2>
    </header>
  )
}

function HistorySkipFooter() {
  return (
    <div className="mt-8 flex shrink-0 justify-center sm:justify-end">
      <HistorySkipButton />
    </div>
  )
}

function HistoryBody({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <HistoryHeading />
      {children}
      <HistorySkipFooter />
    </>
  )
}

export default function HistoryTimeline() {
  const t = useTranslations("history")
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(panelRef, {
    once: true,
    margin: "-60px",
  })

  const scrollDriven = !reduceMotion

  const { activeId, activeIndex, scrollToCommit } = useActiveCommit({
    commitIds,
    trackRef,
    defaultId: commitIds[0],
    scrollDriven,
  })

  const timelineContent = (
    <div className="grid w-full items-start gap-10 lg:grid-cols-[35%_65%] lg:gap-12">
      <HistoryCommitList
        items={historyItems}
        activeId={activeId}
        activeIndex={activeIndex}
        timelineLabel={t("timelineLabel")}
        sectionInView={sectionInView}
        onSelect={scrollToCommit}
      />
      <HistoryDetailPanel activeId={activeId} />
    </div>
  )

  if (!scrollDriven) {
    return (
      <motion.div
        ref={panelRef}
        initial={false}
        animate={sectionInView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, ease: [0.24, 1, 0.32, 1] }}
      >
        <HistoryBody>{timelineContent}</HistoryBody>
      </motion.div>
    )
  }

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: scrollTrackHeight(historyItems.length) }}
    >
      <div
        ref={panelRef}
        className="sticky top-[var(--site-header-height)] flex min-h-[calc(100svh-var(--site-header-height))] flex-col py-8 sm:py-10"
      >
        <motion.div
          className="flex w-full flex-1 flex-col"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, ease: [0.24, 1, 0.32, 1] }}
        >
          <HistoryBody>
            <div className="flex flex-1 items-center">{timelineContent}</div>
          </HistoryBody>
        </motion.div>
      </div>
    </div>
  )
}
