export type SiteTechStackItem = {
  name: string
  slug: string
  href: string
}

export const SITE_TECH_STACK: readonly SiteTechStackItem[] = [
  { name: "Next.js", slug: "nextjs", href: "https://nextjs.org" },
  { name: "React", slug: "react", href: "https://react.dev" },
  {
    name: "TypeScript",
    slug: "typescript",
    href: "https://www.typescriptlang.org",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    href: "https://tailwindcss.com",
  },
  { name: "shadcn/ui", slug: "shadcnui", href: "https://ui.shadcn.com" },
  { name: "Radix UI", slug: "radixui", href: "https://www.radix-ui.com" },
  { name: "Motion", slug: "motion", href: "https://motion.dev" },
  { name: "next-intl", slug: "nextintl", href: "https://next-intl.dev" },
  { name: "pnpm", slug: "pnpm", href: "https://pnpm.io" },
  { name: "Vercel", slug: "vercel", href: "https://vercel.com" },
  { name: "Resend", slug: "resend", href: "https://resend.com" },
  { name: "Sentry", slug: "sentry", href: "https://sentry.io" },
  { name: "Cursor", slug: "cursor", href: "https://cursor.com/home" },
] as const
