/**
 * Mock API layer (Phase 1).
 *
 * Every page talks to data through these async functions — never by importing /data directly.
 * In Phase 2, replace each body with a `fetch()` to the real endpoint; the function signatures
 * and return shapes stay the same, so no UI code has to change.
 */
import { products as rawProducts } from '../data/products';
import { productEducation } from '../data/productEducation';
import { categories } from '../data/categories';
import { recipes, recipeCategories } from '../data/recipes';
import { testimonials } from '../data/testimonials';
import { faqs, faqCategories } from '../data/faqs';
import { getDemoReviews } from '../data/reviews';
import { site } from '../config/site';
import { storage } from '../utils/storage';
import { matchesQuery } from '../utils/product';

const LATENCY = 280;

// Catalogue + education content, as one product shape (a real API would return this joined).
const products = rawProducts.map((p) => ({ ...p, ...productEducation[p.id] }));

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const respond = (data, ms = LATENCY) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), ms));

const byId = (list, id, label) => {
  const item = list.find((x) => x.id === id);
  if (!item) throw new NotFoundError(`${label} not found`);
  return item;
};

// ---------- Catalogue ----------

export const getProducts = () => respond(products);

export const getProduct = async (id) => respond(byId(products, id, 'Product'));

export const getProductsByIds = (ids = []) =>
  respond(ids.map((id) => products.find((p) => p.id === id)).filter(Boolean));

export const getCategories = () =>
  respond(categories.map((c) => ({ ...c, productCount: products.filter((p) => p.category === c.id).length })));

export const searchProducts = (query, limit = 6) =>
  respond(products.filter((p) => matchesQuery(p, query)).slice(0, limit), 120);

// ---------- Reviews ----------

export const getReviews = (productId) => {
  const userReviews = storage.get(`reviews_${productId}`, []);
  return respond([...userReviews, ...getDemoReviews(productId)]);
};

export const addReview = (productId, review) => {
  const saved = {
    ...review,
    id: `u-${Date.now()}`,
    productId,
    date: new Date().toISOString(),
    verified: false,
    isDemo: false,
  };
  storage.set(`reviews_${productId}`, [saved, ...storage.get(`reviews_${productId}`, [])]);
  return respond(saved, 500);
};

// ---------- Content ----------

export const getRecipes = () => respond(recipes);
export const getRecipe = async (id) => respond(byId(recipes, id, 'Recipe'));
export const getRecipeCategories = () => respond(recipeCategories, 0);
export const getTestimonials = () => respond(testimonials);
export const getFaqs = () => respond({ categories: faqCategories, faqs });

// ---------- Delivery ----------

export const checkPincode = (pincode) => {
  const prefix = String(pincode).slice(0, 3);
  const zone = site.delivery.zones.find((z) => z.prefixes.includes(prefix));
  return respond(
    zone
      ? { serviceable: true, city: zone.city, eta: 'Next-day delivery available' }
      : { serviceable: false, city: null, eta: null },
    450,
  );
};

// ---------- Orders (stored locally until a real orders API exists) ----------

export const placeOrder = (order) => {
  const id = `MG${Date.now().toString().slice(-8)}`;
  const saved = { ...order, id, status: 'confirmed', placedAt: new Date().toISOString() };
  storage.set('orders', [saved, ...storage.get('orders', [])]);
  return respond(saved, 1200);
};

export const getOrders = () => respond(storage.get('orders', []), 200);

export const getOrder = async (id) => respond(byId(storage.get('orders', []), id, 'Order'), 200);

// ---------- Marketing ----------

export const subscribeNewsletter = (email) => {
  const list = storage.get('newsletter', []);
  if (!list.includes(email)) storage.set('newsletter', [...list, email]);
  return respond({ ok: true }, 600);
};

export const joinSubscriptionWaitlist = (planId, email) => {
  storage.set('waitlist', { planId, email, joinedAt: new Date().toISOString() });
  return respond({ ok: true }, 600);
};

// ---------- Contact form (real delivery via FormSubmit → Gmail) ----------

const CONTACT_TIMEOUT_MS = 30000;
const CONTACT_RETRY_DELAY_MS = 2000;
const ASK_ELSEWHERE = 'Please try again in a minute, or reach us on WhatsApp or email below.';

async function postToFormspree(body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONTACT_TIMEOUT_MS);
  try {
    // FormData + only the safelisted Accept header = a CORS "simple request" (no preflight needed).
    return await fetch(site.contactForm.endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Sends the contact form to Formspree, straight from the browser (Formspree supports CORS).
 * A network hiccup is retried once; every failure becomes a plain-language error.
 */
export async function submitContactForm(values) {
  const body = new FormData();
  body.append('name', values.name);
  body.append('email', values.email); // Formspree uses this as the reply-to address
  body.append('phone', values.phone || '—');
  body.append('topic', values.topic);
  if (values.orderId) body.append('order_id', values.orderId);
  body.append('message', values.message);
  body.append('_subject', `New enquiry (${values.topic}) from ${values.name} — ${site.fullName}`);
  body.append('_gotcha', values._honey || ''); // Formspree's spam trap: bots fill it, people never see it

  let res;
  try {
    try {
      res = await postToFormspree(body);
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      await new Promise((r) => setTimeout(r, CONTACT_RETRY_DELAY_MS));
      res = await postToFormspree(body);
    }
  } catch (err) {
    throw new Error(
      err.name === 'AbortError'
        ? `Our message service is taking too long to respond. ${ASK_ELSEWHERE}`
        : `We couldn't reach our message service. Please check your internet connection. ${ASK_ELSEWHERE}`,
    );
  }

  const data = await res.json().catch(() => ({}));
  if (res.ok && data.ok !== false) return data;

  const detail = (data.errors || []).map((e) => e.message).filter(Boolean).join('. ') || data.error || '';
  if (res.status === 404) throw new Error(`The contact form isn't set up correctly (form not found). ${ASK_ELSEWHERE}`);
  if (res.status === 429) throw new Error(`Too many messages were sent in a short time. ${ASK_ELSEWHERE}`);
  if (res.status === 422 && detail) throw new Error(`Please check your details: ${detail}.`);
  throw new Error(detail ? `${detail}. ${ASK_ELSEWHERE}` : `Our message service is temporarily unavailable. ${ASK_ELSEWHERE}`);
}
