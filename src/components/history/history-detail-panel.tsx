"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { historyItemById } from "@/data/history"

type HistoryDetailPanelProps = {
  activeId: string
}

export default function HistoryDetailPanel({
  activeId,
}: Readonly<HistoryDetailPanelProps>) {
  const t = useTranslations("history")
  const reduceMotion = useReducedMotion()
  const item = historyItemById.get(activeId)

  if (!item) return null

  return (
    <div className="h-fit w-full min-w-0 self-start rounded-2xl border border-border bg-card p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={item.id}
          initial={reduceMotion ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
          transition={{ duration: 0.3, ease: [0.24, 1, 0.32, 1] }}
        >
          <header className="mb-4 space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.date}</p>
          </header>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>

          {item.tags.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {t("detail.techStack")}
              </p>
              <ul className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-xs text-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.article>
      </AnimatePresence>
    </div>
  )
}
