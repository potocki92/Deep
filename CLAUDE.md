CLAUDE.md

Read AGENTS.md completely before performing any work in this repository.

AGENTS.md is the primary repository-wide engineering contract.

This file contains additional instructions specifically for Claude Code.

⸻

PROJECT

GŁĘBIA is a long-term grimdark 2D dark fantasy RPG.

Core concepts include:

* tactical deterministic combat
* an 8x8 match-3 board
* heroes positioned on the left
* enemies positioned on the right
* procedural endless dungeon descent
* deep character builds
* equipment
* plague
* sanity
* mutations
* bosses that manipulate board rules
* long-term progression
* rankings
* seeded challenges

The game must visually and mechanically feel like a dark fantasy RPG first.

Match-3 is the language used to interact with combat.

It is not the visual identity of the game.

⸻

CLAUDE CODE WORKFLOW

Before coding:

1. Read AGENTS.md.
2. Inspect the current repository.
3. Read relevant files under docs/.
4. Inspect existing package conventions.
5. Do not assume an implementation exists.
6. Preserve architectural boundaries.

When a phase is requested:

1. implement only that phase
2. complete it fully
3. add or update tests
4. run formatting
5. run lint
6. run TypeScript checks
7. run unit tests
8. run relevant builds
9. run end-to-end tests if relevant
10. update documentation when implementation changed
11. inspect the git diff
12. provide a concise implementation summary
13. STOP

Do not automatically begin the next phase.

⸻

CRITICAL ARCHITECTURE

packages/game-core must remain framework-independent TypeScript.

It must not depend on:

* Phaser
* React
* Next.js
* NestJS
* Prisma
* Supabase
* Redis
* BullMQ
* browser APIs

Phaser is presentation.

React is application UI.

NestJS is backend/application infrastructure.

Prisma is persistence infrastructure.

Supabase is infrastructure.

Redis is infrastructure.

The Game Core owns gameplay rules.

⸻

DETERMINISM

Never use:

Math.random()

inside deterministic gameplay systems.

All gameplay randomness must eventually flow through a seeded RNG abstraction.

The same:

* seed
* initial state
* content version
* ordered actions

must produce the same result.

⸻

GAMEPLAY EVENTS

Prefer an event-driven boundary between simulation and presentation.

Conceptually:

Player Action
      ↓
Game Core
      ↓
Updated State + Domain Events
      ↓
Renderer

Examples of future events:

* DamageEvent
* HealEvent
* SkillCastEvent
* BoardMatchEvent
* CascadeEvent
* StatusAppliedEvent
* DeathEvent

Do not move gameplay calculations into rendering code.

⸻

CHANGES

Do not perform broad refactors unless required by the current task.

Prefer small coherent changes.

If an architectural decision has meaningful long-term consequences, create an ADR under:

docs/adr/

Do not implement future systems simply because they are mentioned in documentation.

⸻

DOCUMENTATION

Documentation must match the repository.

Do not claim that systems are implemented when they are only planned.

Keep future plans clearly separated from current implementation.

⸻

TESTS

Core gameplay features require tests.

A gameplay feature is incomplete without appropriate automated coverage.

For deterministic systems, always test reproducibility.

⸻

SECURITY

Do not commit secrets.

Do not expose privileged credentials to browser code.

Validate environment variables.

Validate external inputs.

Treat client input as untrusted.

⸻

PHASE DISCIPLINE

If the user asks for:

PHASE 0

implement only Phase 0.

If the user asks for:

PHASE 1

implement only Phase 1.

Never continue automatically.

At the end of a phase:

* summarize what changed
* report validation results
* list intentionally deferred work
* STOP
