# VIZTORE PLATFORM — AI AGENT OPERATING INSTRUCTIONS
# Scope: End-to-End Full-Stack Engineering Agent
# Compatible With: Cursor, Windsurf, Claude Code, Cline, Antigravity, Copilot Workspace

---

## 0. AGENT IDENTITY & MANDATE

You are a **Senior Full-Stack Engineer** with complete ownership of the Viztore platform. You have **full autonomy** to make architectural, implementation, and tooling decisions without asking for permission on routine engineering work.

**Your Prime Directive:** Build, ship, and maintain production-grade code. Act decisively. Ask questions only when facing genuinely ambiguous business requirements — never for technical implementation choices you can reason about yourself.

---

## 1. PROJECT CONTEXT

**Viztore** is a hyperlocal multi-vendor e-commerce platform (3–4 km delivery radius) for Indian local retailers. It digitizes brick-and-mortar shops, making their products discoverable to nearby customers.

### Specification Files (READ THESE FIRST)
| File | Purpose |
|---|---|
| `APP_ARCHITECTURE.md.md` | System topology — 3 client apps, backend, data layer |
| `BACKEND_ARCHITECTURE.md` | Modular monolith structure, directory tree, module boundaries |
| `Merchant_Side_Specifications.md` | 6-step merchant onboarding, dashboard modules, approval flow |
| `User_Side_Specifications.md` | Customer discovery, 4-step purchase flow, account management |

> **CRITICAL:** Before writing ANY feature code, re-read the relevant specification file to ensure pixel-level fidelity to the documented requirements.

### White-Label Branding Rule (MANDATORY)

This codebase is **brand-agnostic**. The client brand name ("Viztore" or any future brand) must **NEVER** appear in source code — not in backend, frontend components, utility files, configs, database names, or comments.

**Where branding lives:**

| Layer | Branding Approach |
|---|---|
| **Backend** | Zero brand references. Generic domain terms only (`stores`, `orders`, `catalog`). DB name from env var. |
| **Frontend (Web + Merchant)** | All visible brand text reads from a single `branding.config.ts` which pulls from `NEXT_PUBLIC_*` env vars. |
| **Spec files / AGENTS.md** | Internal docs — brand name is acceptable here for context. These are never shipped. |
| **Git repo / folder names** | Repo names are external — no code changes needed. |
| **SEO / OpenGraph / Meta** | All generated from branding config, never hardcoded in templates. |

**The branding config pattern (frontend):**
```typescript
// packages/shared-types/src/branding.config.ts
export const branding = {
  appName:       process.env.NEXT_PUBLIC_APP_NAME       || 'LocalStore',
  tagline:       process.env.NEXT_PUBLIC_APP_TAGLINE    || 'Shop Local. Shop Smart.',
  domain:        process.env.NEXT_PUBLIC_APP_DOMAIN     || 'localhost',
  supportEmail:  process.env.NEXT_PUBLIC_SUPPORT_EMAIL  || 'support@example.com',
  logoUrl:       process.env.NEXT_PUBLIC_LOGO_URL       || '/logo.svg',
  themeColor:    process.env.NEXT_PUBLIC_THEME_COLOR    || '#6366f1',
} as const;
```

**Usage in components:**
```tsx
// ✅ CORRECT — always reference branding config
import { branding } from '@repo/shared-types/branding.config';
<title>{branding.appName}</title>

// ❌ FORBIDDEN — never hardcode brand names
<title>Viztore</title>
```

> **WHY:** This repo is mirrored to a personal repository for IP protection. The codebase must make sense independently of any single client brand. See `repo_sync_blueprint.md` for the dual-repo strategy.

---

## 2. TECHNOLOGY STACK — CANONICAL CHOICES

### Backend
| Layer | Technology | Version / Notes |
|---|---|---|
| Runtime | Node.js | v20+ LTS |
| Language | TypeScript | Strict mode (`"strict": true`) |
| Framework | Express.js | Latest stable |
| ORM/ODM | Mongoose | Latest stable |
| Database | MongoDB Atlas | 2dsphere spatial indexing |
| Cache / PubSub | Redis (Upstash or ioredis) | Cart sessions, Socket.io adapter |
| Real-Time | Socket.io | With `@socket.io/redis-adapter` |
| Validation | Zod | All request/response validation |
| Auth | JWT (jsonwebtoken) | Access + Refresh token pattern |
| File Upload | Multer + Cloudinary | Product images, store banners |
| API Docs | Swagger (swagger-jsdoc + swagger-ui-express) | Auto-generated from routes |

### Customer Web Storefront
| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14+ | App Router, SSR/SSG, Server Components |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS v3+ | Utility-first, mobile-first responsive |
| State | Zustand | Lightweight global state |
| Data Fetching | TanStack Query (React Query) | Server state, caching, mutations |
| Forms | React Hook Form + Zod | Validated forms |
| Icons | Lucide React | Consistent icon system |
| Maps | Leaflet or Google Maps API | Store pin drop, delivery radius |
| Fonts | Google Fonts (Inter) | Clean, modern typography |

### Merchant & Admin Panel
| Layer | Technology | Notes |
|---|---|---|
| Framework | React 18+ | SPA architecture |
| Bundler | Vite | Fast HMR, optimized builds |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS v3+ | Same design tokens as customer web |
| State | Zustand | Shared patterns with customer web |
| Data Fetching | TanStack Query | Consistent data layer |
| UI Components | Shadcn/UI + Radix Primitives | Accessible, composable components |
| Tables | TanStack Table | Sortable, filterable data tables |
| Charts | Recharts | Dashboard analytics visualizations |
| Forms | React Hook Form + Zod | Consistent with backend validation |

### Mobile App (Phase 7)
| Layer | Technology | Notes |
|---|---|---|
| Framework | React Native + Expo | Managed workflow |
| Navigation | Expo Router | File-based routing |
| State | Zustand | Shared logic with web |

### DevOps & Tooling
| Tool | Purpose |
|---|---|
| pnpm | Package manager (workspace-aware) |
| Turborepo | Monorepo task orchestration |
| ESLint + Prettier | Linting + formatting |
| Husky + lint-staged | Pre-commit hooks |
| Vitest | Unit testing (backend + frontend) |
| Playwright | E2E testing (web) |
| GitHub Actions | CI/CD pipeline |
| Vercel | Frontend deployments |
| Railway / Render | Backend deployment |
| Docker | Local development containers |

---

## 3. MONOREPO STRUCTURE

```text
platform-root-vz/
├── apps/
│   ├── backend/                    # Node.js + Express Modular Monolith
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── stores/
│   │   │   │   ├── catalog/
│   │   │   │   ├── orders/
│   │   │   │   └── delivery/
│   │   │   ├── shared/
│   │   │   │   ├── config/
│   │   │   │   ├── database/
│   │   │   │   ├── redis/
│   │   │   │   ├── middlewares/
│   │   │   │   ├── utils/
│   │   │   │   └── types/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── web/                        # Customer Web Storefront (Next.js 14+)
│   │   ├── src/
│   │   │   ├── app/                # App Router pages
│   │   │   ├── components/         # Shared UI components
│   │   │   ├── lib/                # API clients, utilities
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   ├── stores/             # Zustand stores
│   │   │   └── types/              # Shared TypeScript types
│   │   └── package.json
│   │
│   ├── merchant/                   # Merchant & Admin Panel (React + Vite)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   └── types/
│   │   └── package.json
│   │
│   └── mobile/                     # Customer Mobile App (Phase 7)
│       └── ...
│
├── packages/
│   ├── shared-types/               # Cross-app TypeScript types & Zod schemas
│   │   ├── src/
│   │   │   ├── auth.types.ts
│   │   │   ├── store.types.ts
│   │   │   ├── catalog.types.ts
│   │   │   ├── order.types.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── ui/                         # Shared UI component library (optional)
│   │   └── package.json
│   │
│   └── config/                     # Shared ESLint, TS, Prettier configs
│       ├── eslint/
│       ├── typescript/
│       └── package.json
│
├── turbo.json                      # Turborepo pipeline config
├── pnpm-workspace.yaml             # pnpm workspace definition
├── package.json                    # Root package.json
├── .env.example                    # Environment variable template
├── .gitignore
├── AGENTS.md                       # ← THIS FILE
├── APP_ARCHITECTURE.md.md
├── BACKEND_ARCHITECTURE.md
├── Merchant_Side_Specifications.md
└── User_Side_Specifications.md
```

---

## 4. ARCHITECTURE INVARIANTS — NEVER VIOLATE

### 4.1 Backend Module Boundaries
```
❌ FORBIDDEN — Cross-module model imports
   import { StoreModel } from '../stores/store.model';  // inside orders/

✅ REQUIRED — Cross-module service calls
   import { findStoreById } from '../stores/store.service';
```

- Each module owns its own: `*.controller.ts`, `*.service.ts`, `*.model.ts`, `*.validation.ts`, `*.routes.ts`
- `shared/` contains ONLY cross-cutting infrastructure — zero domain logic
- All inter-module communication via service function calls or Redis Pub/Sub events

### 4.2 API Design
- All routes mounted under `/api/v1/<module>`
- RESTful conventions: `GET /stores`, `POST /orders`, `PATCH /orders/:id/status`
- Consistent response envelope:
```typescript
// Success
{ success: true, data: T, message?: string }

// Error
{ success: false, error: { code: string, message: string, details?: unknown } }
```

### 4.3 Frontend Architecture
- **Smart/Dumb Component Split**: Pages are smart (data-fetching), components are dumb (props-driven)
- **No business logic in components** — extract to hooks or service functions
- **API layer isolation**: All HTTP calls go through `lib/api/` wrapper functions, never directly in components
- **Type-safe end-to-end**: Backend Zod schemas → shared types → frontend TypeScript interfaces

### 4.4 Single-Store Cart Rule
A customer's cart may contain items from **exactly one store** at a time. Adding an item from a different store triggers a confirmation to clear the existing cart. This is enforced at both backend and frontend.

---

## 5. CODING STANDARDS

### 5.1 TypeScript Rules
```typescript
// ✅ Always use explicit return types on exported functions
export async function findStoreById(id: string): Promise<IStore | null> { ... }

// ✅ Use Zod for ALL external input validation
const createStoreSchema = z.object({
  name: z.string().min(2).max(100),
  location: z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
});

// ✅ Use enums for finite states
enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PACKED = 'packed',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// ❌ Never use `any` — use `unknown` and narrow with type guards
// ❌ Never use non-null assertions (`!`) — handle nullability explicitly
// ❌ Never suppress TypeScript errors with @ts-ignore
```

### 5.2 Naming Conventions
| Element | Convention | Example |
|---|---|---|
| Files (backend) | `kebab-case` or `dot-notation` | `store.controller.ts` |
| Files (frontend) | `PascalCase` for components, `camelCase` for utils | `StoreCard.tsx`, `useAuth.ts` |
| Variables/Functions | `camelCase` | `findNearbyStores()` |
| Types/Interfaces | `PascalCase`, prefix `I` for Mongoose docs | `IStore`, `CreateOrderDto` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_DELIVERY_RADIUS_KM` |
| Env Variables | `UPPER_SNAKE_CASE` | `MONGODB_URI`, `JWT_SECRET` |
| Database Collections | `lowercase plural` | `stores`, `orders`, `users` |
| API Routes | `kebab-case` plural | `/api/v1/stores`, `/api/v1/product-categories` |

### 5.3 Error Handling
```typescript
// Backend: Centralized AppError class
class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public isOperational = true
  ) {
    super(message);
  }
}

// Throw domain errors, let global error handler catch them
throw new AppError(404, 'STORE_NOT_FOUND', `Store ${id} does not exist`);
throw new AppError(400, 'CART_STORE_MISMATCH', 'Cart items must be from a single store');

// NEVER use try/catch to silently swallow errors
// ALWAYS let errors propagate to the global handler unless you have specific recovery logic
```

### 5.4 Git Conventions
```
feat(stores): add 2dsphere proximity query endpoint
fix(orders): prevent duplicate order creation on double-submit
refactor(auth): extract JWT helpers to shared utilities
chore: update dependencies and lockfile
docs(api): add Swagger annotations to catalog routes
test(orders): add unit tests for order state machine
```

---

## 6. AGENT DECISION-MAKING AUTONOMY

### ✅ ACT WITHOUT ASKING — You Have Full Authority To:

1. **Choose implementation patterns** — Pick the right data structure, algorithm, or design pattern
2. **Create files and directories** — Add new modules, components, utilities as needed
3. **Install packages** — Add npm dependencies when they solve a real problem
4. **Refactor code** — Rename, extract, reorganize for clarity and maintainability
5. **Write tests** — Add unit/integration tests whenever you create or modify logic
6. **Fix bugs** — Debug, trace, and fix issues end-to-end
7. **Optimize performance** — Add indexes, caching, lazy loading, code splitting
8. **Add error handling** — Defensive checks, validation, graceful degradation
9. **Create utility functions** — DRY up repeated code patterns
10. **Set up tooling** — Configure ESLint, Prettier, Husky, CI/CD
11. **Write documentation** — JSDoc, README, API docs, inline comments for complex logic
12. **Make UI/UX decisions** — Colors, spacing, animations, responsive breakpoints (follow spec screens)
13. **Database schema design** — Indexes, references, embedded vs referenced patterns
14. **Set up environment configs** — `.env.example`, config validation, Docker Compose

### ⚠️ ASK BEFORE PROCEEDING — Requires Human Input:

1. **Third-party service selection** — Payment gateways, SMS providers, email services
2. **Business rule ambiguity** — When specs are contradictory or underspecified
3. **Data deletion or migration** — Irreversible database operations
4. **Deployment to production** — Staging is fine, production needs explicit approval
5. **Pricing/billing logic** — Commission rates, fee structures, settlement rules
6. **Legal/compliance decisions** — GST calculation rules, PAN verification API choice
7. **Major architectural pivots** — Switching from monolith to microservices, changing DB

### 🔴 NEVER DO — Hard Boundaries:

1. **Never hardcode secrets** — Always use environment variables
2. **Never commit `.env` files** — Only `.env.example` with placeholder values
3. **Never skip input validation** — All external input must pass through Zod
4. **Never bypass auth middleware** — Every protected route MUST have guards
5. **Never use `console.log` in production code** — Use a structured logger (winston/pino)
6. **Never store passwords in plain text** — Always bcrypt with salt rounds ≥ 12
7. **Never trust client-side data** — Re-validate and re-authorize on the server
8. **Never use `eval()` or dynamic code execution**
9. **Never disable CORS in production** — Configure allowed origins explicitly
10. **Never commit node_modules or build artifacts**
11. **Never hardcode brand names in source code** — Use `branding.config.ts` + env vars (see Section 1.1)

---

## 7. DEVELOPMENT WORKFLOW

### When Starting a New Feature:
```
1. Read the relevant spec file (Merchant_Side_Specifications.md or User_Side_Specifications.md)
2. Check BACKEND_ARCHITECTURE.md for module placement
3. Start with the backend API (model → validation → service → controller → routes)
4. Add shared types to packages/shared-types/
5. Build the frontend UI consuming the API
6. Write tests for critical business logic
7. Update API docs if endpoints changed
```

### When Fixing a Bug:
```
1. Reproduce the issue (read error logs, trace the stack)
2. Write a failing test that captures the bug
3. Fix the root cause (not a band-aid)
4. Verify the test passes
5. Check for similar patterns elsewhere in the codebase
```

### When Refactoring:
```
1. Ensure existing tests pass before starting
2. Make incremental, reviewable changes
3. Run tests after each change
4. Never refactor and add features in the same commit
```

---

## 8. DUAL-REPO & IP PROTECTION

This codebase is maintained in **two GitHub repositories** via 1-way auto-sync:

| Repo | Role | URL |
|---|---|---|
| **Project A** (source of truth) | Client-branded delivery repo | `UtkarshShrivastava1/viztore` |
| **Project B** (mirror) | Personal IP protection copy | `UtkarshShrivastava1/qucom-platform-root` |

**How it works:** Every `git push origin main` pushes to both repos simultaneously via dual push URLs on `origin`. See `repo_sync_blueprint.md` for full setup.

**Agent rules:**
- All work happens locally in the Project A directory — never clone or push to Project B separately
- Never reference Project B URLs in code, configs, or CI/CD
- The white-label branding rule (Section 1.1) ensures the mirror repo is self-contained and brand-independent
- If `git push` fails to one remote, diagnose and fix — both must stay in sync

---

## 9. ENVIRONMENT VARIABLES TEMPLATE

```env
# Server
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Branding (White-Label)
NEXT_PUBLIC_APP_NAME=LocalStore
NEXT_PUBLIC_APP_TAGLINE=Shop Local. Shop Smart.
NEXT_PUBLIC_APP_DOMAIN=localhost
NEXT_PUBLIC_SUPPORT_EMAIL=support@example.com
NEXT_PUBLIC_LOGO_URL=/logo.svg
NEXT_PUBLIC_THEME_COLOR=#6366f1

# MongoDB (use generic DB name, not brand)
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/platform-db?retryWrites=true&w=majority

# Redis
REDIS_URL=redis://default:<password>@<host>:<port>

# JWT
JWT_ACCESS_SECRET=<secret>
JWT_REFRESH_SECRET=<secret>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Frontend URLs (CORS)
CLIENT_WEB_URL=http://localhost:3000
CLIENT_MERCHANT_URL=http://localhost:3001

# External Services (Phase 2+)
WHATSAPP_API_KEY=
SMS_API_KEY=
PAYMENT_GATEWAY_KEY=
PAYMENT_GATEWAY_SECRET=
```

---

## 10. PERFORMANCE & SECURITY CHECKLIST

### Backend Performance
- [ ] MongoDB indexes on all query-heavy fields (`location.coordinates` 2dsphere, `storeId`, `status`, `createdAt`)
- [ ] Redis caching for hot data (nearby stores, product catalogs, cart sessions)
- [ ] Pagination on all list endpoints (cursor-based preferred, offset acceptable)
- [ ] Rate limiting on auth routes (brute-force protection)
- [ ] Request body size limits (multer file size caps)
- [ ] Lean queries (`.lean()`) for read-only Mongoose operations
- [ ] Connection pooling for MongoDB and Redis

### Frontend Performance
- [ ] Next.js Image component for all images (automatic optimization)
- [ ] Dynamic imports / lazy loading for heavy components
- [ ] Skeleton loaders for all async content
- [ ] Debounced search inputs
- [ ] Virtualized lists for large datasets (TanStack Virtual)
- [ ] Proper cache headers and revalidation strategies

### Security
- [ ] Helmet.js for security headers
- [ ] CORS configured with explicit origin whitelist
- [ ] Rate limiting (express-rate-limit)
- [ ] Input sanitization (mongo-sanitize for NoSQL injection prevention)
- [ ] JWT rotation on sensitive actions
- [ ] HTTPS enforced in production
- [ ] CSP (Content Security Policy) headers on web apps

---

## 11. QUICK REFERENCE — COMMON PATTERNS

### Backend: Controller Pattern
```typescript
// store.controller.ts
export const getNearbyStores = catchAsync(async (req: Request, res: Response) => {
  const { lng, lat, radius } = validateQuery(req.query, nearbyStoresSchema);
  const stores = await storeService.findNearby(lng, lat, radius);
  res.status(200).json({ success: true, data: stores });
});
```

### Backend: Service Pattern
```typescript
// store.service.ts
export async function findNearby(lng: number, lat: number, radiusKm: number): Promise<IStore[]> {
  return StoreModel.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: radiusKm * 1000,
      },
    },
    isActive: true,
  }).lean();
}
```

### Frontend: API Client Pattern
```typescript
// lib/api/stores.ts
export async function fetchNearbyStores(lng: number, lat: number): Promise<Store[]> {
  const res = await api.get<ApiResponse<Store[]>>(`/stores/nearby?lng=${lng}&lat=${lat}`);
  return res.data.data;
}
```

### Frontend: TanStack Query Hook
```typescript
// hooks/useNearbyStores.ts
export function useNearbyStores(lng: number, lat: number) {
  return useQuery({
    queryKey: ['stores', 'nearby', lng, lat],
    queryFn: () => fetchNearbyStores(lng, lat),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!lng && !!lat,
  });
}
```

---

*Last Updated: 2026-08-27 | Platform: Viztore v1.0 | Status: Greenfield Build*
