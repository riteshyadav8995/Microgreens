import { Link, useParams } from 'react-router-dom';
import { CalendarDays, CreditCard, MapPin, PackageSearch } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { getOrder } from '../../services/api';
import { formatPrice } from '../../utils/format';
import OrderSummary from '../../components/cart/OrderSummary';
import { EmptyState, PageLoader } from '../../components/common/States';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { data: order, loading } = useAsync(() => getOrder(orderId), [orderId]);
  usePageMeta('Order confirmed');

  if (loading) return <PageLoader />;
  if (!order) {
    return (
      <div className="container-page py-16">
        <EmptyState icon={PackageSearch} titleAs="h1" title="Order not found" description="We couldn't find this order on this device." action={{ to: '/shop', label: 'Continue shopping' }} />
      </div>
    );
  }

  return (
    <div className="bg-cream-100/60">
      <div className="container-page max-w-4xl py-12 sm:py-16">
        <div className="text-center">
          <div className="mx-auto grid size-20 animate-pop place-items-center rounded-full bg-brand-600 text-white shadow-soft">
            <svg viewBox="0 0 24 24" className="size-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </div>
          <p className="eyebrow mt-6">Order confirmed</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">Thank you, {order.customer.name.split(' ')[0]}!</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
            Your greens will be harvested and packed for delivery. We've sent the details to <strong className="text-ink">{order.customer.email}</strong>{' '}
            <span className="text-sm">(demo — no email is actually sent)</span>.
          </p>
          <p className="mt-4 inline-block rounded-full bg-white px-5 py-2 font-mono text-sm font-semibold text-brand-800 shadow-sm">Order #{order.id}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: CalendarDays, title: 'Delivery', body: `${order.delivery.dateLabel}\n${order.delivery.slot}` },
            { icon: MapPin, title: 'Address', body: `${order.address.line1}${order.address.line2 ? `, ${order.address.line2}` : ''}\n${order.address.city}, ${order.address.state} ${order.address.pincode}` },
            { icon: CreditCard, title: 'Payment', body: `${order.payment.label}\n${order.payment.detail}` },
          ].map(({ icon: I, title, body }) => (
            <div key={title} className="card p-5">
              <I className="size-5 text-brand-600" aria-hidden />
              <h2 className="mt-3 font-sans text-sm font-semibold tracking-wider text-muted uppercase">{title}</h2>
              <p className="mt-1 text-sm whitespace-pre-line text-brand-950">{body}</p>
            </div>
          ))}
        </div>

        <div className="card mt-6 p-6">
          <h2 className="text-2xl">Items</h2>
          <ul className="mt-4 divide-y divide-line">
            {order.items.map((i) => (
              <li key={i.key} className="flex items-center gap-4 py-3">
                <img src={i.image} alt="" className="size-14 rounded-xl object-cover" />
                <span className="flex-1 text-sm">
                  <span className="block font-medium text-brand-950">{i.name}</span>
                  <span className="text-muted">
                    {i.variantLabel} × {i.qty}
                  </span>
                </span>
                <span className="text-sm font-semibold">{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <OrderSummary totals={order.totals} className="mt-4 border-t border-line pt-4" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="btn-primary">
            Continue shopping
          </Link>
          <Link to="/how-to-eat" className="btn-secondary">
            Ways to use them
          </Link>
          <Link to="/account" className="btn-ghost">
            View my orders
          </Link>
        </div>
      </div>
    </div>
  );
}
