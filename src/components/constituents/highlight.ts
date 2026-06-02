import type { Tag } from "@/data/constituent-tags"
import type { Category } from "@/data/category-config"

export function isTagHighlighted(
  tag: Tag,
  selected: ReadonlySet<Category>,
): boolean {
  if (selected.size === 0) return true
  return tag.categories.some((c) => selected.has(c))
}
