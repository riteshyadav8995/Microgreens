import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Sprout } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { TAG_LABELS } from '../../data/products';
import { categories } from '../../data/categories';
import { discountPercent, getVariant, isInStock } from '../../utils/product';
import ProductRating from './ProductRating';
import PriceTag from './PriceTag';
import WishlistButton from './WishlistButton';
import VariantSelector from './VariantSelector';
import { site } from '../../config/site';
import { harvestRange } from '../process/VarietyTimeline';

const SHOP = site.features.shop;

const BADGE_STYLES = {
  'best-seller': 'bg-brand-700 text-white',
  new: 'bg-turmeric-400 text-brand-950',
  'indian-favourite': 'bg-beet-500 text-white',
};

/**
 * Text-only variety card (no stock photos), modelled on a seed-catalogue entry:
 * category, name, Hindi name, botanical name, flavour, short description and grow time.
 */
export default function ProductCard({ product }) {
  const [variantId] = useState(product.variants[0].id);
  const variant = getVariant(product, variantId);
  const inStock = isInStock(product);
  const url = `/product/${product.id}`;
  const category = categories.find((c) => c.id === product.category);

  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft">
      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-50">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="grid size-full place-items-center bg-cream-100 text-brand-300">
            <Sprout className="size-8" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {SHOP && !inStock && <span className="badge bg-ink text-white shadow-sm">Sold out</span>}
          {product.tags.includes('best-seller') && <span className="badge bg-brand-700 text-white shadow-sm">Best seller</span>}
        </div>
        {SHOP && (
          <div className="absolute top-3 right-3">
            <WishlistButton product={product} className="size-8 bg-white/90 shadow-sm backdrop-blur-sm" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.7rem] font-semibold tracking-wider text-brand-600 uppercase">{category?.name}</p>
        
        <h3 className="mt-2 text-xl leading-tight">
          <Link to={url} className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand-700 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        
        {/* Short nutrition / benefit highlight */}
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{product.shortDescription}</p>

        <div className="mt-auto pt-5">
          {SHOP ? (
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-muted">{variant.label}</p>
                <PriceTag variant={variant} size="sm" className="mt-0.5" />
              </div>
              <Link to={url} className="btn-secondary btn-sm relative z-10 px-4">
                View Details
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-end border-t border-line pt-4 text-sm">
              <Link to={url} className="inline-flex relative z-10 items-center gap-1 font-semibold text-brand-700 transition hover:text-brand-800">
                View Details <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
