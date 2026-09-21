import { useId } from 'react';
import { formatPrice } from '../../utils/format';
import { effectivePrice } from '../../utils/product';

/** Size/weight pills as an accessible radio group. */
export default function VariantSelector({ product, value, onChange, compact = false, showPrice = false }) {
  const name = useId();
  if (product.variants.length < 2 && compact) {
    return <p className="text-xs font-medium text-muted">{product.variants[0].label}</p>;
  }
  return (
    <fieldset>
      <legend className={compact ? 'sr-only' : 'label'}>Size</legend>
      <div className="flex flex-wrap gap-1.5">
        {product.variants.map((v) => {
          const active = v.id === value;
          return (
            <label
              key={v.id}
              className={`cursor-pointer rounded-full border font-medium transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-600 ${
                compact ? 'px-2.5 py-1 text-xs' : 'px-4 py-2 text-sm'
              } ${active ? 'border-brand-700 bg-brand-700 text-white' : 'border-line bg-white text-ink hover:border-brand-500'}`}
            >
              <input type="radio" name={name} value={v.id} checked={active} onChange={() => onChange(v.id)} className="sr-only" />
              {v.label}
              {showPrice && <span className={active ? 'text-white/75' : 'text-muted'}> · {formatPrice(effectivePrice(v))}</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
