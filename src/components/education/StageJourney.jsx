import { ArrowRight } from 'lucide-react';
import { microgreenStages } from '../../data/content';
import Reveal from '../common/Reveal';

/** Required visual (Awareness BRD §5): Seed → Sprout → Microgreen → Mature plant. */
export default function StageJourney() {
  return (
    <ol className="stage-journey grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" aria-label="Seed to mature plant">
      {microgreenStages.map((s, i) => (
        <Reveal as="li" key={s.id} delay={i * 320} className="stage-journey-step relative">
          <figure
            className={`stage-journey-card h-full overflow-hidden rounded-3xl border-2 bg-white ${
              s.highlight ? 'border-brand-600 shadow-soft' : 'border-transparent shadow-card'
            }`}
          >
            <div className="relative aspect-square overflow-hidden bg-cream-100">
              <img src={s.image} alt={`${s.title} stage`} loading="lazy" className="stage-journey-image size-full object-cover" />
              <span className="absolute top-3 left-3 grid size-8 place-items-center rounded-full bg-white/95 text-sm font-bold text-brand-800">{i + 1}</span>
              {s.highlight && <span className="stage-harvest-badge badge absolute bottom-3 left-3 bg-brand-700 text-[0.6rem] text-white sm:text-xs lg:top-3 lg:right-3 lg:bottom-auto lg:left-auto">We harvest here</span>}
            </div>
            <figcaption className="p-4 sm:p-5">
              <p className="text-[0.7rem] font-semibold tracking-wider text-brand-600 uppercase">{s.when}</p>
              <h3 className="mt-1 text-xl sm:text-2xl">
                {s.title}
              </h3>
              <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted list-disc list-inside">
                {s.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </figcaption>
          </figure>
          {i < microgreenStages.length - 1 && (
            <span className="stage-journey-arrow absolute top-[38%] -right-4 z-10 hidden size-8 place-items-center rounded-full bg-brand-700 text-white shadow-sm lg:grid" aria-hidden>
              <ArrowRight className="size-4" />
            </span>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
