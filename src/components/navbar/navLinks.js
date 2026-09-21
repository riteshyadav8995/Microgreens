import { site } from '../../config/site';

export const learnLinks = [
  { to: '/what-are-microgreens', label: 'What are microgreens?', description: 'Seed → sprout → microgreen, explained simply', icon: 'Sprout' },
  { to: '/how-we-grow', label: 'How we grow', description: 'All 9 steps from seed to your table', icon: 'Sun' },
  { to: '/how-to-eat', label: 'How to eat them', description: 'Everyday Indian meals, washing & storage', icon: 'ChefHat' },
  { to: '/find-my-microgreen', label: 'Find my microgreen', description: 'A 3-question quiz to find your match', icon: 'Sparkles' },
  { to: '/why-us', label: 'Why Microgreen', description: 'Freshness, quality and honest information', icon: 'BadgeCheck' },
];

export const primaryLinks = [
  ...(site.features.recipes ? [{ to: '/recipes', label: 'Recipes' }] : []),
  { to: '/our-farm', label: 'Our Farm' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export const secondaryLinks = [
  { to: '/faq', label: 'FAQs' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/cart', label: 'Cart' },
];
