import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { farmGallery, farmPractices, farmStats } from '../../data/content';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import ProcessTimeline from '../../components/process/ProcessTimeline';
import Icon from '../../components/common/Icon';
import Reveal from '../../components/common/Reveal';

export default function OurFarm() {
  usePageMeta('Our Farm & How We Grow', 'Step inside our grow house and follow every microgreen from seed to your table — sowing, germination, light, hand harvest and chilled delivery.');

  return (
    <>
      <PageHeader
        image="/images/farm/led-racks.webp"
        eyebrow="Our farm · How we grow"
        title="From our farm to your table"
        description="An indoor grow house where tiny greens get a clean, calm start — and reach your kitchen within days of harvest."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Our Farm' }]}
      />

      <section className="section" aria-labelledby="farm-story">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Our grow house</p>
            <h2 id="farm-story" className="mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Grown indoors, in small batches, by hand.
            </h2>
            <div className="prose-mg mt-6 text-lg">
              <p>
                Microgreens grow fast — most are ready in one to three weeks. That speed means we can sow on a rolling schedule and harvest close to
                delivery, instead of growing big batches and storing them.
              </p>
              <p>
                Our trays sit on racks indoors where light, water and airflow are easy to keep consistent. Every tray is checked daily, and every
                harvest is cut by hand.
              </p>
            </div>
            <Link to={site.features.shop ? '/shop' : '/how-we-grow'} className="btn-primary group mt-4">
              {site.features.shop ? "Shop this week's harvest" : 'See every growing step'} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <img src="/images/farm/tending-2.webp" alt="Grower placing a tray of microgreens on a rack" loading="lazy" className="aspect-[3/4] w-full rounded-3xl object-cover" />
            <img src="/images/farm/harvest.webp" alt="Microgreens being cut with scissors" loading="lazy" className="mt-10 aspect-[3/4] w-full rounded-3xl object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-900 py-12" aria-label="Farm at a glance">
        <dl className="container-page grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {farmStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-sm text-brand-200">{s.label}</dt>
              <dd className="font-display text-4xl text-white sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section" aria-labelledby="farm-process-title">
        <div className="container-page">
          <SectionHeading
            id="farm-process-title"
            eyebrow="From seed to table"
            title="Nine steps, roughly one to three weeks"
            description="Tap any step to see what happens at that stage."
            align="center"
          />
          <ProcessTimeline />
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="practices-title">
        <div className="container-page">
          <SectionHeading id="practices-title" eyebrow="How we work" title="Simple practices, done every day" align="center" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {farmPractices.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="card p-6">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon name={p.icon} className="size-6" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold tracking-normal">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-title">
        <div className="container-page">
          <SectionHeading id="gallery-title" eyebrow="Inside the grow house" title="A look around" />
          <ul className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 md:grid-cols-4">
            {farmGallery.map((img, i) => (
              <li key={img.src} className={`overflow-hidden rounded-3xl ${i === 0 ? 'col-span-2 row-span-2' : ''} ${i === 3 ? 'md:col-span-2' : ''}`}>
                <img src={img.src} alt={img.alt} loading="lazy" className="size-full object-cover transition duration-700 hover:scale-105" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-page">
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-brand-800 px-6 py-14 text-center sm:px-12">
            <img src="/images/farm/greenhouse.webp" alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover opacity-25" />
            <h2 className="mx-auto max-w-2xl text-3xl text-white sm:text-4xl">Want to see it for yourself?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              We host small farm visits for schools, chefs and curious customers from time to time. Drop us a line and we'll let you know.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-accent">
                Ask about a visit
              </Link>
              <Link to="/why-us" className="btn-light">
                Why Microgreen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
