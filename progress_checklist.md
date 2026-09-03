# Viztore Platform — Implementation Checklist

> **Overall Status:** Phase 1, Phase 2 (UI Refined), & Phase 3 Complete | 26/26 Unit Tests Passing | Full Monorepo Clean Build

---

## 🟢 Phase 1: Foundation & Core Backend (DONE)

- [x] **Monorepo & Tooling Setup**
  - [x] pnpm workspace (`apps/backend`, `apps/web`, `apps/merchant`, `packages/shared-types`)
  - [x] Turborepo build pipeline configuration (`turbo.json`)
  - [x] Strict TypeScript configs & shared ESLint/Prettier rules
- [x] **Infrastructure & Shared Utilities**
  - [x] MongoDB Atlas connection lifecycle with Mongoose
  - [x] Centralized `AppError` operational error handler & async wrapper
  - [x] Generic Zod validation middleware for body/query/params
  - [x] White-label `branding.config.ts` system with `NEXT_PUBLIC_*` fallback
- [x] **Authentication Module (`apps/backend/src/modules/auth`)**
  - [x] User model with roles: `customer`, `merchant`, `admin`
  - [x] Password hashing with bcrypt (salt rounds = 12)
  - [x] JWT Access (15m) + Refresh (7d) token lifecycle
  - [x] Authentication & Role-based Access Control middleware
  - [x] Unit tests for auth service (3/3 passing)
- [x] **Stores Module (`apps/backend/src/modules/stores`)**
  - [x] GeoJSON `Point` schema with MongoDB `2dsphere` spatial indexing
  - [x] Hyperlocal proximity queries (`$near` within 3–4 km delivery radius)
  - [x] Store CRUD endpoints & unit tests (3/3 passing)

---

## 🟢 Phase 2: Merchant Onboarding & Dashboard (DONE & UI MATCHED)

- [x] **Merchant Onboarding Backend**
  - [x] 6-Step onboarding state machine (Account, Tax, E-Sign, Store, Business Ops, Banking)
  - [x] Super Admin approval/rejection queue API
  - [x] Onboarding unit tests (4/4 passing)
- [x] **Merchant Panel Application (`apps/merchant`)**
  - [x] React 18 + Vite SPA setup with Tailwind CSS and Zustand state management
  - [x] 6-step interactive onboarding wizard with HTML5 canvas e-signature
  - [x] **Pixel-Matched Management Dashboard**:
    - [x] Deep Navy sidebar (`#081028`) with live notification counters (`Orders 25`, `Billing New`, `Wallet ₹32,450`, `Returns 7`) & "Grow your business" promo banner
    - [x] Top header with `Ctrl + K` search shortcut, Wallet button (`₹32,450`), Notifications count badge (`8`), Help `?` button, and Seller Profile pill (`Fashion Hub`, `FH`)
    - [x] Top Greeting & Date Filter (`Last 7 Days 📅`)
    - [x] 3 Top KPI Cards: Total Sales (`₹48,750`), Orders (`128`), Visitors (`2,354`) with positive trend indicators
    - [x] Middle Row Grid:
      - [x] `🔥 New Orders` card with 5 order rows, time badges, and solid orange `View All Orders →` button
      - [x] `Sales Overview` dual-curve line chart (Recharts) with `This Week` & `Last Week` comparison and stat pills
      - [x] `Create New Bill` dark navy card with Tax Invoice, Quote, Credit Note shortcuts & `Order Summary` status list
    - [x] Bottom Row Grid:
      - [x] `Top Selling Products` with thumbnails, variant details, order counts, and sales
      - [x] `Low Stock Alert` with stock counts and `Restock` action buttons
      - [x] `Quick Actions` 8-tile action matrix
    - [x] Footer `Announcements` with 3 horizontal update cards
  - [x] **4 Interactive Slide-Out Side Drawers**:
    - [x] 🔔 `NotificationsDrawer` with category filter tabs (`All 8`, `Orders 5`, `Inventory 2`, `System 1`), unread dots, "Mark all as read"
    - [x] ❓ `HelpSupportDrawer` with search input, 9 expandable accordion FAQ items, and contact support card
    - [x] 👤 `SellerProfileDrawer` with verified badge, seller ID, GSTIN, store performance analytics (`4.7 ★`, `98%`, `1,245 orders`, `₹3.2L+`), and logout button
    - [x] 📝 `ProfileInformationDrawer` with basic info, bank details, store description, category tags, and store logo editor

---

## 🟢 Phase 3: Catalog Engine & Customer Web Storefront (DONE)

- [x] **Catalog Backend Module (`apps/backend/src/modules/catalog`)**
  - [x] Product schema with polymorphic attributes, SKU variants, and image gallery
  - [x] Pre-save derived metric computation (`basePrice`, `totalStock`, `maxDiscount`)
  - [x] Compound MongoDB indexes (`storeId + status + category`, text index on title/desc/brand)
  - [x] High-performance dynamic faceted aggregation search pipeline (size, color, brand, price range)
  - [x] Catalog unit tests (14/14 passing)
- [x] **Customer Web Storefront (`apps/web` Next.js 14+)**
  - [x] Next.js 14 App Router architecture with Tailwind CSS & TanStack Query
  - [x] White-label branding integration via `branding.config.ts`
  - [x] Core layout components: `Header` (with location pin modal), `Footer`, `CategoryStrip`, `PromoCarousel`, `TrustBar`
  - [x] Reusable card components: `ProductCard`, `StoreCard`, `ProductCardSkeleton`, `StoreCardSkeleton`
  - [x] Home Page (`/`): "Stores Near You" horizontal rail, "Best Deals For You" product grid
  - [x] Explore Stores directory (`/stores`): category filtering, open/closed badges, delivery distance
  - [x] Individual Store storefront (`/stores/[slug]`): hero banner, store ratings, fast delivery badge, scoped product catalog
  - [x] Product Listing Page (`/products`): faceted sidebar filter, sort dropdown, active filter chips, `<Suspense>` boundary
  - [x] Product Detail Page (`/products/[slug]`): image thumbnail gallery, variant selector, quantity stepper, stock validator, specifications table
  - [x] Category landing pages (`/category/[slug]`)

---

## 🟡 Phase 4: Cart, Checkout & Orders (BACKEND COMPLETED, UI IN PROGRESS)

- [x] **Enterprise Modular Monolith & Clean Architecture Foundation**:
  - [x] Module Public Facades (`index.ts`) for `auth`, `stores`, `catalog`, and `orders`
  - [x] Strongly-typed in-memory `eventBus` (`shared/events/eventBus.ts` + `eventTypes.ts`) for asynchronous domain events
  - [x] `orders/` composition root (`order.module.ts`) wiring repository, service, controller, and router
  - [x] Abstract Repository layer (`order.repository.ts` implementing `IOrderRepository`)
  - [x] Order state machine with physical 4-digit Delivery OTP handshake (`order.service.ts`)
  - [x] Single-store cart invariant enforcement at service layer
  - [x] ESR compound indexing (`{ storeId: 1, status: 1, createdAt: -1 }`, `{ userId: 1, createdAt: -1 }`)
  - [x] 3-tier testing pyramid: Service unit tests, Supertest route integration tests, Repository unit tests (13 tests, 39 total tests passing)
- [ ] **Customer Storefront Cart & Checkout UI (`apps/web`)**
  - [ ] Flyout Cart Drawer with item stepper & single-store conflict modal
  - [ ] 4-Step Checkout flow (Address, Fulfillment Mode, Payment Method, Order Summary)
- [ ] **Merchant Panel Live Orders Pipeline (`apps/merchant`)**
  - [ ] Kanban Pipeline Board (New, Preparing, Ready, Out for Delivery, Completed)
  - [ ] Delivery OTP modal verification for merchant/rider handoff
  - [ ] Secure 4-digit Delivery OTP generation & verification
  - [ ] Real-time merchant & customer socket events

---

## 🔴 Phase 5: Hyperlocal Delivery & Real-Time Sync

- [ ] Delivery partner assignment & dispatch queue
- [ ] Socket.io Redis adapter for cross-server message broadcasting
- [ ] Merchant audio chime alerts for incoming orders
- [ ] Live customer order tracking map with driver ETA

---

## 🟣 Phase 6: Customer Account, Merchant Marketing & Polish

- [ ] Customer account dashboard: saved addresses, order history, wishlist
- [ ] Review & ratings engine with verified purchase badges
- [ ] Merchant marketing suite: discount voucher & banner campaign manager
- [ ] Merchant revenue analytics & sales reports

---

## ⚫ Phase 7: Mobile App & Advanced Retail Ops

- [ ] Customer Mobile App (React Native + Expo for iOS & Android)
- [ ] Background GPS location services & push notifications
- [ ] Merchant POS/Billing terminal mode & offline barcode scanner
- [ ] Automated returns, exchange & refund settlement pipeline
