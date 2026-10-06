import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout } from 'lucide-react';
import { getVariant, isInStock } from '../../utils/product';
import { getNutrientHighlights } from '../../data/productNutrients';
import PriceTag from './PriceTag';
import WishlistButton from './WishlistButton';
import { site } from '../../config/site';

const SHOP = site.features.shop;

/** A compact preview: image, English name and researched nutrient highlights. */
export default function ProductCard({ product }) {
  const [variantId] = useState(product.variants[0].id);
  const variant = getVariant(product, variantId);
  const inStock = isInStock(product);
  const url = `/product/${product.id}`;
  const nutrients = getNutrientHighlights(product);

  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-offset-2">
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
        </div>
        {SHOP && (
          <div className="absolute top-3 right-3">
            <WishlistButton product={product} className="size-8 bg-white/90 shadow-sm backdrop-blur-sm" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl leading-tight">
          <Link to={url} className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand-700 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        
        <p className="mt-3 text-xs font-semibold tracking-wider text-brand-600 uppercase">Nutrient highlights</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {nutrients.length ? nutrients.join(' · ') : 'Nutrition profile awaiting verification.'}
        </p>

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
