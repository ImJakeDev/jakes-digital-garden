# Jake's Digital Garden

## Getting started

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` to customize local settings. No environment variables are required to build the site; reverse geocoding is simply unavailable until a Geoapify key is configured.

## Checks

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

## Geoapify key security

Set `GEOAPIFY_API_KEY` as a server-only environment variable. The application proxies reverse-geocoding requests through `/api/reverse-geocoding`, so the key is not sent to browsers.

Deployments still using `NEXT_PUBLIC_GEOAPIFY_API_KEY` continue to work temporarily, but should migrate to `GEOAPIFY_API_KEY`, rotate the old key, and restrict the new key to the production domain in Geoapify's dashboard.
