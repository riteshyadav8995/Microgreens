import { BadgeCheck, Quote } from 'lucide-react';
import { site } from '../../config/site';
import ProductRating from '../product/ProductRating';
import { formatDate, initials } from '../../utils/format';
import { DemoBadge } from '../common/States';

/** Used by product reviews (variant="review") and the home testimonial carousel (variant="testimonial"). */
export default function ReviewCard({ review, variant = 'review', productName }) {
  if (variant === 'testimonial') {
    return (
      <figure className="card flex h-full flex-col p-6 sm:p-8">
        <Quote className="size-8 text-brand-200" aria-hidden />
        {site.features.ratings && <ProductRating rating={review.rating} showValue={false} className="mt-4" />}
        <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-brand-950 sm:text-xl">
          “{review.quote}”
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-brand-100 font-semibold text-brand-800">{initials(review.name)}</span>
          <span>
            <span className="block font-semibold text-brand-950">{review.name}</span>
            <span className="block text-sm text-muted">
              {review.city}
              {productName && <> · bought {productName}</>}
            </span>
          </span>
        </figcaption>
      </figure>
    );
  }

  return (
    <article className="border-b border-line py-6 last:border-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <ProductRating rating={review.rating} showValue={false} />
        <h4 className="font-sans text-base font-semibold tracking-normal">{review.title}</h4>
      </div>
      <p className="mt-2 leading-relaxed text-muted">{review.body}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="font-semibold text-ink">{review.name}</span>
        {review.city && <span>{review.city}</span>}
        <time dateTime={review.date}>{formatDate(review.date)}</time>
        {review.verified && (
          <span className="inline-flex items-center gap-1 text-brand-700">
            <BadgeCheck className="size-3.5" aria-hidden /> Verified buyer
          </span>
        )}
        {review.isDemo && <DemoBadge>Sample review</DemoBadge>}
        {review.isDemo === false && <span className="badge bg-brand-50 text-brand-700">Your review</span>}
      </div>
    </article>
  );
}
