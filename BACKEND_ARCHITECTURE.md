# VIZTORE BACKEND ARCHITECTURE SPECIFICATION
# Target Audience: AI Coding Agents (Cursor, Windsurf, Claude Code, Cline)
# Stack: Node.js (v20+), TypeScript (Strict), Express.js, MongoDB Atlas (Mongoose), Redis, Socket.io

---

## 1. ARCHITECTURAL PARADIGM: MODULAR MONOLITH

The backend is built as a single deployable TypeScript service using a strict **Package-by-Feature / Domain-Driven Modular Monolith** structure.

### 1.1 Core Invariants & Boundaries (CRITICAL)
1. **Isolated Domains**: All domain logic lives strictly inside `src/modules/<domain>/`.
2. **Zero Cross-Model Imports**: A module MUST NEVER import a Mongoose Model from another module.
   - ❌ **FORBIDDEN**: `import { StoreModel } from '../stores/store.model';` (inside `orders` module)
   - ✅ **ALLOWED**: `import { findStoreById, verifyStoreIsOpen } from '../stores/store.service';`
3. **Public Contract via Services**: All inter-module communication occurs strictly by calling exported service functions or subscribing to Redis Pub/Sub events.
4. **Shared Layer Restrictions**: `src/shared/` contains ONLY cross-cutting infrastructure (DB connection, JWT verification middleware, global error handler, Zod validation helpers). Domain business logic must NEVER be placed in `src/shared/`.

---

## 2. DIRECTORY TREE

```text
backend/
├── src/
│   ├── modules/
│   │   ├── auth/                    # Customer/Merchant/Admin Auth & Users
│   │   │   ├── auth.controller.ts   # HTTP Request/Response & Status Codes
│   │   │   ├── auth.service.ts      # Token generation, user state logic
│   │   │   ├── auth.model.ts        # Mongoose User & Address schemas
│   │   │   ├── auth.validation.ts   # Zod validation schemas
│   │   │   └── auth.routes.ts       # Express router with route-level guards
│   │   │
│   │   ├── stores/                  # Store Onboarding, Geo Scans & Verification
│   │   │   ├── store.controller.ts
│   │   │   ├── store.service.ts     # 2dsphere proximity queries & store status
│   │   │   ├── store.model.ts       # Store schema with 2dsphere index
│   │   │   ├── store.validation.ts
│   │   │   └── store.routes.ts
│   │   │
│   │   ├── catalog/                 # Polymorphic Catalog, Attributes & Variants
│   │   │   ├── catalog.controller.ts
│   │   │   ├── catalog.service.ts   # SKU stock checks & faceted filters
│   │   │   ├── product.model.ts     # Unified Product schema
│   │   │   ├── catalog.validation.ts
│   │   │   └── catalog.routes.ts
│   │   │
│   │   ├── orders/                  # Cart Checkout, State Machine & Webhooks
│   │   │   ├── order.controller.ts
│   │   │   ├── order.service.ts     # Atomic order creation, OTP, stock lock
│   │   │   ├── order.model.ts       # Order schema & OrderStatus enum
│   │   │   ├── order.validation.ts
│   │   │   └── order.routes.ts
│   │   │
│   │   └── delivery/                # Phase 1 WhatsApp/SMS Dispatch Engine
│   │       ├── delivery.controller.ts
│   │       ├── delivery.service.ts   # WhatsApp message constructor & maps links
│   │       ├── delivery.socket.ts    # Socket.io event triggers
│   │       └── delivery.routes.ts
│   │
│   ├── shared/
│   │   ├── config/                  # Validated process.env via Zod
│   │   ├── database/                # MongoDB Atlas connection manager
│   │   ├── redis/                   # Redis client & Socket.io adapter setup
│   │   ├── middlewares/             # authGuard, roleGuard, validateRequest, errorHandler
│   │   ├── utils/                   # ApiResponse, AppError, GeoJSON helpers
│   │   └── types/                   # Global Express Request extensions
│   │
│   ├── app.ts                       # Express app setup & route mounting under /api/v1
│   └── server.ts                    # HTTP Listener, Socket.io, & process traps
├── tsconfig.json
└── package.json