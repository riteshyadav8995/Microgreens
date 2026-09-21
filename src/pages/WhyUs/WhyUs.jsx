import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { whyPillars } from '../../data/content';
import ComparisonTable from '../../components/education/ComparisonTable';
import { faqs } from '../../data/faqs';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import Accordion from '../../components/common/Accordion';
import Icon from '../../components/common/Icon';
import Reveal from '../../components/common/Reveal';

const promises = [
  { title: 'Freshness', image: '/images/farm/harvest-2.webp', body: 'Sown on a rolling schedule and cut in small batches, so greens spend as little time as possible between tray and table.', points: ['Harvest date on every box', 'Chilled delivery bags', 'Clear shelf-life guidance'] },
  { title: 'Quality', image: '/images/farm/tray-care.webp', body: 'Every tray is checked daily. We harvest only when the first leaves have fully opened, and grade before packing.', points: ['Hand harvested', 'Bottom-watered, clean leaves', 'Ventilated, sturdy boxes'] },
  { title: 'Local', image: '/images/farm/trays.webp', body: 'Grown close to the cities we deliver in, with Indian greens like methi, dhania and chaulai alongside global favourites.', points: ['Short travel time', 'Indian varieties', 'Support for local growing'] },
  { title: 'Sustainability', image: '/images/farm/seedlings.webp', body: "We'd rather show our work than make big claims. Here's what we do today and what we're working on.", points: ['Reusable growing trays', 'Grow to order, less waste', 'Testing compostable packaging'] },
];

export default function WhyUs() {
  usePageMeta('Why Microgreen', 'Freshness, quality, local growing and honest information — why Indian kitchens choose Microgreen.');
  const faqItems = faqs.filter((f) => ['what-are-microgreens', 'sprouts-difference', 'organic', 'nutrition-info'].includes(f.id));

  return (
    <>
      <PageHeader
        image="/images/farm/workbench.webp"
        eyebrow="Why Microgreen"
        title="Fresh, local and honest — by design"
        description="What makes our greens different isn't a secret formula. It's small batches, careful hands and telling you exactly what you're buying."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Why Microgreen' }]}
      />

      <section className="section" aria-labelledby="pillars-title">
        <div className="container-page">
          <SectionHeading id="pillars-title" eyebrow="What we stand for" title="Six reasons to choose us" align="center" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyPillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 60} className="card p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon name={p.icon} className="size-6" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold tracking-normal">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-cream-100" aria-label="Our promises">
        <div className="container-page space-y-16 sm:space-y-24">
          {promises.map((p, i) => (
            <div key={p.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 ? 'lg:order-2' : ''}>
                <img src={p.image} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-card" />
              </Reveal>
              <Reveal delay={100}>
                <p className="eyebrow">0{i + 1}</p>
                <h2 className="mt-3 text-3xl sm:text-4xl">{p.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{p.body}</p>
                <ul className="mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 font-medium text-brand-950">
                      <span className="grid size-6 place-items-center rounded-full bg-brand-600 text-white">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="compare-title">
        <div className="container-page">
          <SectionHeading
            id="compare-title"
            eyebrow="Know your greens"
            title="Sprouts, microgreens & mature plants"
            description="They're often confused — here's how they differ."
            align="center"
          />
          <ComparisonTable />
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="why-faq">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Straight answers</p>
            <h2 id="why-faq" className="mt-3 text-3xl sm:text-4xl">
              Questions about our claims?
            </h2>
            <p className="mt-4 text-lg text-muted">We only say what we can back up. If something isn't verified yet, we'll tell you.</p>
            <Link to="/faq" className="btn-secondary group mt-6">
              All FAQs <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <Accordion items={faqItems.map((f) => ({ id: f.id, title: f.question, content: f.answer }))} />
        </div>
      </section>
    </>
  );
}
