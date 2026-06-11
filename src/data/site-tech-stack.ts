export type SiteTechStackItem = {
  name: string
  slug: string
}

export const SITE_TECH_STACK: readonly SiteTechStackItem[] = [
  { name: "Next.js", slug: "nextjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "shadcn/ui", slug: "shadcnui" },
  { name: "Radix UI", slug: "radixui" },
  { name: "Motion", slug: "motion" },
  { name: "pnpm", slug: "pnpm" },
  { name: "Cursor", slug: "cursor" },
] as const
