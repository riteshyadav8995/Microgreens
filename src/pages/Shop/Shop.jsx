import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX, SlidersHorizontal, X } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { getCategories, getProducts } from '../../services/api';
import { filterAndSortProducts, PRICE_RANGES } from '../../utils/product';
import { TASTE_LABELS } from '../../data/products';
import { pluralize } from '../../utils/format';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/navbar/SearchBar';
import FilterPanel from '../../components/product/FilterPanel';
import SortSelect from '../../components/product/SortSelect';
import ProductGrid from '../../components/product/ProductGrid';
import RecentlyViewed from '../../components/product/RecentlyViewed';
import Drawer from '../../components/common/Drawer';
import { EmptyState, ErrorState } from '../../components/common/States';
import { ProductGridSkeleton } from '../../components/common/Skeletons';
import { site } from '../../config/site';

const SHOP = site.features.shop;
// Sorts that are available with the current feature switches (others fall back to Featured).
const VALID_SORTS = ['featured', 'newest', 'name', ...(SHOP ? ['best-selling', 'price-asc', 'price-desc'] : []), ...(site.features.ratings ? ['rating'] : [])];

const list = (v) => (v ? v.split(',').filter(Boolean) : []);

const EMPTY_FILTERS = { q: '', categories: [], price: '', minRating: 0, tastes: [], inStock: false, onSale: false, sort: 'featured' };

const parseFilters = (params) => ({
  q: params.get('q') || '',
  categories: list(params.get('category')),
  price: params.get('price') || '',
  minRating: site.features.ratings ? Number(params.get('rating')) || 0 : 0,
  tastes: list(params.get('taste')),
  inStock: params.get('stock') === '1',
  onSale: params.get('sale') === '1',
  sort: VALID_SORTS.includes(params.get('sort')) ? params.get('sort') : 'featured',
});

const toParams = (f) => {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.categories.length) p.set('category', f.categories.join(','));
  if (f.price) p.set('price', f.price);
  if (f.minRating) p.set('rating', String(f.minRating));
  if (f.tastes.length) p.set('taste', f.tastes.join(','));
  if (f.inStock) p.set('stock', '1');
  if (f.onSale) p.set('sale', '1');
  if (f.sort !== 'featured') p.set('sort', f.sort);
  return p;
};

/**
 * Filters are mirrored in the URL (shareable, survive refresh/back), but the UI reads them from
 * local state so checkboxes and results update instantly — the router applies URL changes as a
 * low-priority transition, which made controls feel laggy.
 */
function useShopFilters() {
  const [params, setParams] = useSearchParams();
  const urlKey = params.toString();
  const [filters, setFilters] = useState(() => parseFilters(params));

  // Follow URL changes made elsewhere: back/forward, nav menu links, navbar search.
  useEffect(() => {
    setFilters((prev) => (toParams(prev).toString() === urlKey ? prev : parseFilters(new URLSearchParams(urlKey))));
  }, [urlKey]);

  const apply = (next) => {
    setFilters(next);
    setParams(toParams(next), { replace: true });
  };
  const update = (patch) => apply({ ...filters, ...patch });
  const clearAll = () => apply({ ...EMPTY_FILTERS, sort: filters.sort });

  return { filters, update, clearAll };
}

export default function Shop() {
  const { filters, update, clearAll } = useShopFilters();
  const [mobileFilters, setMobileFilters] = useState(false);
  const { data, loading, error, reload } = useAsync(() => Promise.all([getProducts(), getCategories()]), []);
  const [products, categories] = data || [[], []];

  const results = useMemo(() => filterAndSortProducts(products, filters), [products, filters]);
  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.productCount])), [categories]);

  const singleCategory = filters.categories.length === 1 ? categories.find((c) => c.id === filters.categories[0]) : null;
  const title = singleCategory ? singleCategory.name : SHOP ? 'Shop microgreens' : 'Our greens';
  usePageMeta(
    filters.q ? `Search: ${filters.q}` : title,
    singleCategory?.description ||
      (SHOP
        ? 'Shop fresh microgreens online — broccoli, radish, sunflower, methi, coriander, wheatgrass and combos, delivered chilled.'
        : 'Explore every microgreen we grow — taste, texture, how long it takes to grow and how to use it in Indian meals.'),
  );

  const chips = [
    filters.q && { key: 'q', label: `“${filters.q}”`, clear: () => update({ q: '' }) },
    ...filters.categories.map((id) => ({
      key: `c-${id}`,
      label: categories.find((c) => c.id === id)?.name || id,
      clear: () => update({ categories: filters.categories.filter((x) => x !== id) }),
    })),
    filters.price && { key: 'price', label: PRICE_RANGES.find((r) => r.id === filters.price)?.label, clear: () => update({ price: '' }) },
    filters.minRating > 0 && { key: 'rating', label: `${filters.minRating}★ & up`, clear: () => update({ minRating: 0 }) },
    ...filters.tastes.map((t) => ({ key: `t-${t}`, label: TASTE_LABELS[t], clear: () => update({ tastes: filters.tastes.filter((x) => x !== t) }) })),
    filters.inStock && { key: 'stock', label: 'In stock', clear: () => update({ inStock: false }) },
    filters.onSale && { key: 'sale', label: 'On sale', clear: () => update({ onSale: false }) },
  ].filter(Boolean);

  const activeFilterCount = chips.filter((c) => c.key !== 'q').length;
  // Unfiltered catalogue reads like a seed catalogue: grouped under category headings.
  const grouped = !chips.length && filters.sort === 'featured';

  return (
    <>
      <PageHeader
        title={title}
        eyebrow={singleCategory ? <span className="hindi" lang="hi">{singleCategory.hindiName}</span> : SHOP ? 'Fresh from our farm' : 'Meet the varieties'}
        description={
          singleCategory?.description ||
          (SHOP
            ? 'Fresh microgreens, herbs and combos — filter by taste, price and more to find your favourites.'
            : 'Every variety we grow — filter by taste, see how long each takes to grow and how to use it in daily meals.')
        }
        breadcrumb={[{ label: 'Home', to: '/' }, { label: SHOP ? 'Shop' : 'Our greens', to: singleCategory ? '/shop' : undefined }, ...(singleCategory ? [{ label: singleCategory.name }] : [])]}
      >
        <div className="mt-6 max-w-xl">
          <SearchBar initialValue={filters.q} onSearch={(q) => update({ q })} />
        </div>
      </PageHeader>

      <div className="container-page py-8 sm:py-10">
        {/* Category quick links */}
        <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Filter by category">
          <button type="button" onClick={() => update({ categories: [] })} aria-pressed={!filters.categories.length} className={`chip shrink-0 ${!filters.categories.length ? 'chip-active' : ''}`}>
            All
          </button>
          {categories.map((c) => {
            const active = filters.categories.length === 1 && filters.categories[0] === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => update({ categories: active ? [] : [c.id] })}
                className={`chip shrink-0 ${active ? 'chip-active' : ''}`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block" aria-label="Product filters">
            <div className="sticky top-28">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-sans text-lg font-semibold tracking-normal">Filters</h2>
                {chips.length > 0 && (
                  <button type="button" onClick={clearAll} className="text-sm font-medium text-brand-700 hover:underline">
                    Clear all
                  </button>
                )}
              </div>
              <FilterPanel filters={filters} onChange={update} categories={categories} counts={counts} />
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted" aria-live="polite">
                {loading ? 'Loading products…' : <>Showing <strong className="text-ink">{SHOP ? pluralize(results.length, 'product') : pluralize(results.length, 'variety', 'varieties')}</strong></>}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setMobileFilters(true)} className="btn-secondary px-4 py-2.5 lg:hidden">
                  <SlidersHorizontal className="size-4" aria-hidden /> Filters
                  {activeFilterCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-brand-700 text-[0.65rem] text-white">{activeFilterCount}</span>}
                </button>
                <SortSelect value={filters.sort} onChange={(sort) => update({ sort })} />
              </div>
            </div>

            {chips.length > 0 && (
              <ul className="mb-6 flex flex-wrap items-center gap-2" aria-label="Active filters">
                {chips.map((c) => (
                  <li key={c.key}>
                    <button type="button" onClick={c.clear} className="chip gap-1 border-brand-200 bg-brand-50 py-1 text-xs" aria-label={`Remove filter ${c.label}`}>
                      {c.label} <X className="size-3.5" aria-hidden />
                    </button>
                  </li>
                ))}
                <li>
                  <button type="button" onClick={clearAll} className="px-2 text-xs font-semibold text-brand-700 hover:underline">
                    Clear all
                  </button>
                </li>
              </ul>
            )}

            {loading && <ProductGridSkeleton count={9} className="lg:grid-cols-3 xl:grid-cols-3" />}
            {error && <ErrorState onRetry={reload} />}
            {!loading && !error && results.length === 0 && (
              <EmptyState
                icon={SearchX}
                title="No greens match your filters"
                description={filters.q ? `We couldn't find anything for “${filters.q}”. Try a different word — like “methi” or “spicy”.` : 'Try removing a filter or two to see more products.'}
                action={{ label: 'Clear all filters', onClick: clearAll }}
                className="card"
              />
            )}
            {!loading && !error && results.length > 0 && grouped && (
              <div className="space-y-12">
                {categories
                  .map((c) => ({ ...c, items: results.filter((p) => p.category === c.id) }))
                  .filter((c) => c.items.length)
                  .map((c) => (
                    <section key={c.id} aria-labelledby={`group-${c.id}`}>
                      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-line pb-3">
                        <h2 id={`group-${c.id}`} className="text-2xl sm:text-3xl">
                          {c.name}{' '}
                          <span className="hindi text-base font-normal text-muted" lang="hi">
                            {c.hindiName}
                          </span>
                        </h2>
                        <span className="shrink-0 text-sm text-muted">{pluralize(c.items.length, 'variety', 'varieties')}</span>
                      </div>
                      <ProductGrid products={c.items} columns="lg:grid-cols-3" />
                    </section>
                  ))}
              </div>
            )}
            {!loading && !error && results.length > 0 && !grouped && <ProductGrid products={results} columns="lg:grid-cols-3" />}
          </div>
        </div>

        <RecentlyViewed className="mt-20" />
      </div>

      <Drawer
        open={mobileFilters}
        onClose={() => setMobileFilters(false)}
        title="Filters"
        side="right"
        footer={
          <div className="flex gap-3">
            <button type="button" onClick={clearAll} className="btn-secondary flex-1">
              Clear all
            </button>
            <button type="button" onClick={() => setMobileFilters(false)} className="btn-primary flex-1">
              Show {results.length} results
            </button>
          </div>
        }
      >
        <div className="p-5">
          <FilterPanel filters={filters} onChange={update} categories={categories} counts={counts} />
        </div>
      </Drawer>
    </>
  );
}
