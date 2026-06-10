"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import ProfileImageSwitcher from "@/components/about/profile-image-switcher"
import SocialLinks from "@/components/about/social-links"

const IN_VIEW_AMOUNT = 0.6

type AboutSectionContentProps = {
  heading: string
  paragraphs: string[]
  initialIndex: number
}

export default function AboutSectionContent({
  heading,
  paragraphs,
  initialIndex,
}: Readonly<AboutSectionContentProps>) {
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
  const started = animationStarted || reduceMotion

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

  const socialDelayIndex = 1 + paragraphs.length
  const profileDelayIndex = socialDelayIndex + 1

  return (
    <div
      ref={sectionRef}
      className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,360px)] md:items-center"
    >
      <div className="space-y-6">
        <motion.h2
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          {...entranceProps(0)}
        >
          {heading}
        </motion.h2>

        <div className="space-y-4 text-base leading-8 sm:text-lg">
          {paragraphs.map((paragraph, index) => (
            <motion.p key={paragraph} {...entranceProps(index + 1)}>
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div {...entranceProps(socialDelayIndex)}>
          <SocialLinks />
        </motion.div>
      </div>

      <motion.div {...entranceProps(profileDelayIndex)}>
        <ProfileImageSwitcher initialIndex={initialIndex} />
      </motion.div>
    </div>
  )
}
