import { Link } from 'react-router-dom';

/**
 * Image-based LogoMark for mini's greens.
 * mix-blend-multiply ensures any tiny background difference disappears.
 */
export function LogoMark({ className = '' }) {
  return (
    <img
      src="/logo.jpeg"
      alt="Mini's Greens Logo"
      className={`block h-[4.5rem] w-auto flex-shrink-0 object-contain mix-blend-multiply ${className}`}
    />
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
      className={`inline-flex min-w-0 shrink-0 items-center -ml-2 ${className}`}
      aria-label="Mini's Greens — Home"
    >
      <LogoMark />
    </Link>
  );
}
