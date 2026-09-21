import { useState } from 'react';
import { PenLine } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync';
import { addReview, getReviews } from '../../services/api';
import { validate, rules } from '../../utils/validation';
import { site } from '../../config/site';
import ProductRating, { RatingInput } from './ProductRating';
import ReviewCard from '../review/ReviewCard';
import FormField from '../common/FormField';
import { DemoBadge, Spinner } from '../common/States';
import { TextSkeleton } from '../common/Skeletons';
import { useToast } from '../../context/ToastContext';

export default function ProductReviews({ product }) {
  const { data: reviews, loading, reload } = useAsync(() => getReviews(product.id), [product.id]);
  const [formOpen, setFormOpen] = useState(false);

  // Headline rating is the catalogue aggregate; the bars reflect the reviews shown below.
  const shown = reviews ?? [];
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    pct: shown.length ? Math.round((shown.filter((r) => r.rating === star).length / shown.length) * 100) : 0,
  }));

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-28">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id="reviews-title" className="text-3xl">
          Customer reviews
        </h2>
        {site.demoMode && <DemoBadge>Sample reviews</DemoBadge>}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[320px_1fr]">
        <div>
          <div className="card p-6">
            <p className="font-display text-5xl text-brand-950">{product.rating.toFixed(1)}</p>
            <ProductRating rating={product.rating} showValue={false} size="lg" className="mt-2" />
            <p className="mt-2 text-sm text-muted">Based on {product.reviewCount} ratings</p>
            <ul className="mt-5 space-y-2" aria-label="Rating distribution of reviews shown">
              {distribution.map((d) => (
                <li key={d.star} className="flex items-center gap-3 text-xs text-muted">
                  <span className="w-8">{d.star} ★</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-cream-200">
                    <span className="block h-full rounded-full bg-turmeric-400" style={{ width: `${Math.min(100, d.pct)}%` }} />
                  </span>
                  <span className="w-9 text-right">{Math.min(100, d.pct)}%</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => setFormOpen((o) => !o)} aria-expanded={formOpen} className="btn-secondary mt-6 w-full">
              <PenLine className="size-4" aria-hidden /> Write a review
            </button>
          </div>
        </div>

        <div>
          {formOpen && (
            <ReviewForm
              productId={product.id}
              onDone={() => {
                setFormOpen(false);
                reload();
              }}
            />
          )}
          {loading ? (
            <div className="space-y-8 py-4">
              <TextSkeleton />
              <TextSkeleton />
            </div>
          ) : (
            <div>{reviews?.map((r) => <ReviewCard key={r.id} review={r} />)}</div>
          )}
        </div>
      </div>
    </section>
  );
}

function ReviewForm({ productId, onDone }) {
  const [values, setValues] = useState({ rating: 0, title: '', body: '', name: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values, {
      rating: [(v) => (v ? undefined : 'Please choose a star rating')],
      name: [rules.required('Name')],
      title: [rules.required('Title')],
      body: [rules.minLength(10, 'Review')],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    await addReview(productId, { ...values, city: '' });
    setSaving(false);
    showToast({ title: 'Thanks for your review!', description: 'Saved on this device (demo).' });
    onDone();
  };

  return (
    <form onSubmit={onSubmit} noValidate className="card mb-6 space-y-4 p-6">
      <h3 className="text-xl">Share your experience</h3>
      <div>
        <RatingInput value={values.rating} onChange={(rating) => setValues((v) => ({ ...v, rating }))} name={`rating-${productId}`} />
        {errors.rating && <p className="field-error">{errors.rating}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Your name" value={values.name} onChange={set('name')} error={errors.name} required autoComplete="name" />
        <FormField label="Review title" value={values.title} onChange={set('title')} error={errors.title} required />
      </div>
      <FormField label="Your review" as="textarea" value={values.body} onChange={set('body')} error={errors.body} required />
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? <Spinner className="size-4" /> : 'Submit review'}
        </button>
        <button type="button" onClick={onDone} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
