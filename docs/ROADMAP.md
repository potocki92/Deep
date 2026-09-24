# Roadmap

## Phase 0 — engineering foundation (current)

The workspace, strict TypeScript configuration, quality tooling, CI, minimal web/admin/API/worker applications, package boundaries, documentation, unit testing, and web smoke testing are present. No gameplay is implemented.

## Suggested Phase 1 scope

Define the smallest deterministic, framework-independent game-core primitives and versioned simulation contract required by the approved Phase 1 specification. Include reproducibility tests and preserve the server-authoritative event boundary. Do not add rendering, persistence, queues, or broad content unless Phase 1 explicitly requires them.

Later work may introduce Phaser, Prisma/PostgreSQL, Redis/BullMQ, production authentication, content tooling, and the playable combat slice only when their phases provide concrete requirements.
