import { Link } from 'react-router-dom';
import './Logo.css';

/** One shared artwork; size changes only its display dimensions. */
export function LogoMark({ size = 'default', className = '' }) {
  return (
    <span className={`brand-logo ${size === 'large' ? 'brand-logo--large' : ''} ${className}`} aria-hidden="true">
      <img
        src="/images/brand/logo-transparent.png"
        alt=""
        width="1672"
        height="941"
        decoding="async"
        draggable="false"
      />
    </span>
  );
}

/**
 * Logo link wrapper. Clicking scrolls to top of home page.
 */
export default function Logo({ size = 'default', className = '' }) {
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
      <LogoMark size={size} />
    </Link>
  );
}
