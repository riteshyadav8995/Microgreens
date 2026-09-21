import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ChefHat, Flame, Leaf, MessageCircle, PackageSearch, Refrigerator, Sprout } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { getProduct, getProductsByIds, getRecipes } from '../../services/api';
import { categories } from '../../data/categories';
import { recipeCategories } from '../../data/recipes';
import { site } from '../../config/site';
import Breadcrumb from '../../components/common/Breadcrumb';
import ProductRating from '../../components/product/ProductRating';
import PurchasePanel from '../../components/product/PurchasePanel';
import PincodeChecker from '../../components/product/PincodeChecker';
import ProductReviews from '../../components/product/ProductReviews';
import ProductGrid from '../../components/product/ProductGrid';
import RecentlyViewed from '../../components/product/RecentlyViewed';
import RecipeCard from '../../components/recipe/RecipeCard';
import VarietyTimeline, { harvestRange } from '../../components/process/VarietyTimeline';
import { TasteBadge, UseCaseBadge } from '../../components/product/Badges';
import { HOW_TO_EAT_LABELS } from '../../data/productEducation';
import SectionHeading from '../../components/common/SectionHeading';
import { EmptyState, ErrorState } from '../../components/common/States';
import { TextSkeleton } from '../../components/common/Skeletons';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, loading, error, reload } = useAsync(() => getProduct(id), [id]);
  const { addViewed } = useRecentlyViewed();

  usePageMeta(product ? `${product.name} (${product.hindiName})` : loading ? 'Loading…' : 'Product not found', product?.shortDescription);

  useEffect(() => {
    if (product) addViewed(product.id);
  }, [product, addViewed]);

  if (loading) return <DetailsSkeleton />;
  if (error) {
    return error.name === 'NotFoundError' ? (
      <EmptyState
        icon={PackageSearch}
        title="We couldn't find that product"
        titleAs="h1"
        description="It may have been renamed or is no longer available."
        action={{ to: '/shop', label: 'Browse all microgreens' }}
        className="py-24"
      />
    ) : (
      <ErrorState onRetry={reload} />
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const range = harvestRange(product.growingPeriod);
  const MEAL = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snacks', garnish: 'Garnish', smoothie: 'Smoothies' };

  // Spec list modelled on a seed-catalogue variety sheet.
  const specs = [
    { label: 'Common name', value: product.name },
    { label: 'Hindi name', value: <span className="hindi" lang="hi">{product.hindiName}</span> },
    product.botanicalName && { label: 'Botanical name', value: <i>{product.botanicalName}</i> },
    product.ingredients && { label: "What's inside", value: product.ingredients.join(', ') },
    { label: 'Category', value: <Link to={`/shop?category=${category.id}`} className="text-brand-700 hover:underline">{category.name}</Link> },
    { label: 'Flavour', value: product.taste },
    product.texture && { label: 'Texture', value: product.texture },
    { label: 'Grow time', value: range ? `${range[0]}–${range[1]} days from sowing` : product.growingPeriod },
    { label: 'Best for', value: product.uses.join(', ') },
    product.mealTypes && { label: 'Meals', value: product.mealTypes.map((m) => MEAL[m] || m).join(', ') },
    product.howToEat && { label: 'How to eat', value: product.howToEat === 'raw' ? 'Best raw, added just before serving' : 'Raw, or added to warm food after cooking' },
    { label: 'Shelf life', value: product.shelfLife },
    { label: 'Storage', value: product.storage },
    { label: 'Nutrition', value: product.nutrition || 'Published once verified by lab testing' },
  ].filter(Boolean);

  return (
    <div className="pb-8">
      <section className="border-b border-line/60 bg-cream-100">
        <div className="container-page py-8 sm:py-12">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: site.features.shop ? 'Shop' : 'Our greens', to: '/shop' },
              { label: category.name, to: `/shop?category=${category.id}` },
              { label: product.name },
            ]}
          />
          <p className="eyebrow mt-8">{category.name}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl">{product.name}</h1>
          <p className="mt-2 text-lg text-muted">
            <span className="hindi text-brand-700" lang="hi">
              {product.hindiName}
            </span>
            {product.botanicalName && (
              <>
                {' · '}
                <i>{product.botanicalName}</i>
              </>
            )}
          </p>
          {site.features.ratings && (
            <a href="#reviews" className="mt-3 inline-flex items-center gap-2 hover:underline">
              <ProductRating rating={product.rating} count={product.reviewCount} />
            </a>
          )}
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-brand-950">{product.shortDescription}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Taste">
            {product.tasteProfile.map((t) => (
              <li key={t}>
                <TasteBadge taste={t} />
              </li>
            ))}
            {range && (
              <li className="badge bg-brand-100 px-3 py-1.5 text-xs text-brand-800 normal-case">
                <Sprout className="size-3.5" aria-hidden /> {range[0]}–{range[1]} days to grow
              </li>
            )}
          </ul>
        </div>
      </section>

      <div className="container-page mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <section aria-labelledby="profile-title">
          <h2 id="profile-title" className="text-3xl">
            Profile
          </h2>
          <p className="mt-1 font-display text-lg text-brand-700 italic">
            {product.name.replace(/ Microgreens$/, '')} microgreens
          </p>
          <div className="prose-mg mt-5 text-lg">
            <p>{product.description}</p>
          </div>

          {site.features.shop ? (
            <div className="mt-8 space-y-6">
              <PurchasePanel key={product.id} product={product} />
              <PincodeChecker />
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#best-ways" className="btn-primary">
                <ChefHat className="size-4" aria-hidden /> How to use it
              </a>
              <Link to="/contact" className="btn-secondary">
                <MessageCircle className="size-4" aria-hidden /> Ask us about {product.name.replace(/ Microgreens$/, '')}
              </Link>
            </div>
          )}

          <div className="mt-10">
            <VarietyTimeline product={product} />
          </div>
        </section>

        <aside aria-labelledby="specs-title" className="lg:sticky lg:top-28 lg:self-start">
          <div className="card overflow-hidden">
            <h2 id="specs-title" className="border-b border-line bg-brand-900 px-6 py-4 font-sans text-sm font-semibold tracking-wider text-white uppercase">
              Variety details
            </h2>
            <dl className="divide-y divide-line">
              {specs.map((row) => (
                <div key={row.label} className="grid grid-cols-[8.5rem_1fr] gap-4 px-6 py-3.5 text-sm">
                  <dt className="font-medium text-muted">{row.label}</dt>
                  <dd className="text-brand-950">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <div className="container-page">
        <BestWaysToUse product={product} />
      </div>

      {site.features.recipes && <RecipesForProduct ids={product.recipeIds} />}

      <div className="container-page space-y-20 pt-20">
        {site.features.ratings && <ProductReviews product={product} />}
        <RelatedProducts ids={product.relatedProductIds} />
        <RecentlyViewed excludeId={product.id} />
      </div>
    </div>
  );
}

/** "Best Ways to Use" (Awareness BRD §10) — meal types, Indian suggestions and raw/cooked guidance. */
function BestWaysToUse({ product }) {
  if (!product.bestWays) return null;
  const raw = product.howToEat === 'raw';
  return (
    <section id="best-ways" className="mt-16 scroll-mt-28 rounded-[2rem] bg-cream-100 p-6 sm:p-10" aria-labelledby="best-ways-title">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div>
          <p className="eyebrow">How to eat it</p>
          <h2 id="best-ways-title" className="mt-2 text-3xl">
            Best ways to use {product.name.replace(/ Microgreens$/, '').toLowerCase()}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.bestWays.map((w) => (
              <li key={w} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm font-medium text-brand-950 shadow-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                  <Check className="size-3.5" aria-hidden />
                </span>
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wider text-muted uppercase">Suggested meals</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.mealTypes.map((m) => (
                <li key={m}>
                  <UseCaseBadge meal={m} />
                </li>
              ))}
            </ul>
          </div>
          <div className={`flex gap-3 rounded-2xl p-4 ${raw ? 'bg-brand-50' : 'bg-turmeric-100'}`}>
            {raw ? <Leaf className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden /> : <Flame className="mt-0.5 size-5 shrink-0 text-turmeric-700" aria-hidden />}
            <div>
              <h3 className="font-sans text-sm font-semibold tracking-normal text-brand-950">Raw or cooked?</h3>
              <p className="mt-1 text-sm text-muted">{HOW_TO_EAT_LABELS[product.howToEat]}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <Refrigerator className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
            <div>
              <h3 className="font-sans text-sm font-semibold tracking-normal text-brand-950">Handling</h3>
              <p className="mt-1 text-sm text-muted">Keep refrigerated. Rinse gently just before eating, then pat dry.</p>
            </div>
          </div>
          <Link to="/how-to-eat" className="inline-block text-sm font-semibold text-brand-700 hover:underline">
            More everyday ideas →
          </Link>
        </div>
      </div>
    </section>
  );
}

function RecipesForProduct({ ids }) {
  const { data: recipes } = useAsync(getRecipes, []);
  const list = recipes?.filter((r) => ids.includes(r.id)) ?? [];
  if (!list.length) return null;
  return (
    <section className="section mt-12 bg-cream-100" aria-labelledby="pd-recipes">
      <div className="container-page">
        <SectionHeading id="pd-recipes" eyebrow="Cook with it" title="Recipe ideas" link={{ to: '/recipes', label: 'All recipes' }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <RecipeCard key={r.id} recipe={r} categoryName={recipeCategories.find((c) => c.id === r.category)?.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedProducts({ ids }) {
  const { data } = useAsync(() => getProductsByIds(ids), [ids.join(',')]);
  if (!data?.length) return null;
  return (
    <section aria-labelledby="related-title">
      <SectionHeading id="related-title" eyebrow="You may also like" title={site.features.shop ? 'Related products' : 'Related varieties'} />
      <ProductGrid products={data} />
    </section>
  );
}

function DetailsSkeleton() {
  return (
    <div role="status" aria-label="Loading variety">
      <div className="bg-cream-100">
        <div className="container-page space-y-4 py-12">
          <div className="skeleton h-3 w-48" />
          <div className="skeleton h-12 w-2/3" />
          <div className="skeleton h-4 w-60" />
          <div className="skeleton h-5 w-3/4" />
        </div>
      </div>
      <div className="container-page mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        <TextSkeleton lines={6} />
        <div className="skeleton h-96 rounded-3xl" />
      </div>
    </div>
  );
}
