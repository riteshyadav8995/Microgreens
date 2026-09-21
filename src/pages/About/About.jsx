import { Link } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { about } from '../../data/content';
import { site } from '../../config/site';
import { initials } from '../../utils/format';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import Icon from '../../components/common/Icon';
import Reveal from '../../components/common/Reveal';

export default function About() {
  usePageMeta('About Us', 'Our story, mission and values — the people behind Microgreen India.');

  return (
    <>
      <PageHeader
        image="/images/farm/tray-row.webp"
        eyebrow="About us"
        title="Growing a fresher habit for Indian kitchens"
        description={about.mission}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <section className="section" aria-labelledby="story-title">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal className="relative">
            <img src="/images/products/mix-home.webp" alt="Microgreens growing in a bowl at home" loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card" />
            <div className="absolute -right-3 -bottom-6 max-w-[16rem] rounded-3xl bg-brand-800 p-6 text-white shadow-soft sm:-right-6">
              <p className="font-display text-xl leading-snug">“{about.vision}”</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Our story</p>
            <h2 id="story-title" className="mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              It started with a single shelf.
            </h2>
            <div className="prose-mg mt-6 text-lg">
              {about.story.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="mission-title">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="card p-8 sm:p-10">
            <p className="eyebrow">Our mission</p>
            <h2 id="mission-title" className="mt-3 text-2xl leading-snug sm:text-3xl">
              {about.mission}
            </h2>
          </div>
          <div className="rounded-3xl bg-brand-800 p-8 text-white shadow-card sm:p-10">
            <p className="eyebrow text-brand-300">Our vision</p>
            <p className="mt-3 font-display text-2xl leading-snug sm:text-3xl">{about.vision}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container-page">
          <SectionHeading id="values-title" eyebrow="Our values" title="What guides us" align="center" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 70} className="card p-6 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <Icon name={v.icon} className="size-6" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold tracking-normal">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-brand-950 text-cream-100" aria-labelledby="journey-title">
        <div className="container-page">
          <p className="eyebrow text-brand-300">Our journey</p>
          <h2 id="journey-title" className="mt-3 text-3xl text-white sm:text-4xl">
            From a shelf to your city
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {about.journey.map((j, i) => (
              <Reveal as="li" key={j.stage} delay={i * 90} className="relative border-t-2 border-brand-600 pt-6">
                <span className="absolute -top-[9px] left-0 size-4 rounded-full bg-turmeric-400 ring-4 ring-brand-950" aria-hidden />
                <p className="text-xs font-semibold tracking-wider text-brand-300 uppercase">Stage {i + 1}</p>
                <h3 className="mt-2 text-xl text-white">{j.stage}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/70">{j.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container-page">
          <SectionHeading id="team-title" eyebrow="Our team" title="The people behind your greens" description="A small team of growers, cooks and helpers." align="center" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.team.map((m) => (
              <li key={m.role} className="card p-6 text-center">
                <span className="mx-auto grid size-20 place-items-center rounded-full bg-linear-to-br from-brand-200 to-brand-400 font-display text-2xl text-brand-950">
                  {initials(m.name)}
                </span>
                <h3 className="mt-4 font-sans text-lg font-semibold tracking-normal">{m.name}</h3>
                <p className="text-sm font-medium text-brand-600">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 text-center">
            <p className="text-lg text-muted">Want to stock our greens, visit the farm or work with us?</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Get in touch
              </Link>
              <a href={`mailto:${site.contact.email}`} className="btn-secondary">
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
