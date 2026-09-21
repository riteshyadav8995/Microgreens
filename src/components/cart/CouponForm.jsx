import { useId, useState } from 'react';
import { BadgePercent, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { site } from '../../config/site';

export default function CouponForm() {
  const { couponCode, totals, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showOffers, setShowOffers] = useState(false);
  const id = useId();

  const apply = (value) => {
    const err = applyCoupon(value);
    setError(err || '');
    if (!err) {
      setCode('');
      setShowOffers(false);
    }
  };

  if (couponCode) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-brand-400 bg-brand-50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <BadgePercent className="size-5 text-brand-600" aria-hidden />
          <div>
            <p className="font-semibold text-brand-900">{couponCode} applied</p>
            {totals.couponInvalidReason ? (
              <p className="text-xs text-red-600">{totals.couponInvalidReason}</p>
            ) : (
              <p className="text-xs text-muted">{totals.coupon?.description}</p>
            )}
          </div>
        </div>
        <button type="button" onClick={removeCoupon} className="icon-btn size-8" aria-label={`Remove coupon ${couponCode}`}>
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (code.trim()) apply(code);
        }}
        className="flex gap-2"
      >
        <label htmlFor={id} className="sr-only">
          Coupon code
        </label>
        <input
          id={id}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError('');
          }}
          placeholder="Coupon code"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`input py-2.5 uppercase ${error ? 'input-error' : ''}`}
        />
        <button type="submit" className="btn-secondary shrink-0 px-5 py-2.5">
          Apply
        </button>
      </form>
      {error && (
        <p id={`${id}-err`} className="field-error">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={() => setShowOffers((s) => !s)}
        aria-expanded={showOffers}
        className="mt-2 text-xs font-semibold text-brand-700 hover:underline"
      >
        {showOffers ? 'Hide offers' : 'View available offers'}
      </button>
      {showOffers && (
        <ul className="mt-3 space-y-2">
          {site.coupons.map((c) => (
            <li key={c.code} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-3 py-2.5">
              <div>
                <p className="font-mono text-sm font-bold text-brand-800">{c.code}</p>
                <p className="text-xs text-muted">{c.description}</p>
              </div>
              <button type="button" onClick={() => apply(c.code)} className="text-xs font-semibold text-brand-700 hover:underline">
                Apply
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
