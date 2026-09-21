import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { AVAILABILITY, getVariant, isInStock } from '../../utils/product';
import PriceTag from './PriceTag';
import VariantSelector from './VariantSelector';
import QuantitySelector from './QuantitySelector';
import WishlistButton from './WishlistButton';

/** Size + quantity + add-to-cart block shared by Product Details and Quick View. */
export default function PurchasePanel({ product, onAdded, showBuyNow = true }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const { addItem, closeDrawer } = useCart();
  const navigate = useNavigate();
  const variant = getVariant(product, variantId);
  const inStock = isInStock(product);
  const availability = AVAILABILITY[product.availability];

  const add = () => {
    addItem(product, variant, qty);
    onAdded?.();
  };

  const buyNow = () => {
    addItem(product, variant, qty, { silent: true });
    closeDrawer();
    onAdded?.();
    navigate('/checkout');
  };

  return (
    <div className="space-y-5">
      <div>
        <PriceTag variant={variant} size="lg" />
        <p className="mt-1 text-xs text-muted">Inclusive of all taxes</p>
      </div>

      <VariantSelector product={product} value={variantId} onChange={setVariantId} showPrice />

      <p className={`flex items-center gap-2 text-sm font-medium ${availability.tone}`}>
        <span className="relative flex size-2.5">
          {inStock && <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-40" />}
          <span className="relative inline-flex size-2.5 rounded-full bg-current" />
        </span>
        {availability.label}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <QuantitySelector value={qty} onChange={setQty} />
        <button type="button" onClick={add} disabled={!inStock} className="btn-primary btn-lg flex-1">
          <ShoppingBag className="size-5" aria-hidden /> {inStock ? 'Add to cart' : 'Out of stock'}
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {showBuyNow && (
          <button type="button" onClick={buyNow} disabled={!inStock} className="btn-accent flex-1">
            <Zap className="size-4" aria-hidden /> Buy now
          </button>
        )}
        <WishlistButton product={product} variant="button" className="flex-1" />
      </div>
    </div>
  );
}
