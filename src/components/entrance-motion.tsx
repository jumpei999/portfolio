"use client"

import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import {
  entranceInViewOptions,
  entranceItemTransition,
  useEntranceStarted,
} from "@/hooks/use-entrance-animation"

const itemHidden = { opacity: 0, y: 16 }
const itemAnimate = { opacity: 1, y: 0 }

type MotionTag = "div" | "h2" | "p"

type EntranceMotionProps = {
  as?: MotionTag
  children: ReactNode
  className?: string
  delayIndex?: number
} & Omit<
  ComponentPropsWithoutRef<typeof motion.div>,
  "initial" | "animate" | "transition" | "children"
>

export default function EntranceMotion({
  as = "div",
  children,
  className,
  delayIndex = 0,
  ...rest
}: EntranceMotionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, entranceInViewOptions)
  const reduceMotion = useReducedMotion()
  const started = useEntranceStarted(inView === true)
  const transition = entranceItemTransition(delayIndex, started)

  if (as === "h2") {
    if (reduceMotion) {
      return (
        <motion.h2 ref={ref} className={className} {...rest}>
          {children}
        </motion.h2>
      )
    }

    return (
      <motion.h2
        ref={ref}
        className={className}
        initial={itemHidden}
        animate={started ? itemAnimate : itemHidden}
        transition={transition}
        {...rest}
      >
        {children}
      </motion.h2>
    )
  }

  if (as === "p") {
    if (reduceMotion) {
      return (
        <motion.p ref={ref} className={className} {...rest}>
          {children}
        </motion.p>
      )
    }

    return (
      <motion.p
        ref={ref}
        className={className}
        initial={itemHidden}
        animate={started ? itemAnimate : itemHidden}
        transition={transition}
        {...rest}
      >
        {children}
      </motion.p>
    )
  }

  if (reduceMotion) {
    return (
      <motion.div ref={ref} className={className} {...rest}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={itemHidden}
      animate={started ? itemAnimate : itemHidden}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
