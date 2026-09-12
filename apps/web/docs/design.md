# Viztore — Design System & UI Direction

## 1. Design Objective

The storefront should feel like a modern local-commerce marketplace: visual, fast to scan, product-focused and optimized for mobile while expanding naturally into desktop layouts.

The supplied sprint brief uses mobile reference designs at 375px and desktop layouts at 1280px.

## 2. Global Layout

Current Home implementation establishes:

```text
Page
├── Header
├── Main
│   ├── Category navigation
│   ├── Promotional content
│   ├── Trust/service content
│   ├── Store discovery
│   ├── Product discovery
│   └── CTA
└── Footer
```

The Home page currently uses a centered max-width content container with responsive horizontal padding and vertical section spacing.

## 3. Visual Language

The current implementation visibly uses a dark surface-based visual system.

Observed examples:

```text
bg-surface-950
text-surface-100
text-surface-500
text-brand-400
gradient-brand
glass-card
```

These should be treated as existing design tokens rather than replaced with page-specific colors.

## 4. Typography

Hierarchy should be clear:

### Page title
Strong, high-contrast heading.

### Section title
Compact bold heading paired with an optional contextual icon.

### Supporting text
Lower contrast and smaller size.

### Product/store metadata
Compact text optimized for scanning.

### Price
High visual priority.

### Discount
Compact badge with clear savings information.

## 5. Cards

### Store Card
Should communicate quickly:

- Store image
- Store name
- Rating
- Category
- Delivery/ETA information

The sprint specifically calls for local store cards with storefront imagery, ratings and fast-delivery indicators.

### Product Card
Should communicate:

- Product image
- Discount badge
- Wishlist action
- Product title
- Price
- Original price
- Rating
- Store tag

Use one reusable ProductCard rather than creating page-specific variants unless a real requirement demands a variant.

## 6. Responsive Grid

### Product Grid

Mobile:

```text
2 columns
```

Desktop:

```text
4 columns
```

The existing Home implementation demonstrates:

```text
grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
```

### Store Discovery

The Home implementation currently uses a horizontally scrollable store row. The sprint brief additionally specifies multi-column desktop behavior for the broader responsive design.

Do not remove the intentional mobile browsing behavior just to force a desktop grid.

## 7. Product Detail Design

Desktop target:

```text
┌───────────────────────┬───────────────────────┐
│                       │ Product title         │
│ Image gallery         │ Price / discount      │
│                       │ Rating                │
│                       │ Size                  │
│                       │ Color                 │
│                       │ Quantity              │
│                       │ Trust badges           │
│                       │ Add to Cart / Buy Now  │
└───────────────────────┴───────────────────────┘
       ~50%                     ~50%
```

Mobile should stack these areas vertically while keeping purchase actions easy to reach.

## 8. Category Design

Desktop:

```text
┌──────────────┬────────────────────────────────┐
│ Main         │ Category banner                │
│ categories   │                                │
│              │ Subcategory visual groups      │
│  ~25%        │ ~75%                            │
└──────────────┴────────────────────────────────┘
```

Subcategories should use circular visual imagery where specified by the sprint design.

## 9. Interaction Patterns

### Navigation
Use obvious links and directional affordances.

### Filters
Use compact pills/dropdowns depending on available space.

### Quantity
Use a clear `- 1 +` stepper.

### Wishlist / Share
Icon-based actions must have accessible labels.

### CTA
Primary actions should be visually prominent without competing with product information.

## 10. Loading UX

Use skeleton components that preserve the approximate dimensions of the content being loaded.

Existing project patterns include:

- `StoreCardSkeleton`
- `ProductGridSkeleton`

## 11. Empty UX

Empty states should be calm and informative.

Examples from the current Home page:

- No nearby stores → suggest changing location.
- No products → suggest checking back later.

## 12. Visual Consistency Rules

Do:

- Reuse existing tokens.
- Reuse existing cards.
- Keep spacing consistent.
- Preserve image aspect ratios.
- Use responsive utilities.
- Keep actions predictable.

Do not:

- Introduce arbitrary colors.
- Create one-off card designs.
- Use fixed widths that break mobile.
- Mix unrelated visual styles.
- Hide important purchase information on smaller screens.
