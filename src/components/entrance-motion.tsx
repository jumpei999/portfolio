"use client"

import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { entranceInViewOptions } from "@/hooks/use-entrance-animation"

const itemHidden = { opacity: 0, y: 16 }
const itemAnimate = { opacity: 1, y: 0 }
const itemEase = [0.24, 1, 0.32, 1] as const

type MotionTag = "div" | "h2" | "p"

type EntranceMotionProps = {
  as?: MotionTag
  children: ReactNode
  className?: string
} & Omit<
  ComponentPropsWithoutRef<typeof motion.div>,
  "initial" | "animate" | "transition" | "children"
>

export default function EntranceMotion({
  as = "div",
  children,
  className,
  ...rest
}: EntranceMotionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, entranceInViewOptions)
  const reduceMotion = useReducedMotion()
  const started = inView === true || reduceMotion === true

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
        transition={{ duration: 0.6, ease: itemEase }}
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
        transition={{ duration: 0.6, ease: itemEase }}
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
      transition={{ duration: 0.6, ease: itemEase }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
