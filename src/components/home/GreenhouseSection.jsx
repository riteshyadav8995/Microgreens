import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { farmStats } from '../../data/content';
import Reveal from '../common/Reveal';

export default function GreenhouseSection() {
  return (
    <section className="section" aria-labelledby="greenhouse-title">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-brand-950">
          <img
            src="/images/farm/racks.webp"
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-10 size-full object-cover opacity-60"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-950 via-brand-950/80 to-brand-950/10" aria-hidden />

          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <Reveal>
              <p className="eyebrow text-brand-300">Our grow house · How we grow</p>
              <h2 id="greenhouse-title" className="mt-3 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                A clean, calm space where tiny greens grow up fast.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
                Racks of trays, gentle light and daily checks. We sow on a rolling schedule and harvest by hand, so greens go from tray to
                box to your kitchen with as little waiting as possible.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/our-farm" className="btn-accent group">
                  Visit our farm <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                </Link>
                <Link to="/why-us" className="btn-light">
                  Why microgreens?
                </Link>
              </div>
            </Reveal>

            <div className="flex flex-col justify-end gap-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                {farmStats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 80} className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                    <p className="font-display text-3xl text-white sm:text-4xl">{s.value}</p>
                    <p className="mt-1 text-sm text-white/70">{s.label}</p>
                  </Reveal>
                ))}
              </div>
              <div className="hidden grid-cols-2 gap-3 sm:grid">
                <img src="/images/farm/harvest.webp" alt="Microgreens being hand harvested with scissors" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
                <img src="/images/farm/packing.webp" alt="Freshly harvested microgreens packed in a clear box" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
