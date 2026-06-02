import type { TargetAndTransition, Transition } from "motion/react"
import { cn } from "@/lib/utils"
import { LEVEL_TEXT_CLASS } from "@/data/constituent-tags"
import type { PlacedTag } from "./types"

const DRIFT_DELAY_OFFSET = 0.22

export const TAG_HIDDEN: TargetAndTransition = {
  opacity: 0,
  scale: 0.35,
  x: 0,
  y: 0,
}

const TAG_HIDDEN_TRANSITION: Transition = { duration: 0 }

export function getTagClassName(
  tag: PlacedTag,
  highlighted: boolean,
  hasDescription: boolean,
): string {
  return cn(
    "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap",
    "transition-[opacity,filter]",
    LEVEL_TEXT_CLASS[tag.level],
    "font-medium tracking-tight",
    hasDescription
      ? "pointer-events-auto cursor-default"
      : "pointer-events-none",
    highlighted
      ? "z-10 text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_2px_14px_rgba(255,255,255,0.14)]"
      : "z-0 text-foreground/45 blur-[0.3px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)] dark:drop-shadow-none",
  )
}

export function getTagAnimate(
  tag: PlacedTag,
  highlighted: boolean,
  reduceMotion: boolean,
  started: boolean,
): TargetAndTransition {
  if (!started) return TAG_HIDDEN

  if (reduceMotion) {
    return {
      opacity: highlighted ? 1 : 0.3,
      scale: 1,
      x: 0,
      y: 0,
    }
  }

  return {
    opacity: highlighted ? 1 : 0.25,
    scale: highlighted ? 1 : 0.9,
    x: highlighted ? [0, tag.driftX, -tag.driftX * 0.6, 0] : 0,
    y: highlighted ? [0, -tag.driftY, tag.driftY * 0.5, 0] : 0,
  }
}

export function getTagTransition(
  tag: PlacedTag,
  highlighted: boolean,
  reduceMotion: boolean,
  started: boolean,
): Transition {
  if (!started) return TAG_HIDDEN_TRANSITION

  if (reduceMotion) {
    return { duration: 0.2, delay: tag.popDelay }
  }

  const driftDelay = tag.popDelay + DRIFT_DELAY_OFFSET

  return {
    opacity: {
      duration: 0.1,
      delay: tag.popDelay,
      ease: "easeOut",
    },
    scale: {
      type: "spring",
      stiffness: 780,
      damping: 15,
      mass: 0.55,
      delay: tag.popDelay,
    },
    x: highlighted
      ? {
          duration: tag.duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: driftDelay,
        }
      : { duration: 0.12 },
    y: highlighted
      ? {
          duration: tag.duration * 1.1,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: driftDelay + 0.05,
        }
      : { duration: 0.12 },
  }
}
