import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { whyPillars } from '../../data/content';
import { site } from '../../config/site';
import { faqs } from '../../data/faqs';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import Accordion from '../../components/common/Accordion';
import Icon from '../../components/common/Icon';
import Reveal from '../../components/common/Reveal';
import { NextSteps } from '../Learn/WhatAreMicrogreens';

const highlights = [
  { title: 'Start with the flavours you enjoy', image: '/images/products/radish-1.webp', body: 'Microgreens vary in taste and texture. If you prefer something gentle, explore broccoli or pea shoots. For a stronger flavour, try radish or mustard. Each variety page helps you decide what suits your plate.', points: ['Taste and texture notes', 'Mild, peppery, nutty and herby choices', 'Suggestions based on your preferences'] },
  { title: 'Make them part of everyday meals', image: '/images/recipes/dal-chawal.webp', body: 'You can start with a meal you already enjoy. Add a little dhania to chaat, mustard to dal or sunflower to a wrap. Our guides suggest pairings and explain when to add the greens.', points: ['Ideas for dal, poha, chaat and wraps', 'Varieties matched to meal types', 'Simple serving and storage guidance'] },
  { title: 'Know what you are choosing', image: '/images/farm/seedlings.webp', body: 'Our variety pages explain flavour, typical growing time and ways to use each microgreen. The growing guide gives you the context behind those young leaves, so you can explore with confidence.', points: ['A step-by-step growing guide', 'Variety-specific information', 'Clear differences between sprouts and microgreens'] },
  { title: 'Information you can check', image: '/images/farm/workbench.webp', body: 'You should be able to understand a product before choosing it. Our nutrient highlights draw on published research and are clearly distinguished from product-specific lab results. Certification details will be listed when officially in place. If you need more detail, ask us directly.', points: ['Research-based nutrient highlights', 'Clear notes on amounts and verification', 'Contact us with product questions'] },
];

export default function WhyUs() {
  usePageMeta(`Why ${site.name}`, `Explore ${site.name}: flavour choices, everyday Indian meal ideas and clear information to help you choose microgreens.`);
  const faqItems = faqs.filter((f) => ['organic', 'nutrition-info'].includes(f.id));

  return (
    <>
      <PageHeader
        image="/images/farm/workbench.webp"
        eyebrow={`Why ${site.name}`}
        title="Find greens that fit your taste and your kitchen"
        description={`${site.name} brings together familiar varieties, simple meal ideas and clear product guidance to help you get started with microgreens.`}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: `Why ${site.name}` }]}
      />

      <section className="section" aria-labelledby="pillars-title">
        <div className="container-page">
          <SectionHeading id="pillars-title" eyebrow="Why explore with us?" title="Six ways we help you get started" align="center" />
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

      <section className="section bg-cream-100" aria-label="Choosing your microgreens">
        <div className="container-page space-y-16 sm:space-y-24">
          {highlights.map((p, i) => (
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

      <section className="section" aria-labelledby="basics-title">
        <div className="container-page text-center">
          <h2 id="basics-title" className="text-3xl sm:text-4xl">Need a refresher on the basics?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">Our beginner's guide explains what microgreens are and how they differ from sprouts and mature plants.</p>
          <Link to="/what-are-microgreens" className="btn-secondary group mt-6">
            Read the beginner's guide <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="why-faq">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Straight answers</p>
            <h2 id="why-faq" className="mt-3 text-3xl sm:text-4xl">
              Questions about nutrition or certification?
            </h2>
            <p className="mt-4 text-lg text-muted">Learn how we describe nutrient highlights and certification status. For questions about a specific variety, contact us.</p>
            <Link to="/faq" className="btn-secondary group mt-6">
              All FAQs <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <Accordion items={faqItems.map((f) => ({ id: f.id, title: f.question, content: f.answer }))} />
        </div>
      </section>
      <div className="pt-16 sm:pt-24">
        <NextSteps />
      </div>
    </>
  );
}
