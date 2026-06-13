import Section from "@/components/section"
import AboutSectionContent from "@/components/about/about-section-content"
import { pickInitialProfileIndex } from "@/data/profile-images"
import { getTranslations } from "next-intl/server"

export default async function AboutSection() {
  const t = await getTranslations("about")
  const paragraphs = t.raw("paragraphs") as string[]

  return (
    <Section
      id="about"
      className="max-md:min-h-0 max-md:items-start max-md:justify-start px-6 pb-16 sm:px-10 sm:pb-20 md:py-24 lg:px-16"
    >
      <AboutSectionContent
        heading={t("heading")}
        paragraphs={paragraphs}
        initialIndex={pickInitialProfileIndex()}
      />
    </Section>
  )
}
