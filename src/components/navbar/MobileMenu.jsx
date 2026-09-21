import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Heart, Phone, User } from 'lucide-react';
import Drawer from '../common/Drawer';
import SearchBar from './SearchBar';
import { categories } from '../../data/categories';
import { learnLinks, primaryLinks, secondaryLinks } from './navLinks';
import Icon from '../common/Icon';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { site } from '../../config/site';

const { shop: SHOP, accounts: ACCOUNTS } = site.features;

export default function MobileMenu({ open, onClose }) {
  const [shopOpen, setShopOpen] = useState(false);
  const { user } = useAuth();
  const { count } = useWishlist();

  const linkClass = ({ isActive }) =>
    `flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition ${isActive ? 'bg-brand-50 text-brand-800' : 'text-ink hover:bg-cream-100'}`;

  return (
    <Drawer open={open} onClose={onClose} title="Menu" side="left" width="max-w-sm">
      <div className="space-y-6 p-5">
        <SearchBar onNavigate={onClose} />

        <nav aria-label="Mobile">
          <p className="px-4 pb-2 text-xs font-semibold tracking-wider text-muted uppercase">Learn</p>
          <ul className="mb-4 space-y-1">
            {learnLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} onClick={onClose} className={(s) => `${linkClass(s)} justify-start gap-3`}>
                  <Icon name={l.icon} className="size-5 text-brand-600" />
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="px-4 pb-2 text-xs font-semibold tracking-wider text-muted uppercase">{SHOP ? 'Shop & more' : 'Our greens & more'}</p>
          <ul className="space-y-1">
            <li>
              <div className="flex items-center">
                <NavLink to="/shop" end onClick={onClose} className={(s) => `${linkClass(s)} flex-1`}>
                  {SHOP ? 'Shop all' : 'All our greens'}
                </NavLink>
                <button
                  type="button"
                  onClick={() => setShopOpen((o) => !o)}
                  aria-expanded={shopOpen}
                  aria-label="Toggle shop categories"
                  className="icon-btn"
                >
                  <ChevronDown className={`size-5 transition ${shopOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {shopOpen && (
                <ul className="mt-1 grid grid-cols-2 gap-2 px-2 pb-2">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        to={`/shop?category=${c.id}`}
                        onClick={onClose}
                        className="flex items-center gap-2 rounded-xl border border-line bg-white p-2 text-sm font-medium text-brand-950"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700">
                          <Icon name={c.icon} className="size-4" />
                        </span>
                        <span className="leading-tight">{c.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {primaryLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} onClick={onClose} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            {secondaryLinks
              .filter((l) => l.to === '/faq')
              .map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} onClick={onClose} className={linkClass}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>

        {(ACCOUNTS || SHOP) && (
          <div className="grid grid-cols-2 gap-3">
            {ACCOUNTS && (
              <Link to={user ? '/account' : '/login'} onClick={onClose} className="btn-secondary">
                <User className="size-4" aria-hidden /> {user ? 'Account' : 'Log in'}
              </Link>
            )}
            {SHOP && (
              <Link to="/wishlist" onClick={onClose} className="btn-secondary">
                <Heart className="size-4" aria-hidden /> Wishlist{count ? ` (${count})` : ''}
              </Link>
            )}
          </div>
        )}

        <a href={site.contact.phoneHref} className="flex items-center gap-3 rounded-2xl bg-brand-900 p-4 text-sm text-cream-100">
          <Phone className="size-5 text-brand-300" aria-hidden />
          <span>
            Need help? <span className="font-semibold text-white">{site.contact.phone}</span>
          </span>
        </a>
      </div>
    </Drawer>
  );
}
