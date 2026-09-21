import { Link } from 'react-router-dom';

/**
 * Seed-to-leaf mark (Awareness BRD §4): a seed at the base, a young stem and the first two
 * leaves opening — the exact stage at which microgreens are harvested.
 */
export function LogoMark({ className = 'size-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="12" className="fill-brand-700" />
      {/* roots */}
      <path d="M18.4 33.2l-1.6 2.3M21.6 33.2l1.6 2.3M20 33.6v2.4" stroke="#b3dcb9" strokeWidth="1" strokeLinecap="round" opacity=".7" />
      {/* seed */}
      <ellipse cx="20" cy="31" rx="4.6" ry="2.9" fill="#e6d5ad" />
      <path d="M16.6 30.6c1.9.9 4.9.9 6.8 0" stroke="#c9b27f" strokeWidth=".8" fill="none" strokeLinecap="round" />
      {/* stem */}
      <path d="M20 29V17.5" stroke="#f9f4e8" strokeWidth="2.3" strokeLinecap="round" />
      {/* first two leaves (cotyledons) */}
      <path d="M20 18.4c0-5.2 3.4-8.5 9-8.5 0 5.2-3.4 8.5-9 8.5Z" fill="#84c290" />
      <path d="M20 20.6c0-4.6-3-7.5-8-7.5 0 4.6 3 7.5 8 7.5Z" fill="#f9f4e8" />
    </svg>
  );
}

/** Mark + wordmark. `light` for dark backgrounds (footer). */
export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Microgreen India — from seed to table, home">
      <LogoMark className="size-10 transition-transform duration-300 group-hover:-rotate-6" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.35rem] font-semibold tracking-tight ${light ? 'text-cream-50' : 'text-brand-900'}`}>
          microgreen
        </span>
        <span className={`mt-1 text-[0.55rem] font-semibold tracking-[0.2em] uppercase ${light ? 'text-brand-300' : 'text-brand-600'}`}>
          Seed to table · India
        </span>
      </span>
    </Link>
  );
}
