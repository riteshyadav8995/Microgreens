import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Logo from '../common/Logo';
import AnnouncementBar from './AnnouncementBar';
import ShopDropdown from './ShopDropdown';
import LearnDropdown from './LearnDropdown';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import { primaryLinks } from './navLinks';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { site } from '../../config/site';

const { shop: SHOP, accounts: ACCOUNTS } = site.features;

function CountBadge({ count, pulseKey }) {
  if (!count) return null;
  return (
    <span
      key={pulseKey}
      className="absolute -top-0.5 -right-0.5 grid min-w-[1.15rem] animate-pop place-items-center rounded-full bg-beet-500 px-1 text-[0.65rem] leading-[1.15rem] font-bold text-white"
      aria-hidden
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totals, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();
  const { pathname, search } = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setMenuOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    if (!searchOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setSearchOpen(false);
    const onClick = (e) => !searchRef.current?.contains(e.target) && !e.target.closest('[data-search-toggle]') && setSearchOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [searchOpen]);

  const navLinkClass = ({ isActive }) =>
    `relative rounded-full px-4 py-2 text-sm font-medium transition hover:text-brand-700 ${isActive ? 'text-brand-700 after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand-600' : 'text-ink'}`;

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? 'bg-cream-50/90 shadow-[0_1px_0_var(--color-line),0_8px_24px_-18px_rgb(24_58_36/0.4)] backdrop-blur-md' : 'bg-cream-50'
        }`}
      >
        <div className="container-page flex h-16 items-center gap-2 sm:h-[4.5rem]">
          <button type="button" className="icon-btn -ml-2 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
            <Menu className="size-6" />
          </button>
          <Logo />

          <nav aria-label="Primary" className="mx-auto hidden items-center lg:flex">
            <LearnDropdown />
            <ShopDropdown />
            {primaryLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={navLinkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1 lg:ml-0">
            <button
              type="button"
              data-search-toggle
              className="icon-btn"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label={searchOpen ? 'Close search' : SHOP ? 'Search products' : 'Search microgreens'}
              aria-expanded={searchOpen}
            >
              {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
            </button>
            {SHOP && (
              <Link to="/wishlist" className="icon-btn hidden sm:inline-flex" aria-label={`Wishlist, ${wishCount} items`}>
                <Heart className="size-5" />
                <CountBadge count={wishCount} pulseKey={wishCount} />
              </Link>
            )}
            {ACCOUNTS && (
              <Link to={user ? '/account' : '/login'} className="icon-btn hidden sm:inline-flex" aria-label={user ? `Account: ${user.name}` : 'Log in'}>
                {user ? (
                  <span className="grid size-8 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white">{user.name[0]?.toUpperCase()}</span>
                ) : (
                  <User className="size-5" />
                )}
              </Link>
            )}
            {SHOP && (
              <button type="button" onClick={openDrawer} className="icon-btn" aria-label={`Open cart, ${totals.itemCount} items`}>
                <ShoppingBag className="size-5" />
                <CountBadge count={totals.itemCount} pulseKey={totals.itemCount} />
              </button>
            )}
          </div>
        </div>

        {searchOpen && (
          <div ref={searchRef} className="absolute inset-x-0 top-full animate-fade-in border-t border-line bg-cream-50/95 py-5 shadow-soft backdrop-blur-md">
            <div className="container-page max-w-3xl">
              <SearchBar autoFocus size="lg" onNavigate={() => setSearchOpen(false)} />
            </div>
          </div>
        )}
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
