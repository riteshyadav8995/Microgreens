import { Star } from 'lucide-react';

/** Read-only star rating with an accessible label. */
export default function ProductRating({ rating, count, size = 'sm', showValue = true, className = '' }) {
  const iconSize = size === 'lg' ? 'size-5' : 'size-3.5';
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex" role="img" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.max(0, Math.min(1, rating - (i - 1)));
          return (
            <span key={i} className={`relative ${iconSize}`}>
              <Star className={`absolute inset-0 ${iconSize} text-cream-300`} fill="currentColor" strokeWidth={0} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={`${iconSize} text-turmeric-400`} fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className={`${size === 'lg' ? 'text-base' : 'text-xs'} text-muted`}>
          <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
          {count != null && <span> ({count})</span>}
        </span>
      )}
    </div>
  );
}

/** Interactive star input for review forms. */
export function RatingInput({ value, onChange, name = 'rating' }) {
  return (
    <fieldset className="flex gap-1">
      <legend className="sr-only">Your rating</legend>
      {[1, 2, 3, 4, 5].map((i) => (
        <label key={i} className="cursor-pointer">
          <input type="radio" name={name} value={i} checked={value === i} onChange={() => onChange(i)} className="peer sr-only" />
          <Star
            className={`size-7 transition peer-focus-visible:rounded peer-focus-visible:outline-2 peer-focus-visible:outline-brand-600 ${i <= value ? 'text-turmeric-400' : 'text-cream-300 hover:text-turmeric-400/60'}`}
            fill="currentColor"
            strokeWidth={0}
            aria-hidden
          />
          <span className="sr-only">{i} star{i > 1 ? 's' : ''}</span>
        </label>
      ))}
    </fieldset>
  );
}
