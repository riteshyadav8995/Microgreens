import { comparison } from '../../data/content';

/** Sprouts vs Microgreens vs Mature greens. */
export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Comparison of sprouts, microgreens and mature plants</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="p-5">
              <span className="sr-only">Feature</span>
            </th>
            {comparison.columns.map((c) => (
              <th key={c} scope="col" className={`p-5 font-display text-lg ${c === 'Microgreens' ? 'bg-brand-700 text-white' : 'text-brand-950'}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.rows.map((r) => (
            <tr key={r.label} className="border-b border-line last:border-0">
              <th scope="row" className="p-5 font-semibold text-brand-950">
                {r.label}
              </th>
              {r.values.map((v, i) => (
                <td key={i} className={`p-5 ${i === 1 ? 'bg-brand-50 font-medium text-brand-900' : 'text-muted'}`}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
