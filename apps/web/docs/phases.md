# Viztore — Development Phases

## Phase 0 — Architecture Baseline

### Goal
Establish a stable understanding of the existing customer-web architecture.

### Tasks
- Confirm `apps/web` as the target application.
- Confirm App Router route structure.
- Identify reusable UI components.
- Identify hooks and API modules.
- Identify global stores.
- Confirm existing cart integration.
- Confirm current styling/design token conventions.

### Exit Criteria
The team can implement a new storefront page without inventing a parallel architecture.

---

## Phase 1 — Home / Discovery

### Goal
Complete the customer discovery experience.

### Scope
- Header/location.
- Audience selector.
- Category strip.
- Promotional carousel.
- Trust/service bar.
- Nearby stores.
- Best deals.
- Explore stores CTA.
- Loading states.
- Empty states.

### Data
- Location store.
- Nearby-store hook.
- Featured-product hook.

### Exit Criteria
Home matches the reference design at mobile and desktop widths and passes the build gate.

---

## Phase 2 — Store Discovery

### Goal
Allow customers to browse local stores.

### Scope
- `/stores`
- Category filter pills.
- Store cards.
- Rating information.
- Delivery indicator.
- Store navigation to `/stores/[slug]`.

### Exit Criteria
Customer can move from Home → Explore Stores → Store Detail.

---

## Phase 3 — Category Discovery

### Goal
Create visual category browsing.

### Scope
- `/category`
- Main category sidebar.
- Active category state.
- Category banner.
- Subcategory sections.
- Circular subcategory imagery.

### Desktop Target
- Approximately 25% category sidebar.
- Approximately 75% content area.

### Exit Criteria
Customer can select a category and reach the appropriate product listing.

---

## Phase 4 — Product Listing

### Goal
Enable product discovery and filtering.

### Scope
- `/category/[slug]`
- Category title and product count.
- Subcategory pills.
- Sort control.
- Size filter.
- Color filter.
- Brand filter.
- General filter control.
- Promotional cards/banners.
- Product grid.
- Prepaid discount banner.

### Exit Criteria
Customer can browse a category and open a product detail page.

---

## Phase 5 — Product Details

### Goal
Convert product discovery into purchase intent.

### Scope
- `/products/[slug]`
- Image gallery.
- Thumbnail carousel.
- Wishlist.
- Share.
- Product title/specifications.
- Discounted price.
- Rating.
- Size selection.
- Size chart.
- Color selection.
- Quantity stepper.
- Trust badges.
- Add to Cart.
- Buy Now.

### Exit Criteria
Add to Cart uses the existing cart store and Buy Now starts the intended checkout flow.

---

## Phase 6 — Cart & Checkout Integration

### Goal
Complete the purchase funnel.

### Scope
- Cart drawer.
- Cart item quantity updates.
- Remove item.
- Cart totals.
- Checkout initiation.
- Buy Now integration.
- Order creation/confirmation flow.

### Exit Criteria
A customer can progress from product → cart → checkout without maintaining duplicate cart state.

---

## Phase 7 — Responsive & UX Hardening

### Goal
Polish the entire customer web experience.

### Tasks
- Validate 375px mobile layouts.
- Validate 1280px desktop layouts.
- Check intermediate breakpoints.
- Fix overflow.
- Check image ratios.
- Check skeleton/empty/error states.
- Check keyboard navigation.
- Check touch targets.
- Check loading transitions.

### Exit Criteria
All customer-facing pages are responsive and visually consistent.

---

## Phase 8 — Quality & Release

### Goal
Create a release-ready storefront.

### Required Checks
- TypeScript.
- Linting.
- Production build.
- Route verification.
- Cart flow verification.
- Responsive verification.

### Mandatory Command

```bash
pnpm build
```

### Exit Criteria
Zero TypeScript/linting errors and all sprint acceptance criteria satisfied.
