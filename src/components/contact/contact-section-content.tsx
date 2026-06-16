"use client"

import { useTranslations } from "next-intl"
import ContactFloatingField from "@/components/contact/contact-floating-field"
import EntranceMotion from "@/components/entrance-motion"
import { Button } from "@/components/ui/button"

export default function ContactSectionContent() {
  const t = useTranslations("contact")

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <EntranceMotion
        as="h2"
        delayIndex={0}
        className="text-4xl font-bold tracking-tight sm:text-5xl sm:pb-6 sm:text-center"
      >
        {t("heading")}
      </EntranceMotion>

      <EntranceMotion
        as="p"
        delayIndex={1}
        className="text-base sm:text-lg sm:leading-relaxed max-sm:text-sm max-sm:leading-relaxed"
      >
        {t("intro")}
      </EntranceMotion>

      <form className="space-y-10 pt-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <EntranceMotion delayIndex={2}>
            <ContactFloatingField
              id="name"
              name="name"
              label={t("name")}
              type="text"
              autoComplete="name"
            />
          </EntranceMotion>
          <EntranceMotion delayIndex={3}>
            <ContactFloatingField
              id="email"
              name="email"
              label={t("email")}
              type="email"
              autoComplete="email"
            />
          </EntranceMotion>
        </div>

        <EntranceMotion delayIndex={4}>
          <ContactFloatingField
            id="message"
            name="message"
            label={t("message")}
            multiline
            rows={4}
          />
        </EntranceMotion>

        <EntranceMotion className="flex justify-center" delayIndex={5}>
          <Button type="submit" size="lg" className="px-8">
            {t("send")}
          </Button>
        </EntranceMotion>
      </form>
    </div>
  )
}
