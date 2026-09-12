# Viztore — Architecture

## 1. Architectural Style

Viztore's current customer web application follows a **Next.js App Router + componentized frontend + hooks + API layer + client stores** architecture.

The supplied workspace is a monorepo-style project with the customer application under:

`apps/web/`

The screenshot shows these major areas under `apps/web/src`:

```text
apps/
└── web/
    └── src/
        ├── app/
        ├── components/
        │   ├── cart/
        │   │   └── CartDrawer.tsx
        │   └── ui/
        ├── hooks/
        │   ├── useFeaturedProducts.ts
        │   ├── useNearbyStores.ts
        │   ├── useProducts.ts
        │   └── useStoreProducts.ts
        ├── lib/
        │   └── api/
        │       ├── catalog.ts
        │       ├── client.ts
        │       └── stores.ts
        └── stores/
            ├── cart.store.ts
            └── location.store.ts
```

The screenshot also shows additional collapsed folders/files; their internal structure is not assumed here.

## 2. Layer Responsibilities

### App Layer — `src/app`
Owns routes, page composition and route-specific orchestration.

Examples from the specification:

```text
src/app/page.tsx
src/app/stores/page.tsx
src/app/category/page.tsx
src/app/category/[slug]/page.tsx
src/app/products/[slug]/page.tsx
```

Pages should compose reusable components instead of becoming large UI implementations.

### UI Component Layer — `src/components/ui`
Owns reusable visual building blocks.

The current home page imports:

- `Header`
- `Footer`
- `CategoryStrip`
- `PromoCarousel`
- `TrustBar`
- `ProductCard`
- `StoreCard`
- `Skeleton`

This is the primary presentation layer for the storefront.

### Feature Component Layer — `src/components/cart`
Owns cart-specific UI such as:

`CartDrawer.tsx`

Feature-specific components should contain feature behavior while reusing common UI primitives where appropriate.

### Hook Layer — `src/hooks`
Owns reusable data-fetching/application hooks.

Observed examples:

- `useNearbyStores`
- `useFeaturedProducts`
- `useProducts`
- `useStoreProducts`

Hooks keep data retrieval out of presentational components and pages.

### API Layer — `src/lib/api`
Owns communication with backend APIs.

Observed modules:

- `client.ts` — shared API client
- `catalog.ts` — catalog/product-oriented API functions
- `stores.ts` — store-oriented API functions

### Store Layer — `src/stores`
Owns client-side application state.

Observed stores:

- `location.store.ts`
- `cart.store.ts`

Location state supplies coordinates/address to nearby-store discovery.

Cart state is the authoritative client-side mechanism for adding items.

## 3. Data Flow

The intended flow visible in the current home page is:

```text
User
  ↓
Next.js Route/Page
  ↓
Page-level Hook
  ↓
API Layer
  ↓
Backend
  ↓
Hook Data
  ↓
Reusable UI Component
  ↓
User Interaction
  ↓
Client Store / Navigation
```

Home-page example:

```text
location.store
     ↓
lng / lat
     ↓
useNearbyStores(lng, lat)
     ↓
StoreCard[]
```

and:

```text
useFeaturedProducts(12)
     ↓
featuredProducts
     ↓
ProductCard[]
```

## 4. State Ownership

### Global/client state
Use stores for cross-page or cross-component state such as:

- Location
- Cart

### Local UI state
Use React state for page-local UI state such as the home page's:

`activeCategory`

Avoid putting temporary visual state into global stores unless multiple independent parts of the application need it.

## 5. Rendering Responsibility

A good separation is:

```text
Page
 ├── gets route/state/data
 ├── coordinates sections
 └── passes data to components

Component
 ├── renders UI
 ├── handles local interaction
 └── emits actions

Hook
 ├── coordinates data fetching
 └── exposes loading/data/error state

API module
 └── talks to backend

Store
 └── owns persistent client-side application state
```

## 6. Architecture Boundary

The architecture should avoid this pattern:

```text
Page
 ├── raw fetch calls
 ├── large business logic
 ├── duplicated card markup
 ├── cart mutation details
 └── repeated loading/empty states
```

Prefer:

```text
Page
 ├── Hook
 ├── UI Components
 └── Store action
```

## 7. Current Home Page as Reference Implementation

The supplied `page.tsx` demonstrates the intended composition model:

```text
HomePage
├── Header
├── CategoryStrip
├── PromoCarousel
├── TrustBar
├── Stores Near You
│   └── StoreCard / StoreCardSkeleton
├── Best Deals For You
│   └── ProductCard / ProductGridSkeleton
├── Explore Stores CTA
└── Footer
```

This should be treated as the baseline architectural pattern for the remaining storefront pages.
