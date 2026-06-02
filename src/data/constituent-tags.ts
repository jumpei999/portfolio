import type { Category } from "@/data/category-config"
export { CATEGORIES } from "@/data/category-config"

export type Level = 1 | 2 | 3 | 4 | 5
export type TagDescriptionKey = "typescriptPrimary" | "curiosity"

export const LEVEL_TEXT_CLASS: Record<Level, string> = {
  1: "text-xs",
  2: "text-sm",
  3: "text-base",
  4: "text-lg",
  5: "text-xl",
}

export type Tag = {
  label: string
  categories: readonly [Category, ...Category[]]
  level: Level
  descriptionKey?: TagDescriptionKey
}

export const CONSTITUENT_TAGS: Tag[] = [
  {
    label: "TypeScript",
    categories: ["skill", "language"],
    level: 5,
    descriptionKey: "typescriptPrimary",
  },
  { label: "Next.js", categories: ["skill"], level: 4 },
  {
    label: "好奇心",
    categories: ["personality"],
    level: 3,
    descriptionKey: "curiosity",
  },
  { label: "React", categories: ["skill"], level: 5 },
  { label: "JavaScript", categories: ["skill", "language"], level: 5 },
  { label: "Node.js", categories: ["skill", "language"], level: 4 },
  { label: "Python", categories: ["language"], level: 3 },
  { label: "Go", categories: ["language"], level: 2 },
  { label: "Rust", categories: ["language"], level: 1 },
  { label: "Java", categories: ["language"], level: 2 },
  { label: "Kotlin", categories: ["language"], level: 2 },
  { label: "Swift", categories: ["language"], level: 1 },
  { label: "C#", categories: ["language"], level: 2 },
  { label: "PHP", categories: ["language"], level: 2 },
  { label: "Ruby", categories: ["language"], level: 1 },
  { label: "SQL", categories: ["skill", "language"], level: 4 },
  { label: "GraphQL", categories: ["skill"], level: 3 },
  { label: "REST API", categories: ["skill"], level: 4 },
  { label: "HTML", categories: ["skill"], level: 4 },
  { label: "CSS", categories: ["skill"], level: 4 },
  { label: "Tailwind CSS", categories: ["skill"], level: 4 },
  { label: "Sass", categories: ["skill"], level: 2 },
  { label: "Vue.js", categories: ["skill"], level: 2 },
  { label: "Nuxt", categories: ["skill"], level: 2 },
  { label: "Remix", categories: ["skill"], level: 2 },
  { label: "Astro", categories: ["skill"], level: 2 },
  { label: "Svelte", categories: ["skill"], level: 1 },
  { label: "Webpack", categories: ["skill"], level: 2 },
  { label: "Vite", categories: ["skill"], level: 3 },
  { label: "Docker", categories: ["infra"], level: 3 },
  { label: "Kubernetes", categories: ["infra"], level: 2 },
  { label: "AWS", categories: ["infra"], level: 3 },
  { label: "GCP", categories: ["infra"], level: 2 },
  { label: "Azure", categories: ["infra"], level: 2 },
  { label: "Linux", categories: ["infra"], level: 4 },
  { label: "Git", categories: ["skill"], level: 5 },
  { label: "GitHub Actions", categories: ["skill", "infra"], level: 3 },
  { label: "CI/CD", categories: ["skill", "infra"], level: 3 },
  { label: "Terraform", categories: ["infra"], level: 2 },
  { label: "PostgreSQL", categories: ["skill", "infra"], level: 4 },
  { label: "MongoDB", categories: ["skill"], level: 2 },
  { label: "Redis", categories: ["skill", "infra"], level: 3 },
  { label: "Figma", categories: ["skill"], level: 3 },
  { label: "Playwright", categories: ["skill"], level: 3 },
  { label: "Jest", categories: ["skill"], level: 4 },
  { label: "Vitest", categories: ["skill"], level: 3 },
  { label: "Storybook", categories: ["skill"], level: 3 },
  { label: "Agile", categories: ["personality"], level: 4 },
  { label: "Clean Code", categories: ["personality"], level: 4 },
]
