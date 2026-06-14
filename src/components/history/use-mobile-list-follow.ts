"use client"

import {
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react"
import { useCallback, useLayoutEffect, useRef, type RefObject } from "react"
import { progressToFractional } from "@/components/history/use-active-commit"

function interpolateCenters(
  fractionalIndex: number,
  centers: number[],
): number {
  if (centers.length === 0) return 0
  if (centers.length === 1) return centers[0] ?? 0

  const clamped = Math.min(centers.length - 1, Math.max(0, fractionalIndex))
  const lower = Math.floor(clamped)
  const upper = Math.min(centers.length - 1, lower + 1)
  const t = clamped - lower

  const lowerCenter = centers[lower] ?? 0
  const upperCenter = centers[upper] ?? lowerCenter
  return lowerCenter + (upperCenter - lowerCenter) * t
}

function measureItemCenters(items: (HTMLElement | null)[]): number[] {
  return items.map((item) => {
    if (!item) return 0
    return item.offsetTop + item.offsetHeight / 2
  })
}

function computeClampedY(
  fractionalIndex: number,
  centers: number[],
  stageHeight: number,
  listHeight: number,
): number {
  const targetCenterY = interpolateCenters(fractionalIndex, centers)
  const idealY = stageHeight / 2 - targetCenterY
  const minY = Math.min(0, stageHeight - listHeight)
  return Math.min(0, Math.max(minY, idealY))
}

type UseMobileListFollowOptions = {
  stageRef: RefObject<HTMLElement | null>
  listRef: RefObject<HTMLElement | null>
  itemRefs: RefObject<(HTMLElement | null)[]>
  fractionalIndex: number
  itemCount: number
  scrollYProgress?: MotionValue<number>
  enabled: boolean
}

export function useMobileListFollow({
  stageRef,
  listRef,
  itemRefs,
  fractionalIndex,
  itemCount,
  scrollYProgress,
  enabled,
}: UseMobileListFollowOptions) {
  const y = useMotionValue(0)
  const noopScrollProgress = useMotionValue(0)
  const centersRef = useRef<number[]>([])
  const layoutRef = useRef({ stageHeight: 0, listHeight: 0 })
  const fractionalIndexRef = useRef(fractionalIndex)

  const applyOffset = useCallback(
    (value: number) => {
      const { stageHeight, listHeight } = layoutRef.current
      if (stageHeight === 0) return

      y.set(
        computeClampedY(
          value,
          centersRef.current,
          stageHeight,
          listHeight,
        ),
      )
    },
    [y],
  )

  const getFractional = useCallback(() => {
    if (scrollYProgress) {
      return progressToFractional(scrollYProgress.get(), itemCount)
    }
    return fractionalIndexRef.current
  }, [itemCount, scrollYProgress])

  const remeasure = useCallback(() => {
    const stage = stageRef.current
    const list = listRef.current
    if (!stage || !list) return

    layoutRef.current = {
      stageHeight: stage.clientHeight,
      listHeight: list.scrollHeight,
    }
    centersRef.current = measureItemCenters(itemRefs.current)
    applyOffset(getFractional())
  }, [applyOffset, getFractional, itemRefs, listRef, stageRef])

  useLayoutEffect(() => {
    if (!enabled) return

    remeasure()
    const frameId = requestAnimationFrame(remeasure)

    const resizeObserver = new ResizeObserver(remeasure)
    const stage = stageRef.current
    const list = listRef.current
    if (stage) resizeObserver.observe(stage)
    if (list) resizeObserver.observe(list)

    for (const item of itemRefs.current) {
      if (item) resizeObserver.observe(item)
    }

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [enabled, itemRefs, listRef, remeasure, stageRef])

  useLayoutEffect(() => {
    fractionalIndexRef.current = fractionalIndex
  }, [fractionalIndex])

  useLayoutEffect(() => {
    if (!enabled) return
    applyOffset(fractionalIndex)
  }, [applyOffset, enabled, fractionalIndex])

  useMotionValueEvent(
    scrollYProgress ?? noopScrollProgress,
    "change",
    (progress) => {
      if (!enabled || !scrollYProgress) return
      applyOffset(progressToFractional(progress, itemCount))
    },
  )

  return y
}
