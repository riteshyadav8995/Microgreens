import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export default function WishlistButton({ product, variant = 'icon', className = '' }) {
  const { has, toggle } = useWishlist();
  const saved = has(product.id);
  const label = saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`;

  if (variant === 'button') {
    return (
      <button type="button" onClick={() => toggle(product)} aria-pressed={saved} className={`btn-secondary ${className}`}>
        <Heart className={`size-4 transition ${saved ? 'fill-beet-500 text-beet-500' : ''}`} aria-hidden />
        {saved ? 'Saved' : 'Wishlist'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(product)}
      aria-pressed={saved}
      aria-label={label}
      title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      className={`grid size-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 ${className}`}
    >
      <Heart className={`size-[18px] transition ${saved ? 'animate-pop fill-beet-500 text-beet-500' : 'text-brand-900'}`} aria-hidden />
    </button>
  );
}
