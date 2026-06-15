"use client"

import { useRef } from "react"
import { useInView, useReducedMotion } from "motion/react"

export const IN_VIEW_AMOUNT = 0.6
export const ENTRANCE_ITEM_IN_VIEW_AMOUNT = 0.2
export const ENTRANCE_ITEM_MARGIN = "0px 0px -10% 0px"

export const entranceInViewOptions = {
  once: true,
  amount: ENTRANCE_ITEM_IN_VIEW_AMOUNT,
  margin: ENTRANCE_ITEM_MARGIN,
} as const

export function useEntranceInView() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, entranceInViewOptions)
  const reduceMotion = useReducedMotion()

  return {
    ref,
    started: inView === true || reduceMotion === true,
  }
}
