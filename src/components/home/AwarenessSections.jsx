import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { ArrowRight } from 'lucide-react';
import { faqs } from '../../data/faqs';
import { useCases } from '../../data/content';
import Icon from '../common/Icon';
import GrowthIllustration from './GrowthIllustration';
import SectionHeading from '../common/SectionHeading';
import Accordion from '../common/Accordion';
import StageJourney from '../education/StageJourney';
import ComparisonTable from '../education/ComparisonTable';
import WhyMicrogreensGrid from '../education/WhyMicrogreensGrid';
import UseCaseGrid from '../education/UseCaseGrid';
import ExploreSteps from '../education/ExploreSteps';
import ProcessTimeline from '../process/ProcessTimeline';
import Reveal from '../common/Reveal';

function MoreLink({ to, children }) {
  return (
    <div className="mt-10 text-center">
      <Link to={to} className="btn-secondary group">
        {children} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
      </Link>
    </div>
  );
}

/** Home §2 — What are microgreens? */
export function WhatAreSection() {
  return (
    <section id="what-are-microgreens" className="section scroll-mt-20" aria-labelledby="what-title">
      <div className="container-page">
        <SectionHeading
          id="what-title"
          eyebrow="New to microgreens? Start here"
          title="What are microgreens?"
          description="Microgreens are young edible plants — vegetables and herbs harvested at an early stage, just after their first leaves open. Same plant, picked much younger."
          align="center"
        />
        <StageJourney />
        <MoreLink to="/what-are-microgreens">Read the full beginner's guide</MoreLink>
      </div>
    </section>
  );
}

/** Home §3 — Microgreens vs Sprouts vs Mature Plants. */
export function ComparisonSection() {
  return (
    <section className="section bg-cream-100" aria-labelledby="vs-title">
      <div className="container-page">
        <SectionHeading
          id="vs-title"
          eyebrow="Clear the confusion"
          title="Microgreens vs sprouts vs mature plants"
          description="They come from the same seeds, but they're harvested at different stages — and eaten differently."
          align="center"
          className="heading-wide"
        />
        <ComparisonTable />
      </div>
    </section>
  );
}

/** Home §4 — Why microgreens? (general value, no medical claims) */
export function WhySection() {
  return (
    <section className="section relative overflow-hidden bg-brand-950 text-cream-100" aria-labelledby="why-mg-title">
      <div className="absolute top-0 right-0 size-[32rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-700/40 blur-3xl" aria-hidden />
      <div className="container-page relative">
        <SectionHeading
          id="why-mg-title"
          eyebrow={<span className="text-brand-300">Why microgreens?</span>}
          title={<span className="text-white">Small greens, <em className="text-brand-300">big difference</em> to everyday food</span>}
          align="center"
        />
        <WhyMicrogreensGrid dark />
      </div>
    </section>
  );
}

/** A short introduction; the full nine-step journey lives on the growing page. */
export function GrowingBriefSection() {
  const steps = [
    { icon: 'Wheat', title: 'Sow the seeds', body: 'Seeds are spread over a growing medium in trays and given moisture to germinate.' },
    { icon: 'Sun', title: 'Let the leaves grow', body: 'With suitable light, air and water, seedlings develop their first leaves.' },
    { icon: 'Scissors', title: 'Harvest young', body: 'The stems and leaves are cut above the roots, often 7–21 days after sowing, depending on the variety.' },
  ];
  return (
    <section className="section" aria-labelledby="grow-brief-title">
      <div className="container-page">
        <SectionHeading
          id="grow-brief-title"
          eyebrow="How we grow"
          title="From seed to young greens"
          description="A quick look at the growing journey, in three simple stages."
          align="center"
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="card overflow-hidden">
              <GrowthIllustration stage={['sow', 'grow', 'harvest'][i]} />
              <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon name={step.icon} className="size-6" />
                </span>
                <span className="text-sm font-semibold text-brand-600">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <MoreLink to="/how-we-grow">Explore all 9 growing steps</MoreLink>
      </div>
    </section>
  );
}

/** A few meal ideas; detailed pairings and handling stay on the eating page. */
export function EatingBriefSection() {
  const meals = ['dal', 'wrap', 'chaat'].map((id) => useCases.find((meal) => meal.id === id));
  return (
    <section className="section bg-cream-100" aria-labelledby="eat-brief-title">
      <div className="container-page">
        <SectionHeading
          id="eat-brief-title"
          eyebrow="How to eat them"
          title="A fresh finish for food you already love"
          description="Rinse gently just before eating, then add a handful at the end, just before serving."
          align="center"
          className="heading-wide"
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {meals.map((meal, i) => (
            <Reveal as="li" key={meal.id} delay={i * 90} className="card overflow-hidden">
              <img src={meal.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="p-6">
                <h3 className="text-2xl">{meal.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{meal.how}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <MoreLink to="/how-to-eat">See meal ideas, washing & storage tips</MoreLink>
      </div>
    </section>
  );
}

/** Home §5 — Seed-to-table timeline. */
export function TimelineSection() {
  return (
    <section className="section bg-cream-100" aria-labelledby="journey-title">
      <div className="container-page">
        <SectionHeading
          id="journey-title"
          eyebrow="From seed to table"
          title="How long does it take? Usually 7–21 days"
          description="Every microgreen goes through the same journey — but each variety has its own pace. Tap a step to see what happens."
          align="center"
        />
        <ProcessTimeline />
      </div>
    </section>
  );
}

/** Home §6 — Explore every step. */
export function ExploreStepsSection() {
  return (
    <section className="section" aria-labelledby="explore-title">
      <div className="container-page">
        <SectionHeading
          id="explore-title"
          eyebrow="Explore every step"
          title="What happens at each stage"
          description="Nine steps, explained simply — from choosing the seed to the box at your door."
          link={{ to: '/how-we-grow', label: 'Full growing guide' }}
        />
        <ExploreSteps />
      </div>
    </section>
  );
}

/** Home §8 — How to use them daily. */
export function HowToUseSection() {
  return (
    <section className="section bg-cream-100" aria-labelledby="use-title">
      <div className="container-page">
        <SectionHeading
          id="use-title"
          eyebrow="How to use them daily"
          title="Made for everyday Indian meals"
          description="Not just salads — sprinkle them on dal, fold them into rotis, top your chaat. The rule: add them at the end."
          link={{ to: '/how-to-eat', label: 'All 9 ways to use them' }}
        />
        <UseCaseGrid limit={6} />
      </div>
    </section>
  );
}

/** Home §14 — FAQ. */
export function HomeFaqSection() {
  const items = faqs
    .filter((f) => ['what-are-microgreens', 'sprouts-difference', 'how-store', 'wash', 'cook', ...(site.features.shop ? ['delivery-areas'] : ['organic'])].includes(f.id))
    .map((f) => ({ id: f.id, title: f.question, content: f.answer }));
  return (
    <section className="section" aria-labelledby="home-faq-title">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="home-faq-title" className="mt-3 text-3xl sm:text-4xl">
            Questions first-timers ask
          </h2>
          <p className="mt-4 text-lg text-muted">{site.features.shop ? 'Storage, washing, cooking and delivery — answered.' : 'Storage, washing and cooking — answered.'}</p>
          <Link to="/faq" className="btn-secondary group mt-6">
            All FAQs <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}
