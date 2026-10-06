import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

/** Text logo mark so it inherits the surrounding header/footer background cleanly. */
export function LogoMark({ light = false, className = '' }) {
  const tone = light ? 'text-brand-300' : 'text-brand-900';
  return (
    <span className={`relative inline-flex shrink-0 items-center ${tone} ${className}`} aria-hidden="true">
      <span className="font-display text-[1.65rem] leading-[0.78] font-semibold tracking-normal sm:text-[2rem]">
        <span className="block">mini's</span>
        <span className="block">greens</span>
      </span>
      <Leaf className="absolute -top-1 left-[3.2rem] size-4 rotate-45 fill-current sm:left-[3.85rem] sm:size-5" strokeWidth={1.8} />
    </span>
  );
}

/**
 * Logo link wrapper. Clicking scrolls to top of home page.
 */
export default function Logo({ light = false, className = '' }) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      to="/"
      onClick={handleClick}
      className={`inline-flex min-w-0 shrink-0 items-center ${className}`}
      aria-label="Mini's Greens — Home"
    >
      <LogoMark light={light} />
    </Link>
  );
}
