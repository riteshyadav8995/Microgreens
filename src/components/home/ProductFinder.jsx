import { useState } from 'react';
import { ArrowLeft, Lightbulb, RotateCcw, Sparkles } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync';
import { getProducts } from '../../services/api';
import { recommendProducts } from '../../utils/product';
import { storage } from '../../utils/storage';
import ProductCard from '../product/ProductCard';
import { ProductGridSkeleton } from '../common/Skeletons';

// Questions exactly as specified in Awareness BRD §12.
const STEPS = [
  {
    key: 'taste',
    short: 'Taste',
    question: 'Which taste do you prefer?',
    options: [
      { id: 'mild', emoji: '🌿', label: 'Mild', hint: 'Fresh and gentle' },
      { id: 'spicy', emoji: '🌶️', label: 'Spicy', hint: 'A peppery, mooli-like kick' },
      { id: 'nutty', emoji: '🌻', label: 'Nutty', hint: 'Crunchy and a little sweet' },
      { id: 'earthy', emoji: '🍃', label: 'Earthy', hint: 'Deep, bitter-sweet like methi' },
      { id: 'strong', emoji: '🔥', label: 'Strong', hint: 'Bold, aromatic flavours' },
    ],
  },
  {
    key: 'use',
    short: 'Use',
    question: 'How will you mostly use them?',
    options: [
      { id: 'salad', emoji: '🥗', label: 'Salad', hint: 'Salads and raita' },
      { id: 'dal', emoji: '🍛', label: 'Dal', hint: 'Dal, sabzi and Indian meals' },
      { id: 'wrap', emoji: '🌯', label: 'Wrap', hint: 'Rotis, rolls and sandwiches' },
      { id: 'smoothie', emoji: '🥤', label: 'Smoothie', hint: 'Smoothies and juices' },
      { id: 'garnish', emoji: '🍽️', label: 'Garnish', hint: 'Topping and plating' },
      { id: 'bowl', emoji: '🥣', label: 'Bowl', hint: 'Rice and grain bowls' },
    ],
  },
  {
    key: 'level',
    short: 'Experience',
    question: 'How often do you eat microgreens?',
    options: [
      { id: 'first', emoji: '👋', label: 'First time', hint: 'Keep it easy and versatile' },
      { id: 'sometimes', emoji: '😊', label: 'Sometimes', hint: 'Show me what fits best' },
      { id: 'regular', emoji: '👩‍🍳', label: 'Regular user', hint: 'Help me try something new' },
    ],
  },
];

/** "Find My Microgreen" — 3 questions → 2–4 products with a reason. Answers persist as demo preferences. */
export default function ProductFinder({ standalone = false }) {
  const [saved] = useState(() => {
    const prefs = storage.get('finder_prefs', null);
    // Ignore answers saved by an older version of the quiz.
    const valid = prefs && STEPS.every((s) => s.options.some((o) => o.id === prefs[s.key]));
    return valid ? prefs : null;
  });
  const [answers, setAnswers] = useState(saved || {});
  const [step, setStep] = useState(saved ? STEPS.length : 0);
  const { data: products, loading } = useAsync(getProducts, []);

  const done = step >= STEPS.length;
  const current = STEPS[step];
  const results = done && products ? recommendProducts(products, answers) : [];

  const choose = (value) => {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    setStep((s) => s + 1);
    if (step === STEPS.length - 1) storage.set('finder_prefs', next);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    storage.remove('finder_prefs');
  };

  const labelFor = (s) => s.options.find((o) => o.id === answers[s.key])?.label;
  const Title = standalone ? 'h1' : 'h2';

  return (
    <section id="find-your-microgreen" className={`scroll-mt-20 ${standalone ? 'py-10 sm:py-14' : 'section bg-cream-100'}`} aria-labelledby="finder-title">
      <div className="container-page">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-card">
          <div className="grid lg:grid-cols-[0.8fr_1.6fr]">
            <div className="relative isolate overflow-hidden bg-brand-800 p-8 text-white sm:p-10">
              <div className="absolute inset-0 -z-10 bg-linear-to-br from-brand-900/90 to-brand-700/70" aria-hidden />
              <p className="eyebrow text-turmeric-400">
                <Sparkles className="size-4" aria-hidden /> Find my microgreen
              </p>
              <Title id="finder-title" className="mt-4 text-3xl leading-tight text-white sm:text-4xl">
                Which microgreen is right for you?
              </Title>
              <p className="mt-4 text-white/80">Answer three quick questions — we'll suggest 2 to 4 greens and tell you why.</p>

              <ol className="mt-8 space-y-3" aria-label="Progress">
                {STEPS.map((s, i) => (
                  <li key={s.key} className="flex items-center gap-3 text-sm">
                    <span
                      className={`grid size-7 place-items-center rounded-full text-xs font-bold ${
                        i < step ? 'bg-turmeric-400 text-brand-950' : i === step ? 'bg-white text-brand-900' : 'bg-white/15 text-white/70'
                      }`}
                    >
                      {i < step ? '✓' : i + 1}
                    </span>
                    <span className={i <= step ? 'text-white' : 'text-white/60'}>
                      {s.short}
                      {i < step && labelFor(s) && <span className="text-white/60"> — {labelFor(s)}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-6 sm:p-10" aria-live="polite">
              {!done && (
                <div key={step} className="animate-fade-up">
                  <p className="text-sm font-semibold text-brand-600">
                    Question {step + 1} of {STEPS.length}
                  </p>
                  <h3 className="mt-2 text-2xl sm:text-3xl">{current.question}</h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3" role="group" aria-label={current.question}>
                    {current.options.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => choose(o.id)}
                        aria-pressed={answers[current.key] === o.id}
                        className={`group flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-50 ${
                          answers[current.key] === o.id ? 'border-brand-600 bg-brand-50' : 'border-line bg-white'
                        }`}
                      >
                        <span className="text-2xl" aria-hidden>
                          {o.emoji}
                        </span>
                        <span>
                          <span className="block font-semibold text-brand-950">{o.label}</span>
                          <span className="mt-0.5 block text-sm text-muted">{o.hint}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-ghost btn-sm mt-6 -ml-3">
                      <ArrowLeft className="size-4" aria-hidden /> Back
                    </button>
                  )}
                </div>
              )}

              {done && (
                <div className="animate-fade-up">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-brand-600">Your matches</p>
                      <h3 className="mt-1 text-2xl sm:text-3xl">We think you'll love these</h3>
                      <p className="mt-1 text-sm text-muted">
                        Based on: {STEPS.map(labelFor).filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <button type="button" onClick={restart} className="btn-secondary btn-sm">
                      <RotateCcw className="size-4" aria-hidden /> Start over
                    </button>
                  </div>
                  <div className="mt-6">
                    {loading ? (
                      <ProductGridSkeleton count={3} className="xl:grid-cols-3" />
                    ) : (
                      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 2xl:grid-cols-3">
                        {results.map(({ product, reason }) => (
                          <li key={product.id} className="flex flex-col gap-2">
                            <p className="flex items-start gap-1.5 rounded-2xl bg-turmeric-100 px-3 py-2 text-xs font-medium text-turmeric-700">
                              <Lightbulb className="mt-0.5 size-3.5 shrink-0" aria-hidden /> {reason}
                            </p>
                            <div className="flex-1 [&>article]:h-full">
                              <ProductCard product={product} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
