import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/format';
import QuantitySelector from '../product/QuantitySelector';

export default function CartItem({ item, compact = false, onNavigate }) {
  const { updateQty, removeItem } = useCart();
  const { add: addToWishlist } = useWishlist();
  const saving = item.mrp && item.mrp > item.price;

  const saveForLater = () => {
    addToWishlist(item.productId);
    removeItem(item.key);
  };

  return (
    <li className="flex gap-4 py-5">
      <Link to={`/product/${item.productId}`} onClick={onNavigate} className="shrink-0">
        <img src={item.image} alt={item.name} className={`${compact ? 'size-20' : 'size-24 sm:size-28'} rounded-2xl object-cover`} loading="lazy" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/product/${item.productId}`} onClick={onNavigate} className="font-semibold text-brand-950 hover:text-brand-700">
              {item.name}
            </Link>
            <p className="text-sm text-muted">
              <span className="hindi" lang="hi">{item.hindiName}</span> · {item.variantLabel}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-brand-950">{formatPrice(item.price * item.qty)}</p>
            {saving && <p className="text-xs text-muted line-through">{formatPrice(item.mrp * item.qty)}</p>}
          </div>
        </div>
        {!compact && <p className="mt-1 text-xs text-muted">{formatPrice(item.price)} each</p>}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <QuantitySelector value={item.qty} onChange={(q) => updateQty(item.key, q)} size="sm" label={`Quantity of ${item.name}`} />
          <div className="flex items-center">
            {!compact && (
              <button type="button" onClick={saveForLater} className="btn-ghost btn-sm text-muted hover:text-brand-800">
                <Heart className="size-4" aria-hidden /> Save for later
              </button>
            )}
            <button
              type="button"
              onClick={() => removeItem(item.key)}
              className="icon-btn size-9 text-muted hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
