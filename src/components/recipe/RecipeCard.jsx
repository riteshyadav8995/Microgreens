import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import { formatMinutes } from '../../utils/format';

const DIET_STYLES = {
  Vegan: 'bg-brand-100 text-brand-800',
  Vegetarian: 'bg-white text-brand-800',
  Eggetarian: 'bg-turmeric-100 text-turmeric-700',
};

export default function RecipeCard({ recipe, categoryName }) {
  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <img
          src={recipe.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className={`badge absolute top-3 left-3 shadow-sm ${DIET_STYLES[recipe.diet]}`}>
          <span className={`size-2 rounded-full ${recipe.diet === 'Eggetarian' ? 'bg-turmeric-500' : 'bg-brand-500'}`} aria-hidden />
          {recipe.diet}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-wider text-brand-600 uppercase">
          {categoryName || recipe.cuisine}
        </p>
        <h3 className="mt-2 text-xl leading-snug">
          <Link to={`/recipes/${recipe.id}`} className="after:absolute after:inset-0 after:content-[''] hover:text-brand-700">
            {recipe.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{recipe.description}</p>
        <div className="mt-auto flex items-center gap-4 pt-4 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden /> {formatMinutes(recipe.prepTime + recipe.cookTime)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5" aria-hidden /> Serves {recipe.servings}
          </span>
          <span>{recipe.difficulty}</span>
        </div>
      </div>
    </article>
  );
}
