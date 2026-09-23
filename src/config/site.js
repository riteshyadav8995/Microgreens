/**
 * Central business configuration.
 * Everything here is a business decision (contact details, delivery rules, coupons, claims),
 * so it lives in one place and never inside reusable components.
 *
 * BRD §4: claims about delivery areas, freshness, sustainability etc. must reflect the real
 * business. Values marked "VERIFY" are sample content — confirm them before launch.
 */

const DEFAULT_FORMSPREE = 'https://formspree.io/f/xoevdakp';

/** Accepts a full Formspree URL or a bare form ID; anything else falls back to the default form. */
function formspreeEndpoint(value) {
  const v = String(value || '').trim();
  if (/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+\/?$/.test(v)) return v.replace(/\/$/, '');
  if (/^[A-Za-z0-9]{6,}$/.test(v)) return `https://formspree.io/f/${v}`;
  return DEFAULT_FORMSPREE;
}

export const site = {
  name: "Mini's Greens",
  fullName: "Mini's Greens",
  tagline: 'Small Greens. Big Nutrition.',
  secondaryTagline: 'From Seed to Your Table.',
  description:
    'Fresh microgreens grown in India for Indian kitchens — broccoli, radish, sunflower, methi, dhania and more, with simple ways to use them in everyday Indian meals.',

  // Shows "sample content" labels on ratings, reviews and testimonials (BRD §7, §16).
  demoMode: true,

  contact: {
    // VERIFY: replace with real business details.
    phone: '+91 98765 43210',
    phoneHref: 'tel:+919876543210',
    whatsappHref: 'https://wa.me/919876543210',
    email: 'hello@microgreen.in',
    address: 'Ramky Selenium, Plot No. 31 & 32, Financial District, Nanakramguda, Gachibowli, Hyderabad, Telangana 500032',
    hours: 'Mon – Sat, 8:00 AM – 7:00 PM',
    mapQuery: 'Ramky Selenium, Financial District, Nanakramguda, Hyderabad, Telangana 500032',
  },

  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },

  delivery: {
    currency: 'INR',
    freeDeliveryThreshold: 499,
    deliveryFee: 49,
    codFee: 0,
    // VERIFY: real serviceable areas. Pincodes are matched by their first 3 digits.
    zones: [
      { city: 'Bengaluru', prefixes: ['560', '562'] },
      { city: 'Mumbai', prefixes: ['400', '401'] },
      { city: 'Pune', prefixes: ['411', '412'] },
      { city: 'Hyderabad', prefixes: ['500', '501'] },
      { city: 'Delhi NCR', prefixes: ['110', '121', '122', '201'] },
      { city: 'Chennai', prefixes: ['600', '601', '603'] },
    ],
    slots: [
      { id: 'morning', label: 'Morning', time: '7:00 AM – 10:00 AM' },
      { id: 'afternoon', label: 'Afternoon', time: '12:00 PM – 3:00 PM' },
      { id: 'evening', label: 'Evening', time: '5:00 PM – 8:00 PM' },
    ],
  },

  // Frontend-only coupon rules (a future API would validate these server-side).
  coupons: [
    { code: 'FRESH10', type: 'percent', value: 10, minOrder: 0, maxDiscount: 150, description: '10% off your order (up to ₹150)' },
    { code: 'WELCOME50', type: 'flat', value: 50, minOrder: 299, description: '₹50 off on orders above ₹299' },
    { code: 'FREEDEL', type: 'delivery', value: 0, minOrder: 199, description: 'Free delivery on orders above ₹199' },
  ],

  features: {
    // Online selling: prices, cart, checkout, wishlist, coupons, delivery checks.
    // Off = awareness-only site; product pages stay as information pages ("Our Greens").
    shop: false,
    // Customer star ratings + product reviews, rating filter and rating-based sorts.
    ratings: false,
    // Home page "What our customers say" section. Keep off until real, approved testimonials exist.
    testimonials: false,
    // Recipe listing and recipe detail pages. Off = no recipe links anywhere.
    recipes: false,
    // Login / register / account pages. Needs `shop` for order history to make sense.
    accounts: false,
    // Subscription concept UI (v1 BRD §7). Not part of the awareness-first home (v2 BRD §13) — enable if planned.
    subscription: false,
  },

  // Contact form → Formspree (https://formspree.io). Messages arrive in the inbox linked to the form.
  // Override with VITE_FORMSPREE_ENDPOINT (full URL like https://formspree.io/f/xoevdakp, or just the form ID).
  contactForm: {
    endpoint: formspreeEndpoint(import.meta.env.VITE_FORMSPREE_ENDPOINT || import.meta.env.VITE_FORMSUBMIT_EMAIL),
    // Used by the "Send by email" button shown if the form can't be sent.
    fallbackEmail: 'rk5061288@gmail.com',
  },
};

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];
