import { usePageMeta } from '../../hooks/usePageMeta';
import { site } from '../../config/site';
import Hero from '../../components/home/Hero';
import {
  ComparisonSection,
  TimelineSection,
  WhatAreSection,
  WhySection,
} from '../../components/home/AwarenessSections';
import FreshPicks from '../../components/home/FreshPicks';
import HomeCTA from '../../components/home/HomeCTA';

/**
 * Awareness-first home page, in the order of Awareness BRD §13:
 * educate → build trust → show everyday usage → recommend → enable purchase.
 */
export default function Home() {
  usePageMeta(null, site.description);

  return (
    <>
      <Hero />
      <WhatAreSection />
      <ComparisonSection />
      <WhySection />
      <TimelineSection />
      <FreshPicks />
      <HomeCTA />
    </>
  );
}
