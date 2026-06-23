# JPK Engineering — Portfolio

This is the repository for my personal profile website as a freelance software engineer based in Japan. It features a corporate-style, single-page layout.

I build primarily with **Next.js** and **TypeScript**, prioritizing pure playfulness over absolutely everything else.

## Live Site

<!-- TODO: Add production URL when deployed -->

Local development: [http://localhost:3000](http://localhost:3000) (English: [/en](http://localhost:3000/en))

## Tech Stack

| Category    | Technologies                                                                   |
| ----------- | ------------------------------------------------------------------------------ |
| Framework   | Next.js 16 (App Router), React 19, TypeScript                                  |
| Styling     | Tailwind CSS v4, shadcn/ui (Lyra), semantic CSS variables (slate-based tokens) |
| i18n        | next-intl (Japanese / English, `localePrefix: as-needed`)                      |
| UI / UX     | Radix UI, Motion, react-icons                                                  |
| Tooling     | ESLint, React Compiler (Babel plugin), pnpm                                    |
| Assets      | Inline SVG brand components via `scripts/svg-to-tsx.mjs`                       |
| Development | [Cursor](https://cursor.com/home) — AI-assisted design and implementation      |

## Site Features

Single-page layout ([`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx)):

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

Message files in [`src/messages/`](src/messages/):

- **`shared.json`** — strings identical in every locale (English UI chrome, shared labels)
- **`ja.json` / `en.json`** — locale-specific copy (metadata, aria labels, long paragraphs)

Do not define the same key path in `shared.json` and a locale file. See [`.cursor/rules/i18n-messages.mdc`](.cursor/rules/i18n-messages.mdc).

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

Contact form requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in `.env.local` (see [`.env.example`](.env.example)).

Other scripts:

```bash
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # ESLint
```

## Project Structure

```
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
scripts/               # svg-to-tsx.mjs (brand component generator)
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
