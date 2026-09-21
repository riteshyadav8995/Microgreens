import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync';
import { getTestimonials, getProducts } from '../../services/api';
import { site } from '../../config/site';
import SectionHeading from '../common/SectionHeading';
import ReviewCard from '../review/ReviewCard';
import { DemoBadge } from '../common/States';

const AUTO_MS = 6000;

/** Scroll-snap carousel: swipeable on touch, buttons + dots on desktop, pauses on hover/focus. */
export default function ReviewsCarousel() {
  const { data } = useAsync(() => Promise.all([getTestimonials(), getProducts()]), []);
  const [testimonials, products] = data || [[], []];
  const track = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    setPages(total);
    setPage(Math.min(total - 1, Math.round(el.scrollLeft / el.clientWidth)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, testimonials.length]);

  const goTo = (p) => {
    const el = track.current;
    if (!el) return;
    const next = (p + pages) % pages;
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || pages < 2) return undefined;
    const t = setTimeout(() => goTo(page + 1), AUTO_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, paused, pages]);

  const productName = (id) => products.find((p) => p.id === id)?.name;

  return (
    <section
      className="section bg-cream-100"
      aria-labelledby="reviews-home-title"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="reviews-home-title" eyebrow="Customer love" title="What our customers say" spacing="" />
          <div className="flex items-center gap-3">
            {site.demoMode && <DemoBadge>Sample testimonials</DemoBadge>}
            <button type="button" onClick={() => goTo(page - 1)} className="icon-btn size-12 border border-line bg-white" aria-label="Previous testimonials">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => goTo(page + 1)} className="icon-btn size-12 border border-line bg-white" aria-label="Next testimonials">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div ref={track} onScroll={measure} className="no-scrollbar -mx-2 mt-10 flex snap-x snap-mandatory overflow-x-auto scroll-smooth">
          {testimonials.length === 0
            ? Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="w-full shrink-0 px-2 md:w-1/2 lg:w-1/3">
                  <div className="skeleton h-72 rounded-3xl" />
                </div>
              ))
            : testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className="w-full shrink-0 snap-start px-2 md:w-1/2 lg:w-1/3"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${testimonials.length}`}
                >
                  <ReviewCard review={t} variant="testimonial" productName={productName(t.productId)} />
                </div>
              ))}
        </div>

        {pages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide group ${i + 1}`}
                aria-current={i === page ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all ${i === page ? 'w-8 bg-brand-700' : 'w-2.5 bg-brand-200 hover:bg-brand-400'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
