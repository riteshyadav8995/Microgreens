import { Minus, Plus } from 'lucide-react';
import { MAX_QTY } from '../../context/CartContext';

export default function QuantitySelector({ value, onChange, min = 1, max = MAX_QTY, size = 'md', label = 'Quantity' }) {
  const btn = size === 'sm' ? 'size-8' : 'size-11';
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className={`${btn} grid place-items-center rounded-full text-brand-800 transition hover:bg-brand-50 disabled:opacity-35 disabled:hover:bg-transparent`}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </button>
      <span className={`min-w-8 text-center font-semibold tabular-nums ${size === 'sm' ? 'text-sm' : ''}`} aria-live="polite" aria-atomic>
        <span className="sr-only">{label}: </span>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className={`${btn} grid place-items-center rounded-full text-brand-800 transition hover:bg-brand-50 disabled:opacity-35 disabled:hover:bg-transparent`}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
