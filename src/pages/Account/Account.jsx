import { Link } from 'react-router-dom';
import { Heart, LogOut, Package, RotateCcw, UserRound } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { getOrders, getProductsByIds } from '../../services/api';
import { formatDate, formatPrice, pluralize } from '../../utils/format';
import { getVariant, isInStock } from '../../utils/product';
import PageHeader from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/States';
import { TextSkeleton } from '../../components/common/Skeletons';

export default function Account() {
  usePageMeta('My account');
  const { user, logout } = useAuth();
  const { count } = useWishlist();
  const { data: orders, loading } = useAsync(getOrders, []);
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();

  if (!user) {
    return (
      <>
        <PageHeader title="My account" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Account' }]} />
        <div className="container-page py-12">
          <EmptyState icon={UserRound} title="Log in to see your account" description="View your orders, reorder favourites and manage your details." className="card">
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/login" state={{ from: '/account' }} className="btn-primary">
                Log in
              </Link>
              <Link to="/register" state={{ from: '/account' }} className="btn-secondary">
                Create account
              </Link>
            </div>
          </EmptyState>
        </div>
      </>
    );
  }

  /** Quick reordering (BRD §3): re-adds each line using current catalogue prices. */
  const reorder = async (order) => {
    const products = await getProductsByIds(order.items.map((i) => i.productId));
    let added = 0;
    order.items.forEach((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (product && isInStock(product)) {
        addItem(product, getVariant(product, line.variantId), line.qty, { silent: true });
        added += 1;
      }
    });
    showToast({
      title: added ? 'Items added to cart' : 'Items unavailable',
      description: added ? `${pluralize(added, 'item')} from order #${order.id}` : 'These products are currently out of stock.',
      variant: added ? 'success' : 'error',
      action: added ? { label: 'View cart', onClick: openDrawer } : undefined,
    });
  };

  return (
    <>
      <PageHeader title={`Namaste, ${user.name.split(' ')[0]}!`} eyebrow="My account" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Account' }]} />
      <div className="container-page grid gap-8 py-10 sm:py-14 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-4">
          <div className="card p-6">
            <span className="grid size-14 place-items-center rounded-full bg-brand-700 font-display text-2xl text-white">{user.name[0]?.toUpperCase()}</span>
            <p className="mt-4 font-semibold text-brand-950">{user.name}</p>
            <p className="text-sm break-all text-muted">{user.email}</p>
            {user.phone && <p className="text-sm text-muted">{user.phone}</p>}
            <button type="button" onClick={logout} className="btn-secondary mt-6 w-full">
              <LogOut className="size-4" aria-hidden /> Log out
            </button>
          </div>
          <Link to="/wishlist" className="card flex items-center gap-3 p-5 transition hover:shadow-soft">
            <Heart className="size-5 text-beet-500" aria-hidden />
            <span className="flex-1 font-medium">Wishlist</span>
            <span className="text-sm text-muted">{count}</span>
          </Link>
        </aside>

        <section aria-labelledby="orders-title">
          <h2 id="orders-title" className="text-3xl">
            Your orders
          </h2>
          <p className="mt-1 text-sm text-muted">Orders placed on this device (demo).</p>
          <div className="mt-6 space-y-4">
            {loading && <TextSkeleton lines={4} />}
            {!loading && !orders?.length && (
              <EmptyState icon={Package} title="No orders yet" description="When you place an order, it'll show up here for easy reordering." action={{ to: '/shop', label: 'Start shopping' }} className="card" />
            )}
            {orders?.map((o) => (
              <article key={o.id} className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm font-semibold text-brand-800">#{o.id}</p>
                    <p className="text-sm text-muted">
                      Placed {formatDate(o.placedAt)} · {pluralize(o.totals.itemCount, 'item')} · {formatPrice(o.totals.total)}
                    </p>
                    <p className="mt-1 text-sm text-muted">Delivery: {o.delivery.dateLabel}, {o.delivery.slot}</p>
                  </div>
                  <span className="badge bg-brand-100 text-brand-800">{o.status}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {o.items.slice(0, 5).map((i) => (
                    <img key={i.key} src={i.image} alt={i.name} title={i.name} className="size-12 rounded-xl object-cover" />
                  ))}
                  {o.items.length > 5 && <span className="text-sm text-muted">+{o.items.length - 5} more</span>}
                  <div className="ml-auto flex gap-2">
                    <Link to={`/checkout/success/${o.id}`} className="btn-ghost btn-sm">
                      Details
                    </Link>
                    <button type="button" onClick={() => reorder(o)} className="btn-primary btn-sm">
                      <RotateCcw className="size-3.5" aria-hidden /> Reorder
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
