import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/** items: [{ label, to? }] — the last item is the current page. */
export default function Breadcrumb({ items, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {last || !item.to ? (
                <span aria-current={last ? 'page' : undefined} className={last ? 'font-medium text-brand-900' : ''}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="transition hover:text-brand-700 hover:underline">
                  {item.label}
                </Link>
              )}
              {!last && <ChevronRight className="size-3.5 text-muted/60" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
