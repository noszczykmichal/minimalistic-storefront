# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A mock online shop (React 19 + TypeScript, Vite) that reads its catalog from a public GraphQL endpoint (Scandiweb's junior-react-endpoint, hosted at `https://storefront-endpoint.herokuapp.com/graphql`). It is deployed to Firebase Hosting.

## Commands

The package manager is pnpm. CI runs `pnpm install --frozen-lockfile`, so update `pnpm-lock.yaml` whenever you change dependencies.

```sh
pnpm dev                 # Vite dev server on :3000 (same as `pnpm start`)
pnpm build               # tsc type-check, then vite build into build/
pnpm lint                # eslint . (pnpm lint:fix to autofix)
pnpm test                # vitest (watch mode locally, single run in CI)
pnpm test --run          # single run
pnpm test src/components/UI/Button        # run tests matching a path
pnpm test --run -t "accessibility"        # run tests whose name matches
pnpm coverage            # vitest --coverage (v8)
```

CI (`.github/workflows/firebase-hosting.yml`) runs lint → test → build on pushes and PRs to `dev` and `main`. It deploys to Firebase only on a push to `main`.

## Architecture

### Boot sequence (`src/index.tsx`)

`BrowserRouter` → `ApolloProvider` → Redux `Provider` → `PersistGate` → a render-prop `<Query>` that fetches `categories` and `currencies`. `App` mounts only after that query succeeds. `App` then dispatches `uiActions.saveCategoriesAndCurrencies` and builds one route per category: `all` maps to `/`, every other category to `/<name>`, and each renders `PLP`. Cart and checkout routes are fixed paths. **`PDP` is the catch-all `*` route.**

### GraphQL vs. Redux

Only two queries exist, both written inline with `gql` (untyped; `@graphql-codegen` is installed but not configured):

- the bootstrap categories/currencies query in `index.tsx`
- the products-by-category query in `pages/PLP/PLP.tsx`, where the category comes from the URL path

Apollo data is **not** synced to Redux automatically. Components copy what they need into Redux:

- **Product page:** clicking a product (`components/Products/ProductList/Product`) dispatches `onCurrentPDPChange(product)`. `PDP` renders from `state.products.currentPDP` and never queries the API itself. Opening a PDP URL with empty persisted state will fail.
- **Cart totals:** `productsSlice` holds `cart`, `billingCurrency` (a currency _symbol_, e.g. `"$"`), and the derived `productsTotal`/`totalPrice`. Every cart or currency reducer recomputes those totals. Each product carries a `prices[]` array, and the price shown is the entry whose `currency.symbol === billingCurrency`.
- **Cart line identity:** a cart line is identified by `internalID` = product `id` + the concatenated selected attribute values, lowercased. The same product with different options becomes a separate line. Attribute selection is stored as `selected: true` on the chosen `attributes[].items[]` entry.

### Store (`src/store/`)

Three slices are combined and wrapped in `redux-persist` (key `root`, localStorage). The **whole** state is persisted, so any new slice is persisted too.

- `ui`: categories/currencies, plus visibility flags for backdrop, mini-cart, currency switcher, modal and mobile nav
- `products`: currency, current PDP, cart
- `shippingAddressAndPayment`: `draft` holding the checkout form values

Use the typed `useAppDispatch` / `useAppSelector` from `src/hooks/useReduxHooks.ts`.

### Checkout flow

`/cart` → `/cart/shipping/address&payment` (`pages/ShippingForm`: a two-step react-hook-form form validated with zod schemas from `src/utils/form/schemas.ts`; values are saved with `saveDraft`) → `/cart/review` (reads the draft) → `/cart/confirm` (dispatches `clearCart` and `clearShippingAndPaymentData`).

### Conventions

- `@/` is an alias for `src/` (tsconfig `paths` + `vite-tsconfig-paths`).
- Each component lives in its own folder as `Name.tsx` + `Name.module.css` + `Name.test.jsx`.
- SVGs import as React components (default export) via `vite-plugin-svgr`.
- Modals are portaled into `#modals-root` (in `index.html`).
- Prettier formatting: double quotes, trailing commas, 2-space indent, 80 columns. Lint uses Airbnb + typescript-eslint, with `no-param-reassign` relaxed for `state` so Immer-style reducers are allowed.

## Testing

- Vitest with `globals: true` and jsdom. Setup file: `src/vitest.setup.js` (jest-dom matchers + vitest-axe `toHaveNoViolations`). CSS modules resolve through `identity-obj-proxy`, so class names come back as the key strings.
- Tests are `.test.jsx` (plain JSX, not TSX) and sit next to their components. Most include an axe accessibility check.
- Redux in tests uses `redux-mock-store`, not the real store:
  - wrap components in `WithMockStoreAndRouter` (`src/utils/`), which supplies a `Provider` and a `MemoryRouter`
  - `createTestStore()` (`src/utils/testUtils.ts`) returns a mock store with two cart items
  - to assert on dispatches, `vi.mock("@/hooks/useReduxHooks", ...)` and have `useAppDispatch` return a `vi.fn()` (because `vi.mock` is hoisted, test files place it above the imports; `import/first` is disabled for tests)
- Test helper files must be listed in the ESLint `import/no-extraneous-dependencies` allowlist (`eslint.config.js`) before they can import devDependencies.

## Rules

- Always run tests with `pnpm test --run`. Plain `pnpm test` starts watch mode and never exits.
- After any code change, run `pnpm lint` and `pnpm test --run`. Don't call a task done if either fails.
- New tests: `.test.jsx` next to the component, use `WithMockStoreAndRouter`, query by role/label (not class names or test IDs), and include an axe check.
- Don't add or upgrade dependencies without asking first.
- Don't run git commit or push. I review and commit myself.
