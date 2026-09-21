import { CircleCheck } from 'lucide-react';
import Icon from '../common/Icon';

/** Full explanation of one growing step — used inside the timeline modal and on the How We Grow page. */
export default function ProcessStepDetail({ step, index, total, compact = false, headingLevel: H = 'h3', headingId }) {
  return (
    <div className={`grid gap-6 ${compact ? '' : 'md:grid-cols-2 md:items-center lg:gap-12'}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-100">
        <img src={step.image} alt={`${step.title} stage`} loading="lazy" className="size-full object-cover" />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-800">
          Step {index + 1} of {total}
        </span>
      </div>
      <div>
        <p className="eyebrow">
          <Icon name={step.icon} className="size-4" /> {step.timing}
        </p>
        <H id={headingId} className="mt-2 text-3xl">{step.title}</H>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-cream-100 p-4">
            <dt className="text-xs font-semibold tracking-wider text-muted uppercase">What happens</dt>
            <dd className="mt-1 text-sm font-medium text-brand-950">{step.whatHappens}</dd>
          </div>
          <div className="rounded-2xl bg-brand-50 p-4">
            <dt className="text-xs font-semibold tracking-wider text-brand-700 uppercase">Why it matters</dt>
            <dd className="mt-1 text-sm font-medium text-brand-950">{step.explanation}</dd>
          </div>
        </dl>
        <div className="prose-mg mt-5">
          {step.details.map((d) => (
            <p key={d.slice(0, 24)}>{d}</p>
          ))}
        </div>
        {step.checklist && (
          <ul className="space-y-2" aria-label="Monitoring checklist">
            {step.checklist.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-ink">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden /> {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
