"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import { Logo } from "@/components/brand/logo"
import SectionScrollLink from "@/components/section-scroll-link"
import { useFitTextFontSize } from "@/hooks/use-fit-text-font-size"
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
    : { duration: 0.6, ease: [0.24, 1, 0.32, 1] as const }

  const stagger = reduceMotion ? 0 : 0.12

  const itemInitial = reduceMotion ? false : { opacity: 0, y: 16 }
  const itemAnimate = { opacity: 1, y: 0 }

  return (
    <>
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
      </div>

      <SectionScrollLink
        href="#about"
        label={t("scrollLabel")}
        ariaLabel={t("scrollAria")}
        className="absolute inset-x-0 bottom-10 hidden md:flex"
      />
    </>
  )
}
