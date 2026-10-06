import { usePageMeta } from '../../hooks/usePageMeta';
import { site } from '../../config/site';
import Hero from '../../components/home/Hero';
import {
  ComparisonSection,
  GrowingBriefSection,
  EatingBriefSection,
  WhatAreSection,
  WhySection,
} from '../../components/home/AwarenessSections';

/** Introduce the basics, then offer short previews of growing and everyday use. */
export default function Home() {
  usePageMeta(null, site.description);

  return (
    <>
      <Hero />
      <WhatAreSection />
      <ComparisonSection />
      <WhySection />
      <GrowingBriefSection />
      <EatingBriefSection />
    </>
  );
}
