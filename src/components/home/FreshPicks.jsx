import { useState } from 'react';
import { useAsync } from '../../hooks/useAsync';
import { getProducts } from '../../services/api';
import { filterAndSortProducts } from '../../utils/product';
import SectionHeading from '../common/SectionHeading';
import ProductGrid from '../product/ProductGrid';
import { ProductGridSkeleton } from '../common/Skeletons';
import { ErrorState } from '../common/States';

const TABS = [
  { id: 'best-seller', label: 'Best sellers', sort: 'best-selling' },
  { id: 'new', label: 'New arrivals', sort: 'newest' },
  { id: 'indian-favourite', label: 'Indian favourites', sort: 'best-selling' },
];

export default function FreshPicks() {
  const [tab, setTab] = useState(TABS[0].id);
  const { data: products, loading, error, reload } = useAsync(getProducts, []);
  const current = TABS.find((t) => t.id === tab);
  const list = products
    ? filterAndSortProducts(products.filter((p) => p.tags.includes(tab)), { sort: current.sort, inStock: true }).slice(0, 8)
    : [];

  const onKeyDown = (e) => {
    const i = TABS.findIndex((t) => t.id === tab);
    if (e.key === 'ArrowRight') setTab(TABS[(i + 1) % TABS.length].id);
    if (e.key === 'ArrowLeft') setTab(TABS[(i - 1 + TABS.length) % TABS.length].id);
  };

  return (
    <section className="section bg-white" aria-labelledby="fresh-picks-title">
      <div className="container-page">
        <SectionHeading
          id="fresh-picks-title"
          eyebrow="Fresh picks · Shop"
          title="Ready to try them?"
          description="Our most-ordered greens, the newest arrivals and the desi favourites that belong in every dal."
          link={{ to: '/shop', label: 'View all' }}
        />

        <div role="tablist" aria-label="Product collections" onKeyDown={onKeyDown} className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls="fresh-picks-panel"
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              className={`chip shrink-0 px-5 py-2.5 ${tab === t.id ? 'chip-active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div id="fresh-picks-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
          {loading && <ProductGridSkeleton count={4} />}
          {error && <ErrorState onRetry={reload} />}
          {!loading && !error && <ProductGrid key={tab} products={list} className="animate-fade-in" />}
        </div>
      </div>
    </section>
  );
}
