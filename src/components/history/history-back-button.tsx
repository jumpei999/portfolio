"use client"

import { useTranslations } from "next-intl"
import { HISTORY_PREV_SECTION_ID } from "@/components/history/constants"
import SectionScrollLink from "@/components/section-scroll-link"

export default function HistoryBackButton() {
  const t = useTranslations("history")

  return (
    <SectionScrollLink
      href={`#${HISTORY_PREV_SECTION_ID}`}
      label={t("skipToPrev")}
      ariaLabel={t("skipToPrevAria")}
      direction="up"
    />
  )
}
