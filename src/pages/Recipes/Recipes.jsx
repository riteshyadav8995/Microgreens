import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SearchX } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { getRecipeCategories, getRecipes } from '../../services/api';
import { recipeMealFilters } from '../../data/recipes';
import { pluralize } from '../../utils/format';
import PageHeader from '../../components/common/PageHeader';
import RecipeCard from '../../components/recipe/RecipeCard';
import { EmptyState } from '../../components/common/States';
import { RecipeCardSkeleton } from '../../components/common/Skeletons';

const DIETS = ['All', 'Vegetarian', 'Vegan'];
const CUISINES = ['All', 'Indian', 'Modern'];

export default function Recipes() {
  usePageMeta('Recipes', 'Indian and modern recipes with microgreens — dal tadka, papdi chaat, dosa, wraps, smoothies and salads.');
  const [params, setParams] = useSearchParams();
  const meal = params.get('meal') || 'all';
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('All');
  const [cuisine, setCuisine] = useState('All');
  const { data, loading } = useAsync(() => Promise.all([getRecipes(), getRecipeCategories()]), []);
  const [recipes, categories] = data || [[], []];

  const setMeal = (id) => setParams(id === 'all' ? {} : { meal: id }, { replace: true });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter(
      (r) =>
        (meal === 'all' || r.meals.includes(meal)) &&
        (diet === 'All' || (diet === 'Vegetarian' ? r.diet !== 'Eggetarian' : r.diet === diet)) &&
        (cuisine === 'All' || r.cuisine === cuisine) &&
        (!q || [r.title, r.hindiTitle, r.description, ...r.tags, ...r.ingredients.map((i) => i.name)].join(' ').toLowerCase().includes(q)),
    );
  }, [recipes, meal, diet, cuisine, query]);

  const catName = (id) => categories.find((c) => c.id === id)?.name;
  const reset = () => {
    setMeal('all');
    setQuery('');
    setDiet('All');
    setCuisine('All');
  };

  return (
    <>
      <PageHeader
        image="/images/recipes/dal-tadka.webp"
        eyebrow="Recipes"
        title="Everyday meals, freshly finished"
        description="Simple daily Indian cooking with microgreens — every recipe shows which microgreen to use and links straight to it."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Recipes' }]}
      />

      <div className="container-page py-10 sm:py-14">
        <div className="flex flex-col gap-5">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Filter recipes by meal">
            {[{ id: 'all', name: 'All recipes' }, ...recipeMealFilters].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={meal === c.id}
                onClick={() => setMeal(c.id)}
                className={`chip shrink-0 ${meal === c.id ? 'chip-active' : ''}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
              <label htmlFor="recipe-search" className="sr-only">
                Search recipes
              </label>
              <input
                id="recipe-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dal, paneer, smoothie…"
                className="input rounded-full py-2.5 pl-11"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Segmented label="Diet" options={DIETS} value={diet} onChange={setDiet} />
              <Segmented label="Cuisine" options={CUISINES} value={cuisine} onChange={setCuisine} />
            </div>
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            {loading ? 'Loading recipes…' : pluralize(results.length, 'recipe')}
          </p>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((r) => (
                <li key={r.id} className="animate-fade-in">
                  <RecipeCard recipe={r} categoryName={catName(r.category)} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState icon={SearchX} title="No recipes found" description="Try a different search or clear the filters." action={{ label: 'Show all recipes', onClick: reset }} className="card" />
          )}
        </div>
      </div>
    </>
  );
}

function Segmented({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label={label}>
      <span className="text-sm text-muted">{label}:</span>
      <div className="flex rounded-full border border-line bg-white p-1">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${value === o ? 'bg-brand-700 text-white' : 'text-muted hover:text-brand-800'}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
