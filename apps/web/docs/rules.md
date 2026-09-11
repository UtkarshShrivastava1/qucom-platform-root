# Viztore — Engineering Rules

## 1. Source of Truth

Before changing a feature:

1. Inspect the existing component.
2. Inspect its hook/API dependency.
3. Inspect the relevant store.
4. Reuse existing patterns before creating new ones.
5. Do not duplicate an existing UI component.

## 2. Component Reuse

Use reusable components from `src/components/ui` whenever an equivalent component already exists.

Current observed reusable components include:

- `Header`
- `Footer`
- `CategoryStrip`
- `PromoCarousel`
- `TrustBar`
- `ProductCard`
- `StoreCard`
- `Skeleton` components

Do not recreate ProductCard, StoreCard, loading skeletons, header, footer or equivalent UI patterns inside individual pages.

## 3. Page Rules

Pages in `src/app` should primarily:

- Compose sections.
- Read route parameters.
- Connect hooks.
- Connect stores.
- Pass data into components.
- Handle page-level loading/empty/error states.

Avoid putting large reusable UI blocks directly inside route files.

## 4. Data Fetching Rules

Use the existing hook/API architecture.

Preferred:

```text
Page → Hook → API module → backend
```

Avoid:

```text
Page → scattered fetch() calls
```

unless there is a documented reason.

## 5. State Rules

### Local state
Use React state for temporary UI state.

Example:

```ts
const [activeCategory, setActiveCategory] = useState('all');
```

### Shared state
Use the appropriate Zustand/client store for state shared across the application.

Known shared stores:

- Location: `location.store.ts`
- Cart: `cart.store.ts`

Do not create a new global store for state that belongs to one component.

## 6. Cart Rules

All Add to Cart behavior must integrate with:

```ts
useCartStore.getState().addItem(...)
```

Do not create a second cart state system.

The cart drawer and cart-related components must remain consistent with the same cart store.

## 7. Responsive Design Rules

Design against the sprint's primary reference widths:

- 375px mobile
- 1280px desktop

Mobile-first behavior should be the default.

Use responsive grid/flex utilities rather than fixed desktop-only dimensions.

Examples specified by the sprint:

```text
Products:
grid-cols-2 → lg:grid-cols-4

Stores:
mobile/horizontal discovery → desktop multi-column presentation

Product Details:
mobile stacked layout → desktop 50/50 split
```

## 8. UI Consistency Rules

Use the existing design tokens/classes and component patterns.

Do not introduce a new color system, spacing system or card style for one page when an existing system is available.

The current implementation uses classes such as:

- `bg-surface-950`
- `text-surface-100`
- `text-brand-400`
- `glass-card`
- `gradient-brand`

Follow the existing visual language.

## 9. Loading States

Every data-driven section should have an intentional loading state where needed.

Existing examples:

- `StoreCardSkeleton`
- `ProductGridSkeleton`

Avoid blank screens while data is loading.

## 10. Empty States

Data-driven sections must handle empty results.

Example already present on Home:

```text
No stores found nearby. Try changing your location.
```

and:

```text
No products available yet. Check back soon!
```

Empty states should explain what happened and, when possible, suggest the next action.

## 11. Navigation Rules

Use Next.js `Link` for internal navigation.

Use route patterns defined by the product requirements:

- `/stores`
- `/stores/[slug]`
- `/category`
- `/category/[slug]`
- `/products/[slug]`

Do not hardcode URLs inconsistently across components.

## 12. TypeScript Rules

- Prefer explicit domain types.
- Avoid `any`.
- Keep API response types separate from UI-specific presentation types when transformation is required.
- Preserve type safety across hooks, API modules and components.

## 13. Accessibility Rules

Interactive elements must:

- Have meaningful accessible names.
- Be keyboard usable.
- Preserve visible focus behavior.
- Use semantic buttons/links.
- Provide appropriate labels for icon-only actions.

Product actions such as wishlist, share, quantity and cart controls must not rely only on visual icons.

## 14. Quality Gate

Before PR submission:

```bash
pnpm build
```

The sprint specification requires zero TypeScript or linting errors.

## 15. Change Discipline

When implementing a feature:

1. Reuse.
2. Extend.
3. Refactor shared logic if necessary.
4. Only create a new abstraction when the existing architecture cannot support the requirement.

Avoid unnecessary rewrites of working modules.
