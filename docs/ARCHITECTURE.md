# Architecture

## Current system

Phase 0 is a pnpm/Turborepo TypeScript monorepo. `apps/web` and `apps/admin` are independent Next.js App Router applications. `apps/api` is the future authoritative NestJS modular monolith and currently exposes only `GET /health`. `apps/worker` is a plain Node process boundary and has no queues or infrastructure dependencies.

`packages/game-core` is the protected domain boundary. It is pure TypeScript and has no framework, browser, database, renderer, or infrastructure dependency. It currently exports only a package identity constant so compilation and test infrastructure can be verified; no gameplay exists.

## Dependency direction

Applications may depend on packages. Infrastructure packages may eventually adapt domain data, but game-core must never import application or infrastructure packages. The future flow is player intention → authoritative game-core transition → updated state and domain events → presentation. The renderer will visualize events and never decide outcomes.

## Package boundaries

- `game-content`: future declarative definitions; currently no content.
- `game-renderer`: future Phaser presentation adapter. Phaser is deferred until rendering work begins.
- `contracts`: future transport contracts, not copies of game-core models.
- `database`: future Prisma/PostgreSQL adapter. Prisma and schemas are deferred until persistence requirements exist.
- `validation`: small shared validation utilities; currently validates optional server database configuration.
- `ui`: future framework UI primitives; no design system yet.
- `config`: shared compiler configurations only.
- `testing`: shared Vitest defaults only.

Environment values are opt-in during Phase 0. Server secrets must never use `NEXT_PUBLIC_`; browser values must use that prefix and may not contain secrets.
