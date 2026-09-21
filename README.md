# Microgreen India — Frontend (Phase 1)

This is a responsive D2C website for an Indian microgreens brand. It was built to the *Microgreen India Frontend BRD v1.0* and then updated to the *Awareness-First BRD v2.0*: it teaches first, builds trust, shows everyday usage, recommends products and then enables purchase.
It uses React 19, Vite, React Router 7 and Tailwind CSS v4. All data is mock data kept in browser state and localStorage. There is no backend.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build locally
```

## Contact form (FormSubmit → Gmail)

The Contact page sends messages to a Gmail inbox through [FormSubmit](https://formsubmit.co). FormSubmit is free, needs no signup and needs no backend.

1. Messages go to **rk5061288@gmail.com** by default (set in `src/config/site.js`). To use another inbox, set `VITE_FORMSUBMIT_EMAIL` in a `.env` file.
2. Restart `npm run dev`, then send one test message from `/contact`.
3. FormSubmit emails that inbox an **activation link**. Click it once. Every message after that arrives in Gmail.
4. Optional: FormSubmit then gives you a random alias. You can use the alias in place of the raw email so the address isn't visible in the page source.

If FormSubmit is slow (it can take up to a minute) the form tells visitors to keep the page open. It gives up after 60 seconds, and any failure shows WhatsApp and email buttons pre-filled with the visitor's message.

When deploying, set the same variable in the Vercel or Netlify environment settings. Until it is set, the form shows a friendly "not configured" message.

## Routes

Learn: `/what-are-microgreens` · `/how-we-grow` · `/how-to-eat` · `/find-my-microgreen`

Shop & more: `/` · `/shop` · `/product/:id` · `/cart` · `/checkout` · `/checkout/success/:orderId` · `/our-farm` · `/why-us` · `/recipes` · `/recipes/:id` · `/about` · `/contact` · `/faq` · `/wishlist` · `/login` · `/register` · `/account` · 404

## Shop and login are switched off (for now)

The site currently runs as an **awareness-only** website. Two switches in `src/config/site.js` control this:

```js
features: {
  shop: false,      // prices, cart, checkout, wishlist, coupons, delivery checks
  ratings: false,   // star ratings, product reviews, rating filter, top-rated sort
  testimonials: false, // home page "What our customers say" (sample quotes)
  recipes: false,   // recipe listing + recipe pages, and every link to them
  accounts: false,  // login, register, my account
}
```

- With `shop: false`, `/shop` becomes a browse-only "Our greens" catalogue, and product pages become info pages (taste, how to use, growing time) with a "coming soon" note. `/cart`, `/checkout` and `/wishlist` redirect to the home page.
- With `accounts: false`, `/login`, `/register` and `/account` redirect to the home page, and the login icon is hidden.
- With `recipes: false`, `/recipes` pages redirect to the home page, and the Recipes nav link, homepage recipe section, product-page "Recipe ideas" and "See recipes" links are hidden. The recipe data stays in `src/data/recipes.js`.
- Set any switch back to `true` to bring that feature back. All the code is still in place.

## Awareness features (BRD v2)

- **Logo**: a seed-to-leaf mark (seed → stem → first two leaves, the stage at which microgreens are harvested), with the line "Seed to table · India".
- **What are microgreens?**: a Seed → Sprout → Microgreen → Mature plant visual, a comparison with sprouts and mature plants, general value with no medical claims, and FAQs.
- **How we grow**: a 9-step interactive timeline. It runs horizontally on desktop and vertically on mobile, every step opens a detail modal, and a Seed → Germination → Growth → Harvest progress bar animates.
  - Each step has its own detailed section, and Daily Monitoring includes a checklist.
  - A table shows the typical harvest time for each variety.
- **How to eat**: 9 everyday Indian use cases (breakfast, salad, dal, roti/wrap, chaat, bowls, smoothie, soup, garnish). Each lists suitable varieties with links, a handling and washing guide, and which varieties are raw-only vs raw-or-warm.
- **Product pages**: taste and texture badges, "Best ways to use", suggested meal types, raw/cooked guidance and a variety-specific seed-to-harvest mini timeline.
- **Recipes**: filters for Breakfast, Lunch, Dinner, Salad, Chaat, Wrap, Smoothie and Bowl. Microgreen ingredients link to their product pages, so you can go recipe → product → cart.
- **Find My Microgreen**: taste (Mild/Spicy/Nutty/Earthy/Strong) → use (Salad/Dal/Wrap/Smoothie/Garnish/Bowl) → experience (First time/Sometimes/Regular). It recommends 2–4 products, each with a short reason.

Process and education copy lives in `src/data/content.js` and `src/data/productEducation.js`. Items marked VERIFY need confirming with the business, including the actual cooling and handling steps, raw/cooked guidance and harvest timings.

## Project structure

```
src/
  config/site.js        business settings: contact, delivery zones, coupons, feature flags, form endpoint
  data/                 mock data: products, productEducation, categories, recipes, testimonials, reviews, faqs, content (process, stages, use cases)
  services/api.js       async mock API: the ONLY place pages get data from
  context/              Cart, Wishlist, Auth (demo), Toast, QuickView
  hooks/                useAsync, usePageMeta (SEO), useRecentlyViewed, useDialog (a11y modals), …
  utils/                pricing/cart maths, filtering & sorting, validation, formatting, safe storage
  components/           common · navbar · footer · product · cart · recipe · review · home · process · education
  pages/                one folder per route (lazy-loaded except Home)
public/images/          optimised WebP photography (products, recipes, farm, hero)
```

## Moving to a real backend (Phase 2)

Pages never import `src/data` directly. They go through `src/services/api.js`.
Each function there already returns a Promise in the final data shape. To connect a backend, replace each function body with a `fetch()` call. No component has to change.
Cart lines store a price snapshot and coupon rules live in `utils/cart.js`. Both are marked as the places to move server-side later.

## Content to verify before launch

The BRD requires that no unverified health, organic, sustainability, freshness or delivery claims appear as facts.

- The site is in **demo mode** (`site.demoMode`). Ratings, reviews and testimonials are labelled as sample content. The footer carries a Phase 1 notice.
- `nutrition` is `null` for every product, so the UI shows "published once verified by lab testing".
- Anything marked `VERIFY` in `config/site.js`, `data/content.js` and `data/faqs.js` still needs confirming with the business. This covers contact details, delivery cities and pincodes, farm stats, the founding story, the team and policies.
- The subscription section is a concept UI. Turn it off with `site.features.subscription`.

## Images

Products are shown **without photos** for now (text catalogue in the style of a seed catalogue). Each product card shows its category, name, Hindi and botanical name, flavour and grow time. Each product page has a Profile and a "Variety details" list. When real product photography is ready, the photo paths are still in `src/data/products.js` (`images`).


Photos come from [Unsplash](https://unsplash.com) (free Unsplash License, no attribution required). They were resized to WebP and are served from `public/images`. Replace them with real farm and product photography when it is available.

## Deploy

Deployment is ready for Vercel (`vercel.json`) and Netlify (`public/_redirects`). Both use SPA fallback routing.
