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

const CONTACT_TIMEOUT_MS = 60000;

/**
 * Sends the contact form through FormSubmit. The free service can be slow (we measured ~45 s)
 * or briefly unreachable, so requests time out and every failure becomes a plain-language error.
 */
export async function submitContactForm(values) {
  const target = site.contactForm.email;
  if (!target) {
    throw new Error(
      'The contact form is not configured yet. Add VITE_FORMSUBMIT_EMAIL to your .env file (see .env.example).',
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONTACT_TIMEOUT_MS);
  let res;
  try {
    res = await fetch(site.contactForm.endpoint(target), {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone || '—',
        topic: values.topic,
        order_id: values.orderId || '—',
        message: values.message,
        _subject: `New enquiry (${values.topic}) from ${values.name} — ${site.fullName}`,
        _replyto: values.email,
        _template: 'table',
        _captcha: 'false',
        _honey: values._honey || '',
      }),
    });
  } catch (err) {
    throw new Error(
      err.name === 'AbortError'
        ? 'Our message service is taking too long to respond. Please try again in a few minutes, or reach us on WhatsApp or email below.'
        : "We couldn't reach our message service. Please check your internet connection and try again, or reach us on WhatsApp or email below.",
    );
  } finally {
    clearTimeout(timer);
  }

  const data = await res.json().catch(() => ({}));
  if (res.ok && String(data.success) === 'true') return data;

  if (/activat/i.test(data.message || '')) {
    throw new Error(
      "This contact form hasn't been activated yet. The site owner needs to click the “Activate Form” link that FormSubmit emailed to them. Until then, please reach us on WhatsApp or email below.",
    );
  }
  throw new Error(
    res.status >= 500 || !data.message
      ? 'Our message service is temporarily unavailable. Please try again in a few minutes, or reach us on WhatsApp or email below.'
      : data.message,
  );
}
