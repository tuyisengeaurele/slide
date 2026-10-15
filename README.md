<p align="center">
  <img src="brand/slide-logo-transparent.png" alt="Slide" width="220" />
</p>

# Slide

Call center software that runs in the browser. Agents take and make calls, supervisors
watch the queues as they move, and managers get numbers they can actually use.

This repo is early. Right now it holds the marketing site and the shared design system.
The product app, API and telephony come after.

## What's here

```
apps/marketing   the public site (Astro)
apps/app         the product (Vite + React), design showcase for now
packages/ui      shared components and design tokens
packages/shared  types and schemas shared between apps
brand/           logos and favicons
```

## Running it

You need Node 22 and pnpm.

```bash
pnpm install
pnpm dev
```

Other scripts: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`.

## Contributing

Branch off `main` as `type/short-description` (for example `feat/pricing-page`), keep
commits small and use [Conventional Commits](https://www.conventionalcommits.org/).
Open a PR, wait for CI, squash-merge. More in [CONTRIBUTING.md](CONTRIBUTING.md) once it lands.

## License

All rights reserved for now.
