"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import {
  HISTORY_ITEM_CONFIGS,
  type HistoryItem,
} from "@/data/history"

export function useHistoryItems(): HistoryItem[] {
  const tItems = useTranslations("history.items")

  return useMemo(
    () =>
      HISTORY_ITEM_CONFIGS.map((config) => ({
        ...config,
        description: tItems(`${config.id}.description`),
      })),
    [tItems],
  )
}
