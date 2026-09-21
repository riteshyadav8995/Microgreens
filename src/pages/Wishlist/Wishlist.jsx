import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { getProductsByIds } from '../../services/api';
import { isInStock } from '../../utils/product';
import { pluralize } from '../../utils/format';
import PageHeader from '../../components/common/PageHeader';
import ProductGrid from '../../components/product/ProductGrid';
import { EmptyState } from '../../components/common/States';
import { ProductGridSkeleton } from '../../components/common/Skeletons';

export default function Wishlist() {
  usePageMeta('Your wishlist');
  const { ids, clear } = useWishlist();
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();
  const { data: products, loading } = useAsync(() => getProductsByIds(ids), [ids.join(',')]);
  const list = products ?? [];

  const moveAllToCart = () => {
    const available = list.filter(isInStock);
    available.forEach((p) => addItem(p, p.variants[0], 1, { silent: true }));
    showToast({
      title: 'Added to cart',
      description: `${pluralize(available.length, 'item')} from your wishlist`,
      action: { label: 'View cart', onClick: openDrawer },
    });
  };

  return (
    <>
      <PageHeader title="Your wishlist" eyebrow="Saved for later" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <div className="container-page py-10 sm:py-14">
        {ids.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Tap the heart on any product to save it here. Your wishlist stays on this device."
            action={{ to: '/shop', label: 'Discover microgreens' }}
            className="card"
          />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-muted">{pluralize(ids.length, 'saved item')}</p>
              <div className="flex gap-2">
                <button type="button" onClick={clear} className="btn-ghost text-muted">
                  <Trash2 className="size-4" aria-hidden /> Clear all
                </button>
                <button type="button" onClick={moveAllToCart} className="btn-primary" disabled={!list.some(isInStock)}>
                  <ShoppingBag className="size-4" aria-hidden /> Add all to cart
                </button>
              </div>
            </div>
            {loading && !products ? <ProductGridSkeleton count={Math.min(ids.length, 8)} /> : <ProductGrid products={list} />}
          </>
        )}
      </div>
    </>
  );
}
