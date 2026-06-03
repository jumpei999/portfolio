import Section from "@/components/section"
import ProfileImageSwitcher from "@/components/about/profile-image-switcher"
import SocialLinks from "@/components/about/social-links"
import { pickInitialProfileIndex } from "@/data/profile-images"
import { getTranslations } from "next-intl/server"

export default async function AboutSection() {
  const t = await getTranslations("about")
  const paragraphs = t.raw("paragraphs") as string[]

  return (
    <Section id="about" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,360px)] md:items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("heading")}
          </h2>

          <div className="space-y-4 text-base leading-8 sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <SocialLinks />
        </div>

        <ProfileImageSwitcher initialIndex={pickInitialProfileIndex()} />
      </div>
    </Section>
  )
}
