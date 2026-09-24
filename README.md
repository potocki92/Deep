# GŁĘBIA

GŁĘBIA is a long-term grimdark 2D RPG project centered on deterministic tactical combat and an endless descent. The repository is currently at **Phase 0**: its engineering foundation exists, but gameplay is not implemented.

## Prerequisites

- Node.js 22 LTS or newer (supported majors are declared in `package.json`; `.nvmrc` selects Node 22)
- pnpm 10.28.1 (activate with `corepack enable`)

## Setup and development

```sh
pnpm install
cp .env.example .env # optional; Phase 0 needs no services
pnpm dev
```

`pnpm dev` starts workspace development tasks: web on port 3000, admin on 3001, API on 3002, and the inert worker process. Individual apps can be run with `pnpm --filter @glebia/web dev`, for example.

## Commands

| Command             | Purpose                           |
| ------------------- | --------------------------------- |
| `pnpm dev`          | Run development processes         |
| `pnpm build`        | Build all buildable workspaces    |
| `pnpm lint`         | Run ESLint                        |
| `pnpm typecheck`    | Run strict TypeScript checks      |
| `pnpm test`         | Run unit tests                    |
| `pnpm test:e2e`     | Run the web Playwright smoke test |
| `pnpm format`       | Write Prettier formatting         |
| `pnpm format:check` | Check formatting without changes  |

Install Playwright's Chromium browser once before local end-to-end testing with `pnpm exec playwright install chromium`.

## Structure

- `apps/web` — minimal player-facing Next.js App Router application.
- `apps/admin` — minimal, separate Next.js administrative boundary.
- `apps/api` — NestJS modular-monolith entry point with `GET /health` only.
- `apps/worker` — standalone Node worker boundary; no queue or Redis dependency.
- `packages/game-core` — pure, framework-independent TypeScript simulation boundary.
- `packages/game-content`, `game-renderer`, `contracts`, `database`, `ui` — intentionally empty Phase 0 boundaries with importable package entry points.
- `packages/validation` — minimal server environment validation.
- `packages/config` and `packages/testing` — shared TypeScript and Vitest configuration.
- `docs` — current architecture, workflow, testing, roadmap, and decisions.

## Architecture and testing

The server will be authoritative. Gameplay rules belong only in `packages/game-core`; clients will submit intentions and render resulting events. Frameworks, browser APIs, persistence, queues, and content definitions must not leak into that package. See [the architecture guide](docs/ARCHITECTURE.md) and [ADR 0001](docs/adr/0001-phase-0-foundation.md).

CI installs workspace dependencies, checks formatting, lint and types, runs unit tests, builds the workspace, and runs the Playwright smoke test. See [testing](docs/TESTING.md) for details.

## Phase 0 status

The monorepo toolchain and application/package boundaries are established. Prisma, Phaser, BullMQ, Redis, production authentication, persistence schemas, content, and all gameplay are intentionally deferred until a phase has a concrete requirement for them.
