import { useAsync } from '../../hooks/useAsync';
import { getRecipes } from '../../services/api';
import { recipeCategories } from '../../data/recipes';
import SectionHeading from '../common/SectionHeading';
import RecipeCard from '../recipe/RecipeCard';
import { RecipeCardSkeleton } from '../common/Skeletons';
import Reveal from '../common/Reveal';

const FEATURED = ['dal-tadka-methi-microgreens', 'papdi-chaat-microgreens', 'masala-dosa-sunflower-microgreens', 'paneer-tikka-wrap'];

export default function RecipesSection() {
  const { data: recipes, loading } = useAsync(getRecipes, []);
  const featured = recipes ? FEATURED.map((id) => recipes.find((r) => r.id === id)).filter(Boolean) : [];
  const categoryName = (id) => recipeCategories.find((c) => c.id === id)?.name;

  return (
    <section className="section bg-white" aria-labelledby="recipes-title">
      <div className="container-page">
        <SectionHeading
          id="recipes-title"
          eyebrow="Recipes"
          title="Cook something fresh tonight"
          description="Simple Indian and modern recipes that make the most of every box."
          link={{ to: '/recipes', label: 'All recipes' }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }, (_, i) => <RecipeCardSkeleton key={i} />)
            : featured.map((r, i) => (
                <Reveal key={r.id} delay={i * 70}>
                  <RecipeCard recipe={r} categoryName={categoryName(r.category)} />
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
