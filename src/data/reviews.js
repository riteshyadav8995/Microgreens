/**
 * DEMO product reviews (sample content). A future reviews API would return these per product.
 * Each product gets a deterministic subset of this pool so every page has realistic content.
 */

const pool = [
  { name: 'Aarti P.', city: 'Pune', rating: 5, title: 'Fresh and crunchy', body: 'Arrived well packed and chilled. Stayed crisp in the fridge for almost a week.' },
  { name: 'Vikram R.', city: 'Bengaluru', rating: 5, title: 'Now a weekly habit', body: 'I add these to my lunch bowl every day. Much easier than washing and chopping big bunches of greens.' },
  { name: 'Sneha D.', city: 'Mumbai', rating: 4, title: 'Great taste', body: 'Lovely flavour. Would like a bigger pack size option for our family.' },
  { name: 'Imran K.', city: 'Hyderabad', rating: 5, title: 'Kids love it', body: 'My son calls them "baby plants" and asks for them on his sandwich. Win!' },
  { name: 'Lakshmi N.', city: 'Chennai', rating: 4, title: 'Good quality', body: 'Clean, no soil and very little waste. Delivery slot was accurate.' },
  { name: 'Harpreet S.', city: 'Delhi', rating: 5, title: 'Perfect garnish', body: 'Makes simple dal-chawal look and taste special. The ‘How to eat’ page gave me good ideas.' },
  { name: 'Divya M.', city: 'Gurugram', rating: 4, title: 'Nice packaging', body: 'Box is sturdy and the greens were not crushed. Taste is lovely and fresh.' },
  { name: 'Arjun T.', city: 'Pune', rating: 5, title: 'Better than expected', body: 'I was sceptical, but the flavour is much stronger than I expected from such tiny leaves.' },
];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function getDemoReviews(productId) {
  const start = hash(productId) % pool.length;
  const count = 3 + (hash(productId + 'n') % 2);
  return Array.from({ length: count }, (_, i) => {
    const r = pool[(start + i * 3) % pool.length];
    const daysAgo = 3 + ((hash(productId + i) % 60) + i * 7);
    const date = new Date(Date.now() - daysAgo * 86400000).toISOString();
    return { id: `${productId}-r${i}`, productId, ...r, date, verified: true, isDemo: true };
  });
}
