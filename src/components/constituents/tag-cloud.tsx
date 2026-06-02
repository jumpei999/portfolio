"use client"

import { motion, useReducedMotion } from "motion/react"
import type { Category } from "@/data/category-config"
import { isTagHighlighted } from "./highlight"
import TagCloudItem from "./tag-cloud-item"
import type { PlacedTag } from "./types"

type TagCloudProps = {
  tags: PlacedTag[]
  selectedCategories: ReadonlySet<Category>
  started: boolean
}

export default function TagCloud({
  tags,
  selectedCategories,
  started,
}: Readonly<TagCloudProps>) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="absolute inset-0 z-10 font-montserrat"
      aria-label="A tag cloud of my constituents"
    >
      {tags.map((tag) => (
        <TagCloudItem
          key={tag.label}
          tag={tag}
          highlighted={isTagHighlighted(tag, selectedCategories)}
          reduceMotion={reduceMotion ?? false}
          started={started}
        />
      ))}
    </motion.div>
  )
}
