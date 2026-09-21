import { ArrowRight } from 'lucide-react';
import { microgreenStages } from '../../data/content';
import Reveal from '../common/Reveal';

/** Required visual (Awareness BRD §5): Seed → Sprout → Microgreen → Mature plant. */
export default function StageJourney() {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" aria-label="Seed to mature plant">
      {microgreenStages.map((s, i) => (
        <Reveal as="li" key={s.id} delay={i * 90} className="relative">
          <figure
            className={`h-full overflow-hidden rounded-3xl border-2 bg-white transition ${
              s.highlight ? 'border-brand-600 shadow-soft' : 'border-transparent shadow-card'
            }`}
          >
            <div className="relative aspect-square overflow-hidden bg-cream-100">
              <img src={s.image} alt={`${s.title} stage`} loading="lazy" className="size-full object-cover" />
              <span className="absolute top-3 left-3 grid size-8 place-items-center rounded-full bg-white/95 text-sm font-bold text-brand-800">{i + 1}</span>
              {s.highlight && <span className="badge absolute top-3 right-3 bg-brand-700 text-white">We harvest here</span>}
            </div>
            <figcaption className="p-4 sm:p-5">
              <p className="text-[0.7rem] font-semibold tracking-wider text-brand-600 uppercase">{s.when}</p>
              <h3 className="mt-1 text-xl sm:text-2xl">
                {s.title}{' '}
                <span className="hindi text-sm font-normal text-muted" lang="hi">
                  {s.hindi}
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </figcaption>
          </figure>
          {i < microgreenStages.length - 1 && (
            <span className="absolute top-[38%] -right-4 z-10 hidden size-8 place-items-center rounded-full bg-brand-700 text-white shadow-sm lg:grid" aria-hidden>
              <ArrowRight className="size-4" />
            </span>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
