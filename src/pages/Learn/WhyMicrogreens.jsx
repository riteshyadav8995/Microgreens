import { Link } from 'react-router-dom';
import { ArrowRight, Check, Leaf } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { products } from '../../data/products';
import { faqs } from '../../data/faqs';
import { getNutrientHighlights, NUTRIENT_NOTE } from '../../data/productNutrients';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import Accordion from '../../components/common/Accordion';
import Reveal from '../../components/common/Reveal';
import WhyMicrogreensGrid from '../../components/education/WhyMicrogreensGrid';
import { NextSteps } from './WhatAreMicrogreens';

const nutrientExamples = ['broccoli-microgreens', 'red-cabbage-microgreens', 'radish-microgreens']
  .map((id) => products.find((product) => product.id === id));

const highlights = [
  {
    title: 'Find a flavour you enjoy',
    image: '/images/products/radish-1.webp',
    imageAlt: 'Radish microgreens with tender green leaves and purple stems',
    body: 'Microgreens bring different flavours to the same familiar meal. Broccoli and pea shoots are gentle, radish and mustard have a peppery kick, and sunflower adds a nutty bite. Start with a flavour you already like, then explore something new.',
    points: ['Mild broccoli and pea shoots', 'Peppery radish and mustard', 'Nutty sunflower and familiar methi or dhania'],
    to: '/find-my-microgreen', cta: 'Find a flavour that fits',
  },
  {
    title: 'Add colour and crunch to familiar food',
    image: '/images/recipes/dal-chawal.webp',
    imageAlt: 'Dal and rice, a familiar Indian meal to finish with microgreens',
    body: 'Tender stems and colourful young leaves bring a fresh texture to dal-chawal, poha, chaat, wraps and bowls. You can keep the meal you already enjoy and add a small handful at the end, just before serving.',
    points: ['A fresh finish for everyday Indian meals', 'Green, purple and magenta varieties', 'Add after cooking for a crisp bite'],
    to: '/how-to-eat', cta: 'Explore everyday meal ideas',
  },
  {
    title: 'Make a small fresh-greens habit',
    image: '/images/hero/hero-bowl.webp',
    imageAlt: 'Fresh microgreens falling into a bowl',
    body: 'A gentle rinse and a handful are enough to get started. Try them on a sandwich, in a wrap or over a bowl, and adjust the amount to your taste. Use them alongside the vegetables and other foods you already enjoy.',
    points: ['Rinse gently just before eating', 'Start small and adjust to taste', 'Check each variety for serving and storage guidance'],
    to: '/shop', cta: 'Explore the varieties',
  },
];

export default function WhyMicrogreens() {
  usePageMeta('Why Microgreens?', 'Explore why people add microgreens to everyday meals: nutrient variety, fresh flavours, colour, crunch and simple serving ideas.');
  const faqItems = faqs.filter((f) => ['nutrition-info', 'cook', 'how-much', 'wash'].includes(f.id));

  return (
    <>
      <PageHeader
        image="/images/hero/hero-radish.webp"
        eyebrow="Fresh possibilities for everyday food"
        title="Why Microgreens?"
        description="Fresh flavours, colourful leaves and a little crunch. Discover what microgreens bring to your plate, from nutrient variety to simple everyday meal ideas."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Why Microgreens?' }]}
      />

      <section className="section" aria-labelledby="why-benefits-title">
        <div className="container-page">
          <SectionHeading id="why-benefits-title" eyebrow="What they bring" title="Small additions, fresh possibilities" description="There are plenty of everyday reasons to enjoy these young vegetables and herbs." align="center" />
          <WhyMicrogreensGrid columns="lg:grid-cols-3" />
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="why-nutrition-title">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="min-w-0">
            <p className="eyebrow"><Leaf className="size-4" aria-hidden /> Nutrient variety</p>
            <h2 id="why-nutrition-title" className="mt-3 text-3xl leading-tight sm:text-4xl">Young leaves, with nutrients to explore</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">Research on vegetable microgreens has measured vitamins C, E and K, carotenoids and minerals such as potassium, calcium, iron and zinc. The nutrient profile differs between varieties, and amounts also depend on growing and handling conditions.</p>
            <p className="mt-4 leading-relaxed text-muted">Compare the general highlights for a few familiar varieties, then open a variety page for more detail.</p>
            <p className="mt-5 text-xs leading-relaxed text-muted">{NUTRIENT_NOTE}</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-brand-700">
              <a href="https://www.ars.usda.gov/news-events/news/research-news/2014/specialty-greens-pack-a-nutritional-punch/" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">USDA vitamin & carotenoid research</a>
              <a href="https://www.ars.usda.gov/research/publications/publication/?seqNo115=324529" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">USDA mineral research</a>
            </div>
          </Reveal>
          <ul className="grid gap-4" aria-label="Examples of nutrient highlights">
            {nutrientExamples.map((product, i) => (
              <Reveal as="li" key={product.id} delay={i * 80} className="min-w-0">
                <Link to={`/product/${product.id}`} className="group card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:border-brand-300 sm:gap-4 sm:p-5">
                  <img src={product.images[0]} alt="" loading="lazy" className="size-16 shrink-0 rounded-xl object-cover sm:size-20" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl leading-tight text-brand-950">{product.name}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted">{getNutrientHighlights(product).join(' · ')}</span>
                    <span className="mt-2 block text-xs font-semibold text-brand-700">View variety</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-brand-700 transition group-hover:translate-x-1" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label="Flavour, texture and everyday use">
        <div className="container-page space-y-16 sm:space-y-24">
          {highlights.map((item, i) => (
            <div key={item.title} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={`min-w-0 ${i % 2 ? 'lg:order-2' : ''}`}>
                <img src={item.image} alt={item.imageAlt} loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-card" />
              </Reveal>
              <Reveal delay={100} className="min-w-0">
                <p className="eyebrow">0{i + 1}</p>
                <h2 className="mt-3 text-3xl sm:text-4xl">{item.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{item.body}</p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 font-medium text-brand-950">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white"><Check className="size-3.5" aria-hidden /></span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link to={item.to} className="btn-secondary group mt-7">{item.cta}<ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="why-faq">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="min-w-0">
            <p className="eyebrow">Straight answers</p>
            <h2 id="why-faq" className="mt-3 text-3xl sm:text-4xl">Before your first handful</h2>
            <p className="mt-4 text-lg text-muted">Quick answers about nutrient highlights, rinsing and adding microgreens to your meals.</p>
            <Link to="/faq" className="btn-secondary group mt-6">All FAQs <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></Link>
          </div>
          <Accordion items={faqItems.map((f) => ({ id: f.id, title: f.question, content: f.answer }))} />
        </div>
      </section>
      <div className="pt-16 sm:pt-24"><NextSteps /></div>
    </>
  );
}
