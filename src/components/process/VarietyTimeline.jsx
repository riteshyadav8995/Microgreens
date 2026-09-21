import { Link } from 'react-router-dom';
import { Droplets, Scissors, Sun, Wheat } from 'lucide-react';

/** Parses "8–12 days from sowing" → [8, 12]. Returns null when no range is given. */
export function harvestRange(growingPeriod = '') {
  const m = /(\d+)\s*[–-]\s*(\d+)/.exec(growingPeriod);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

/**
 * Mini seed-to-harvest timeline for one variety (Awareness BRD §8, §15).
 * Stage widths are proportional to the variety's own harvest range.
 */
export default function VarietyTimeline({ product }) {
  const range = harvestRange(product.growingPeriod);
  if (!range) return null;
  const [min, max] = range;
  const stages = [
    { icon: Wheat, label: 'Seed & sowing', when: 'Day 0', span: 1 },
    { icon: Droplets, label: 'Germination', when: 'Day 1–3', span: 3 },
    { icon: Sun, label: 'Light & growth', when: `Day 4–${Math.max(5, min - 1)}`, span: Math.max(2, min - 4) },
    { icon: Scissors, label: 'Harvest', when: `Day ${min}–${max}`, span: Math.max(2, max - min + 1) },
  ];

  return (
    <section aria-labelledby="variety-timeline" className="rounded-3xl border border-line bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id="variety-timeline" className="font-sans text-base font-semibold tracking-normal">
          Seed-to-harvest for {product.name.replace(/ Microgreens$/, '').toLowerCase()}
        </h3>
        <p className="text-sm font-semibold text-brand-700">
          ~{min}–{max} days
        </p>
      </div>
      <div className="mt-4 flex h-3 overflow-hidden rounded-full" aria-hidden>
        {stages.map((s, i) => (
          <span key={s.label} style={{ flexGrow: s.span }} className={['bg-cream-300', 'bg-brand-200', 'bg-brand-400', 'bg-brand-700'][i]} />
        ))}
      </div>
      <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stages.map((s) => (
          <li key={s.label} className="flex items-start gap-2">
            <s.icon className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
            <span>
              <span className="block text-xs font-semibold text-brand-950">{s.label}</span>
              <span className="block text-xs text-muted">{s.when}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-muted">
        Typical for this variety ({product.growingPeriod}); actual timing varies with season and growing conditions.{' '}
        <Link to="/how-we-grow" className="font-semibold text-brand-700 hover:underline">
          See every step
        </Link>
      </p>
    </section>
  );
}
