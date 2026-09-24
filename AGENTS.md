AGENTS.md

GŁĘBIA

GŁĘBIA is a long-term dark fantasy RPG project built around tactical match-3 combat, procedural endless dungeon descent, deep character building, equipment, plague, sanity, deterministic simulation, rankings and long-term progression.

This repository is intended to grow into a production-quality game.

Do not optimize for a quick demo at the cost of architecture.

⸻

1. CORE PROJECT PRINCIPLES

1.1 Architecture first

The project must use clear architectural boundaries.

Gameplay domain logic must never become coupled to:

* React
* Next.js
* Phaser
* NestJS
* Prisma
* Supabase
* Redis
* BullMQ
* browser APIs
* database implementation details
* deployment providers

The game simulation must live in a framework-independent TypeScript package.

The most important package in the repository is:

packages/game-core

Its purity must be protected.

⸻

1.2 Server authoritative

The client is never the source of truth for:

* damage
* healing
* RNG
* loot
* XP
* currencies
* battle results
* progression
* leaderboard scores
* item rolls
* enemy actions
* dungeon rewards
* character progression

The client sends player intentions and actions.

The authoritative game simulation determines the result.

Example:

The client may send:

{
  type: "SWAP_TILE",
  from: 12,
  to: 13
}

The client must never send something equivalent to:

{
  damage: 100000,
  reward: "MYTHIC_ITEM"
}

⸻

1.3 Deterministic game simulation

The game core must be deterministic.

Given the same:

* game version
* content version
* initial state
* RNG seed
* ordered list of player actions

the simulation must produce exactly the same result.

Never use Math.random() inside deterministic gameplay logic.

All gameplay randomness must flow through a seeded RNG abstraction.

The deterministic architecture must eventually allow:

* battle replays
* ranked run verification
* debugging
* reproducible bug reports
* simulation tests
* balance simulations

⸻

1.4 Pure Game Core

The primary gameplay package is:

packages/game-core

It must be written in pure TypeScript.

It must not import:

* React
* Next.js
* Phaser
* NestJS
* Prisma
* Supabase
* Redis
* BullMQ
* DOM APIs
* browser-specific APIs

Preferred architectural direction:

const result = gameEngine.execute(state, action);

The result should conceptually contain:

{
  state,
  events
}

The Game Core determines gameplay.

The renderer consumes gameplay events.

The renderer must not implement gameplay rules.

⸻

2. TARGET REPOSITORY ARCHITECTURE

The intended long-term repository structure is:

apps/
  web/
  api/
  worker/
  admin/
packages/
  game-core/
  game-content/
  game-renderer/
  contracts/
  database/
  validation/
  ui/
  config/
  testing/
docs/
  adr/

Do not create meaningless packages merely to match this tree.

A package should exist only when its responsibility is justified.

⸻

3. TECHNOLOGY DIRECTION

Preferred technology stack:

* TypeScript
* pnpm
* Turborepo
* Next.js
* React
* Phaser 4
* NestJS
* PostgreSQL
* Supabase
* Prisma
* Redis
* BullMQ
* Vitest
* Playwright
* GitHub Actions

Expected deployment direction:

Web application:

* Vercel

API and worker:

* persistent Node.js runtime such as Render or equivalent

Database:

* PostgreSQL hosted through Supabase or equivalent PostgreSQL provider

⸻

4. APPLICATION RESPONSIBILITIES

4.1 apps/web

Responsible for application UI such as:

* main application shell
* menus
* hero roster
* hero details
* inventory
* equipment
* skill trees
* progression screens
* codex
* settings
* account screens
* leaderboards
* non-combat UX

React and Next.js must not contain authoritative gameplay logic.

⸻

4.2 packages/game-renderer

Responsible for visual gameplay presentation.

Expected rendering technology:

Phaser 4.

The renderer may react to domain events such as:

* DamageEvent
* HealEvent
* SkillCastEvent
* BoardMatchEvent
* CascadeEvent
* StatusAppliedEvent
* StatusRemovedEvent
* DeathEvent
* ResourceGainedEvent
* BoardTileCreatedEvent
* BoardTileDestroyedEvent

The renderer must not determine:

* damage
* healing amount
* RNG result
* loot
* status success
* critical hits
* board outcomes
* battle victory

It only visualizes results produced by the Game Core.

⸻

4.3 apps/api

Expected authoritative backend.

Preferred framework:

NestJS.

Architecture should begin as a modular monolith.

Do not introduce microservices without a concrete scaling or isolation requirement.

The API will eventually be responsible for areas such as:

* player actions
* run lifecycle
* persistence
* inventory
* progression
* ranked submissions
* authentication integration
* content version enforcement

Do not implement these prematurely.

⸻

4.4 apps/worker

Reserved for asynchronous workloads such as:

* replay verification
* leaderboard processing
* season jobs
* analytics
* scheduled jobs
* maintenance tasks
* large simulations

Do not move synchronous combat resolution into background jobs.

⸻

4.5 apps/admin

Future administrative and content-management application.

May eventually support:

* hero definitions
* skills
* enemies
* items
* bosses
* biomes
* events
* balancing
* content publishing

Do not build these tools before the underlying content systems exist.

⸻

5. GAME CONCEPT

GŁĘBIA is a grimdark 2D dark fantasy RPG.

Core themes:

* endless descent
* plague
* madness
* disease
* rats
* mutation
* grotesque underground civilizations
* forgotten structures
* rituals
* ancient powers
* impossible geometry
* isolation
* risk versus extraction
* progressively less human environments

The game begins in relatively understandable underground locations.

As the player descends, the world should become increasingly unnatural.

⸻

6. VISUAL DIRECTION

The game uses stylized grimdark 2D.

Important qualities:

* strong silhouettes
* heavy shadows
* dark palette
* grotesque character design
* clear visual hierarchy
* layered environments
* parallax
* atmospheric effects
* modern VFX
* readable combat presentation

The project may draw inspiration from the atmosphere, readability and weight of grimdark 2D games.

Do not copy:

* Darkest Dungeon characters
* Darkest Dungeon UI
* Darkest Dungeon proportions
* Darkest Dungeon assets
* Darkest Dungeon iconography
* Darkest Dungeon distinctive visual execution

GŁĘBIA must maintain an original visual identity.

⸻

7. COMBAT PRESENTATION

The core battle composition follows this rule:

HEROES                           ENEMIES
LEFT                             RIGHT

Heroes always appear on the left side.

Heroes face right.

Enemies appear on the right side.

Enemies face left.

Characters should not stand in a perfectly flat single horizontal line.

Use slight depth and perspective.

On desktop:

* combat scene approximately 60 to 65 percent of screen height
* tactical interface and match-3 board approximately 35 to 40 percent

The game must visually read as:

dark fantasy RPG first

match-3 game second

⸻

8. MATCH-3 BOARD

Initial board size:

8 x 8

Initial tile families:

* BLOOD
* ESSENCE
* PLAGUE
* INSTINCT
* MADNESS
* BONE

The board must not look like a candy puzzle game.

Tiles should eventually use:

* unique colors
* unique symbols
* unique silhouettes
* clear accessibility

Color must not be the only information carrier.

⸻

9. INITIAL VERTICAL SLICE

Future first combat vertical slice should eventually contain:

Heroes

* Executioner
* Occultist
* Hunter
* Surgeon

Enemies

* Rat
* Rat Swarm
* Plagued Miner
* Cultist
* Bloated Corpse
* Plague Priest

Boss

* The Piper

Biome

* Rat Warrens

Do not implement all of this during Phase 0.

These definitions only guide architectural decisions.

⸻

10. CONTENT-DRIVEN DESIGN

Avoid gameplay implemented through direct hardcoded character checks.

Bad:

if (hero.id === "executioner") {
  // special gameplay logic
}

Prefer reusable systems composed from:

* effects
* triggers
* conditions
* targeting rules
* resources
* statuses
* modifiers
* board rules

Future heroes, enemies, items and skills should primarily be created by composing generic systems.

⸻

11. EFFECT SYSTEM DIRECTION

Future generic gameplay effects may include:

* DAMAGE
* HEAL
* SHIELD
* APPLY_STATUS
* REMOVE_STATUS
* GAIN_RESOURCE
* SPEND_RESOURCE
* CREATE_TILE
* REMOVE_TILE
* TRANSFORM_TILE
* SUMMON
* MOVE
* PUSH
* PULL
* DISPEL
* REVIVE
* CHANGE_BOARD_RULE

Do not implement all effect types early.

The architecture should make them possible later.

⸻

12. TRIGGER SYSTEM DIRECTION

Future trigger types may include:

* ON_MATCH
* ON_MATCH_4
* ON_MATCH_5
* ON_CASCADE
* ON_ATTACK
* ON_SKILL_USED
* ON_DAMAGE
* ON_CRIT
* ON_KILL
* ON_HEAL
* ON_STATUS_APPLIED
* ON_TILE_DESTROYED
* ON_TURN_START
* ON_TURN_END

Do not prematurely implement the full trigger engine.

⸻

13. EVENT-DRIVEN PRESENTATION

Gameplay presentation should follow the conceptual flow:

Player Action
      ↓
Game Core
      ↓
Domain Events
      ↓
Renderer
      ↓
Animation / VFX / Sound / UI

This separation is mandatory.

The Game Core decides what happened.

The renderer decides how it looks.

⸻

14. DATA AND CONTENT VERSIONING

Long-running or ranked runs must eventually be associated with:

* RNG seed
* game version
* content version
* ordered player actions

Future balance updates must not make existing ranked runs impossible to verify.

Architecture should anticipate content versioning.

Do not implement a complex content-versioning system during Phase 0 unless required.

⸻

15. TESTING PRINCIPLES

Gameplay systems require automated tests.

Priority areas:

1. deterministic behavior
2. board generation
3. board matching rules
4. gravity
5. cascades
6. resource generation
7. damage calculation
8. trigger ordering
9. status effects
10. replay consistency

For core gameplay logic:

tests are part of the feature.

A gameplay feature without appropriate tests is incomplete.

⸻

16. SIMULATION

Because the Game Core is independent from rendering, it must eventually be possible to run battles without Phaser.

This should allow future tooling such as:

* 1,000 battle simulations
* 100,000 battle simulations
* balance analysis
* hero win-rate analysis
* item strength analysis
* boss difficulty analysis

Do not implement large-scale simulation tooling during Phase 0.

⸻

17. TYPESCRIPT RULES

Use strict TypeScript.

Avoid:

* any
* unsafe type assertions
* duplicated domain models
* giant utility files
* global mutable state
* implicit side effects

Prefer:

* explicit types
* discriminated unions
* focused modules
* clear interfaces
* immutable state transitions where practical

⸻

18. CODE QUALITY

Prefer understandable code over clever code.

Do not create abstractions solely because they might someday become useful.

Avoid:

* god classes
* god components
* huge modules
* circular dependencies
* hidden side effects
* business logic in controllers
* business logic in React components
* business logic in Phaser scenes

Keep responsibilities explicit.

⸻

19. SECURITY

Never expose secrets to the browser.

Validate external input.

Treat all client input as untrusted.

Environment variables must be validated.

No credentials may be committed.

Provide .env.example.

Never place service-role database credentials in frontend code.

⸻

20. DATABASE DIRECTION

PostgreSQL is the intended persistent database.

Supabase may provide:

* hosted PostgreSQL
* authentication
* storage

Prisma is the preferred ORM for backend application access.

The domain model must not depend directly on Prisma-generated models.

Database schema should be introduced incrementally when game features require persistence.

Do not create a huge speculative schema during Phase 0.

⸻

21. REDIS AND QUEUES

Redis is intended for future infrastructure such as:

* cache
* locks
* leaderboard cache
* temporary state
* rate limiting
* BullMQ

BullMQ may eventually handle:

* replay verification
* leaderboard processing
* season processing
* scheduled game jobs

Do not require Redis merely to run the initial Phase 0 project.

⸻

22. DOCUMENTATION

Important technical documentation belongs under:

docs/

Architecture decisions should use ADRs when appropriate:

docs/adr/

Documentation must reflect actual implementation.

Do not generate large speculative documentation claiming systems exist when they do not.

⸻

23. WORKING STYLE

Before modifying code:

1. inspect the repository
2. read AGENTS.md
3. understand existing conventions
4. read relevant documentation
5. identify affected architectural boundaries
6. make the smallest coherent change

After modifying code:

1. format
2. lint
3. typecheck
4. run tests
5. build affected applications/packages

Fix failures caused by the change.

Do not silently ignore failures.

⸻

24. PHASE DISCIPLINE

Development is phase-based.

Do not automatically implement future phases.

When instructed to implement a phase:

1. understand the scope
2. implement only that phase
3. complete it fully
4. add appropriate tests
5. validate the implementation
6. update documentation if necessary
7. summarize the result
8. STOP

Do not continue into the next phase unless explicitly instructed.

⸻

25. IMPORTANT PROHIBITIONS

Do not:

* put gameplay rules in React components
* put gameplay rules in Phaser scenes
* use Math.random() for deterministic game simulation
* trust client-generated rewards
* trust client-generated damage
* trust client-generated battle results
* prematurely create microservices
* prematurely create a huge database schema
* implement dozens of heroes before the core systems are stable
* optimize prematurely
* introduce unnecessary infrastructure
* copy copyrighted game assets
* copy distinctive visual designs from other games
* silently change the architectural direction

⸻

26. LONG-TERM QUALITY BAR

This project should eventually be able to support:

* large hero rosters
* large enemy rosters
* many bosses
* thousands of items
* advanced skill trees
* procedural infinite dungeon generation
* plague systems
* sanity systems
* mutations
* equipment affixes
* legendary items
* seasons
* daily seeded challenges
* leaderboards
* deterministic replay verification
* large content updates
* extensive long-term progression

Design for this direction.

Do not overengineer the current phase merely because those features may exist later.

⸻

27. FIRST PLAYABLE TARGET

The first meaningful playable milestone is not the full game.

It is:

Executioner versus Rat

with:

* one hero
* one enemy
* deterministic simulation
* 8x8 board
* six basic tile types
* match detection
* gravity
* refill
* cascades
* resources
* several skills
* enemy intent
* victory
* defeat
* basic visual presentation

This milestone belongs to future phases.

Phase 0 must only establish the engineering foundation.
