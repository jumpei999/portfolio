"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react"
import { motion, useReducedMotion, type MotionValue } from "motion/react"
import HistoryCommitItem from "@/components/history/history-commit-item"
import { useMobileListFollow } from "@/hooks/use-mobile-list-follow"
import {
  ENTRANCE_DURATION_SEC,
  ENTRANCE_EASE,
  ENTRANCE_TIMELINE_PROGRESS_DURATION_SEC,
} from "@/hooks/use-entrance-animation"
import type { HistoryItem } from "@/data/history"
import { cn } from "@/lib/utils"

type HistoryCommitListLayout = "default" | "mobileStage"

type HistoryCommitListProps = {
  items: HistoryItem[]
  activeId: string
  activeIndex: number
  timelineLabel: string
  animationStarted: boolean
  layout?: HistoryCommitListLayout
  scrollDriven?: boolean
  fractionalIndex?: number
  scrollYProgress?: MotionValue<number>
  stageRef?: RefObject<HTMLElement | null>
  itemRefs?: RefObject<(HTMLElement | null)[]>
  onSelect: (id: string) => void
}

export default function HistoryCommitList({
  items,
  activeId,
  activeIndex,
  timelineLabel,
  animationStarted,
  layout = "default",
  scrollDriven = false,
  fractionalIndex = 0,
  scrollYProgress,
  stageRef,
  itemRefs: externalItemRefs,
  onSelect,
}: Readonly<HistoryCommitListProps>) {
  const reduceMotion = useReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)
  const internalItemRefs = useRef<(HTMLLIElement | null)[]>([])
  const itemRefs = externalItemRefs ?? internalItemRefs

  const isMobileStage = layout === "mobileStage"
  const followActive = isMobileStage && scrollDriven && Boolean(stageRef)

  const progress =
    items.length <= 1 ? 1 : activeIndex / (items.length - 1)

  const offsetY = useMobileListFollow({
    stageRef: stageRef ?? { current: null },
    listRef,
    itemRefs,
    fractionalIndex,
    itemCount: items.length,
    scrollYProgress,
    enabled: followActive,
  })

  const setItemRef = useCallback(
    (index: number) => (element: HTMLLIElement | null) => {
      itemRefs.current[index] = element
    },
    [itemRefs],
  )

  const skipInitialScrollIntoView = useRef(true)

  useEffect(() => {
    if (layout !== "default" || scrollDriven) return

    if (skipInitialScrollIntoView.current) {
      skipInitialScrollIntoView.current = false
      return
    }

    const container = listRef.current
    if (!container) return

    const activeItem = container.querySelector<HTMLElement>("[data-active]")
    activeItem?.scrollIntoView({ block: "nearest", behavior: "instant" })
  }, [activeId, layout, scrollDriven])

  const [lineHeightPx, setLineHeightPx] = useState<number | null>(null)

  const measureLineHeight = useCallback(() => {
    const root = listRef.current
    if (!root) return

    const lineContainer =
      root.querySelector<HTMLElement>(":scope > .relative") ?? root
    const lastDot = root.querySelector<HTMLElement>(
      "ol > li:last-child [data-commit-dot]",
    )
    if (!lastDot) return

    let offsetTop = lastDot.offsetHeight / 2
    let element: HTMLElement | null = lastDot
    while (element && element !== lineContainer) {
      offsetTop += element.offsetTop
      element = element.offsetParent as HTMLElement | null
    }

    setLineHeightPx(Math.max(0, offsetTop - 6))
  }, [])

  useLayoutEffect(() => {
    measureLineHeight()
    const frameId = requestAnimationFrame(measureLineHeight)

    const root = listRef.current
    if (!root) {
      cancelAnimationFrame(frameId)
      return
    }

    const resizeObserver = new ResizeObserver(measureLineHeight)
    resizeObserver.observe(root)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [activeId, items.length, layout, measureLineHeight])

  const lineHeightStyle =
    lineHeightPx == null ? undefined : { height: lineHeightPx }

  const timelineLine = (
    <>
      <motion.div
        className={cn(
          "pointer-events-none absolute top-1.5 left-3 w-0.5 -translate-x-1/2 origin-top bg-border",
          lineHeightPx == null && "bottom-1.5",
        )}
        aria-hidden
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{ scaleY: animationStarted ? 1 : 0 }}
        transition={{ duration: ENTRANCE_DURATION_SEC, ease: ENTRANCE_EASE }}
        style={lineHeightStyle}
      />

      <motion.div
        className="pointer-events-none absolute top-1.5 left-3 w-0.5 -translate-x-1/2 origin-top bg-foreground"
        aria-hidden
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={{
          scaleY: animationStarted && activeIndex >= 0 ? progress : 0,
        }}
        transition={{
          duration: ENTRANCE_TIMELINE_PROGRESS_DURATION_SEC,
          ease: ENTRANCE_EASE,
        }}
        style={
          lineHeightPx == null
            ? { height: "calc(100% - 0.75rem)" }
            : lineHeightStyle
        }
      />
    </>
  )

  const listItems = (
    <ol
      className={cn(
        "relative m-0 list-none p-0",
        isMobileStage && "py-1.5",
      )}
      aria-label={timelineLabel}
    >
      {items.map((item, index) => (
        <HistoryCommitItem
          key={item.id}
          item={item}
          index={index}
          animationStarted={animationStarted}
          isActive={item.id === activeId}
          isLast={index === items.length - 1}
          layout={isMobileStage ? "mobile" : "default"}
          itemRef={followActive ? setItemRef(index) : undefined}
          onSelect={onSelect}
        />
      ))}
    </ol>
  )

  if (followActive) {
    return (
      <div ref={listRef} className="relative min-h-0 min-w-0">
        <motion.div className="relative" style={{ y: offsetY }}>
          {timelineLine}
          {listItems}
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={listRef} className="relative min-w-0">
      {timelineLine}
      {listItems}
    </div>
  )
}
