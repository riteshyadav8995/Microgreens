import { Link } from 'react-router-dom';
import { ArrowRight, ChefHat, ListChecks, Timer } from 'lucide-react';
import { site } from '../../config/site';

/** Hero + logo moment — invites visitors to learn first, shop second (Awareness BRD §13). */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cream-100" aria-labelledby="hero-title">
      <div className="absolute -top-40 -right-32 -z-10 size-[36rem] rounded-full bg-brand-100/70 blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 -left-40 -z-10 size-[28rem] rounded-full bg-turmeric-100/80 blur-3xl" aria-hidden />

      <div className="container-page grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div className="max-w-xl">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-brand-800 backdrop-blur">
            <span className="size-2 rounded-full bg-brand-500" aria-hidden />
            {site.secondaryTagline}
          </p>
          <h1 id="hero-title" className="mt-6 animate-fade-up text-5xl leading-[1.02] font-medium [animation-delay:80ms] sm:text-6xl lg:text-7xl">
            Small Greens.
            <br />
            <em className="font-semibold text-brand-700">Big Nutrition.</em>
          </h1>
          <p className="mt-6 animate-fade-up text-lg leading-relaxed text-muted [animation-delay:160ms] sm:text-xl">
            Microgreens are <span className="font-medium text-ink">young edible plants</span> — broccoli, mooli, methi, sunflower and more —
            harvested just after their first leaves open, usually <span className="font-medium text-ink">7–21 days after sowing</span>. Learn how
            they grow and how to add them to your daily meals.
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <Link to="/what-are-microgreens" className="btn-primary btn-lg group">
              What are microgreens? <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link to={site.features.shop ? '/shop' : '/how-we-grow'} className="btn-secondary btn-lg">
              {site.features.shop ? 'Shop now' : 'How we grow'}
            </Link>
          </div>
          <ul className="mt-10 grid animate-fade-up grid-cols-3 gap-4 border-t border-brand-900/10 pt-6 [animation-delay:320ms]">
            {[
              { icon: Timer, label: '7–21 days seed to harvest*', to: '/how-we-grow' },
              { icon: ListChecks, label: '9 transparent growing steps', to: '/how-we-grow' },
              { icon: ChefHat, label: 'Made for Indian meals', to: '/how-to-eat' },
            ].map(({ icon: I, label, to }) => (
              <li key={label}>
                <Link to={to} className="flex flex-col gap-2 text-sm font-medium text-brand-950 hover:text-brand-700 sm:flex-row sm:items-center">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-brand-600 shadow-sm">
                    <I className="size-5" aria-hidden />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.7rem] text-muted">*Varies by variety.</p>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-soft sm:aspect-square lg:aspect-[4/5]">
            <img
              src="/images/hero/hero-main.webp"
              alt="A tray of fresh green microgreens growing indoors"
              fetchPriority="high"
              width="1600"
              height="1200"
              className="size-full animate-fade-in object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/30 via-transparent to-transparent" aria-hidden />
          </div>

          {/* Seed → Sprout → Microgreen mini journey */}
          <Link
            to="/what-are-microgreens"
            className="absolute -bottom-6 -left-2 flex animate-float items-center gap-2 rounded-3xl bg-white p-3 pr-4 shadow-soft sm:-left-8"
            aria-label="Seed, sprout, microgreen — learn the stages"
          >
            {[
              ['/images/products/sunflower-seeds.webp', 'Seed'],
              ['/images/products/pea-4.webp', 'Sprout'],
              ['/images/products/radish-1.webp', 'Microgreen'],
            ].map(([src, label], i) => (
              <span key={label} className="flex items-center gap-2">
                {i > 0 && <ArrowRight className="size-3.5 text-brand-400" aria-hidden />}
                <span className="flex flex-col items-center">
                  <img src={src} alt="" className={`rounded-2xl object-cover ${i === 2 ? 'size-14 ring-2 ring-brand-600' : 'size-11'}`} />
                  <span className={`mt-1 text-[0.65rem] font-semibold ${i === 2 ? 'text-brand-700' : 'text-muted'}`}>{label}</span>
                </span>
              </span>
            ))}
          </Link>

          <div className="absolute top-6 -right-2 hidden rounded-3xl bg-brand-900/90 px-5 py-4 text-white shadow-soft backdrop-blur sm:block lg:-right-6">
            <p className="font-display text-3xl leading-none">7–21</p>
            <p className="mt-1 text-xs text-brand-200">days, seed to harvest*</p>
          </div>
        </div>
      </div>
    </section>
  );
}
