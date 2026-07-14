# AGENTS.md

## Setup

First install requires one of:
```
CI=true pnpm install
# or
pnpm approve-builds sharp unrs-resolver && pnpm install
```
(`sharp` and `unrs-resolver` have ignored build scripts that must be approved.)

## Commands

| Task | Command |
|------|---------|
| Dev server | `pnpm dev` |
| Build | `pnpm build` (uses `next build --webpack`) |
| Lint | `pnpm lint` (ESLint 9 flat config) |
| Clean install | `pnpm clean` (deletes `.next/` + `node_modules`, reinstalls) |

There is no `typecheck`, `test`, or `format` script. TypeScript is checked during `next build`. No test suite exists.

## Architecture

- **Next.js 16 App Router** with webpack (not Turbopack) — all scripts pass `--webpack`.
- **Linaria** for CSS-in-JS via `next-with-linaria`. Do not use regular CSS modules or styled-components patterns.
- **MDX** for content — `content/articles/`, `content/blog/`, `content/pages/` are rendered via `next-mdx-remote` and `@next/mdx`.
- **Path alias**: `@/*` maps to `src/*`.
- **Env validation**: `src/env.ts` uses `@t3-oss/env-nextjs` + zod. Two required client vars: `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_GEOAPIFY_API_KEY`.
- **Data fetching**: `@tanstack/react-query` with a shared query client in `src/app/get-query-client.ts`.

## Key directories

```
src/app/          # Next.js App Router pages and layouts
src/components/   # Reusable components
src/services/     # Data-fetching / API layers
src/types/        # TypeScript type definitions
src/utils/        # Utility functions
content/          # MDX content (articles, blog, pages)
public/           # Static assets
```

## Style & linting

- **Prettier**: single quotes, trailing commas (es5), 250 char print width, semicolons.
- **ESLint**: flat config (`eslint.config.mjs`) with `eslint-config-next` (core-web-vitals + typescript).
- **Stylelint**: configured for Linaria via `@linaria/postcss-linaria`; `.tsx` files use `postcss-jsx` syntax.
- **Husky + lint-staged** are installed but no `.husky/` directory exists — pre-commit hooks may not be active.

## Gotchas

- `next.config.ts` uses CommonJS `require()` for plugins — this is intentional (ESLint flags it but it works).
- Bundle analyzer: set `ANALYZE=true` to enable.
- Remote images allowed from `raw.githubusercontent.com`, `covers.openlibrary.org`, `assets.tcgdex.net`.
- `.env.local` (gitignored) and `.env.production` both exist; Next.js loads them automatically.
