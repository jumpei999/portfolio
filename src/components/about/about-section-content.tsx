"use client"

import { motion } from "motion/react"
import ProfileImageSwitcher from "@/components/about/profile-image-switcher"
import SocialLinks from "@/components/about/social-links"
import { useEntranceAnimation } from "@/hooks/use-entrance-animation"

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
  const { sectionRef, entranceProps } = useEntranceAnimation()

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
