# Development

Use Node 20 and the pinned pnpm release. Run `corepack enable`, then `pnpm install`. No database, Redis server, or external service is needed in Phase 0.

Before committing, run:

```sh
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Use `pnpm --filter <workspace> <script>` while iterating. Add domain rules only to `packages/game-core`, keep that package framework-independent, and accompany future gameplay behavior with tests. External input belongs behind validation at application boundaries. Copy `.env.example` for local variables and never commit `.env` files or credentials.
