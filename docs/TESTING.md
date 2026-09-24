# Testing

`pnpm test` asks Turborepo to run workspace unit tests. Phase 0 includes a Vitest test in game-core that proves the pure package can be loaded without a framework runtime. Shared Vitest defaults live in `packages/testing`.

`pnpm test:e2e` runs the web Playwright project. Its smoke test starts the web development server and confirms the root page identifies GŁĘBIA. Install Chromium with `pnpm exec playwright install chromium` before the first local run. CI installs Chromium with its operating-system dependencies.

Formatting, linting, strict TypeScript checking, unit tests, builds, and end-to-end testing are separate checks so failures remain easy to diagnose.
