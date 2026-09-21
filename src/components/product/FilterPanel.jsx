import { Star } from 'lucide-react';
import { TASTE_LABELS } from '../../data/products';
import { PRICE_RANGES } from '../../utils/product';
import { site } from '../../config/site';

function Group({ title, children }) {
  return (
    <fieldset className="border-b border-line py-5 first:pt-0 last:border-0">
      <legend className="mb-3 text-sm font-semibold text-brand-950">{title}</legend>
      <div className="space-y-2.5">{children}</div>
    </fieldset>
  );
}

function Check({ type = 'checkbox', name, checked, onChange, children, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-ink hover:text-brand-700">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className={`size-4.5 shrink-0 accent-brand-700 ${type === 'radio' ? '' : 'rounded'}`}
      />
      <span className="flex-1">{children}</span>
      {count != null && <span className="text-xs text-muted">{count}</span>}
    </label>
  );
}

/**
 * Stateless filter UI — the Shop page owns the state (in the URL).
 * `filters` shape matches utils/product filterAndSortProducts().
 */
export default function FilterPanel({ filters, onChange, categories, counts = {} }) {
  const toggleIn = (key, value) => {
    const list = filters[key];
    onChange({ [key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value] });
  };

  return (
    <div>
      <Group title="Category">
        {categories.map((c) => (
          <Check key={c.id} checked={filters.categories.includes(c.id)} onChange={() => toggleIn('categories', c.id)} count={counts[c.id]}>
            {c.name}
          </Check>
        ))}
      </Group>

      {site.features.shop && (
      <Group title="Price">
        <Check type="radio" name="price" checked={!filters.price} onChange={() => onChange({ price: '' })}>
          Any price
        </Check>
        {PRICE_RANGES.map((r) => (
          <Check key={r.id} type="radio" name="price" checked={filters.price === r.id} onChange={() => onChange({ price: r.id })}>
            {r.label}
          </Check>
        ))}
      </Group>
      )}

      {site.features.ratings && (
      <Group title="Customer rating">
        {[0, 4.5, 4].map((r) => (
          <Check key={r} type="radio" name="rating" checked={filters.minRating === r} onChange={() => onChange({ minRating: r })}>
            {r === 0 ? (
              'Any rating'
            ) : (
              <span className="inline-flex items-center gap-1">
                {r}
                <Star className="size-3.5 fill-turmeric-400 text-turmeric-400" aria-hidden /> & up
              </span>
            )}
          </Check>
        ))}
      </Group>
      )}

      <Group title="Taste">
        {Object.entries(TASTE_LABELS).map(([id, label]) => (
          <Check key={id} checked={filters.tastes.includes(id)} onChange={() => toggleIn('tastes', id)}>
            {label}
          </Check>
        ))}
      </Group>

      {site.features.shop && (
      <Group title="Availability & offers">
        <Check checked={filters.inStock} onChange={() => onChange({ inStock: !filters.inStock })}>
          In stock only
        </Check>
        <Check checked={filters.onSale} onChange={() => onChange({ onSale: !filters.onSale })}>
          On sale
        </Check>
      </Group>
      )}
    </div>
  );
}
