"use client"

import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

const PRIVACY_SECTION_KEYS = [
  "collection",
  "purpose",
  "thirdParty",
  "retention",
  "contact",
] as const

export default function PrivacyPolicyContent() {
  const t = useTranslations("privacy")

  return (
    <div className="space-y-8 pr-1">
      {PRIVACY_SECTION_KEYS.map((sectionKey) => (
        <section key={sectionKey} className="space-y-2">
          <h3 className="text-base font-semibold tracking-tight sm:text-lg">
            {t(`sections.${sectionKey}.heading`)}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed text-muted-foreground",
              "sm:text-base sm:leading-relaxed",
            )}
          >
            {t(`sections.${sectionKey}.body`)}
          </p>
        </section>
      ))}
    </div>
  )
}
