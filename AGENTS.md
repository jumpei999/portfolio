# Agent instructions

Personal portfolio site (single-page, corporate style). Freelance software engineer, Japan.

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4**, shadcn/ui, semantic CSS variables
- **next-intl** — locales `ja` (default) / `en`, `localePrefix: as-needed` (Japanese URLs have no prefix; English uses `/en`)
- **Motion**, Radix UI, react-icons, **Resend** (contact form), **Sonner** (toasts), pnpm

## Commands

```bash
pnpm i
cp .env.example .env.local   # RESEND_API_KEY, CONTACT_*, NEXT_PUBLIC_SITE_URL
pnpm dev      # http://localhost:3000  (English: /en)
pnpm build
pnpm lint
```

## Layout

- Entry: [`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx) — Hero, About, History, Constituents, Contact, Footer (`<main id="main">`)
- A11y chrome: [`src/components/skip-to-main.tsx`](src/components/skip-to-main.tsx) in [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx) (skip link → `#main`)
- Privacy: modal via [`src/components/privacy/`](src/components/privacy/) (Contact form trigger)
- Contact: Server Action in [`src/lib/contact/submit-contact.ts`](src/lib/contact/submit-contact.ts) (Resend)
- SEO: [`src/lib/site-url.ts`](src/lib/site-url.ts), [`src/app/sitemap.ts`](src/app/sitemap.ts), [`src/app/robots.ts`](src/app/robots.ts), [`src/app/[locale]/opengraph-image.tsx`](src/app/[locale]/opengraph-image.tsx), [`src/components/seo/site-json-ld.tsx`](src/components/seo/site-json-ld.tsx)
- i18n messages: [`src/messages/`](src/messages/) (`shared.json` + `ja.json` / `en.json`) — see [`.cursor/rules/i18n-messages.mdc`](.cursor/rules/i18n-messages.mdc) (no duplicate keys across shared / locale files)
- Static data: [`src/data/`](src/data/) (nav, history, social links, site tech stack)
- Shared UI: [`src/components/ui/`](src/components/ui/)

## Conventions

- Match existing patterns (naming, imports, component style) before adding abstractions.
- Keep diffs focused; avoid unrelated changes.
- Client components use `"use client"` where needed; prefer server components by default.
- In-page section links use [`src/lib/scroll-to-section.ts`](src/lib/scroll-to-section.ts) (`preventDefault` + `scrollIntoView` + `replaceState`; Home clears the hash via [`scroll-to-home.ts`](src/lib/scroll-to-home.ts)).
- When behavior or project structure changes, update docs per [`.cursor/rules/documentation-sync.mdc`](.cursor/rules/documentation-sync.mdc).
- Do not commit unless explicitly asked.

## Responsive design

Detailed breakpoints and mobile targets live in **[`.cursor/rules/responsive-design.mdc`](.cursor/rules/responsive-design.mdc)** — read that for UI work.

Summary: support minimum **320px**, design baseline **375px**, tablet via Tailwind **`md:` (768px)** / **`lg:` (1024px)**.

## Docs

Human-oriented overview: [`README.md`](README.md)
