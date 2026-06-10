"use client"

import { useRef } from "react"
import { useInView, useReducedMotion } from "motion/react"

export const IN_VIEW_AMOUNT = 0.6

export function useEntranceAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const animationStarted = useInView(sectionRef, {
    once: true,
    amount: IN_VIEW_AMOUNT,
  })
  const reduceMotion = useReducedMotion()

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.24, 1, 0.32, 1] as const }

  const stagger = reduceMotion ? 0 : 0.12

  const itemHidden = { opacity: 0, y: 16 }
  const itemAnimate = { opacity: 1, y: 0 }
  const started = animationStarted === true || reduceMotion === true

  const entranceProps = (index: number) => {
    if (reduceMotion) {
      return {
        initial: false as const,
        animate: itemAnimate,
        transition: { duration: 0 },
      }
    }

    return {
      initial: itemHidden,
      animate: started ? itemAnimate : itemHidden,
      transition: { ...itemTransition, delay: started ? stagger * index : 0 },
    }
  }

  return { sectionRef, started, entranceProps }
}
