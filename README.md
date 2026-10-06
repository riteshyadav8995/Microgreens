# Mini's Greens — Frontend

This is a responsive D2C website for an Indian microgreens brand. It was built to the *Microgreen India Frontend BRD v1.0* and then updated to the *Awareness-First BRD v2.0*: it teaches first, builds trust, shows everyday usage, recommends products and then enables purchase.
It uses React 19, Vite, React Router 7 and Tailwind CSS v4. Catalogue and education data are local; preferences are stored in the browser. Contact and newsletter signup requests use the configured Formspree service.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build locally
```

## Contact form (Formspree)

The Contact page and footer newsletter form send requests to [Formspree](https://formspree.io) from the browser. Newsletter success means the signup request was accepted by the service; it does not claim a mailing-list subscription was created. Failures preserve the email and allow retry.

- The form endpoint is `https://formspree.io/f/xoevdakp`, built into `src/config/site.js`.
- To use a different form, set `VITE_FORMSPREE_ENDPOINT` to the full URL or just the form ID: in `.env` locally, and in Vercel → Settings → Environment Variables, then redeploy.
- A hidden spam-trap field (`_gotcha`) filters bots. If sending fails, visitors get WhatsApp and email buttons pre-filled with their message.

## Routes

Learn: `/what-are-microgreens` · `/how-we-grow` · `/why-us` · `/how-to-eat` · `/find-my-microgreen`. Navigation, footer and next-step links share this sequence.

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

- With `shop: false`, `/shop` becomes the browse-only "Our Greens" catalogue. Cards show a photo, English product name and nutrient highlights. Details, meal ideas, growing times and enquiry links live on the product page. `/cart`, `/checkout` and `/wishlist` redirect to the home page.
- With `accounts: false`, `/login`, `/register` and `/account` redirect to the home page, and the login icon is hidden.
- With `recipes: false`, `/recipes` pages redirect to the home page, and the Recipes nav link, homepage recipe section, product-page "Recipe ideas" and "See recipes" links are hidden. The recipe data stays in `src/data/recipes.js`.
- Set any switch back to `true` to bring that feature back. All the code is still in place.

## Awareness features (BRD v2)

- **Logo**: a stacked Mini's Greens wordmark with a leaf, shared by the header and footer.
- **Home**: three complete hero slides advance every two seconds, with a 1.5-second content reveal, microgreens photography and pause/play controls. Brief growing and eating sections link to the full guides. SVG growing illustrations replay on re-entry into view.
- **What are microgreens?**: a Seed → Sprout → Microgreen → Mature plant visual, a comparison with sprouts and mature plants, general value with no medical claims, and FAQs.
- **How we grow**: a 9-step interactive timeline. It runs horizontally on desktop and vertically on mobile, every step opens a detail modal, and a Seed → Germination → Growth → Harvest progress bar animates.
  - Each step has its own detailed section, and Daily Monitoring includes a checklist.
  - A table shows the typical harvest time for each variety.
- **How to eat**: 9 everyday Indian use cases (breakfast, salad, dal, roti/wrap, chaat, bowls, smoothie, soup, garnish), a handling guide, and separate raw, warm-food and juice/blend guidance. Live-tray storage differs from cut greens.
- **Product pages**: taste and texture badges, "Best ways to use", suggested meal types, raw/cooked guidance and a variety-specific seed-to-harvest mini timeline.
- **Recipes**: filters for Breakfast, Lunch, Dinner, Salad, Chaat, Wrap, Smoothie and Bowl. Microgreen ingredients link to their product pages, so you can go recipe → product → cart.
- **Find My Microgreen**: taste (Mild/Spicy/Nutty/Earthy/Strong) → use (Salad/Dal/Wrap/Smoothie/Garnish/Bowl) → experience (First time/Sometimes/Regular). It recommends 2–4 products, each with a short reason.

Process and education copy lives in `src/data/content.js` and `src/data/productEducation.js`. Items marked VERIFY need confirming with the business, including the actual cooling and handling steps, raw/cooked guidance and harvest timings.

## Project structure

```
src/
  config/site.js        business settings: contact, delivery zones, coupons, feature flags, form endpoint
  data/                 mock data: products, productEducation, categories, recipes, testimonials, reviews, faqs, content (process, stages, use cases)
  services/api.js       async catalogue API and contact/newsletter request delivery
  context/              Cart, Wishlist, Auth (demo), Toast, QuickView
  hooks/                useAsync, usePageMeta (SEO), useRecentlyViewed, useDialog (a11y modals), …
  utils/                pricing/cart maths, filtering & sorting, validation, formatting, safe storage
  components/           common · navbar · footer · product · cart · recipe · review · home · process · education
  pages/                one folder per route (lazy-loaded except Home)
public/images/          optimised WebP photography (products, recipes, farm, hero)
```

## Moving to a real backend (Phase 2)

Catalogue queries go through `src/services/api.js`; shared editorial content lives in `src/data`. Catalogue functions return promises in the final data shape and can be connected to a backend. Contact/newsletter requests already use the external form service.
Cart lines store a price snapshot and coupon rules live in `utils/cart.js`. Both are marked as the places to move server-side later.

## Content to verify before launch

The BRD requires that no unverified health, organic, sustainability, freshness or delivery claims appear as facts.

- The site is in **demo mode** (`site.demoMode`); ratings, reviews and testimonials remain disabled.
- Measured `nutrition` values are `null`. Nutrient names and source references live in `src/data/productNutrients.js`, shared by cards, detail pages and FAQs. Unknown profiles remain pending. Research highlights are explicitly distinguished from product-specific lab tests.
- Contact details and social links are intentionally placeholders. Delivery settings and policies remain sample configuration for disabled selling features. Growing steps are educational ranges that should be checked against the actual operation before launch.
- About describes the site's purpose rather than a sample founding history or fictional team. Farm statistics use catalogue and guide counts rather than invented business metrics.
- The subscription section is a concept UI. Turn it off with `site.features.subscription`.

## Images

Cards show product photography, English names and nutrient highlights. Product pages contain the full Profile, "Variety details", serving guidance and growing timeline. Hindi search aliases remain in the data but are not displayed as product names.


Photos come from [Unsplash](https://unsplash.com) (free Unsplash License, no attribution required). They were resized to WebP and are served from `public/images`. Replace them with real farm and product photography when it is available.

## Deploy

Deployment is ready for Vercel (`vercel.json`) and Netlify (`public/_redirects`). Both use SPA fallback routing.
