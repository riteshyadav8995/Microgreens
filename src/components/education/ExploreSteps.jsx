import { Link } from 'react-router-dom';
import { growingSteps } from '../../data/content';
import Icon from '../common/Icon';

/** "Explore every step" — cards that deep-link into the How We Grow page (Awareness BRD §13, item 6). */
export default function ExploreSteps() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {growingSteps.map((s, i) => (
        <li key={s.id}>
          <Link to={`/how-we-grow#${s.id}`} className="group card flex h-full gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-soft">
            <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white">
              <Icon name={s.icon} className="size-5" />
              <span className="absolute -top-2 -left-2 grid size-6 place-items-center rounded-full bg-turmeric-400 text-[0.7rem] font-bold text-brand-950">{i + 1}</span>
            </span>
            <span>
              <span className="text-[0.7rem] font-semibold tracking-wider text-brand-600 uppercase">{s.timing}</span>
              <span className="block font-semibold text-brand-950 group-hover:text-brand-700">{s.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{s.whatHappens}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
