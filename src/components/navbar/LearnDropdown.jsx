import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Icon from '../common/Icon';
import { learnLinks } from './navLinks';

/** Desktop "Learn" menu — the awareness journey is one click away from every page. */
export default function LearnDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeTimer = useRef();
  // Set when the pointer opened the menu, so the following click doesn't immediately close it.
  const hoverOpened = useRef(false);
  const { pathname } = useLocation();
  const active = learnLinks.some((l) => l.to === pathname);

  useEffect(() => setOpen(false), [pathname]);

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

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        clearTimeout(closeTimer.current);
        if (!open) hoverOpened.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => {
          hoverOpened.current = false;
          setOpen(false);
        }, 150);
      }}
    >
      <button
        type="button"
        onClick={() => {
          if (hoverOpened.current) {
            hoverOpened.current = false;
            setOpen(true);
          } else setOpen((o) => !o);
        }}
        aria-expanded={open}
        aria-controls="learn-menu"
        className={`flex items-center gap-1 rounded-full py-2 pr-2 pl-4 text-sm font-medium transition hover:text-brand-700 ${active ? 'text-brand-700' : 'text-ink'}`}
      >
        Learn
        <ChevronDown className={`size-4 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {open && (
        <div id="learn-menu" className="absolute top-full left-0 z-50 w-[420px] pt-3">
          <ul className="animate-fade-in space-y-1 rounded-3xl border border-line bg-white p-3 shadow-soft">
            {learnLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  aria-current={pathname === l.to ? 'page' : undefined}
                  className="group flex items-start gap-3 rounded-2xl p-3 transition hover:bg-cream-100 aria-[current=page]:bg-brand-50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 group-hover:bg-brand-700 group-hover:text-white">
                    <Icon name={l.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-950">{l.label}</span>
                    <span className="block text-xs text-muted">{l.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
