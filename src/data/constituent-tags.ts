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
  { label: "TypeScript", categories: ["language"], level: 5 },
  { label: "Python", categories: ["language"], level: 4 },
  { label: "GAS", categories: ["language"], level: 3 },
  { label: "Java", categories: ["language"], level: 3 },
  { label: "JavaScript", categories: ["language"], level: 3 },
  { label: "Apex", categories: ["language"], level: 1 },
  { label: "PHP", categories: ["language"], level: 1 },
  { label: "Scratch", categories: ["language"], level: 1 },

  { label: "Next.js", categories: ["stack"], level: 5 },
  { label: "Node.js", categories: ["stack"], level: 5 },
  { label: "React", categories: ["stack"], level: 5 },
  { label: "Responsive Design", categories: ["stack"], level: 5 },
  { label: "REST API", categories: ["stack"], level: 5 },
  { label: "Vue.js", categories: ["stack"], level: 5 },
  { label: "pnpm", categories: ["stack"], level: 4 },
  { label: "Motion", categories: ["stack"], level: 3 },
  { label: "next-intl", categories: ["stack"], level: 3 },
  { label: "Playwright", categories: ["stack"], level: 3 },
  { label: "shadcn", categories: ["stack"], level: 3 },
  { label: "SonarQube", categories: ["stack"], level: 3 },
  { label: "Spring Boot", categories: ["stack"], level: 3 },
  { label: "Tailwind", categories: ["stack"], level: 3 },
  { label: "Radix UI", categories: ["stack"], level: 2 },
  { label: "Education", categories: ["stack"], level: 1 },
  { label: "Management", categories: ["stack"], level: 1 },

  { label: "CI/CD", categories: ["platform"], level: 5 },
  { label: "AWS", categories: ["platform"], level: 3 },
  { label: "DevOps", categories: ["platform"], level: 3 },
  { label: "Heroku", categories: ["platform"], level: 3 },
  { label: "Vercel", categories: ["platform"], level: 3 },
  { label: "Salesforce", categories: ["platform"], level: 1 },

  { label: "Android", categories: ["life"], level: 5 },
  { label: "Ishigaki Island", categories: ["life"], level: 5 },
  { label: "Mac", categories: ["life"], level: 5 },
  { label: "Skiing", categories: ["life"], level: 5 },
  { label: "Tokyo", categories: ["life"], level: 5 },
  { label: "Fishing", categories: ["life"], level: 4 },
  { label: "Golf", categories: ["life"], level: 4 },
  { label: "Nagano", categories: ["life"], level: 4 },
  { label: "Camping", categories: ["life"], level: 2 },
  { label: "iPhone/iPad", categories: ["life"], level: 1 },
  { label: "Windows", categories: ["life"], level: 1 },
]
