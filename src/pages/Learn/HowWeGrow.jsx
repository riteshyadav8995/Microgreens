import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { getProducts } from '../../services/api';
import { growingSteps } from '../../data/content';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import ProcessTimeline from '../../components/process/ProcessTimeline';
import ProcessStepDetail from '../../components/process/ProcessStepDetail';
import { harvestRange } from '../../components/process/VarietyTimeline';
import { TextSkeleton } from '../../components/common/Skeletons';
import { NextSteps } from './WhatAreMicrogreens';

export default function HowWeGrow() {
  usePageMeta('How We Grow — Seed to Table', 'Every step of growing microgreens explained: seed selection, seeding, germination, blackout, light, monitoring, harvest, post-harvest and delivery.');
  const { data: products, loading } = useAsync(getProducts, []);
  const varieties = (products ?? [])
    .filter((p) => p.category !== 'combos' && harvestRange(p.growingPeriod))
    .sort((a, b) => harvestRange(a.growingPeriod)[0] - harvestRange(b.growingPeriod)[0]);

  return (
    <>
      <PageHeader
        image="/images/farm/led-racks.webp"
        eyebrow="How we grow"
        title="From seed to your table, step by step"
        description="Most microgreens take roughly 7–21 days. Here is exactly what happens in each stage — and why it matters for what reaches your plate."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'How We Grow' }]}
      />

      <section className="section bg-cream-100" aria-labelledby="timeline-title">
        <div className="container-page">
          <SectionHeading
            id="timeline-title"
            eyebrow="The seed-to-table timeline"
            title="9 steps, one to three weeks"
            description="Tap any step to see what happens. The bar shows the four growth phases: seed, germination, growth and harvest."
            align="center"
          />
          <ProcessTimeline showFullLink={false} />
        </div>
      </section>

      <section className="section" aria-labelledby="detail-title">
        <div className="container-page">
          <SectionHeading id="detail-title" eyebrow="Explore every step" title="What happens at each stage" align="center" />
          <div className="space-y-16 sm:space-y-24">
            {growingSteps.map((s, i) => (
              <article key={s.id} id={s.id} className="scroll-mt-28">
                <div className={i % 2 ? 'md:[&>div>div:first-child]:order-2' : ''}>
                  <ProcessStepDetail step={s} index={i} total={growingSteps.length} headingLevel="h3" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="variety-title">
        <div className="container-page">
          <SectionHeading
            id="variety-title"
            eyebrow="Every variety is different"
            title="Typical harvest time by variety"
            description="There's no single number for all microgreens. These are the typical ranges for our varieties — each product page shows its own timeline."
            align="center"
          />
          {loading ? (
            <TextSkeleton lines={6} />
          ) : (
            <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
              <table className="w-full min-w-[560px] text-left text-sm">
                <caption className="sr-only">Typical days from sowing to harvest for each variety</caption>
                <thead>
                  <tr className="border-b border-line bg-brand-50 text-brand-900">
                    <th scope="col" className="p-4 font-semibold">Variety</th>
                    <th scope="col" className="p-4 font-semibold">Typical harvest</th>
                    <th scope="col" className="w-2/5 p-4 font-semibold">
                      <span className="sr-only">Visual range</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {varieties.map((p) => {
                    const [min, max] = harvestRange(p.growingPeriod);
                    return (
                      <tr key={p.id} className="border-b border-line last:border-0">
                        <th scope="row" className="p-4 font-medium">
                          <Link to={`/product/${p.id}`} className="flex items-center gap-3 hover:text-brand-700">
                            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                              <Sprout className="size-5" aria-hidden />
                            </span>
                            <span>
                              {p.name}
                              <span className="hindi block text-xs text-muted" lang="hi">{p.hindiName}</span>
                            </span>
                          </Link>
                        </th>
                        <td className="p-4 text-muted">{min}–{max} days</td>
                        <td className="p-4" aria-hidden>
                          <div className="relative h-2.5 rounded-full bg-cream-200">
                            <span className="absolute inset-y-0 rounded-full bg-brand-600" style={{ left: `${(min / 22) * 100}%`, right: `${100 - (max / 22) * 100}%` }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-4 text-center text-xs text-muted">Educational ranges. Actual timing varies with season and growing conditions.</p>
          <div className="mt-8 text-center">
            <Link to="/our-farm" className="btn-primary">
              See our farm
            </Link>
          </div>
        </div>
      </section>

      <div className="pt-16 sm:pt-24">
        <NextSteps />
      </div>
    </>
  );
}
