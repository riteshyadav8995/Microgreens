import { useState } from 'react';
import { site } from '../../config/site';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, ChefHat, Clock, Flame, Lightbulb, Minus, Plus, Printer, ShoppingBag, Timer, Users } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { getProductsByIds, getRecipe, getRecipes } from '../../services/api';
import { recipeCategories, recipeMealFilters } from '../../data/recipes';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatMinutes, formatQuantity } from '../../utils/format';
import { isInStock } from '../../utils/product';
import Breadcrumb from '../../components/common/Breadcrumb';
import ProductGrid from '../../components/product/ProductGrid';
import RecipeCard from '../../components/recipe/RecipeCard';
import SectionHeading from '../../components/common/SectionHeading';
import { EmptyState, PageLoader } from '../../components/common/States';

export default function RecipeDetails() {
  const { id } = useParams();
  const { data: recipe, loading, error } = useAsync(() => getRecipe(id), [id]);
  usePageMeta(recipe ? recipe.title : loading ? 'Loading recipe…' : 'Recipe not found', recipe?.description);

  if (loading) return <PageLoader />;
  if (error) {
    return (
      <EmptyState
        icon={BookOpen}
        title="We couldn't find that recipe"
        titleAs="h1"
        description="It may have moved. Browse all our recipes instead."
        action={{ to: '/recipes', label: 'All recipes' }}
        className="py-24"
      />
    );
  }
  return <RecipeView key={recipe.id} recipe={recipe} />;
}

function RecipeView({ recipe }) {
  const [servings, setServings] = useState(recipe.servings);
  const [checked, setChecked] = useState(() => new Set());
  const [doneSteps, setDoneSteps] = useState(() => new Set());
  const { data: products } = useAsync(() => getProductsByIds(recipe.productIds), [recipe.id]);
  const { data: allRecipes } = useAsync(getRecipes, []);
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();
  const factor = servings / recipe.servings;
  const category = recipeCategories.find((c) => c.id === recipe.category);
  const mainMeal = recipe.meals[0];
  const mealName = recipeMealFilters.find((m) => m.id === mainMeal)?.name;
  const related = allRecipes?.filter((r) => r.id !== recipe.id && r.meals.includes(mainMeal)).slice(0, 3) ?? [];

  const toggle = (setter, key) =>
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const addAll = () => {
    const available = products?.filter(isInStock) ?? [];
    available.forEach((p) => addItem(p, p.variants[0], 1, { silent: true }));
    showToast({
      title: 'Added to cart',
      description: `${available.length} microgreen${available.length === 1 ? '' : 's'} for ${recipe.title}`,
      action: { label: 'View cart', onClick: openDrawer },
    });
  };

  return (
    <>
      <section className="bg-cream-100">
        <div className="container-page grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Recipes', to: '/recipes' }, { label: recipe.title }]} className="no-print" />
            <p className="eyebrow mt-6">{category?.name}</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{recipe.title}</h1>
            <p className="hindi mt-2 text-lg text-brand-600" lang="hi">
              {recipe.hindiTitle}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">{recipe.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Timer, label: 'Prep', value: formatMinutes(recipe.prepTime) },
                { icon: Flame, label: 'Cook', value: recipe.cookTime ? formatMinutes(recipe.cookTime) : 'No cook' },
                { icon: Clock, label: 'Total', value: formatMinutes(recipe.prepTime + recipe.cookTime) },
                { icon: ChefHat, label: 'Level', value: recipe.difficulty },
              ].map(({ icon: I, label, value }) => (
                <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <I className="size-5 text-brand-600" aria-hidden />
                  <dt className="mt-2 text-xs font-semibold tracking-wider text-muted uppercase">{label}</dt>
                  <dd className="font-semibold text-brand-950">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="no-print mt-6 flex flex-wrap items-center gap-3">
              <span className="badge bg-brand-100 px-3 py-1.5 text-brand-800">{recipe.diet}</span>
              <span className="badge bg-white px-3 py-1.5 text-brand-800">{recipe.cuisine}</span>
              <button type="button" onClick={() => window.print()} className="btn-ghost btn-sm ml-auto">
                <Printer className="size-4" aria-hidden /> Print recipe
              </button>
            </div>
          </div>
          <img src={recipe.image} alt={recipe.title} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft" fetchPriority="high" />
        </div>
      </section>

      <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[380px_1fr] lg:gap-14">
        <section aria-labelledby="ingredients-title" className="lg:sticky lg:top-28 lg:self-start">
          <div className="card p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 id="ingredients-title" className="text-2xl">
                Ingredients
              </h2>
              <div className="flex items-center gap-1 rounded-full border border-line p-1" role="group" aria-label="Servings">
                <button type="button" onClick={() => setServings((s) => Math.max(1, s - 1))} disabled={servings <= 1} className="icon-btn size-8" aria-label="Fewer servings">
                  <Minus className="size-4" />
                </button>
                <span className="flex min-w-16 items-center justify-center gap-1 text-sm font-semibold" aria-live="polite">
                  <Users className="size-4 text-muted" aria-hidden /> {servings}
                  <span className="sr-only"> servings</span>
                </span>
                <button type="button" onClick={() => setServings((s) => Math.min(20, s + 1))} className="icon-btn size-8" aria-label="More servings">
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
            <ul className="mt-5 space-y-1">
              {recipe.ingredients.map((ing, i) => {
                const isChecked = checked.has(i);
                return (
                  <li key={ing.name}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2 hover:bg-cream-100">
                      <input type="checkbox" checked={isChecked} onChange={() => toggle(setChecked, i)} className="mt-0.5 size-4.5 shrink-0 accent-brand-700" />
                      <span className={`text-sm ${isChecked ? 'text-muted line-through' : 'text-ink'}`}>
                        {ing.qty != null && (
                          <strong className="font-semibold text-brand-900">
                            {formatQuantity(ing.qty * factor)} {ing.unit}{' '}
                          </strong>
                        )}
                        {ing.qty == null && ing.unit && <strong className="font-semibold text-brand-900">{ing.unit} </strong>}
                        {ing.productId ? (
                          <Link to={`/product/${ing.productId}`} className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-900">
                            {ing.name}
                          </Link>
                        ) : (
                          ing.name
                        )}
                        {ing.qty == null && !ing.unit && <span className="text-muted"> (to taste)</span>}
                        {ing.productId && <span className="badge ml-2 bg-brand-50 px-2 py-0.5 text-[10px] text-brand-700">Microgreen</span>}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            {site.features.shop && products?.length > 0 && (
              <button type="button" onClick={addAll} className="btn-primary no-print mt-6 w-full">
                <ShoppingBag className="size-4" aria-hidden /> Add microgreens to cart
              </button>
            )}
          </div>
        </section>

        <section aria-labelledby="method-title">
          <h2 id="method-title" className="text-3xl">
            Method
          </h2>
          <p className="no-print mt-2 text-sm text-muted">Tap a step to mark it done.</p>
          <ol className="mt-6 space-y-4">
            {recipe.steps.map((step, i) => {
              const done = doneSteps.has(i);
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => toggle(setDoneSteps, i)}
                    aria-pressed={done}
                    className={`flex w-full gap-4 rounded-3xl border p-5 text-left transition ${done ? 'border-brand-200 bg-brand-50' : 'border-line bg-white hover:border-brand-300'}`}
                  >
                    <span className={`grid size-9 shrink-0 place-items-center rounded-full font-bold transition ${done ? 'bg-brand-600 text-white' : 'bg-cream-200 text-brand-900'}`}>
                      {done ? '✓' : i + 1}
                    </span>
                    <span className={`pt-1.5 leading-relaxed ${done ? 'text-muted' : 'text-ink'}`}>{step}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          {recipe.tip && (
            <aside className="mt-8 flex gap-4 rounded-3xl bg-turmeric-100 p-6">
              <Lightbulb className="size-6 shrink-0 text-turmeric-700" aria-hidden />
              <div>
                <h3 className="font-sans text-base font-semibold tracking-normal text-turmeric-700">Microgreen tip</h3>
                <p className="mt-1 text-ink">{recipe.tip}</p>
              </div>
            </aside>
          )}
        </section>
      </div>

      {products?.length > 0 && (
        <section className="section no-print bg-cream-100" aria-labelledby="used-title">
          <div className="container-page">
            <SectionHeading id="used-title" eyebrow={site.features.shop ? 'Shop the recipe' : 'Used in this recipe'} title="Microgreens used in this recipe" />
            <ProductGrid products={products} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section no-print" aria-labelledby="more-recipes">
          <div className="container-page">
            <SectionHeading id="more-recipes" eyebrow="Keep cooking" title={`More ${mealName?.toLowerCase()} ideas`} link={{ to: `/recipes?meal=${mainMeal}`, label: 'See all' }} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RecipeCard key={r.id} recipe={r} categoryName={recipeCategories.find((c) => c.id === r.category)?.name} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
