import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { Flame, Leaf } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { getProducts } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import UseCaseGrid from '../../components/education/UseCaseGrid';
import HandlingGuide from '../../components/education/HandlingGuide';
import RecipesSection from '../../components/home/RecipesSection';
import { NextSteps } from './WhatAreMicrogreens';

export default function HowToEat() {
  usePageMeta('How to Eat Microgreens', 'Everyday Indian ways to use microgreens — breakfast, dal, chaat, rotis, rice bowls, smoothies and more — plus washing and storage tips.');
  const { data: products } = useAsync(getProducts, []);
  const singles = (products ?? []).filter((p) => p.category !== 'combos');
  const raw = singles.filter((p) => p.howToEat === 'raw');
  const both = singles.filter((p) => p.howToEat === 'raw-or-warm');

  return (
    <>
      <PageHeader
        image="/images/recipes/dal-chawal.webp"
        eyebrow="How to eat microgreens"
        title="“I bought microgreens. Now what?”"
        description="Use them in the food you already cook — dal, chaat, parathas, rolls, rice bowls and more. Nothing fancy needed."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'How to Eat' }]}
      />

      <section className="section" aria-labelledby="golden-title">
        <div className="container-page">
          <div className="rounded-[2rem] bg-brand-900 p-8 text-center text-white sm:p-12">
            <p className="eyebrow text-brand-300">The one rule to remember</p>
            <h2 id="golden-title" className="mx-auto mt-3 max-w-3xl text-3xl text-white sm:text-4xl">
              Add microgreens at the end — after cooking, just before eating.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              They're delicate. A handful on top of hot food keeps their crunch, colour and flavour. Long cooking makes them wilt.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="uses-title">
        <div className="container-page">
          <SectionHeading
            id="uses-title"
            eyebrow="Everyday cooking in India"
            title="Nine easy ways to use them daily"
            description={site.features.recipes ? 'Pick a meal, see which varieties suit it, then jump to a recipe.' : 'Pick a meal and see which varieties suit it best.'}
          />
          <UseCaseGrid detailed />
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="handling-title">
        <div className="container-page">
          <SectionHeading id="handling-title" eyebrow="Handling & washing" title="Store, rinse and serve" description="Simple habits that keep your greens fresh and crisp." />
          <HandlingGuide />
          <p className="mt-4 text-xs text-muted">Always follow the storage instructions printed on your box.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="raw-title">
        <div className="container-page">
          <SectionHeading id="raw-title" eyebrow="Raw or cooked?" title="Which ones can go into warm food?" align="center" />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { icon: Leaf, title: 'Best eaten raw', body: 'Add just before serving — on salads, chaat, wraps and as garnish.', list: raw, tone: 'bg-brand-50' },
              { icon: Flame, title: 'Raw or stirred into warm food', body: 'Also lovely stirred into dal, pulao or parathas after cooking.', list: both, tone: 'bg-turmeric-100' },
            ].map(({ icon: I, title, body, list, tone }) => (
              <div key={title} className={`rounded-3xl p-6 sm:p-8 ${tone}`}>
                <h3 className="flex items-center gap-2 text-2xl">
                  <I className="size-6 text-brand-700" aria-hidden /> {title}
                </h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {list.map((p) => (
                    <li key={p.id}>
                      <Link to={`/product/${p.id}`} className="chip bg-white text-xs">
                        {p.name.replace(/ Microgreens$/, '')}{' '}
                        <span className="hindi text-muted" lang="hi">{p.hindiName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {site.features.recipes && <RecipesSection />}
      <div className="pt-16 sm:pt-24">
        <NextSteps />
      </div>
    </>
  );
}
