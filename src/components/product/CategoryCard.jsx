import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { pluralize } from '../../utils/format';
import Icon from '../common/Icon';

/** Text-and-icon category tile (no stock photos). */
export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="group relative flex h-full min-h-56 flex-col rounded-3xl bg-brand-900 p-5 text-white shadow-card transition duration-300 hover:-translate-y-1 hover:bg-brand-800"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-brand-200 transition group-hover:bg-turmeric-400 group-hover:text-brand-950">
        <Icon name={category.icon} className="size-6" />
      </span>
      <ArrowUpRight className="absolute top-5 right-5 size-5 text-white/50 transition group-hover:text-white" aria-hidden />
      <p className="hindi mt-auto pt-6 text-sm text-brand-300" lang="hi">
        {category.hindiName}
      </p>
      <h3 className="mt-0.5 text-xl leading-tight text-white sm:text-2xl">{category.name}</h3>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/70">{category.description}</p>
      {category.productCount != null && (
        <p className="mt-3 text-xs font-semibold text-turmeric-400">{pluralize(category.productCount, 'variety', 'varieties')}</p>
      )}
    </Link>
  );
}
