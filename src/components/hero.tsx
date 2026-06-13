"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { Logo } from "@/components/brand/logo"
import Section from "@/components/section"
import SectionScrollLink from "@/components/section-scroll-link"

const MotionLogo = motion.create(Logo)

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations("hero")

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.24, 1, 0.32, 1] as const }

  const stagger = reduceMotion ? 0 : 0.12

  const itemInitial = reduceMotion ? false : { opacity: 0, y: 16 }
  const itemAnimate = { opacity: 1, y: 0 }

  return (
    <Section id="home" className="relative flex-col gap-6 pt-16">
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <MotionLogo
          className="h-auto w-full max-w-md"
          aria-label={t("logoAlt")}
          initial={itemInitial}
          animate={itemAnimate}
          transition={{ ...itemTransition, delay: 0 }}
        />

        <div className="flex flex-col gap-1">
          <motion.p
            className="text-2xl tracking-[0.25em] text-foreground uppercase font-montserrat"
            initial={itemInitial}
            animate={itemAnimate}
            transition={{ ...itemTransition, delay: stagger }}
          >
            {t("primaryMessage")}
          </motion.p>
          <motion.p
            className="text-base font-light tracking-widest uppercase font-montserrat"
            initial={itemInitial}
            animate={itemAnimate}
            transition={{ ...itemTransition, delay: stagger * 2 }}
          >
            {t("secondaryMessage")}
          </motion.p>
        </div>
      </div>

      <SectionScrollLink
        href="#about"
        label={t("scrollLabel")}
        ariaLabel={t("scrollAria")}
        className="absolute inset-x-0 bottom-10"
      />
    </Section>
  )
}
