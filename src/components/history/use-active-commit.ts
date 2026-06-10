"use client"

import {
  useMotionValueEvent,
  useScroll,
} from "motion/react"
import { useCallback, useState, type RefObject } from "react"

type UseActiveCommitOptions = {
  commitIds: string[]
  trackRef: RefObject<HTMLElement | null>
  defaultId?: string
  /** When false, active index is click-only (reduced motion fallback). */
  scrollDriven?: boolean
}

function progressToIndex(progress: number, count: number): number {
  if (count <= 1) return 0
  return Math.min(count - 1, Math.floor(progress * count))
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

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!scrollDriven) return
    setActiveIndex(progressToIndex(progress, commitIds.length))
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

      window.scrollTo({ top: targetY, behavior: "smooth" })
    },
    [commitIds, scrollDriven, trackRef],
  )

  const activeId = commitIds[activeIndex] ?? commitIds[0] ?? ""

  return {
    activeId,
    activeIndex,
    scrollToCommit,
  }
}
