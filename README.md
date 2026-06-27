# JPK Engineering — Portfolio

![CI](https://github.com/jumpei999/portfolio/actions/workflows/ci.yml/badge.svg)

This is the repository for my personal profile website as a freelance software engineer based in Japan. It features a corporate-style, single-page layout.

I build primarily with **Next.js** and **TypeScript**, prioritizing pure playfulness over absolutely everything else.

## Live Site

[https://jpk-engineering.dev](https://jpk-engineering.dev) (English: [/en](https://jpk-engineering.dev/en))

Local development: [http://localhost:3000](http://localhost:3000) (English: [/en](http://localhost:3000/en))

## Tech Stack

| Category    | Technologies                                                                   |
| ----------- | ------------------------------------------------------------------------------ |
| Framework   | Next.js 16 (App Router), React 19, TypeScript                                  |
| Styling     | Tailwind CSS v4, shadcn/ui (Lyra), semantic CSS variables (slate-based tokens) |
| i18n        | next-intl (Japanese / English, `localePrefix: as-needed`)                      |
| UI / UX     | Radix UI, Motion, react-icons                                                  |
| Tooling     | ESLint, React Compiler (Babel plugin), pnpm, GitHub Actions, Dependabot, `@next/bundle-analyzer` |
| Observability | Vercel Analytics, Sentry (`@sentry/nextjs`)                                                  |
| Assets      | Inline SVG brand components via `scripts/svg-to-tsx.mjs`                       |
| Development | [Cursor](https://cursor.com/home) — AI-assisted design and implementation      |

## Site Features

Single-page layout ([`src/app/[locale]/(home)/page.tsx`](src/app/[locale]/(home)/page.tsx)):

- **Home** — Brand logo and scroll cue
- **About** — Profile copy with randomized/switchable images
- **History** — Git-style timeline of milestones
- **Constituents** — A tag cloud of my constituents
- **Contact** — Inquiry form (Resend)
- **Footer** — Site tech stack icons, social links (large screens only), and a back-to-top control with a hover-slide message

## Internationalization

Default locale: Japanese (`ja`). Routing config: [`src/i18n/routing.ts`](src/i18n/routing.ts).

| Locale             | URL example        |
| ------------------ | ------------------ |
| Japanese (default) | `/`, `/#about`     |
| English            | `/en`, `/en#about` |

Japanese URLs have no locale prefix. Requests to `/ja` redirect to `/`.

On first visit (no `NEXT_LOCALE` cookie), locale is chosen from the browser's `Accept-Language` header via next-intl middleware. After switching locale in the UI, the cookie persists the choice.

Message files in [`src/messages/`](src/messages/):

- **`shared.json`** — strings identical in every locale (English UI chrome, shared labels)
- **`ja.json` / `en.json`** — locale-specific copy (metadata, aria labels, long paragraphs)

Do not define the same key path in `shared.json` and a locale file. See [`.cursor/rules/i18n-messages.mdc`](.cursor/rules/i18n-messages.mdc).

## Theme

Default theme is **system** ([`src/components/theme-provider.tsx`](src/components/theme-provider.tsx)): on first visit (no stored preference), light/dark follows the OS `prefers-color-scheme`. Pre-hydration styles in [`src/app/globals.css`](src/app/globals.css) apply the matching palette before React mounts.

## Responsive design

| Role            | Width                               |
| --------------- | ----------------------------------- |
| Support minimum | 320px                               |
| Design baseline | 375px                               |
| Tablet          | Tailwind `md:` 768px / `lg:` 1024px |

For AI-assisted UI work, see [`.cursor/rules/responsive-design.mdc`](.cursor/rules/responsive-design.mdc).

## Getting Started

Requires [pnpm](https://pnpm.io/).

```bash
pnpm i
cp .env.example .env.local   # then fill in Resend / contact settings
pnpm dev
```

Contact form requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in `.env.local` (see [`.env.example`](.env.example)). Set `NEXT_PUBLIC_SITE_URL` to the production origin (e.g. `https://jpk-engineering.dev`) for SEO metadata, sitemap, and robots.

Optional observability (see [`.env.example`](.env.example)):

- **Vercel Analytics** — enable in the Vercel project dashboard after deploy (no env vars); [`@vercel/analytics`](https://vercel.com/docs/analytics) is wired in [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx). When enabled, production serves `/_vercel/insights/script.js` and the client sends page views after hydration.
- **Sentry** — set `NEXT_PUBLIC_SENTRY_DSN` (and `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` for source map uploads in CI/Vercel)

## Deployment (Vercel)

Production: [https://jpk-engineering.dev](https://jpk-engineering.dev). Vercel is connected to GitHub; merging to `main` triggers a production deploy after CI passes.

1. Open a PR — [GitHub Actions](.github/workflows/ci.yml) runs `pnpm lint`, `typecheck`, `check:i18n`, and `build`
2. Merge to `main` — Vercel deploys automatically ([`vercel.json`](vercel.json): `pnpm install` / `pnpm build`)
3. Environment variables on Vercel: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` (`https://jpk-engineering.dev`)
4. Verify `/sitemap.xml`, `/robots.txt`, and the contact form on the production URL

[Dependabot](.github/dependabot.yml) opens weekly PRs for npm and GitHub Actions updates (security fixes included).

Other scripts:

```bash
pnpm build       # production build
pnpm start       # serve production build
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
pnpm check:i18n  # ja/en key parity + shared overlap
```

## Project Structure

```
.github/workflows/     # CI (lint, typecheck, i18n, build)
.github/dependabot.yml # Weekly dependency update PRs
AGENTS.md              # Agent instructions (AI tools)
.cursor/rules/         # Cursor project rules (e.g. responsive-design.mdc)
src/
  app/[locale]/        # Pages and layouts
  components/          # UI and section components
  lib/                 # Shared utilities (e.g. scroll-to-home.ts)
  messages/            # i18n (ja.json, en.json, shared.json)
  i18n/                # next-intl routing
  data/                # Nav, social links, history, site-tech-stack.ts, etc.
public/                # Logo and static SVG assets
scripts/               # svg-to-tsx.mjs, check-i18n-keys.mjs
vercel.json            # Vercel install/build commands
```

## Documentation

| File                                   | Audience     | Purpose                                   |
| -------------------------------------- | ------------ | ----------------------------------------- |
| README.md                              | Humans       | Project overview (this file)              |
| [AGENTS.md](AGENTS.md)                 | AI agents    | Stack, commands, conventions              |
| `.cursor/rules/responsive-design.mdc`  | Cursor Agent | Responsive breakpoints and mobile targets |
| `.cursor/rules/documentation-sync.mdc` | Cursor Agent | When to update README / AGENTS / rules    |
| `.cursor/rules/i18n-messages.mdc`      | Cursor Agent | shared vs ja/en message file roles        |

## Credits

Built by JPK Engineering. Design and implementation were developed with [Cursor](https://cursor.com/home) as an AI pair-programming tool—used for layout exploration, component work, i18n, and iterative UI fixes.

## Contact

- GitHub: [jumpei999](https://github.com/jumpei999/)
- Bluesky: [@jumpei999.bsky.social](https://bsky.app/profile/jumpei999.bsky.social)
- Instagram: [@jumpei9999](https://www.instagram.com/jumpei9999/)
