import { whyMicrogreens } from '../../data/content';
import Icon from '../common/Icon';
import Reveal from '../common/Reveal';

/** General value of microgreens as food — no medical claims (Awareness BRD §4, §20). */
export default function WhyMicrogreensGrid({ dark = false }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {whyMicrogreens.map((w, i) => (
        <Reveal
          as="li"
          key={w.title}
          delay={(i % 3) * 70}
          className={dark ? 'rounded-3xl border border-white/10 bg-white/[0.04] p-6' : 'card p-6'}
        >
          <span className={`grid size-12 place-items-center rounded-2xl ${dark ? 'bg-brand-700/60 text-brand-200' : 'bg-brand-100 text-brand-700'}`}>
            <Icon name={w.icon} className="size-6" />
          </span>
          <h3 className={`mt-5 font-sans text-lg font-semibold tracking-normal ${dark ? 'text-white' : ''}`}>{w.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-cream-100/70' : 'text-muted'}`}>{w.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}
