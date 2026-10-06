import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '../common/Logo';
import NewsletterForm from '../common/NewsletterForm';
import SocialIcon from '../common/SocialIcons';
import { categories } from '../../data/categories';
import { site } from '../../config/site';
import { learnLinks } from '../navbar/navLinks';
import Reveal from '../common/Reveal';

const SHOP = site.features.shop;

const columns = [
  {
    title: SHOP ? 'Shop' : 'Our Greens',
    links: [{ to: '/shop', label: SHOP ? 'All products' : 'All microgreens' }, ...categories.map((c) => ({ to: `/shop?category=${c.id}`, label: c.name }))],
  },
  {
    title: 'Learn',
    links: [
      ...learnLinks,
      ...(site.features.recipes ? [{ to: '/recipes', label: 'Recipes' }] : []),
    ],
  },
  {
    title: 'Company & help',
    links: [
      { to: '/our-farm', label: 'Our Farm' },
      { to: '/about', label: 'About Us' },
      { to: '/contact', label: 'Contact us' },
      { to: '/faq', label: 'FAQs' },
      ...(site.features.accounts ? [{ to: '/account', label: 'My orders' }] : []),
      ...(SHOP ? [{ to: '/wishlist', label: 'Wishlist' }] : []),
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-950 text-cream-100">
      <section aria-labelledby="newsletter-title" className="border-b border-white/10">
        <div className="container-page grid grid-cols-1 items-center gap-6 py-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="min-w-0">
            <h2 id="newsletter-title" className="text-3xl text-white sm:text-4xl">
              Join the <em className="text-brand-300">{site.name} kitchen</em>
            </h2>
            <p className="mt-3 text-cream-100/70">Simple meal ideas, microgreens tips and news from {site.name}.</p>
          </Reveal>
          <NewsletterForm dark className="min-w-0 w-full max-w-xl lg:justify-self-end" />
        </div>
      </section>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.8fr_2fr] lg:py-20 xl:grid-cols-[0.8fr_3fr]">
        <Reveal className="min-w-0 max-w-sm">
          <Logo light />
          <p className="mt-5 font-display text-2xl leading-snug text-white">{site.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream-100/70">
            Fresh microgreens grown in India for Indian kitchens — from our farm to your table.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              ['instagram', site.social.instagram, 'Instagram'],
              ['facebook', site.social.facebook, 'Facebook'],
              ['youtube', site.social.youtube, 'YouTube'],
              ['whatsapp', site.contact.whatsappHref, 'WhatsApp'],
            ].map(([icon, href, label]) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${label} (opens in a new tab)`}
                className="grid size-10 place-items-center rounded-full bg-white/10 text-cream-100 transition hover:bg-turmeric-400 hover:text-brand-950"
              >
                <SocialIcon name={icon} />
              </a>
            ))}
          </div>
        </Reveal>

        <div className="grid min-w-0 gap-8 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_0.8fr_1.4fr]">
          {columns.map((col) => (
            <nav key={col.title} aria-label={`Footer ${col.title}`}>
              <h2 className="font-sans text-sm font-semibold tracking-wider text-brand-300 uppercase">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-cream-100/75 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="font-sans text-sm font-semibold tracking-wider text-brand-300 uppercase">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-sm text-cream-100/75">
              <li>
                <a href={site.contact.phoneHref} className="flex gap-2.5 hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden /> {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex gap-2.5 break-all hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden /> {site.contact.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden /> {site.contact.address}
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden /> {site.contact.hours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-cream-100/55 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.fullName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
