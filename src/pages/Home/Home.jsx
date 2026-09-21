import { usePageMeta } from '../../hooks/usePageMeta';
import { site } from '../../config/site';
import Hero from '../../components/home/Hero';
import IndiaStrip from '../../components/home/IndiaStrip';
import {
  ComparisonSection,
  ExploreStepsSection,
  HomeFaqSection,
  HowToUseSection,
  TimelineSection,
  WhatAreSection,
  WhySection,
} from '../../components/home/AwarenessSections';
import ShopOurGreens from '../../components/home/ShopOurGreens';
import RecipesSection from '../../components/home/RecipesSection';
import ProductFinder from '../../components/home/ProductFinder';
import FreshPicks from '../../components/home/FreshPicks';
import ReviewsCarousel from '../../components/home/ReviewsCarousel';
import GreenhouseSection from '../../components/home/GreenhouseSection';
import SubscriptionSection from '../../components/home/SubscriptionSection';
import RecentlyViewed from '../../components/product/RecentlyViewed';

/**
 * Awareness-first home page, in the order of Awareness BRD §13:
 * educate → build trust → show everyday usage → recommend → enable purchase.
 */
export default function Home() {
  usePageMeta(null, site.description);

  return (
    <>
      <Hero />
      <IndiaStrip />
      <WhatAreSection />
      <ComparisonSection />
      <WhySection />
      <TimelineSection />
      <ExploreStepsSection />
      <ShopOurGreens />
      <HowToUseSection />
      {site.features.recipes && <RecipesSection />}
      <ProductFinder />
      {site.features.shop && <FreshPicks />}
      {site.features.testimonials && <ReviewsCarousel />}
      <GreenhouseSection />
      <HomeFaqSection />
      {site.features.subscription && <SubscriptionSection />}
      <div className="container-page">
        <RecentlyViewed className="pb-16 sm:pb-24" />
      </div>
    </>
  );
}
