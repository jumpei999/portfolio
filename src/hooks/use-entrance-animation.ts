"use client"

import { useRef } from "react"
import { useInView, useReducedMotion } from "motion/react"
import { useProgrammaticScrolling } from "@/hooks/use-programmatic-scroll"

export const IN_VIEW_AMOUNT = 0.6
export const ENTRANCE_ITEM_IN_VIEW_AMOUNT = 0.2
export const ENTRANCE_ITEM_MARGIN = "0px 0px -10% 0px"
export const ENTRANCE_STAGGER_SEC = 0.12
export const ENTRANCE_DURATION_SEC = 0.6
export const ENTRANCE_EASE = [0.24, 1, 0.32, 1] as const
export const ENTRANCE_HIDDEN_Y = 16
export const ENTRANCE_ITEM_HIDDEN = {
  opacity: 0,
  y: ENTRANCE_HIDDEN_Y,
} as const
export const ENTRANCE_ITEM_VISIBLE = { opacity: 1, y: 0 } as const
export const ENTRANCE_DOT_SCALE_DURATION_SEC = 0.25
export const ENTRANCE_TIMELINE_PROGRESS_DURATION_SEC = 0.5
export const HISTORY_ARTICLE_DOCK_DURATION_SEC = 0.2
export const HISTORY_ARTICLE_SWITCH_DURATION_SEC = 0.3

export const entranceInViewOptions = {
  once: true,
  amount: ENTRANCE_ITEM_IN_VIEW_AMOUNT,
  margin: ENTRANCE_ITEM_MARGIN,
} as const

export function useEntranceStarted(inView: boolean): boolean {
  const reduceMotion = useReducedMotion()
  const programmaticScrolling = useProgrammaticScrolling()

  if (reduceMotion === true) {
    return true
  }

  if (!inView) {
    return false
  }

  return !programmaticScrolling
}

export function useEntranceInView() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, entranceInViewOptions)
  const started = useEntranceStarted(inView === true)

  return {
    ref,
    started,
  }
}

export function entranceItemTransition(delayIndex = 0, started = false) {
  return {
    duration: ENTRANCE_DURATION_SEC,
    ease: ENTRANCE_EASE,
    delay: started ? delayIndex * ENTRANCE_STAGGER_SEC : 0,
  }
}
