"use client"

import { useMotionValueEvent, useScroll, type MotionValue } from "motion/react"
import { useCallback, useRef, useState, type RefObject } from "react"

import { waitForScrollEnd } from "@/lib/programmatic-scroll"

type UseActiveCommitOptions = {
  commitIds: string[]
  trackRef: RefObject<HTMLElement | null>
  defaultId?: string
  scrollDriven?: boolean
}

export function progressToFractional(progress: number, count: number): number {
  if (count <= 1) return 0
  return Math.min(count - 1, Math.max(0, progress * (count - 1)))
}

function fractionalToIndex(fractional: number, count: number): number {
  if (count <= 1) return 0
  return Math.min(count - 1, Math.round(fractional))
}

export function useActiveCommit({
  commitIds,
  trackRef,
  defaultId,
  scrollDriven = true,
}: UseActiveCommitOptions) {
  const defaultIndex = Math.max(
    0,
    commitIds.indexOf(defaultId ?? commitIds[0] ?? ""),
  )
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const [fractionalIndex, setFractionalIndex] = useState(defaultIndex)
  const [clickNavActive, setClickNavActive] = useState(false)
  const clickNavTargetRef = useRef<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!scrollDriven) return
    const fractional = progressToFractional(progress, commitIds.length)
    setFractionalIndex(fractional)
    if (clickNavTargetRef.current === null) {
      setActiveIndex(fractionalToIndex(fractional, commitIds.length))
    }
  })

  const scrollToCommit = useCallback(
    (id: string) => {
      const index = commitIds.indexOf(id)
      if (index < 0) return

      setActiveIndex(index)

      if (!scrollDriven) return

      const track = trackRef.current
      if (!track) return

      const trackTop = track.offsetTop
      const trackHeight = track.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollable = trackHeight - viewportHeight

      if (scrollable <= 0 || commitIds.length <= 1) return

      const step = scrollable / (commitIds.length - 1)
      const targetY = trackTop + index * step

      clickNavTargetRef.current = index
      setClickNavActive(true)
      waitForScrollEnd(() => {
        clickNavTargetRef.current = null
        setClickNavActive(false)
      })
      window.scrollTo({ top: targetY, behavior: "smooth" })
    },
    [commitIds, scrollDriven, trackRef],
  )

  const activeId = commitIds[activeIndex] ?? commitIds[0] ?? ""

  return {
    activeId,
    activeIndex,
    clickNavActive,
    fractionalIndex,
    scrollYProgress: scrollYProgress as MotionValue<number>,
    scrollToCommit,
    setActiveIndex,
    setFractionalIndex,
  }
}
