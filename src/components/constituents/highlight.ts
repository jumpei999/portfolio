import type { Category } from '@/data/category-config';
import type { Tag } from '@/data/constituent-tags';

export function isTagHighlighted(
  tag: Tag,
  selected: ReadonlySet<Category>,
): boolean {
  if (selected.size === 0) return true;
  return tag.categories.some((c) => selected.has(c));
}
