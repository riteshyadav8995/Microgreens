import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { categories } from '../../data/categories';
import { site } from '../../config/site';
import Icon from '../common/Icon';

const LABEL = site.features.shop ? 'Shop' : 'Our Greens';

/** Desktop "Shop" mega-menu. Opens on hover or click; closes on Escape, outside click or navigation. */
export default function ShopDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeTimer = useRef();
  // Set when the pointer opened the menu, so the following click doesn't immediately close it.
  const hoverOpened = useRef(false);
  const { pathname, search } = useLocation();

  useEffect(() => setOpen(false), [pathname, search]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onClick = (e) => !wrapRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const enter = () => {
    clearTimeout(closeTimer.current);
    if (!open) hoverOpened.current = true;
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => {
      hoverOpened.current = false;
      setOpen(false);
    }, 150);
  };
  const onToggle = () => {
    if (hoverOpened.current) {
      hoverOpened.current = false;
      setOpen(true);
    } else setOpen((o) => !o);
  };

  return (
    <div ref={wrapRef} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <div className="flex items-center">
        <NavLink
          to="/shop"
          className={({ isActive }) => `rounded-full py-2 pr-1 pl-4 text-sm font-medium transition hover:text-brand-700 ${isActive ? 'text-brand-700' : 'text-ink'}`}
        >
          {LABEL}
        </NavLink>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls="shop-menu"
          aria-label={`Show ${LABEL} categories`}
          className="grid size-7 place-items-center rounded-full text-ink hover:text-brand-700"
        >
          <ChevronDown className={`size-4 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      </div>

      {open && (
        <div id="shop-menu" className="absolute top-full left-1/2 z-50 w-[680px] -translate-x-1/2 pt-3">
          <div className="grid animate-fade-in grid-cols-[1fr_220px] gap-6 rounded-3xl border border-line bg-white p-6 shadow-soft">
            <ul className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/shop?category=${c.id}`} className="group flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-cream-100">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white">
                      <Icon name={c.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-brand-950 group-hover:text-brand-700">{c.name}</span>
                      <span className="hindi block text-xs text-muted" lang="hi">
                        {c.hindiName}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/shop?category=combos" className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-brand-900 p-4 text-white transition hover:bg-brand-800">
              <Icon name="LayoutGrid" className="mb-auto size-7 text-brand-300" />
              <span className="text-xs font-semibold tracking-wider text-turmeric-400 uppercase">New here?</span>
              <span className="font-display text-lg leading-snug">{site.features.shop ? 'Try the Starter Mix' : 'Explore our combos'}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-white/80">
                {site.features.shop ? 'Shop combos' : 'See combos'} <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
