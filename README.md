# Classic Engineering

Preliminary frontend for a **vintage Cadillac parts catalog** covering model years **1959–1963 only**. The UI follows a dense, utilitarian catalog layout (hierarchical left nav, compact parts tables, search, cart) with original Classic Engineering branding.

This is a handoff-ready Next.js app: mock data and client-side cart only. Database, payments, auth, and deployment are intentionally out of scope for this phase.

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

## What works today

- Catalog drill-down: **Year → Model → Engine → Category → parts table** (query params on `/`)
- Part number / keyword search at `/search?q=`
- Client-side cart with **localStorage** persistence (`/cart` + Quick Cart on wide screens)
- About, Privacy (placeholder), Contact (mailto + disabled form UI)
- Scope messaging: Classic Engineering / 1959–1963 Cadillacs only

## Project structure

```
src/
  app/                 # Routes (/, /search, /cart, /about, /privacy, /contact)
  components/          # Header, catalog nav, parts table, cart UI
  context/             # CartProvider (localStorage)
  data/                # Typed mock catalog + helpers (swap for API later)
  lib/                 # Small utilities (price format, catalog URLs)
```

### Mock data

| Path | Purpose |
|------|---------|
| `src/data/types.ts` | `VehicleYear`, `Model`, `Engine`, `Category`, `Part`, `CartItem` |
| `src/data/catalog.ts` | Years, models, engines, categories |
| `src/data/parts.ts` | Sample SKUs (~60+) |
| `src/data/index.ts` | `getYears`, `getModels`, `getEngines`, `getCategories`, `getParts`, `searchParts`, … |

Catalog selection uses query params, e.g.:

`/?year=1960&model=deville&engine=390-4bbl&category=brake-wheel-hub`

## Next steps for developers

1. **Replace mock data with a database**  
   Keep the helper signatures in `src/data/index.ts` (or turn them into server-side repository functions) and back them with Postgres/SQLite/etc. UI components should keep calling the same shapes (`Part`, `CartItem`, …).

2. **Real inventory & pricing**  
   Sync stock levels, supersessions, and live prices. Add “out of stock” / lead-time fields to `Part` and surface them in `PartsTable`.

3. **Auth & accounts**  
   Add sign-in, saved vehicles, and order history. Do not put secrets in the client; use Next.js route handlers or a BFF.

4. **Checkout & shipping**  
   Enable the Checkout button with a payment provider (e.g. Stripe), tax, and shipping rates. Persist orders server-side; stop relying on localStorage as the source of truth.

5. **Admin for parts**  
   Build an internal UI or CMS to create/edit SKUs, fitment (year/model/engine), and categories without deploying code.

6. **Contact & email**  
   Wire `/contact` to an email API or ticket system; replace the placeholder Privacy policy.

7. **Deploy**  
   A straightforward option is [Vercel](https://vercel.com/) (`vercel` CLI or Git integration). Set env vars for DB/payments when those are added. No special deployment config is required beyond standard Next.js.

## Notes

- Branding and part data are original / fictional for demo purposes — not scraped from any third-party catalog.
- Desktop-first density; layout remains usable on smaller screens (nav stacks, tables scroll horizontally).
