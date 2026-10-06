import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const data = [
  {
    title: 'Sprouts',
    image: '/images/products/pea-4.webp',
    summary: 'Germinated seeds, eaten whole including the root.',
    details: [
      { label: 'Growth Stage', value: '2-5 days (germination)' },
      { label: 'Visible Leaves', value: 'None or just emerging' },
      { label: 'Harvesting', value: 'Whole seed, root and shoot' },
      { label: 'Texture', value: 'Crunchy and watery' },
      { label: 'Usage', value: 'Cooked in curries or raw in salads' }
    ]
  },
  {
    title: 'Microgreens',
    image: '/images/products/radish-1.webp',
    summary: 'Young plants, harvested after first leaves appear.',
    details: [
      { label: 'Growth Stage', value: '7-21 days (first leaves)' },
      { label: 'Visible Leaves', value: 'Fully opened cotyledons' },
      { label: 'Harvesting', value: 'Cut above the root' },
      { label: 'Texture', value: 'Tender and crisp' },
      { label: 'Usage', value: 'Raw as garnish, in salads & sandwiches' }
    ]
  }
];

export default function ComparisonTable() {
  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
      {data.map((item) => (
        <ComparisonCard key={item.title} item={item} />
      ))}
    </div>
  );
}

function ComparisonCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-card border border-line transition duration-300 hover:shadow-soft"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      tabIndex={0}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-4 p-5 md:p-6 border-b border-line bg-cream-50">
        <img 
          src={item.image} 
          alt={item.title} 
          className="size-16 sm:size-20 object-cover rounded-2xl shadow-sm"
        />
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-brand-950">{item.title}</h3>
          <p className="text-sm text-muted mt-1">{item.summary}</p>
        </div>
        <ChevronDown 
          className={`ml-auto size-5 text-brand-400 transition-transform duration-300 md:hidden ${expanded ? 'rotate-180' : ''}`}
        />
      </div>
      
      <div className={`grid transition-all duration-300 ease-in-out md:grid-rows-[1fr] ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 md:opacity-100'}`}>
        <div className="overflow-hidden">
          <ul className="p-5 md:p-6 space-y-3">
            {item.details.map((detail, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:justify-between text-sm">
                <span className="font-medium text-brand-900">{detail.label}</span>
                <span className="text-muted text-left sm:text-right">{detail.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
