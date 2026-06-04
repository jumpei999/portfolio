"use client"

import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { Logo } from "@/components/brand/logo"
import Section from "@/components/section"

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

      <motion.a
        href="#about"
        className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-1 transition-colors text-muted-foreground hover:text-foreground"
        aria-label={t("scrollAria")}
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <span className="text-xs tracking-widest uppercase">
          {t("scrollLabel")}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>
    </Section>
  )
}
