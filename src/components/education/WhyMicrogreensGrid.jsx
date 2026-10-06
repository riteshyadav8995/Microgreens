import { whyMicrogreens } from '../../data/content';
import Icon from '../common/Icon';
import Reveal from '../common/Reveal';

/** General value of microgreens as food — no medical claims (Awareness BRD §4, §20). */
export default function WhyMicrogreensGrid({ dark = false }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {whyMicrogreens.map((w, i) => (
        <Reveal
          as="li"
          key={w.title}
          delay={(i % 4) * 70}
          className={`flex h-full flex-col ${dark ? 'rounded-2xl border border-white/10 bg-white/[0.04] p-5' : 'card p-5'}`}
        >
          <div className="flex items-center gap-3">
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${dark ? 'bg-brand-700/60 text-brand-200' : 'bg-brand-100 text-brand-700'}`}>
              <Icon name={w.icon} className="size-5" />
            </span>
            <h3 className={`font-sans text-base leading-tight font-semibold tracking-normal ${dark ? 'text-white' : ''}`}>{w.title}</h3>
          </div>
          <p className={`mt-3 text-xs leading-relaxed line-clamp-2 ${dark ? 'text-cream-100/70' : 'text-muted'}`}>{w.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}
