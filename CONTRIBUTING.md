# Contributing

## Setup

Node 22 and pnpm. Then `pnpm install`. The git hooks install themselves.

## Branches

`main` is always deployable and protected, so nothing goes straight to it. Branch off an
up-to-date `main` and keep the branch short-lived.

Name it `type/short-description`: `feat/pricing-page`, `fix/nav-focus-ring`, `chore/bump-astro`.
Types: feat, fix, chore, refactor, docs, test, perf.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/), imperative, 72 characters or fewer,
no trailing period.

```
feat(marketing): add pricing toggle
fix(ui): keep focus ring inside the dialog
```

One logical change per commit. If the body is needed, say why, not what.

## Pull requests

Small ones, ideally under 400 changed lines. Fill in the template, include screenshots for UI
changes (375, 768 and 1440 wide, light and dark), and wait for CI. We squash-merge, so the PR
title is what ends up in history and it follows the same format as a commit.

## Before you push

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

## Code style

- TypeScript strict. No `any` without a comment saying why.
- Use the tokens and components from `packages/ui`. No one-off colors, spacing or fonts.
- Animate `transform` and `opacity` only, and respect `prefers-reduced-motion`.
- Every screen needs loading, empty and error states.
- Comments explain why, not what. Keep them short.
