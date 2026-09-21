import { handlingGuide } from '../../data/content';
import Icon from '../common/Icon';

/** Basic handling & washing guidance (Awareness BRD §10). */
export default function HandlingGuide({ className = '' }) {
  return (
    <ol className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-5 ${className}`}>
      {handlingGuide.map((h, i) => (
        <li key={h.title} className="card relative p-5">
          <span className="absolute top-4 right-4 text-xs font-bold text-brand-300">0{i + 1}</span>
          <span className="grid size-11 place-items-center rounded-2xl bg-brand-100 text-brand-700">
            <Icon name={h.icon} className="size-5" />
          </span>
          <h3 className="mt-4 font-sans text-base font-semibold tracking-normal">{h.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.body}</p>
        </li>
      ))}
    </ol>
  );
}
