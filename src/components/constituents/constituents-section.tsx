"use client"

import { useMemo, useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import { useTranslations } from "next-intl"
import Section from "@/components/section"
import CategoryFilter from "@/components/constituents/category-filter"
import CenterTitle from "@/components/constituents/center-title"
import TagCloud from "@/components/constituents/tag-cloud"
import TagConnections from "@/components/constituents/tag-connections"
import { buildPlacedTags } from "@/components/constituents/placement"
import type { PlacedTag } from "@/components/constituents/types"
import type { Category } from "@/data/category-config"

const IN_VIEW_AMOUNT = 0.6

export default function Constituents() {
  const t = useTranslations("constituents")
  const sectionRef = useRef<HTMLDivElement>(null)
  const animationStarted = useInView(sectionRef, {
    once: true,
    amount: IN_VIEW_AMOUNT,
  })
  const [placedTags] = useState<PlacedTag[]>(() => buildPlacedTags())
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    () => new Set(),
  )

  const selectedReadonly = useMemo(
    () => selectedCategories as ReadonlySet<Category>,
    [selectedCategories],
  )

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev)

      if (next.has(category)) next.delete(category)
      else next.add(category)

      return next
    })
  }

  return (
    <Section
      id="constituents"
      className="relative items-stretch justify-stretch overflow-hidden p-0"
    >
      <div
        ref={sectionRef}
        className="relative min-h-screen w-full"
        aria-label={t("ariaLabel")}
      >
        {placedTags.length > 0 && (
          <div className="absolute inset-0">
            <TagConnections
              tags={placedTags}
              selectedCategories={selectedReadonly}
              started={animationStarted}
            />

            <TagCloud
              tags={placedTags}
              selectedCategories={selectedReadonly}
              started={animationStarted}
            />
          </div>
        )}

        <CenterTitle title={t("title")} started={animationStarted} />

        <motion.div
          className="absolute inset-x-0 bottom-8 z-30 px-4"
          initial={{ opacity: 0, y: 12 }}
          animate={
            animationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          transition={
            animationStarted ? { delay: 0.5, duration: 0.4 } : { duration: 0 }
          }
        >
          <CategoryFilter
            selected={selectedReadonly}
            onToggle={toggleCategory}
            onClear={() => setSelectedCategories(new Set())}
          />
        </motion.div>
      </div>
    </Section>
  )
}
