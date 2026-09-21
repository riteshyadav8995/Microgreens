import { Truck } from 'lucide-react';
import { formatPrice } from '../../utils/format';

export default function FreeDeliveryProgress({ totals }) {
  const done = totals.freeDeliveryRemaining === 0 || totals.delivery === 0;
  return (
    <div className="rounded-2xl bg-brand-50 p-4">
      <p className="flex items-center gap-2 text-sm font-medium text-brand-900">
        <Truck className="size-4 text-brand-600" aria-hidden />
        {done ? (
          <span>You've unlocked <strong>free delivery</strong>!</span>
        ) : (
          <span>
            Add <strong>{formatPrice(totals.freeDeliveryRemaining)}</strong> more for free delivery
          </span>
        )}
      </p>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-white"
        role="progressbar"
        aria-label="Progress to free delivery"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={done ? 100 : totals.freeDeliveryProgress}
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-brand-400 to-brand-600 transition-[width] duration-500"
          style={{ width: `${done ? 100 : totals.freeDeliveryProgress}%` }}
        />
      </div>
    </div>
  );
}
