import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { comparison } from '../../data/content';
import Reveal from '../common/Reveal';

const previews = [
  {
    title: 'Sprouts',
    image: '/images/products/pea-4.webp',
    summary: 'Germinated seeds, eaten whole including the root.',
  },
  {
    title: 'Microgreens',
    image: '/images/products/radish-1.webp',
    summary: 'Young plants, harvested after first leaves appear.',
  },
  {
    title: 'Mature plants',
    image: '/images/products/mature-kale.webp',
    summary: 'Fully grown vegetables or herbs, harvested much later.',
  }
];

export default function ComparisonTable() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
      {previews.map((item, i) => (
        <Reveal key={item.title} delay={i * 90}>
          <ComparisonCard item={item} index={i} />
        </Reveal>
      ))}
    </div>
  );
}

function ComparisonCard({ item, index }) {
  const [expanded, setExpanded] = useState(true);
  const id = useId();

  return (
    <article className="h-full overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:shadow-soft">
      <div className="flex items-center gap-4 border-b border-line bg-cream-50 p-5 md:p-4 xl:p-6">
        <img 
          src={item.image} 
          alt={item.title} 
          loading="lazy"
          className="size-16 shrink-0 rounded-2xl object-cover shadow-sm xl:size-20"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-xl sm:text-2xl font-semibold text-brand-950">
            <button type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded((value) => !value)} className="flex w-full items-center justify-between gap-2 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600">
              {item.title}
              <ChevronDown aria-hidden className={`size-5 shrink-0 text-brand-600 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </h3>
          <p className="text-sm text-muted mt-1">{item.summary}</p>
        </div>
      </div>
      
      <div id={id} aria-hidden={!expanded} inert={!expanded} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <dl className="space-y-3 p-5 md:p-4 xl:p-6">
            {comparison.rows.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 text-sm">
                <dt className="font-medium text-brand-900">{row.label}</dt>
                <dd className="text-muted">{row.values[index]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}
