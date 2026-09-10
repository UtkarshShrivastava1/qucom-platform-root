# Technical Architecture & Engineering Standards Review

**Document Version:** 1.0

**Target Audience:** Engineering Leads, Client-Side Architects, Core Platform Engineers

**Classification:** Technical Architecture & Decision Record

---

## 1. Executive Summary

This document outlines the architectural patterns, engineering standards, and trade-off decisions implemented across the platform. It details how the engineering stack incorporates:

* **Contract & Validation Strategy:** Zod-first Data Transfer Objects (DTOs) across monorepo boundaries.


* **Layered Architecture:** Controller ➔ Service ➔ Data Access/Repository boundaries.


* **Interface & Composition Model:** TypeScript interfaces with modular ESM composition vs. heavyweight reflection-based DI containers.


* **Inter-Module Decoupling:** Event-driven architecture utilizing in-process EventBus/EventEmitter and distributed Redis Pub/Sub.


* **Scalability & Load Balancing:** Stateless API topology, reverse-proxy ingress, distributed caching, and horizontal scaling.



---

## 2. Validation Strategy & DTOs (Zod vs. Alternatives)

### Decision & Standard

We standardize on **Zod** paired with auto-inferred **TypeScript DTOs** hosted in a shared workspace package (`@repo/shared-types`).

### Comparative Evaluation

| Evaluation Criteria | Zod (Selected) | Joi | class-validator |
| --- | --- | --- | --- |
| **TypeScript Type Inference** | **Native (`z.infer<typeof schema>`)**<br> | ❌ Manual TypeScript typing required

 | ⚠️ Manual class definition duplication

 |
| **Monorepo Shared Use** | **100% Shared (Backend & Frontend)**<br> | ⚠️ Backend-only runtime footprint

 | ⚠️ Requires `reflect-metadata` on client

 |
| **Decorator & Metadata Overhead** | **Zero runtime reflection**<br> | Zero runtime reflection

 | ❌ Requires experimental TS decorators

 |
| **Form Integration (Client-Side)** | **Native (React Hook Form resolver)**<br> | ⚠️ Custom wrappers needed

 | ⚠️ Heavyweight client footprint

 |
| **Tree-Shaking & Bundle Size** | **Optimal & Modular**<br> | ⚠️ Moderate bundle impact

 | ❌ Heavy decorator dependencies

 |

### Implementation Pattern in Our Stack

```typescript
// 1. Shared Contract Definition (packages/shared-types/src/catalog.types.ts)
import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(2).max(120),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

// Auto-inferred TypeScript DTO
export type CreateProductDto = z.infer<typeof createProductSchema>;

```

```typescript
// 2. Backend Route Guard (apps/backend/src/modules/catalog/catalog.routes.ts)
router.post(
  '/',
  authGuard,
  roleGuard(['merchant', 'admin']),
  validateBody(createProductSchema),
  catalogController.createProduct
);

```

```tsx
// 3. Frontend Form Validation (apps/merchant/src/pages/AddProduct.tsx)
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema, CreateProductDto } from '@repo/shared-types';

const form = useForm<CreateProductDto>({
  resolver: zodResolver(createProductSchema),
});

```

> [!NOTE]
> **Key Architectural Win:** Using Zod allows the **exact same validation schema** to run client-side on form input and server-side on API ingress, eliminating schema drift and duplicate boilerplate.
> 
> 

---

## 3. Layered Architecture: Controller, Service, and Repository Layers

### Structural Boundaries

The backend is structured as a **Modular Monolith** with strict separation of concerns across four discrete layers:

```
[ HTTP Ingress / API Gateway ]
             │
             ▼
   [ Route & Guard Layer ]  ─── Middleware, Auth Guards, Role Checks, Zod Validation
             │
             ▼
    [ Controller Layer ]    ─── Request extraction, Status code mapping, ApiResponse envelopes
             │
             ▼
     [ Service Layer ]      ─── Pure domain logic, Business rules, Multi-entity transactions
             │
             ▼
[ Data Access / Model Layer ] ─── Mongoose ODM schemas, Geospatial (2dsphere) indexes, DB queries

```

### Layer Responsibilities

1. **Routes & Middleware (`*.routes.ts`):** Handles URL mapping, rate limiting, authentication parsing (`authGuard`), role enforcement (`roleGuard`), and Zod request payload sanitization.


2. **Controllers (`*.controller.ts`):** Thin HTTP adapters. Responsible solely for extracting typed DTOs from `req.body` / `req.query`, delegating to the appropriate service, and returning structured HTTP responses (`ApiResponse.success()`, `ApiResponse.created()`).


3. **Services (`*.service.ts`):** The core business engine. Encapsulates geospatial calculations, state machine transitions, commission calculations, and multi-step workflows.


4. **Data Access / Repository (`*.model.ts`):** Managed via Mongoose ODM schemas. In MongoDB/Mongoose architectures, Mongoose models natively serve as the active Record / Document Repository, providing schema validation, middleware hooks, and geospatial index execution.



---

## 4. Interfaces, Class Structures, and Dependency Injection (DI)

### Architectural Choice: Modular ESM Composition vs. Heavyweight DI Containers

We enforce **strict TypeScript Interfaces and Contracts** across the entire stack, while leveraging **idiomatic ES Module (ESM) composition** instead of heavy class-based runtime DI containers (e.g., InversifyJS, NestJS container, Awilix).

### Why We Avoid Heavyweight DI Containers

```
                    ┌────────────────────────────────────────────────────────┐
                    │       TypeScript Modular Architecture Choice           │
                    └────────────────────────────────────────────────────────┘
                               /                                  \
                              /                                    \
      [ Heavyweight DI Container ]                      [ Functional ESM Composition (Current) ]
      • Requires `reflect-metadata` runtime             • Zero runtime reflection overhead
      • Requires experimental TS decorators             • Native ES Module singleton caching
      • Container token & symbol boilerplate            • Instant cold-start & lean execution
      • Complex mocking setups in tests                 • Clean, native mocking via Vitest / ESM

```

#### Detailed Architectural Rationale:

1. **Native ESM Singleton Caching:** In modern Node.js (v20+), ES modules are inherently singletons with deterministic resolution. Functional module exports provide clean encapsulation and deterministic lifecycle management without a container registry.


2. **Zero Decorator & Reflection Overhead:** Class-based DI libraries require `experimentalDecorators`, `emitDecoratorMetadata`, and `reflect-metadata`. This adds runtime bundle bloat and obscures IDE static analysis/jump-to-definition.


3. **Modern Testing with Vitest:** In Java/C#, DI containers were essential because static methods and module imports could not be mocked without runtime injection. In modern TypeScript with **Vitest**, module mocking (`vi.mock()`, `vi.spyOn()`) and isolated in-memory testing (`mongodb-memory-server`) provide 100% test isolation without polluting production code with container factories.


4. **Instant Startup & Container-Ready:** Pure ESM modules boot instantaneously and tree-shake efficiently, optimizing container cold-starts in containerized environments.



> [!TIP]
> **Interoperability Guarantee:** Because all service boundaries are isolated and contracts are typed via `@repo/shared-types`, wrapping functional services into class instances with constructor injection remains a purely mechanical adaptation if enterprise standards mandate class-based DI down the road.
> 
> 

---

## 5. Inter-Module Communication & Event-Driven Architecture

To maintain domain isolation and prevent tight coupling between distinct modules (e.g., Auth, Stores, Catalog, Orders, Delivery), we implement a **hybrid event-driven architecture**:

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │   [ Orders Module ]                                                      │
 │          │                                                               │
 │          ├── 1. Dispatches Domain Event ("order.created")                │
 │          ▼                                                               │
 │   ┌───────────────┐                                                      │
 │   │ Typed EventBus│ ─── In-Process EventEmitter (Same Node Instance)     │
 │   └───────┬───────┘                                                      │
 │           ├──────────────────────────┐                                   │
 │           ▼                          ▼                                   │
 │   [ Catalog Module ]        [ Delivery Module ]                          │
 │   (Stock Lock/Deduction)    (Construct Dispatch Payload)                 │
 │                                      │                                   │
 │                                      ▼                                   │
 │                              ┌───────────────┐                           │
 │                              │ Redis Pub/Sub │ ── Distributed Messaging  │
 │                              └───────┬───────┘    Across API Nodes       │
 │                                      │                                   │
 │                                      ▼                                   │
 │                           [ Socket.io Adapter ]                          │
 │                                      │                                   │
 │                                      ▼                                   │
 │                           [ Real-Time Merchant/                          │
 │                             Customer App Sync ]                          │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘

```

### 1. In-Process Domain Events (`EventEmitter` / `TypedEventBus`)

* **Use Case:** Local domain reactions that must execute within the current process without circular module imports.


* **Example:** When `createOrder()` succeeds, it emits `ORDER_CREATED`. The `catalog` module listens to deduct SKU reservations, and the `notification` module prepares alerts without `order.service.ts` directly importing catalog or notification internals.



### 2. Distributed Events (`Redis Pub/Sub`)

* **Use Case:** Multi-instance event broadcasting, real-time tracking, and cross-service messaging.


* **Example:** Real-time order status updates (`order.status_updated`) are published to Redis channels. All connected backend instances receive the message via the `@socket.io/redis-adapter` and broadcast the WebSockets update to the specific merchant and customer rooms.



---

## 6. Scalability & Load Balancing Strategy

To support high-concurrency traffic, rapid spatial lookups, and real-time order tracking, the platform utilizes a **Stateless Multi-Tier Load Balancing Architecture**:

```
                           [ Internet Traffic ]
                                    │
                                    ▼
                 ┌──────────────────────────────────────┐
                 │       Cloudflare CDN / Edge WAF      │  ── Static Assets, Edge Caching,
                 │         (DDoS & SSL Termination)     │     DDoS & Geo-DNS Routing
                 └──────────────────┬───────────────────┘
                                    │
                                    ▼
                 ┌──────────────────────────────────────┐
                 │     NGINX / Cloud Load Balancer      │  ── Round-Robin / Least Connections
                 │       (Reverse Proxy & Ingress)      │     Health Checks (/healthz)
                 └──────┬───────────┬────────────┬──────┘
                        │           │            │
             ┌──────────┘           │            └──────────┐
             ▼                      ▼                       ▼
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │ Backend Node #1 │    │ Backend Node #2 │    │ Backend Node #N │
    │  (Stateless)    │    │  (Stateless)    │    │  (Stateless)    │
    └────────┬────────┘    └────────┬────────┘    └────────┬────────┘
             │                      │                      │
             └──────────────┬───────┴──────────────┬───────┘
                            │                      │
                            ▼                      ▼
                 ┌────────────────────┐ ┌────────────────────┐
                 │    Redis Cluster   │ │ MongoDB Replica Set│
                 │ (Pub/Sub + Caching │ │ (Atlas 2dsphere +  │
                 │   + Socket Adapter)│ │  Primary/Secondaries│
                 └────────────────────┘ └────────────────────┘

```

### Key Load Balancing & Scalability Pillars:

1. **Stateless API Design:**
* The backend contains **zero in-memory session state**. All user authentication is stateless via signed JWT access tokens and cryptographically validated refresh tokens.


* Any incoming HTTP request can be routed to **any** backend node without session affinity ("sticky sessions") requirements.




2. **Distributed WebSocket Load Balancing (Socket.io + Redis Adapter):**
* Real-time client connections (customer tracking, merchant order audio-beeps) can connect to different backend nodes.


* Utilizing `@socket.io/redis-adapter`, when an event is emitted on Node #1 for Room `merchant:store_123`, Redis distributes the event to Node #2 and Node #3, delivering messages to all targeted clients seamlessly.




3. **Geospatial & Read-Heavy Query Scaling:**
* Nearby store discovery queries (`$near` 2dsphere queries) are cached in Redis with short TTLs (1–3 minutes) keyed by spatial geohash grids.


* MongoDB Replica Sets allow offloading read-heavy catalog searches to secondary nodes via read preferences (`readPreference=secondaryPreferred`).




4. **Health Check Probing & Graceful Draining:**
* Dedicated `/healthz` and `/readyz` endpoints check database connectivity, Redis ping, and memory pressure.


* The load balancer dynamically drains and removes unhealthy nodes without dropping active HTTP requests.





---

## 7. Architecture Summary & Comparison Matrix

| Architectural Domain | Selected Strategy | Rationale & Trade-off |
| --- | --- | --- |
| **Payload Validation** | **Zod + Inferred DTOs**<br> | Single source of truth across client forms & backend route guards. Zero duplicate typing.

 |
| **Monorepo Contracts** | **`@repo/shared-types`**<br> | Guarantees end-to-end type safety between Next.js, React/Vite, and Express backend.

 |
| **Layered Architecture** | **Routes ➔ Controllers ➔ Services ➔ ODM Models**<br> | Strict separation of transport, business logic, and database persistence.

 |
| **Module Composition** | **Functional ESM Singletons**<br> | Fast cold starts, clean tree-shaking, native Vitest mocking without reflection metadata bloat.

 |
| **Module Decoupling** | **Typed EventBus + Redis Pub/Sub**<br> | Decoupled cross-module domain reactions locally; distributed WebSockets coordination globally.

 |
| **Horizontal Scalability** | **Stateless Nodes + Reverse Proxy + Redis Pub/Sub**<br> | True horizontal scaling with no sticky session bottlenecks; zero single point of failure.

 |

---

*Authored by Core Platform Architecture Team*

*Document Ref: ARCH-STD-2026-V1*