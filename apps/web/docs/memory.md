# Viztore — Project Memory

## 1. Project Identity

**Project:** Viztore  
**Target application:** `apps/web/`  
**Framework:** Next.js 14  
**Sprint:** `SPRINT-TASK-WEB-01`  
**Branch in supplied brief:** `feat/storefront-responsive-ui`  
**Local development URL in supplied brief:** `http://localhost:3000`

## 2. Product Direction

Viztore is being developed as a local-commerce customer storefront.

The customer experience centers around:

```text
Location
  ↓
Nearby Stores
  ↓
Categories
  ↓
Products
  ↓
Product Details
  ↓
Cart
  ↓
Checkout
```

## 3. Current Architecture Memory

Known structure:

```text
apps/web/src/
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

Only the structure visible in the supplied project screenshot is recorded here. Collapsed folders are intentionally not guessed.

## 4. Known Reusable UI

The supplied Home page imports:

```text
Header
Footer
CategoryStrip
PromoCarousel
TrustBar
ProductCard
StoreCard
ProductGridSkeleton
StoreCardSkeleton
```

These form the current reusable storefront UI foundation.

## 5. Known Hooks

The supplied project exposes:

```text
useNearbyStores
useFeaturedProducts
useProducts
useStoreProducts
```

Home currently uses:

```text
useNearbyStores(lng, lat)
useFeaturedProducts(12)
```

## 6. Known Stores

### Location Store

`src/stores/location.store.ts`

Home reads:

```text
lng
lat
address
```

and passes coordinates to nearby-store discovery.

### Cart Store

`src/stores/cart.store.ts`

The sprint specification requires product Add to Cart to use:

```ts
useCartStore.getState().addItem(...)
```

## 7. Home Page Reference

Current Home composition:

```text
Header
CategoryStrip
PromoCarousel
TrustBar
Stores Near You
Best Deals For You
Explore All Local Stores CTA
Footer
```

Current data states include:

```text
storesLoading
productsLoading
nearbyStores empty state
featuredProducts empty state
```

## 8. Product Requirements Memory

Required customer screens from the supplied sprint brief:

1. Home
2. Explore Stores
3. Categories
4. Product Listing
5. Product Details

The brief also defines store-detail navigation through `/stores/[slug]`.

## 9. Responsive Memory

Reference widths:

```text
Mobile: 375px
Desktop: 1280px
```

Important desktop compositions:

- Categories: approximately 25% sidebar / 75% content.
- Product listing: 4-column product grid.
- Product detail: 50% gallery / 50% product information.

## 10. Mandatory Engineering Memory

Before PR submission:

```bash
pnpm build
```

The supplied specification requires zero TypeScript or linting errors.

## 11. Decision Log

### Decision: Reuse existing UI
Existing reusable components are the default implementation path.

### Decision: Keep data access layered
Pages should consume hooks; hooks should use API modules.

### Decision: Keep cart centralized
Do not introduce a second cart state mechanism.

### Decision: Mobile-first responsive implementation
The primary visual reference starts at 375px and scales toward 1280px.

## 12. What This Memory File Does Not Claim

This document intentionally does not define:

- Backend folder structure not visible in the supplied materials.
- Database schemas not present in the supplied materials.
- Authentication implementation not present in the supplied materials.
- Payment provider implementation not present in the supplied materials.
- Exact API endpoint URLs not present in the supplied materials.
- Internal implementation of collapsed folders in the screenshot.

Those details should be documented only after the relevant source files are inspected.
