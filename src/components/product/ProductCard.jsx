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
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant = getVariant(product, variantId);
  const { addItem } = useCart();
  const inStock = isInStock(product);
  // "Best seller" only makes sense while we're actually selling.
  const badge = product.tags.find((t) => BADGE_STYLES[t] && (SHOP || t !== 'best-seller'));
  const off = discountPercent(variant);
  const url = `/product/${product.id}`;
  const category = categories.find((c) => c.id === product.category);
  const range = harvestRange(product.growingPeriod);

  return (
    <article className="group card relative flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.7rem] font-semibold tracking-wider text-brand-600 uppercase">{category?.name}</p>
        <div className="flex shrink-0 items-center gap-1.5">
          {SHOP && !inStock && <span className="badge bg-ink text-white">Sold out</span>}
          {(inStock || !SHOP) && badge && <span className={`badge ${BADGE_STYLES[badge]}`}>{TAG_LABELS[badge]}</span>}
          {SHOP && inStock && off > 0 && <span className="badge bg-beet-100 text-beet-700">{off}% off</span>}
          {SHOP && <WishlistButton product={product} className="relative z-10 size-8 bg-cream-100" />}
        </div>
      </div>

      <h3 className="mt-3 text-2xl leading-tight">
        <Link to={url} className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] group-hover:text-brand-700 focus-visible:outline-none">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-muted">
        <span className="hindi" lang="hi">
          {product.hindiName}
        </span>
        {product.botanicalName && (
          <>
            {' · '}
            <i>{product.botanicalName}</i>
          </>
        )}
      </p>
      {site.features.ratings && <ProductRating rating={product.rating} count={product.reviewCount} className="mt-2" />}

      <p className="mt-4 text-sm font-medium text-brand-900">{product.taste}</p>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{product.shortDescription}</p>

      {SHOP ? (
        <>
          {/* Controls sit above the full-card link overlay */}
          <div className="relative z-10 mt-4">
            <VariantSelector product={product} value={variantId} onChange={setVariantId} compact />
          </div>
          <div className="relative z-10 mt-auto flex flex-wrap items-end justify-between gap-2 pt-4">
            <PriceTag variant={variant} size="sm" />
            <button type="button" disabled={!inStock} onClick={() => addItem(product, variant)} className="btn-primary btn-sm gap-1.5 px-3.5">
              <ShoppingBag className="size-4" aria-hidden />
              {inStock ? 'Add' : 'Sold out'}
              <span className="sr-only"> {product.name} {variant.label} to cart</span>
            </button>
          </div>
        </>
      ) : (
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-4 text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-muted">
            <Sprout className="size-3.5 text-brand-600" aria-hidden />
            {range ? `~${range.join('–')} days to grow` : product.growingPeriod}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-brand-700" aria-hidden>
            View variety <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      )}
    </article>
  );
}
