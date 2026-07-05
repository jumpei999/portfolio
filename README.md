# JPK Engineering — Portfolio

![CI](https://github.com/jumpei999/portfolio/actions/workflows/ci.yml/badge.svg)

This is the repository for my personal profile website as a freelance software engineer based in Japan. It features a corporate-style, single-page layout.

I build primarily with **Next.js** and **TypeScript**, prioritizing pure playfulness over absolutely everything else.

## Live Site

[https://jpk-engineering.dev](https://jpk-engineering.dev) (English: [/en](https://jpk-engineering.dev/en))

Local development: [http://localhost:3000](http://localhost:3000) (English: [/en](http://localhost:3000/en))

## Tech Stack

| Category      | Technologies                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router), React 19, TypeScript                                                                                   |
| Styling       | Tailwind CSS v4, shadcn/ui (Lyra), semantic CSS variables (slate-based tokens)                                                  |
| i18n          | next-intl (Japanese / English, `localePrefix: as-needed`)                                                                       |
| UI / UX       | Radix UI, Motion, react-icons                                                                                                   |
| Tooling       | ESLint, React Compiler (Babel plugin), pnpm, Commitizen, commitlint, husky, semantic-release, GitHub Actions, Dependabot, `@next/bundle-analyzer` |
| Observability | Vercel Analytics, Sentry (`@sentry/nextjs`)                                                                                     |
| Assets        | Inline SVG brand components via `scripts/svg-to-tsx.mjs`                                                                        |
| Development   | [Cursor](https://cursor.com/home) — AI-assisted design and implementation                                                       |

## Site Features

Single-page layout ([`src/app/[locale]/(home)/page.tsx`](<src/app/[locale]/(home)/page.tsx>)):

- **Home** — Brand logo and scroll cue (mobile and desktop)
- **About** — Profile copy with randomized/switchable images
- **History** — Git-style timeline of milestones
- **Constituents** — A tag cloud of my constituents
- **Contact** — Inquiry form (Resend)
- **Footer** — Site tech stack icons (Next.js, React, next-intl, Sentry, Resend, Vercel, etc.), social links (large screens only), and a back-to-top control with a hover-slide message

## Internationalization

Default locale: Japanese (`ja`). Routing config: [`src/i18n/routing.ts`](src/i18n/routing.ts).

| Locale             | URL example        |
| ------------------ | ------------------ |
| Japanese (default) | `/`, `/#about`     |
| English            | `/en`, `/en#about` |

Japanese URLs have no locale prefix. Requests to `/ja` redirect to `/`.

On first visit (no `NEXT_LOCALE` cookie), locale is chosen from the browser's `Accept-Language` header: **Japanese (`ja*`) when the primary language is Japanese, otherwise English**. After switching locale in the UI, the cookie persists the choice. The header includes a **Languages** icon toggle ([`src/components/locale-switcher.tsx`](src/components/locale-switcher.tsx)) next to the theme control to switch ja / en.

Message files in [`src/messages/`](src/messages/):

- **`shared.json`** — strings identical in every locale (English UI chrome, shared labels)
- **`ja.json` / `en.json`** — locale-specific copy (metadata, aria labels, long paragraphs)

Do not define the same key path in `shared.json` and a locale file. See [`.cursor/rules/i18n-messages.mdc`](.cursor/rules/i18n-messages.mdc).

## Theme

Default theme is **system** ([`src/components/theme-provider.tsx`](src/components/theme-provider.tsx)): on first visit (no stored preference), light/dark follows the OS `prefers-color-scheme`. The server reads the `portfolio-theme` cookie in [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx) and applies the matching class on `<html>` before paint. The header includes a **Light / Dark** toggle ([`src/components/theme-toggle.tsx`](src/components/theme-toggle.tsx)); after the first switch, the choice is stored in `localStorage` and synced to the cookie. Favicon follows the resolved theme via [`src/components/theme-favicon.tsx`](src/components/theme-favicon.tsx).

## Responsive Design

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

### Resume routes (not in site navigation)

- Public resume: `/resume` — `mergeResume(resume.shared.json, resume.public.json)` at runtime
- Private resume: `/resume/private` — `mergeResume(resume.shared.json, resume.private.enc)` (password + encrypted private overrides)

Edit flow (same layering idea as i18n `shared.json` + locale files):

```bash
# edit src/data/resume/resume.shared.json     — common content (committed)
# edit src/data/resume/resume.public.json     — public-only overrides (committed)
pnpm resume:reveal                            # decrypt private overrides to resume.private.json
# edit src/data/resume/resume.private.json    — private-only overrides (gitignored)
pnpm resume:seal                              # update resume.private.enc
pnpm check:resume                             # no duplicate leaf keys in shared vs overrides
```

**Key placement:** identical in public/private → `resume.shared.json` only; public-only diffs → `resume.public.json`; private-only diffs → `resume.private.json`. Never duplicate leaf keys between shared and an override file.

**Data schema** ([`src/data/resume/types.ts`](src/data/resume/types.ts)): structured JSON — `summary` as `ResumeRichText[]`; `skills` as `{ category, items[] }`; `techStack` as `string[]`; `achievements` as `ResumeRichText[]`; `seBullets` as `{ client, title, period?, description, technologies? }[]`; `links.intro` as `ResumeRichText`. Merge logic: [`merge-resume.ts`](src/lib/resume/merge-resume.ts).

**PDF export** (browser print): open `/resume` or `/resume/private` → Print → Save as PDF (A4). Enable background graphics for QR codes. Web shows text links in the Links section; print/PDF shows QR codes instead ([`resume-print.css`](src/components/resume/resume-print.css)).

Production env (Vercel): `RESUME_ENCRYPTION_KEY`, `RESUME_PASSWORD_SECRET`, `RESUME_SESSION_SECRET`, `RESUME_SLACK_WEBHOOK_URL`, `CRON_SECRET`. Monthly private passwords are derived automatically; Slack notification runs on the 1st of each month (9:00 JST). Local fallback: `pnpm resume:password`.

Optional observability (see [`.env.example`](.env.example)):

- **Vercel Analytics** — enable in the Vercel project dashboard after deploy (no env vars); [`@vercel/analytics`](https://vercel.com/docs/analytics) is wired in [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx). When enabled, production serves `/_vercel/insights/script.js` and the client sends page views after hydration.
- **Sentry** — set `NEXT_PUBLIC_SENTRY_DSN` (and `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` for source map uploads in CI/Vercel)

## Deployment (Vercel)

Production: [https://jpk-engineering.dev](https://jpk-engineering.dev). Vercel is connected to GitHub; merging to `main` triggers a production deploy after CI passes.

1. Open a PR — [GitHub Actions](.github/workflows/ci.yml) runs `pnpm lint`, `typecheck`, `check:i18n`, `check:resume`, and `build`
2. Merge to `main` — Vercel deploys automatically ([`vercel.json`](vercel.json): `pnpm install` / `pnpm build`); CI then runs [semantic-release](release.config.mjs) when there are releasable commits
3. Environment variables on Vercel: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` (`https://jpk-engineering.dev`), plus resume vars in [`.env.example`](.env.example) when using `/resume/private`
4. Verify `/sitemap.xml`, `/robots.txt`, and the contact form on the production URL

### Releases

After CI passes on `main`, **semantic-release** bumps [`package.json`](package.json), updates [`CHANGELOG.md`](CHANGELOG.md), creates a Git tag (`vX.Y.Z`), and publishes a [GitHub Release](https://github.com/jumpei999/portfolio/releases). Version bumps follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:` → minor, `fix:` → patch, `BREAKING CHANGE` → major. Merges with only `chore:`, `refactor:`, or `style:` commits do not trigger a release.

Repository Settings → Actions → General must grant workflows **Read and write permissions** so `GITHUB_TOKEN` can push tags and release commits.

[Dependabot](.github/dependabot.yml) opens weekly PRs for npm and GitHub Actions updates (security fixes included).

Other scripts:

```bash
pnpm build       # production build
pnpm start       # serve production build
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
pnpm check:i18n  # ja/en key parity + shared overlap
pnpm check:resume # shared/public/private key overlap
pnpm resume:seal | resume:reveal | resume:password
pnpm commit          # interactive Conventional Commits (Commitizen)
pnpm release:dry-run # preview next semantic-release version locally
```

## Project Structure

```
.github/workflows/     # CI (lint, typecheck, i18n, build, semantic-release on main)
release.config.mjs     # semantic-release config
.github/dependabot.yml # Weekly dependency update PRs
AGENTS.md              # Agent instructions (AI tools)
.cursor/rules/         # Cursor project rules (e.g. responsive-design.mdc)
src/
  app/[locale]/        # Pages and layouts
  components/          # UI and section components
  lib/                 # Shared utilities (e.g. scroll-to-home.ts)
  messages/            # i18n (ja.json, en.json, shared.json)
  i18n/                # next-intl routing
  data/                # Nav, social links, history, resume, site-tech-stack.ts, etc.
public/                # Logo, resume QR assets, static files
scripts/               # svg-to-tsx.mjs, check-i18n-keys.mjs, resume-crypto scripts
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
- Discord: [jumpei999](https://discord.com/users/802407652343939123)
- Google Local Guides: [Maps profile](https://www.google.co.jp/maps/contrib/114625111954146376736)
- yukiyama: [jumpei](https://app-api.yukiyama.biz/app/user?id=Z8brqMg6jGR)
