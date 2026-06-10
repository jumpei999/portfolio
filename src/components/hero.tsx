"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { Logo } from "@/components/brand/logo"
import Section from "@/components/section"
import SectionScrollLink from "@/components/section-scroll-link"

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations("hero")

  return (
    <Section id="hero" className="relative flex-col gap-6 pt-16">
      <motion.div
        className="flex flex-col items-center gap-6 px-6 text-center"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.6, ease: [0.24, 1, 0.32, 1] }
        }
      >
        <Logo className="h-auto w-full max-w-md" aria-label={t("logoAlt")} />

        <div className="flex flex-col gap-1">
          <p className="text-2xl tracking-[0.25em] text-foreground uppercase font-montserrat">
            {t("primaryMessage")}
          </p>
          <p className="text-base font-light tracking-widest uppercase font-montserrat">
            {t("secondaryMessage")}
          </p>
        </div>
      </motion.div>

      <SectionScrollLink
        href="#about"
        label={t("scrollLabel")}
        ariaLabel={t("scrollAria")}
        className="absolute inset-x-0 bottom-10"
      />
    </Section>
  )
}
