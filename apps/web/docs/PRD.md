# Viztore — Product Requirements Document (PRD)

## 1. Product Overview

Viztore is a customer-facing local-commerce storefront built to help users discover nearby retailers and shop products from those stores.

The current sprint targets the customer web application at `apps/web/`, implemented with Next.js 14. The supplied sprint brief defines responsive behavior from a 375px mobile reference to a 1280px desktop layout.

## 2. Product Goal

Provide a modern, responsive shopping experience that lets customers:

- Discover local stores near their location.
- Browse categories and subcategories.
- Explore products.
- View product details.
- Add products to a cart.
- Start checkout / purchase flows.
- Move naturally from discovery → store/category → product → cart/checkout.

## 3. Primary Users

### Customer
A shopper who wants to discover products available from local retailers and purchase them online.

## 4. In-Scope Customer Web Routes

| Route | Purpose |
|---|---|
| `/` | Home / discovery |
| `/stores` | Explore local stores |
| `/stores/[slug]` | Store detail page |
| `/category` | Category browser |
| `/category/[slug]` | Product listing |
| `/products/[slug]` | Product detail |

The supplied sprint brief explicitly specifies the first five screen groups and their responsive requirements.

## 5. Functional Requirements

### Home
- Show delivery/location information.
- Show audience selector: ALL, MEN, WOMEN, KIDS.
- Show category navigation.
- Show promotional carousel.
- Show trust/service benefits.
- Show nearby stores.
- Show best deals.
- Provide navigation to all stores and product discovery.

### Explore Stores
- Show page title and supporting description.
- Filter stores by category.
- Show storefront image, name, rating, category and delivery indicator.
- Navigate to `/stores/[slug]`.

### Categories
- Desktop layout uses a category sidebar and content area.
- Show main categories.
- Show subcategories grouped into sections.
- Support visual subcategory browsing.

### Product Listing
- Show category title and product count.
- Show subcategory pills.
- Provide sorting/filtering controls.
- Show promotional content.
- Render a responsive product grid.
- Show prepaid discount messaging.

### Product Details
- Show product gallery and thumbnails.
- Show title/specification information.
- Show price, discount and rating.
- Support size and color selection.
- Support quantity changes.
- Show trust badges.
- Support Add to Cart.
- Support Buy Now.

## 6. Cart Requirement

The sprint specification requires Add to Cart to integrate with:

`useCartStore.getState().addItem(...)`

located in:

`apps/web/src/stores/cart.store.ts`

## 7. Responsive Requirements

Primary reference widths:

- Mobile: 375px
- Desktop: 1280px

The UI must scale from the mobile reference into multi-column desktop layouts without breaking the shopping flow.

Examples from the brief:

- Nearby stores: horizontal/mobile presentation and multi-column desktop layout.
- Product grid: 2 columns on small screens and 4 columns on large screens.
- Product detail: two-column desktop layout with gallery on the left and information/actions on the right.

## 8. Non-Functional Requirements

- TypeScript must compile successfully.
- Linting must pass.
- Responsive behavior must be validated.
- `pnpm build` is a required quality gate before PR submission.
- Reusable UI components should be preferred over duplicated page-level implementations.

## 9. Definition of Done

A customer-web feature is complete when:

1. Its route exists at the expected App Router location.
2. It matches the supplied reference design at mobile width.
3. It scales correctly at desktop width.
4. Loading and empty states are handled where applicable.
5. Required state/API integration is connected.
6. Cart interactions use the existing cart store.
7. `pnpm build` completes with zero TypeScript/linting errors.
