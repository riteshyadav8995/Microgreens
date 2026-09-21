import { Link } from 'react-router-dom';
import { CircleAlert, Sprout } from 'lucide-react';

/** Friendly empty state with an optional call to action (BRD §13). */
export function EmptyState({ icon: IconComp = Sprout, title, description, action, children, className = '', titleAs: Heading = 'h2' }) {
  return (
    <div className={`flex flex-col items-center px-6 py-14 text-center ${className}`}>
      <div className="mb-5 grid size-20 place-items-center rounded-full bg-brand-50 text-brand-600 ring-8 ring-brand-50/50">
        <IconComp className="size-9" aria-hidden />
      </div>
      <Heading className="text-2xl">{title}</Heading>
      {description && <p className="mt-2 max-w-md text-muted">{description}</p>}
      {action &&
        (action.to ? (
          <Link to={action.to} className="btn-primary mt-6">
            {action.label}
          </Link>
        ) : (
          <button type="button" onClick={action.onClick} className="btn-primary mt-6">
            {action.label}
          </button>
        ))}
      {children}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', description = 'Please try again in a moment.', onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 grid size-16 place-items-center rounded-full bg-red-50 text-red-500">
        <CircleAlert className="size-8" aria-hidden />
      </div>
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-2 max-w-md text-muted">{description}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-secondary mt-6">
          Try again
        </button>
      )}
    </div>
  );
}

export function Spinner({ className = 'size-5' }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-3 text-brand-600">
        <Sprout className="size-10 animate-sway" aria-hidden />
        <span className="text-sm font-medium text-muted">Growing your page…</span>
      </div>
    </div>
  );
}

export function DemoBadge({ children = 'Sample content', className = '' }) {
  return (
    <span className={`badge bg-turmeric-100 text-turmeric-700 ${className}`} title="Demo data for Phase 1 — replace with real content before launch">
      {children}
    </span>
  );
}
