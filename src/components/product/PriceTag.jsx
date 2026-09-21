import { formatPrice } from '../../utils/format';
import { discountPercent, effectivePrice } from '../../utils/product';

export default function PriceTag({ variant, size = 'md', className = '' }) {
  const price = effectivePrice(variant);
  const off = discountPercent(variant);
  const sizes = { sm: 'text-base', md: 'text-lg', lg: 'text-3xl' };
  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${className}`}>
      <span className={`font-bold text-brand-950 ${sizes[size]}`}>
        <span className="sr-only">{off ? 'Sale price ' : 'Price '}</span>
        {formatPrice(price)}
      </span>
      {off > 0 && (
        <>
          <span className="text-sm text-muted line-through">
            <span className="sr-only">Original price </span>
            {formatPrice(variant.price)}
          </span>
          <span className="text-xs font-semibold text-beet-500">{off}% off</span>
        </>
      )}
    </div>
  );
}
