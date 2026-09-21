import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lock, RotateCcw, ShoppingBag, Snowflake } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { useCart } from '../../context/CartContext';
import { getProducts } from '../../services/api';
import { filterAndSortProducts } from '../../utils/product';
import PageHeader from '../../components/common/PageHeader';
import CartItem from '../../components/cart/CartItem';
import CouponForm from '../../components/cart/CouponForm';
import OrderSummary from '../../components/cart/OrderSummary';
import FreeDeliveryProgress from '../../components/cart/FreeDeliveryProgress';
import ProductGrid from '../../components/product/ProductGrid';
import SectionHeading from '../../components/common/SectionHeading';
import { EmptyState } from '../../components/common/States';

export default function Cart() {
  usePageMeta('Your cart');
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const { data: products } = useAsync(getProducts, []);

  const inCart = new Set(items.map((i) => i.productId));
  const suggestions = products
    ? filterAndSortProducts(products, { sort: 'best-selling', inStock: true })
        .filter((p) => !inCart.has(p.id))
        .slice(0, 4)
    : [];

  return (
    <>
      <PageHeader title="Your cart" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />

      <div className="container-page py-10 sm:py-14">
        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added any greens yet. Explore our best sellers or take the quiz to find your match."
            className="card"
          >
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/shop" className="btn-primary">
                Start shopping
              </Link>
              <Link to="/#find-your-microgreen" className="btn-secondary">
                Find your microgreen
              </Link>
            </div>
          </EmptyState>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
            <section aria-labelledby="cart-items-title">
              <div className="card px-5 sm:px-7">
                <div className="flex items-center justify-between border-b border-line py-5">
                  <h2 id="cart-items-title" className="font-sans text-lg font-semibold tracking-normal">
                    {totals.itemCount} item{totals.itemCount === 1 ? '' : 's'} in your cart
                  </h2>
                  <button type="button" onClick={clearCart} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-red-600">
                    <RotateCcw className="size-4" aria-hidden /> Clear cart
                  </button>
                </div>
                <ul className="divide-y divide-line">
                  {items.map((item) => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </ul>
              </div>
              <Link to="/shop" className="btn-ghost mt-4 -ml-3">
                <ArrowLeft className="size-4" aria-hidden /> Continue shopping
              </Link>
            </section>

            <aside aria-labelledby="summary-title" className="lg:sticky lg:top-28 lg:self-start">
              <div className="card space-y-5 p-6">
                <h2 id="summary-title" className="text-2xl">
                  Order summary
                </h2>
                <FreeDeliveryProgress totals={totals} />
                <CouponForm />
                <OrderSummary totals={totals} />
                <button type="button" onClick={() => navigate('/checkout')} className="btn-primary btn-lg w-full">
                  Proceed to checkout <ArrowRight className="size-5" aria-hidden />
                </button>
                <ul className="grid grid-cols-2 gap-3 border-t border-line pt-5 text-xs text-muted">
                  <li className="flex items-center gap-2">
                    <Lock className="size-4 text-brand-600" aria-hidden /> Secure checkout
                  </li>
                  <li className="flex items-center gap-2">
                    <Snowflake className="size-4 text-brand-600" aria-hidden /> Chilled delivery
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        )}

        {suggestions.length > 0 && (
          <section className="mt-20" aria-labelledby="cart-suggest">
            <SectionHeading id="cart-suggest" eyebrow="Complete your box" title={items.length ? 'You might also like' : 'Our best sellers'} />
            <ProductGrid products={suggestions} />
          </section>
        )}
      </div>
    </>
  );
}
