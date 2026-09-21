import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { usePageMeta } from '../../hooks/usePageMeta';
import SearchBar from '../../components/navbar/SearchBar';

export default function NotFound() {
  usePageMeta('Page not found');
  return (
    <div className="container-page flex flex-col items-center py-20 text-center sm:py-28">
      <svg viewBox="0 0 120 120" className="size-32 animate-sway text-brand-500" aria-hidden>
        <path d="M60 110V62" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 66c0-20 13-33 34-33 0 20-13 33-34 33Z" fill="currentColor" />
        <path d="M60 76c0-17-11-28-29-28 0 17 11 28 29 28Z" fill="currentColor" opacity=".5" />
        <ellipse cx="60" cy="112" rx="30" ry="5" className="fill-cream-300" />
      </svg>
      <p className="eyebrow mt-6">Error 404</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">This page hasn't sprouted yet</h1>
      <p className="mt-4 max-w-md text-lg text-muted">The page you're looking for doesn't exist or has moved. Try searching for a product instead.</p>
      <SearchBar className="mt-8 w-full max-w-md text-left" />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/shop" className="btn-secondary">
          {site.features.shop ? 'Shop microgreens' : 'Explore our greens'}
        </Link>
      </div>
    </div>
  );
}
