export const effectivePrice = (variant) => variant?.salePrice ?? variant?.price ?? 0;

export const getDefaultVariant = (product) => product?.variants?.[0];

export const getVariant = (product, variantId) =>
  product?.variants?.find((v) => v.id === variantId) ?? getDefaultVariant(product);

/** Lowest price across variants — used for price filters and sorting. */
export const getFromPrice = (product) => Math.min(...product.variants.map(effectivePrice));

export const discountPercent = (variant) =>
  variant?.salePrice && variant.salePrice < variant.price
    ? Math.round(((variant.price - variant.salePrice) / variant.price) * 100)
    : 0;

export const isOnSale = (product) => product.variants.some((v) => discountPercent(v) > 0);

export const isInStock = (product) => product.availability !== 'out_of_stock';

export const AVAILABILITY = {
  in_stock: { label: 'In stock', tone: 'text-brand-700' },
  low_stock: { label: 'Only a few left', tone: 'text-turmeric-700' },
  out_of_stock: { label: 'Out of stock', tone: 'text-red-600' },
};

const normalise = (s) => (s || '').toLowerCase().normalize('NFKD');

/** Matches English name, Hindi name, category, taste, uses and tags. */
export const matchesQuery = (product, query) => {
  const q = normalise(query).trim();
  if (!q) return true;
  const haystack = normalise(
    [
      product.name,
      product.hindiName,
      product.category,
      product.taste,
      product.shortDescription,
      ...(product.uses || []),
      ...(product.tags || []),
      ...(product.ingredients || []),
    ].join(' '),
  );
  return q.split(/\s+/).every((word) => haystack.includes(word));
};

export const PRICE_RANGES = [
  { id: 'under-150', label: 'Under ₹150', min: 0, max: 149 },
  { id: '150-250', label: '₹150 – ₹250', min: 150, max: 250 },
  { id: '250-350', label: '₹250 – ₹350', min: 251, max: 350 },
  { id: 'above-350', label: 'Above ₹350', min: 351, max: Infinity },
];

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'best-selling', label: 'Best selling' },
  { id: 'rating', label: 'Top rated' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'newest', label: 'Newest' },
  { id: 'name', label: 'Name: A – Z' },
];

/**
 * Pure filter + sort over the catalogue. Filters are the same shape as Shop's URL params,
 * so a future API could accept them as query params unchanged.
 */
export function filterAndSortProducts(products, filters = {}) {
  const { q = '', categories = [], price = '', minRating = 0, tastes = [], inStock = false, onSale = false, sort = 'featured' } = filters;
  const range = PRICE_RANGES.find((r) => r.id === price);

  const result = products.filter((p) => {
    if (!matchesQuery(p, q)) return false;
    if (categories.length && !categories.includes(p.category)) return false;
    if (range) {
      const from = getFromPrice(p);
      if (from < range.min || from > range.max) return false;
    }
    if (minRating && p.rating < minRating) return false;
    if (tastes.length && !tastes.some((t) => p.tasteProfile.includes(t))) return false;
    if (inStock && !isInStock(p)) return false;
    if (onSale && !isOnSale(p)) return false;
    return true;
  });

  const sorters = {
    featured: (a, b) =>
      Number(b.tags.includes('best-seller')) - Number(a.tags.includes('best-seller')) || b.reviewCount - a.reviewCount,
    'best-selling': (a, b) => b.reviewCount - a.reviewCount,
    rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
    'price-asc': (a, b) => getFromPrice(a) - getFromPrice(b),
    'price-desc': (a, b) => getFromPrice(b) - getFromPrice(a),
    newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    name: (a, b) => a.name.localeCompare(b.name),
  };
  // Out-of-stock items always sink to the bottom, whatever the sort.
  return [...result].sort(
    (a, b) => Number(!isInStock(a)) - Number(!isInStock(b)) || (sorters[sort] || sorters.featured)(a, b),
  );
}

/**
 * "Find My Microgreen" rules (Awareness BRD §12). Quiz answers map onto catalogue fields:
 * taste → tasteProfile, use → useTags. Pure mock rules — no backend.
 */
const QUIZ_TASTE = {
  mild: { match: ['mild'], label: 'mild, fresh taste' },
  spicy: { match: ['peppery'], label: 'spicy kick' },
  nutty: { match: ['nutty'], label: 'nutty, crunchy bite' },
  earthy: { match: ['earthy'], label: 'earthy flavour' },
  strong: { match: ['herby', 'peppery', 'earthy'], label: 'strong, bold flavour' },
};
const QUIZ_USE = {
  salad: { match: ['salads'], label: 'salads' },
  dal: { match: ['indian'], label: 'dal and Indian meals' },
  wrap: { match: ['sandwiches'], label: 'rotis and wraps' },
  smoothie: { match: ['smoothies'], label: 'smoothies' },
  garnish: { match: ['garnish'], label: 'garnishing' },
  bowl: { match: ['salads', 'indian'], label: 'rice and grain bowls' },
};

/** Returns 2–4 `{ product, reason }` recommendations. */
export function recommendProducts(products, { taste, use, level }, limit = 4) {
  const t = QUIZ_TASTE[taste];
  const u = QUIZ_USE[use];
  const scored = products
    .filter(isInStock)
    .map((p) => {
      let score = p.rating / 10;
      const reasons = [];
      const tasteHit = t && p.tasteProfile.some((x) => t.match.includes(x));
      const useHit = u && p.useTags.some((x) => u.match.includes(x));
      if (tasteHit) {
        score += t.match.includes(p.tasteProfile[0]) ? 5 : 3;
        reasons.push(`Matches your love of a ${t.label}`);
      }
      if (useHit) {
        score += 4;
        reasons.push(`great for ${u.label}`);
      }
      if (level === 'first' && (p.tags.includes('beginner-friendly') || p.category === 'combos')) {
        score += 2;
        reasons.push('an easy first pick');
      }
      if (level === 'regular' && (p.category === 'herbs' || p.category === 'indian' || p.id === 'chefs-mix')) {
        score += 1.5;
        reasons.push('something new to explore');
      }
      const reason = reasons.length ? reasons.join(', ').replace(/^./, (c) => c.toUpperCase()) + '.' : p.shortDescription;
      return { product: p, score, reason, relevant: tasteHit || useHit };
    })
    .sort((a, b) => b.score - a.score);
  const relevant = scored.filter((r) => r.relevant);
  const count = Math.max(2, Math.min(limit, relevant.length));
  return scored.slice(0, count).map(({ product, reason }) => ({ product, reason }));
}
