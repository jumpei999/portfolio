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
| Development | [Cursor](https://cursor.com) — AI-assisted design and implementation           |

## Site Features

Single-page layout ([`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx)):

- **Hero** — Brand logo and scroll cue
- **About** — Profile copy with randomized/switchable images
- **History** — Horizontal-scroll timeline
- **Constituents** — A tag cloud of my constituents
- **Contact** — Inquiry form UI
- **Footer** — Site tech stack icons (left), social links (right), and a back-to-top control with a hover-slide message

## Getting Started

Requires [pnpm](https://pnpm.io/).

```bash
pnpm i
pnpm dev
```

Other scripts:

```bash
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # ESLint
```

## Project Structure

```
src/
  app/[locale]/     # Pages and layouts
  components/       # UI and section components
  messages/         # i18n (ja.json, en.json, shared.json)
  i18n/             # next-intl routing
  data/             # Nav, social links, history, site-tech-stack, etc.
public/             # Logo and static SVG assets
scripts/            # svg-to-tsx.mjs (brand component generator)
```

## Credits

Built by JPK Engineering. Design and implementation were developed with [Cursor](https://cursor.com) as an AI pair-programming tool—used for layout exploration, component work, i18n, and iterative UI fixes.

## Contact

- GitHub: [jumpei999](https://github.com/jumpei999/)
- Bluesky: [@jumpei999.bsky.social](https://bsky.app/profile/jumpei999.bsky.social)
- Instagram: [@jumpei9999](https://www.instagram.com/jumpei9999/)
