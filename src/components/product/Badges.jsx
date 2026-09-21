import { Coffee, Moon, Salad, Sparkles, Sun, CupSoda, Cookie } from 'lucide-react';
import { TASTE_LABELS } from '../../data/products';
import { MEAL_TYPES } from '../../data/content';

export function TasteBadge({ taste }) {
  return <span className="badge bg-turmeric-100 px-3 py-1.5 text-xs text-turmeric-700 normal-case">{TASTE_LABELS[taste] || taste}</span>;
}

const MEAL_ICONS = { breakfast: Coffee, lunch: Sun, dinner: Moon, snack: Cookie, garnish: Sparkles, smoothie: CupSoda, salad: Salad };

/** Suggested meal type (Awareness BRD §10): breakfast, lunch, dinner, snack, garnish, smoothie. */
export function UseCaseBadge({ meal }) {
  const I = MEAL_ICONS[meal] || Sparkles;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800">
      <I className="size-3.5" aria-hidden />
      {MEAL_TYPES[meal] || meal}
    </span>
  );
}
