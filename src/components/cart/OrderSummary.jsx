import { formatPrice } from '../../utils/format';

function Row({ label, value, tone = '', strong = false }) {
  return (
    <div className={`flex items-center justify-between ${strong ? 'text-base font-bold text-brand-950' : 'text-sm'}`}>
      <dt className={strong ? '' : 'text-muted'}>{label}</dt>
      <dd className={tone}>{value}</dd>
    </div>
  );
}

/** Price breakdown shared by the cart drawer, cart page and checkout. */
export default function OrderSummary({ totals, className = '' }) {
  return (
    <dl className={`space-y-3 ${className}`}>
      <Row label={`Subtotal (${totals.itemCount} item${totals.itemCount === 1 ? '' : 's'})`} value={formatPrice(totals.subtotal)} />
      {totals.productSavings > 0 && <Row label="Product savings" value={`− ${formatPrice(totals.productSavings)}`} tone="text-brand-600" />}
      {totals.couponDiscount > 0 && (
        <Row label={`Coupon (${totals.coupon.code})`} value={`− ${formatPrice(totals.couponDiscount)}`} tone="text-brand-600" />
      )}
      <Row
        label="Delivery"
        value={totals.delivery === 0 ? 'FREE' : formatPrice(totals.delivery)}
        tone={totals.delivery === 0 ? 'font-semibold text-brand-600' : ''}
      />
      {totals.codFee > 0 && <Row label="Cash on delivery fee" value={formatPrice(totals.codFee)} />}
      <div className="border-t border-line pt-3">
        <Row label="Total" value={formatPrice(totals.total)} strong />
        <p className="mt-1 text-xs text-muted">Inclusive of all taxes</p>
      </div>
    </dl>
  );
}
