import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Scissors, Timer } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { faqs } from '../../data/faqs';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import Accordion from '../../components/common/Accordion';
import StageJourney from '../../components/education/StageJourney';
import ComparisonTable from '../../components/education/ComparisonTable';
import WhyMicrogreensGrid from '../../components/education/WhyMicrogreensGrid';

const FACTS = [
  { icon: Leaf, title: 'Young edible plants', body: 'Vegetables and herbs picked at a very early stage — not seeds, not full-grown plants.' },
  { icon: Timer, title: 'Often 7–21 days', body: 'From sowing to harvest, depending on the variety. Radish is quick; coriander takes longer.' },
  { icon: Scissors, title: 'Cut above the root', body: 'You eat the tender stem and first leaves. The seed and root stay behind in the tray.' },
];

export default function WhatAreMicrogreens() {
  usePageMeta('What Are Microgreens?', 'A simple guide for first-timers: what microgreens are, how they differ from sprouts and mature vegetables, and why people love them.');
  const questions = faqs.filter((f) => f.category === 'microgreens' || ['how-store', 'wash', 'cook'].includes(f.id));

  return (
    <>
      <PageHeader
        image="/images/hero/hero-radish.webp"
        eyebrow="Microgreens 101"
        title="What are microgreens?"
        description="Microgreens are young edible plants harvested at an early stage of growth — tiny in size, big in flavour and colour."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'What Are Microgreens?' }]}
      />

      <section className="section" aria-labelledby="simple-title">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">In simple words</p>
            <h2 id="simple-title" className="mt-3 text-3xl leading-tight sm:text-4xl">
              Think of them as “baby vegetables and herbs”.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              A seed of broccoli, mooli, methi or sunflower is sown in a tray. After it sprouts and opens its first pair of leaves, it is cut
              and eaten. That young plant is a <strong className="text-brand-900">microgreen</strong>. If it were left to grow for weeks, it would
              become the regular vegetable you know.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {FACTS.map(({ icon: I, title, body }) => (
              <li key={title} className="card flex gap-4 p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  <I className="size-6" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold text-brand-950">{title}</span>
                  <span className="mt-1 block text-sm text-muted">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="stages-title">
        <div className="container-page">
          <SectionHeading
            id="stages-title"
            eyebrow="From seed to plant"
            title="Seed → Sprout → Microgreen → Mature plant"
            description="The same plant goes through all four stages. Microgreens are harvested at stage three."
            align="center"
          />
          <StageJourney />
        </div>
      </section>

      <section className="section" aria-labelledby="compare-title">
        <div className="container-page">
          <SectionHeading
            id="compare-title"
            eyebrow="Clear the confusion"
            title="Microgreens vs sprouts vs mature plants"
            description="Sprouts and microgreens are often mixed up. Here's how they differ."
            align="center"
          />
          <ComparisonTable />
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="why-title">
        <div className="container-page">
          <SectionHeading id="why-title" eyebrow="Why microgreens?" title="Why people add them to everyday food" align="center" />
          <WhyMicrogreensGrid />
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted">
            Microgreens are food, not medicine. We don't make health claims; verified nutrition information will be shared per product once
            lab-tested.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Common questions</p>
            <h2 id="faq-title" className="mt-3 text-3xl sm:text-4xl">
              Still wondering?
            </h2>
            <p className="mt-4 text-lg text-muted">Quick answers for first-time buyers.</p>
          </div>
          <Accordion items={questions.map((f) => ({ id: f.id, title: f.question, content: f.answer }))} defaultOpen={['what-are-microgreens']} />
        </div>
      </section>

      <NextSteps />
    </>
  );
}

export function NextSteps() {
  const links = [
    { to: '/how-we-grow', title: 'How we grow', body: 'Follow all 9 steps from seed to your table.' },
    { to: '/how-to-eat', title: 'How to eat them', body: 'Everyday Indian meals, from dal to dosa.' },
    { to: '/find-my-microgreen', title: 'Find my microgreen', body: 'Three questions, a perfect match.' },
  ];
  return (
    <section className="pb-16 sm:pb-24" aria-label="Keep learning">
      <div className="container-page grid gap-4 md:grid-cols-3">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="group rounded-3xl bg-brand-900 p-7 text-white transition hover:bg-brand-800">
            <p className="font-display text-2xl">{l.title}</p>
            <p className="mt-2 text-sm text-white/75">{l.body}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-turmeric-400">
              Continue <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
