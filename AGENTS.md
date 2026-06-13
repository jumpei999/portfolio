# Agent instructions

Personal portfolio site (single-page, corporate style). Freelance software engineer, Japan.

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4**, shadcn/ui, semantic CSS variables
- **next-intl** — locales `ja` (default) / `en`, `localePrefix: as-needed` (Japanese URLs have no prefix; English uses `/en`)
- **Motion**, Radix UI, react-icons, pnpm

## Commands

```bash
pnpm i
pnpm dev      # http://localhost:3000  (English: /en)
pnpm build
pnpm lint
```

## Layout

- Entry: [`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx) — Hero, About, History, Constituents, Contact, Footer
- i18n messages: [`src/messages/`](src/messages/) (`shared.json` + `ja.json` / `en.json`)
- Static data: [`src/data/`](src/data/) (nav, history, social links, site tech stack)
- Shared UI: [`src/components/ui/`](src/components/ui/)

## Conventions

- Match existing patterns (naming, imports, component style) before adding abstractions.
- Keep diffs focused; avoid unrelated changes.
- Client components use `"use client"` where needed; prefer server components by default.
- Home navigation uses [`src/lib/scroll-to-home.ts`](src/lib/scroll-to-home.ts) (`#home` anchor + `replaceState` for clean URLs).
- Do not commit unless explicitly asked.

## Responsive design

Detailed breakpoints and mobile targets live in **[`.cursor/rules/responsive-design.mdc`](.cursor/rules/responsive-design.mdc)** — read that for UI work.

Summary: support minimum **320px**, design baseline **375px**, tablet via Tailwind **`md:` (768px)** / **`lg:` (1024px)**.

## Docs

Human-oriented overview: [`README.md`](README.md)
