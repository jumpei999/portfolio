"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import { Logo } from "@/components/brand/logo"
import SectionScrollLink from "@/components/section-scroll-link"
import { useFitTextFontSize } from "@/hooks/use-fit-text-font-size"
import {
  ENTRANCE_DURATION_SEC,
  ENTRANCE_EASE,
  ENTRANCE_ITEM_HIDDEN,
  ENTRANCE_ITEM_VISIBLE,
  ENTRANCE_STAGGER_SEC,
} from "@/hooks/use-entrance-animation"
import { cn } from "@/lib/utils"

const MotionLogo = motion.create(Logo)

const PRIMARY_TRACKING_TIERS = [0.25, 0.15, 0.08] as const
const SECONDARY_TRACKING_TIERS = [0.1, 0.06, 0.03, 0] as const

export default function HeroContent() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations("hero")
  const tMetadata = useTranslations("metadata")
  const copyContainerRef = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<HTMLParagraphElement>(null)
  const secondaryRef = useRef<HTMLParagraphElement>(null)

  const primaryMessage = t("primaryMessage")
  const secondaryMessage = t("secondaryMessage")

  const primaryFit = useFitTextFontSize({
    containerRef: copyContainerRef,
    textRef: primaryRef,
    minPx: 11,
    maxPx: 18,
    contentKey: primaryMessage,
    trackingTiers: PRIMARY_TRACKING_TIERS,
  })

  const secondaryFit = useFitTextFontSize({
    containerRef: copyContainerRef,
    textRef: secondaryRef,
    minPx: 8,
    maxPx: 14,
    contentKey: secondaryMessage,
    trackingTiers: SECONDARY_TRACKING_TIERS,
  })

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: ENTRANCE_DURATION_SEC, ease: ENTRANCE_EASE }

  const stagger = reduceMotion ? 0 : ENTRANCE_STAGGER_SEC

  const itemInitial = reduceMotion ? false : ENTRANCE_ITEM_HIDDEN
  const itemAnimate = ENTRANCE_ITEM_VISIBLE

  return (
    <div className="flex flex-col items-center gap-6 px-6 text-center">
      <h1 className="sr-only">{tMetadata("title")}</h1>
      <MotionLogo
        className="h-auto w-full max-w-md"
        aria-label={t("logoAlt")}
        initial={itemInitial}
        animate={itemAnimate}
        transition={{ ...itemTransition, delay: 0 }}
      />

      <div
        ref={copyContainerRef}
        className="flex w-full min-w-0 flex-col gap-1 max-md:overflow-x-clip"
      >
        <motion.p
          ref={primaryRef}
          className={cn(
            "whitespace-nowrap uppercase font-montserrat text-foreground",
            "md:text-2xl md:tracking-[0.25em]",
            primaryFit.enabled &&
              !primaryFit.ready &&
              "max-md:invisible max-md:min-h-[1.25em]",
          )}
          style={
            primaryFit.enabled
              ? {
                  fontSize: `${primaryFit.fontSizePx}px`,
                  letterSpacing: `${primaryFit.letterSpacingEm}em`,
                }
              : undefined
          }
          initial={itemInitial}
          animate={itemAnimate}
          transition={{ ...itemTransition, delay: stagger }}
        >
          {primaryMessage}
        </motion.p>
        <motion.p
          ref={secondaryRef}
          className={cn(
            "whitespace-nowrap font-light uppercase font-montserrat",
            "md:text-base md:tracking-widest",
            secondaryFit.enabled &&
              !secondaryFit.ready &&
              "max-md:invisible max-md:min-h-[1.25em]",
          )}
          style={
            secondaryFit.enabled
              ? {
                  fontSize: `${secondaryFit.fontSizePx}px`,
                  letterSpacing: `${secondaryFit.letterSpacingEm}em`,
                }
              : undefined
          }
          initial={itemInitial}
          animate={itemAnimate}
          transition={{ ...itemTransition, delay: stagger * 2 }}
        >
          {secondaryMessage}
        </motion.p>
      </div>
      <motion.div
        className="mt-8 flex md:mt-10"
        initial={itemInitial}
        animate={itemAnimate}
        transition={{ ...itemTransition, delay: stagger * 3 }}
      >
        <SectionScrollLink
          href="#about"
          label={t("scrollLabel")}
          ariaLabel={t("scrollAria")}
        />
      </motion.div>
    </div>
  )
}
