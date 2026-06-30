# Agent instructions

Personal portfolio site (single-page, corporate style). Freelance software engineer, Japan.

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4**, shadcn/ui, semantic CSS variables
- **next-intl** — locales `ja` (default) / `en`, `localePrefix: as-needed` (Japanese URLs have no prefix; English uses `/en`); first visit uses primary `Accept-Language` (ja only when primary is Japanese, else en), then `NEXT_LOCALE` cookie
- **Theme** — [`theme-provider.tsx`](src/components/theme-provider.tsx) defaults to `system` (OS `prefers-color-scheme`); header [`theme-toggle.tsx`](src/components/theme-toggle.tsx) switches light/dark (persisted in `localStorage` + `portfolio-theme` cookie); SSR applies theme class on `<html>` via [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx) / [`theme-storage.ts`](src/lib/theme-storage.ts)
- **Motion**, Radix UI, react-icons, **Resend** (contact form), **Sonner** (toasts), **Vercel Analytics**, **Sentry**, pnpm

## Commands

```bash
pnpm i
cp .env.example .env.local   # RESEND_API_KEY, CONTACT_*, NEXT_PUBLIC_SITE_URL, SENTRY_*
pnpm dev      # http://localhost:3000  (English: /en)
pnpm build
pnpm lint
pnpm typecheck
pnpm check:i18n
pnpm analyze  # optional: bundle report (ANALYZE=true)
pnpm commit          # interactive Conventional Commits (Commitizen)
pnpm release:dry-run # preview next semantic-release version locally
```

Commits use **Conventional Commits** (`feat:`, `fix:`, `refactor:`, etc.). `pnpm commit` runs Commitizen; `git commit` is validated locally by commitlint via husky (`commit-msg` hook). Config: [`commitlint.config.mjs`](commitlint.config.mjs).

Releases: after CI passes on `main`, [semantic-release](release.config.mjs) updates `package.json` + `CHANGELOG.md`, tags `vX.Y.Z`, and creates a GitHub Release (`feat:` minor, `fix:` patch, `BREAKING CHANGE` major). Config: [`release.config.mjs`](release.config.mjs).

CI / deploy: [`.github/workflows/ci.yml`](.github/workflows/ci.yml) (lint, typecheck, i18n, build on PR/push; semantic-release on `main` push), [`.github/dependabot.yml`](.github/dependabot.yml) (weekly dependency PRs), [`vercel.json`](vercel.json) (pnpm install/build for Vercel Git deploys).

## Layout

- Entry: [`src/app/[locale]/(home)/page.tsx`](src/app/[locale]/(home)/page.tsx) — Hero, About, History, Constituents, Contact, Footer (`<main id="main">`)
- Chrome: [`src/components/header/`](src/components/header/) (server shell + client nav), [`src/components/footer/`](src/components/footer/) (server shell + client island); header / bottom nav only on home via [`src/app/[locale]/(home)/layout.tsx`](src/app/[locale]/(home)/layout.tsx)
- A11y chrome: [`src/components/skip-to-main.tsx`](src/components/skip-to-main.tsx) in [`src/app/[locale]/(home)/layout.tsx`](src/app/[locale]/(home)/layout.tsx) (skip link → `#main`)
- 404: [`src/app/[locale]/not-found.tsx`](src/app/[locale]/not-found.tsx) — minimal UI (logo, message, home link); no site chrome
- Privacy: modal via [`src/components/privacy/`](src/components/privacy/) (Contact form trigger)
- Contact: Server Action in [`src/lib/contact/submit-contact.ts`](src/lib/contact/submit-contact.ts) (Resend)
- SEO: [`src/lib/site-url.ts`](src/lib/site-url.ts), [`src/app/sitemap.ts`](src/app/sitemap.ts), [`src/app/robots.ts`](src/app/robots.ts), [`src/app/[locale]/opengraph-image.tsx`](src/app/[locale]/opengraph-image.tsx), [`src/components/seo/site-json-ld.tsx`](src/components/seo/site-json-ld.tsx)
- i18n messages: [`src/messages/`](src/messages/) (`shared.json` + `ja.json` / `en.json`) — see [`.cursor/rules/i18n-messages.mdc`](.cursor/rules/i18n-messages.mdc) (no duplicate keys across shared / locale files)
- Static data: [`src/data/`](src/data/) (nav, history, social links, site tech stack)
- Section layout: [`src/lib/section-shell.ts`](src/lib/section-shell.ts) (spacing, viewport height, mobile bottom clearance)
- Media queries: [`src/lib/media-queries.ts`](src/lib/media-queries.ts) (`NARROW_MAX_WIDTH_PX`, `MOBILE_MAX_WIDTH_PX`, `prefersReducedMotion`)
- Constituents placement: [`src/lib/constituents/placement.ts`](src/lib/constituents/placement.ts) (tier config + `buildPlacedTags`); [`src/hooks/use-placement-tier.ts`](src/hooks/use-placement-tier.ts), [`src/hooks/use-placed-tags.ts`](src/hooks/use-placed-tags.ts)
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
