import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { SORT_OPTIONS } from '../../utils/product';
import { site } from '../../config/site';

// Price / best-selling sorts need the shop; top-rated needs ratings.
const OPTIONS = SORT_OPTIONS.filter(
  (o) =>
    (site.features.shop || !(o.id.startsWith('price') || o.id === 'best-selling')) && (site.features.ratings || o.id !== 'rating'),
);

export default function SortSelect({ value, onChange }) {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="hidden text-sm text-muted sm:block">
        Sort by
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input appearance-none rounded-full py-2.5 pr-10 pl-4 font-medium"
        >
          {OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
      </div>
    </div>
  );
}
