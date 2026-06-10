import Section from "@/components/section"
import AboutSectionContent from "@/components/about/about-section-content"
import { pickInitialProfileIndex } from "@/data/profile-images"
import { getTranslations } from "next-intl/server"

export default async function AboutSection() {
  const t = await getTranslations("about")
  const paragraphs = t.raw("paragraphs") as string[]

  return (
    <Section id="about" className="px-6 py-24 sm:px-10 lg:px-16">
      <AboutSectionContent
        heading={t("heading")}
        paragraphs={paragraphs}
        initialIndex={pickInitialProfileIndex()}
      />
    </Section>
  )
}
