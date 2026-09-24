# ADR 0001: Phase 0 technology and boundaries

- Status: Accepted
- Date: 2026-09-24

## Context

GŁĘBIA needs multiple deployable applications and a deterministic simulation that can run independently of UI and infrastructure. The repository must support incremental growth without prematurely implementing production systems.

## Decision

Use strict TypeScript in a pnpm workspace orchestrated by Turborepo. Use Next.js App Router for web and admin surfaces and NestJS as the API modular monolith. Keep the worker as an independent Node process until queues are justified. Place deterministic gameplay exclusively in the framework-independent `packages/game-core` boundary. Share narrow compiler/test configuration packages.

## Consequences

Workspace scripts provide one quality pipeline and cacheable builds. Applications can deploy independently while sharing explicit packages. The game core remains usable for the API, replay verification, tests, and future simulations without React, Phaser, NestJS, Prisma, or browser APIs. More package configuration exists than in a single application, and dependency boundaries require ongoing review.

Phaser, Prisma, Redis, and BullMQ are deferred: installing them now would not validate any Phase 0 behavior and would create unused infrastructure. Their intended package/application boundaries are documented.

## Rejected alternatives

A single Next.js application would blur authoritative server and simulation boundaries. Separate repositories would add release and contract overhead too early. Microservices were rejected because no present scaling or isolation need justifies them. A speculative database schema and placeholder gameplay APIs were rejected because they would encode unvalidated domain assumptions.
