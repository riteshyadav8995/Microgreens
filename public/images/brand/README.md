# Mini's Greens logo

Source: `logo.jpeg`, the artwork supplied by the user, retained unchanged.

Shared application asset: `logo-transparent.png` (1672 × 941, RGBA PNG).

The background was removed with the built-in imagegen tool in edit mode. The navbar, footer and auth layout share this PNG through `Logo.jsx`. Display size changes only; no filters, background plates or alternate colour variants are applied. The main footer uses the navbar's cream background to keep the original green artwork readable. The browser tab uses the separate sprout icon selected by the user in `public/favicon-sprout.svg`; its new URL refreshes the previous wordmark favicon in browser caches. `public/favicon.svg` contains the same sprout as a legacy fallback.

## Final edit prompt

Use case: background-extraction.
Asset type: exact existing Mini's Greens brand logo, used in a website navbar, footer and browser favicon.
Input image 1 is the EDIT TARGET, not a design reference.
Primary request: remove ONLY the pale beige/cream background and return a true transparent PNG with an alpha channel.
Preserve the supplied artwork exactly: same stacked lettering "mini’s" above "greens", same distinctive letter contours, original apostrophe, same green two-leaf sprout and stem above the second i, same dark-green ink colours and subtle natural texture. Do not redraw, restyle, replace the font, simplify, sharpen into a new design, recolour, add outlines or invent a different logo.
Remove beige everywhere, including between the letters and inside letter counters, without removing any green ink or leaf pixels. Avoid beige halos.
Keep the original 1280 × 720 canvas, exact original artwork position, scale, proportions and alignment. Transparent empty margins are fine. No baked-in checkerboard, white background, shadow, border or card. Change only the background to actual transparency.

The tool returned a larger canvas; the shared component frames the visible artwork using its actual output dimensions.
