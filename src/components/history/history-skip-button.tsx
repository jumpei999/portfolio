"use client"

import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { HISTORY_NEXT_SECTION_ID } from "@/components/history/constants"
import { Button } from "@/components/ui/button"

export default function HistorySkipButton() {
  const t = useTranslations("history")

  return (
    <Button asChild variant="outline" size="sm" className="font-mono">
      <a
        href={`#${HISTORY_NEXT_SECTION_ID}`}
        aria-label={t("skipToNextAria")}
      >
        {t("skipToNext")}
        <ChevronDown />
      </a>
    </Button>
  )
}
