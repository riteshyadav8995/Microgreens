import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { ArrowRight } from 'lucide-react';
import { useCases } from '../../data/content';
import { products } from '../../data/products';
import Icon from '../common/Icon';
import Reveal from '../common/Reveal';

const productName = (id) => products.find((p) => p.id === id)?.name.replace(/ Microgreens$/, '') ?? id;

/**
 * "How to use them daily" (Awareness BRD §9). Each card names suitable varieties (linked to
 * product pages) and, when recipes are enabled, links to matching recipes. `detailed` adds the how-to line.
 */
export default function UseCaseGrid({ detailed = false, limit }) {
  const list = limit ? useCases.slice(0, limit) : useCases;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((u, i) => (
        <Reveal as="li" key={u.id} id={`use-${u.id}`} delay={(i % 3) * 70} className="card flex scroll-mt-28 flex-col overflow-hidden">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img src={u.image} alt="" loading="lazy" className="size-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/70 to-transparent" aria-hidden />
            <h3 className="absolute bottom-3 left-4 flex items-center gap-2 text-2xl text-white">
              <span className="grid size-9 place-items-center rounded-full bg-white/20 backdrop-blur">
                <Icon name={u.icon} className="size-5" />
              </span>
              {u.title}
            </h3>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="font-medium text-brand-950">{u.idea}</p>
            {detailed && <p className="mt-2 text-sm leading-relaxed text-muted">{u.how}</p>}
            <p className="mt-4 text-xs font-semibold tracking-wider text-muted uppercase">Try with</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {u.productIds.map((id) => (
                <li key={id}>
                  <Link to={`/product/${id}`} className="chip px-3 py-1 text-xs">
                    {productName(id)}
                  </Link>
                </li>
              ))}
            </ul>
            {site.features.recipes && (
            <Link
              to={u.recipeMeal === 'all' ? '/recipes' : `/recipes?meal=${u.recipeMeal}`}
              className="group mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              See recipes <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </Link>
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
