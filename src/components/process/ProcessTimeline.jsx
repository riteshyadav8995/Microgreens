import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { growingSteps, PROCESS_PHASES } from '../../data/content';
import Modal from '../common/Modal';
import ProcessStep from './ProcessStep';
import ProcessStepDetail from './ProcessStepDetail';

const AUTO_MS = 2600;

/** Seed → Germination → Growth → Harvest bar that follows the highlighted step. */
function PhaseProgress({ phase }) {
  const current = PROCESS_PHASES.findIndex((p) => p.id === phase);
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Growth phase">
      {PROCESS_PHASES.map((p, i) => (
        <li key={p.id} aria-current={i === current ? 'step' : undefined}>
          <div className="h-2 overflow-hidden rounded-full bg-brand-100">
            <div
              className="h-full rounded-full bg-linear-to-r from-brand-400 to-brand-700 transition-[width] duration-700 ease-out"
              style={{ width: i < current ? '100%' : i === current ? '60%' : '0%' }}
            />
          </div>
          <p className={`mt-2 truncate text-[0.6rem] font-semibold uppercase sm:text-xs sm:tracking-wider ${i <= current ? 'text-brand-700' : 'text-muted/60'}`}>{p.label}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Interactive seed-to-table timeline (Awareness BRD §6, §8).
 * Desktop: horizontal; mobile: vertical. Every step opens a detail modal.
 */
export default function ProcessTimeline({ showFullLink = true }) {
  const count = growingSteps.length;
  const [highlight, setHighlight] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [playing, setPlaying] = useState(() => !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (!playing || openIndex !== null) return undefined;
    const t = setTimeout(() => setHighlight((i) => (i + 1) % count), AUTO_MS);
    return () => clearTimeout(t);
  }, [highlight, playing, openIndex, count]);

  const open = (i) => {
    setOpenIndex(i);
    setHighlight(i);
    setPlaying(false);
  };
  const step = openIndex !== null ? growingSteps[openIndex] : null;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-card sm:flex-row sm:items-center sm:gap-8">
        <div className="flex-1">
          <PhaseProgress phase={growingSteps[highlight].phase} />
        </div>
        <button type="button" onClick={() => setPlaying((p) => !p)} className="btn-ghost btn-sm self-start sm:self-center" aria-label={playing ? 'Pause growth animation' : 'Play growth animation'}>
          {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Desktop: horizontal */}
      <div className="relative hidden md:block">
        <div className="absolute top-6 right-[5%] left-[5%] h-0.5 bg-brand-200" aria-hidden>
          <div className="h-full bg-brand-600 transition-[width] duration-500" style={{ width: `${(highlight / (count - 1)) * 100}%` }} />
        </div>
        <ol className="relative grid grid-cols-9 gap-1">
          {growingSteps.map((s, i) => (
            <li key={s.id}>
              <ProcessStep step={s} index={i} active={i === highlight} done={i < highlight} onOpen={() => open(i)} />
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: vertical */}
      <ol className="relative space-y-2 before:absolute before:top-6 before:bottom-6 before:left-[1.9rem] before:w-0.5 before:bg-brand-200 before:content-[''] md:hidden">
        {growingSteps.map((s, i) => (
          <li key={s.id} className="relative">
            <ProcessStep step={s} index={i} active={i === highlight} done={i < highlight} onOpen={() => open(i)} orientation="vertical" />
          </li>
        ))}
      </ol>

      <p className="mt-6 text-center text-xs text-muted">
        *Educational range only. Harvest time differs by variety and season — every product shows its own timing.
      </p>
      {showFullLink && (
        <div className="mt-6 text-center">
          <Link to="/how-we-grow" className="btn-secondary group">
            Explore every step in detail <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      )}

      <Modal open={step !== null} onClose={() => setOpenIndex(null)} labelledBy="step-modal-title" size="max-w-4xl">
        {step && (
          <div className="p-5 sm:p-8">
            <ProcessStepDetail key={step.id} step={step} index={openIndex} total={count} headingLevel="h2" headingId="step-modal-title" />
            <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
              <button type="button" onClick={() => open((openIndex - 1 + count) % count)} className="btn-secondary btn-sm">
                <ChevronLeft className="size-4" aria-hidden /> Previous
              </button>
              <Link to={`/how-we-grow#${step.id}`} onClick={() => setOpenIndex(null)} className="hidden text-sm font-semibold text-brand-700 hover:underline sm:inline">
                Open on How We Grow
              </Link>
              <button type="button" onClick={() => open((openIndex + 1) % count)} className="btn-primary btn-sm">
                Next <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
