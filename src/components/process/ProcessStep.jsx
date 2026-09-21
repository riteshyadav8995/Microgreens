import Icon from '../common/Icon';

/**
 * One clickable step of the seed-to-table timeline.
 * orientation="horizontal" (desktop row) or "vertical" (mobile list).
 */
export default function ProcessStep({ step, index, active, done, onOpen, orientation = 'horizontal' }) {
  const circle = `relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 transition duration-300 ${
    active
      ? 'scale-110 border-brand-700 bg-brand-700 text-white shadow-soft'
      : done
        ? 'border-brand-600 bg-brand-100 text-brand-700'
        : 'border-brand-200 bg-white text-brand-500 group-hover:border-brand-500'
  }`;

  if (orientation === 'vertical') {
    return (
      <button type="button" onClick={onOpen} aria-haspopup="dialog" className="group flex w-full items-start gap-4 rounded-2xl p-2 text-left transition hover:bg-white">
        <span className={circle}>
          <Icon name={step.icon} className="size-5" />
        </span>
        <span className="min-w-0 flex-1 pt-0.5">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-xs font-semibold text-muted">Step {index + 1}</span>
            <span className="text-[0.7rem] font-semibold tracking-wider text-brand-600 uppercase">{step.timing}</span>
          </span>
          <span className="block font-semibold text-brand-950">{step.title}</span>
          <span className="mt-0.5 block text-sm text-muted">{step.whatHappens}</span>
          <span className="mt-1 inline-block text-xs font-semibold text-brand-700 group-hover:underline">Read details →</span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex w-full flex-col items-center gap-2 rounded-2xl px-1 pb-2 text-center"
    >
      <span className={circle}>
        <Icon name={step.icon} className="size-5" />
      </span>
      <span className="text-[0.65rem] font-semibold tracking-wider text-brand-600 uppercase">{step.timing}</span>
      <span className={`text-sm leading-tight font-semibold ${active ? 'text-brand-950' : 'text-muted group-hover:text-brand-900'}`}>
        <span className="sr-only">Step {index + 1}: </span>
        {step.title}
      </span>
    </button>
  );
}
