# Tatlows — independent restaurant website concept

React 19, TypeScript, Vite, Tailwind CSS, Motion, Lucide and React Router. Frontend only. No ordering, payment or reservation service exists.

## Preview and build

```sh
npm install
npm run dev
npm run build
npm run preview
```

Open the Local URL printed by Vite. Deploy to Vercel with the Vite preset, `npm run build`, and output directory `dist`. `vercel.json` provides route fallbacks and noindex headers. No environment variables are needed.

## Verification

```sh
npm test
```

Playwright uses installed Google Chrome on Windows. On another system, run `npx playwright install chromium` first. Tests cover routes at six viewport widths, image loading, console exceptions, search, cart persistence and totals, checkout validation, reservation steps, demo reset, weekday previews and Toronto date boundaries. Screenshots are written to `qa/`.

## Editable content and assets

- `src/data/menu.ts`: curated verified menu names/prices, meal category, source links, published options and dietary indicators.
- `src/data/business.ts`: business details, homepage hours, promotion conditions and image manifest.
- `src/styles.css`: visual system and responsive layouts.
- `public/images/`: optimized concept imagery. Run `npm run images` to regenerate WebP variants from source PNGs.

Sources checked October 12, 2026: [homepage](https://tatlows.com/), [brunch](https://tatlows.com/brunch-menu/), [lunch](https://tatlows.com/lunch-menu/), [dinner](https://tatlows.com/dinner-menu/), [features](https://tatlows.com/daily-features/). The homepage opens weekends at 8am; the brunch page says 7:30am. Owner review is required. The standalone dessert page was inaccessible; sweets shown are verified brunch sweets. This is a curated selection, not an exhaustive menu. Pickup eligibility and all time slots are illustrative. Dinner features are not orderable. Seniors' promotions are explicitly dine-in only, Monday–Thursday 3–5:30pm excluding holidays.

Cart lines persist in localStorage. Name, contact and notes remain in component memory. SessionStorage contains only demo completion metadata, not contact details. Footer controls reset cart and reservation states. No credit card fields, API calls or external form submissions exist. Noindex metadata and headers discourage indexing.

## Image provenance

Both photographs were created with the built-in imagegen tool, are labelled as illustrative, and do not depict actual Tatlows dishes or premises. Full generation prompts are in `ASSETS.md`. The user-supplied `Tatlows logo.png` is preserved; the presentation uses an editable typography-based concept wordmark.
