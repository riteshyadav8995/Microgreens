import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { ArrowRight } from 'lucide-react';
import { faqs } from '../../data/faqs';
import SectionHeading from '../common/SectionHeading';
import Accordion from '../common/Accordion';
import StageJourney from '../education/StageJourney';
import ComparisonTable from '../education/ComparisonTable';
import WhyMicrogreensGrid from '../education/WhyMicrogreensGrid';
import UseCaseGrid from '../education/UseCaseGrid';
import ExploreSteps from '../education/ExploreSteps';
import ProcessTimeline from '../process/ProcessTimeline';

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
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow text-brand-300">Why microgreens?</p>
          <h2 id="why-mg-title" className="mt-3 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Small greens, <em className="text-brand-300">big difference</em> to everyday food
          </h2>
        </div>
        <WhyMicrogreensGrid dark />
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
        <ProcessTimeline showFullLink={false} />
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
