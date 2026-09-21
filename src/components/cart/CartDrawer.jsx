import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Drawer from '../common/Drawer';
import { EmptyState } from '../common/States';
import CartItem from './CartItem';
import FreeDeliveryProgress from './FreeDeliveryProgress';
import OrderSummary from './OrderSummary';

export default function CartDrawer() {
  const { items, totals, isDrawerOpen, closeDrawer } = useCart();
  const navigate = useNavigate();

  const goTo = (path) => {
    closeDrawer();
    navigate(path);
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={closeDrawer}
      title={`Your cart${totals.itemCount ? ` (${totals.itemCount})` : ''}`}
      footer={
        items.length > 0 && (
          <div className="space-y-4">
            <OrderSummary totals={totals} />
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => goTo('/cart')} className="btn-secondary">
                View cart
              </button>
              <button type="button" onClick={() => goTo('/checkout')} className="btn-primary">
                Checkout <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        )
      }
    >
      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Fresh greens are just a click away. Start with our best sellers."
        >
          <Link to="/shop" onClick={closeDrawer} className="btn-primary mt-6">
            Shop microgreens
          </Link>
        </EmptyState>
      ) : (
        <div className="px-5 py-4">
          <FreeDeliveryProgress totals={totals} />
          <ul className="divide-y divide-line">
            {items.map((item) => (
              <CartItem key={item.key} item={item} compact onNavigate={closeDrawer} />
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
