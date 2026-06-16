"use client"

import ProfileImageSwitcher from "@/components/about/profile-image-switcher"
import SocialLinks from "@/components/about/social-links"
import EntranceMotion from "@/components/entrance-motion"

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
  const paragraphStartIndex = 2

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,360px)] md:items-center">
      <div className="contents md:col-start-1 md:block md:space-y-6">
        <EntranceMotion
          as="h2"
          delayIndex={0}
          className="order-1 text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {heading}
        </EntranceMotion>

        <div className="order-3 space-y-4 text-base sm:text-lg sm:leading-relaxed max-sm:text-sm max-sm:leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <EntranceMotion
              as="p"
              delayIndex={paragraphStartIndex + index}
              key={paragraph}
            >
              {paragraph}
            </EntranceMotion>
          ))}
        </div>

        <EntranceMotion
          className="order-4"
          delayIndex={paragraphStartIndex + paragraphs.length}
        >
          <SocialLinks />
        </EntranceMotion>
      </div>

      <EntranceMotion
        className="order-2 md:col-start-2 md:row-start-1 md:self-center"
        delayIndex={1}
      >
        <ProfileImageSwitcher initialIndex={initialIndex} />
      </EntranceMotion>
    </div>
  )
}
