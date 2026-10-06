import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Leaf, Sprout } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { about } from '../../data/content';
import { site } from '../../config/site';
import Breadcrumb from '../../components/common/Breadcrumb';
import SectionHeading from '../../components/common/SectionHeading';
import Icon from '../../components/common/Icon';
import Reveal from '../../components/common/Reveal';
import './About.css';

const journeyLinks = [
  { to: '/what-are-microgreens', label: 'Meet microgreens', icon: 'Sprout' },
  { to: '/how-we-grow', label: 'See how we grow', icon: 'Sun' },
  { to: '/find-my-microgreen', label: 'Find my microgreen', icon: 'Leaf' },
  { to: '/how-to-eat', label: 'Find meal ideas', icon: 'ChefHat' },
];

export default function About() {
  usePageMeta('About Us', 'Our purpose, mission and values — get to know ' + site.name + '.');

  return (
    <div className="about-page">
      <section className="about-intro" aria-labelledby="about-title">
        <div className="container-page">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
          <div className="about-hero-grid">
            <Reveal className="about-hero-copy">
              <p className="eyebrow"><Sprout className="size-4" aria-hidden /> About {site.name}</p>
              <h1 id="about-title" className="about-title">Small greens.<br /><em>A bigger idea.</em></h1>
              <p className="about-lead">{about.mission}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/shop" className="btn-primary group">
                  Meet our greens <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                </Link>
                <Link to="#our-purpose" className="btn-ghost group">
                  Our purpose <ArrowDown className="size-4 transition group-hover:translate-y-1" aria-hidden />
                </Link>
              </div>
              <p className="about-hero-note"><Leaf className="size-4 shrink-0" aria-hidden /> From a tiny seed to your everyday plate.</p>
            </Reveal>
            <Reveal delay={120} className="about-hero-art">
              <div className="about-photo-main">
                <img src="/images/hero/hero-bowl.webp" alt="Fresh microgreens falling into a bowl, ready for a meal" width="900" height="1100" fetchPriority="high" />
              </div>
              <figure className="about-photo-small">
                <img src="/images/products/broccoli-1.webp" alt="Broccoli microgreens with young leaves and delicate stems" width="800" height="800" />
                <figcaption>Little leaves.<br /><span>Everyday possibilities.</span></figcaption>
              </figure>
              <span className="about-photo-line" aria-hidden />
            </Reveal>
          </div>
          <div className="about-intro-strip">
            <span>Fresh flavours</span><Sprout aria-hidden /><span>Familiar meals</span><Sprout aria-hidden /><span>Small, simple habits</span>
          </div>
        </div>
      </section>

      <section id="our-purpose" className="section scroll-mt-24" aria-labelledby="purpose-title">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="about-purpose-visual">
            <figure>
              <img src="/images/farm/tending.webp" alt="Young microgreens being tended in a growing tray" loading="lazy" width="1200" height="900" className="about-purpose-photo" />
              <figcaption className="about-photo-caption"><Sprout className="size-4 shrink-0" aria-hidden /> A growing journey worth getting to know.</figcaption>
            </figure>
            <Link to="/our-farm" className="about-farm-link group">
              <span><span className="block text-xs text-muted">Get a closer look</span><span className="mt-1 block font-semibold">Explore our farm</span></span>
              <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Our purpose</p>
            <h2 id="purpose-title" className="mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">A fresh habit,<br /><em className="text-brand-700">rooted in familiar food.</em></h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-950">{about.story[0]}</p>
            <div className="prose-mg mt-4">
              {about.story.slice(1).map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
            <Link to="/how-to-eat" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
              A little inspiration for your plate <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="about-values-section" aria-labelledby="values-title">
        <div className="container-page about-values-grid">
          <Reveal className="about-vision">
            <p className="eyebrow text-brand-300">Our vision</p>
            <blockquote className="about-vision-quote">{about.vision}</blockquote>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-100/70">It starts with curiosity, familiar flavours and one fresh handful at a time.</p>
            <BotanicalMark />
          </Reveal>
          <div className="min-w-0">
            <Reveal><p className="eyebrow text-brand-300">Our values</p><h2 id="values-title" className="mt-3 text-3xl text-white sm:text-4xl">What we grow by.</h2></Reveal>
            <ul className="about-values-list">
              {about.values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 80} className="about-value">
                  <span className="about-value-icon"><Icon name={v.icon} className="size-6" /></span>
                  <h3 className="mt-4 text-xl text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-100/70">{v.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-cream-100" aria-labelledby="journey-title">
        <div className="container-page">
          <SectionHeading id="journey-title" eyebrow="Explore with us" title="From curiosity to your kitchen" description="A few small steps to finding your own fresh-greens habit." />
          <ol className="about-journey-grid">
            {about.journey.map((j, i) => (
              <Reveal as="li" key={j.stage} delay={i * 80}>
                <Link to={journeyLinks[i].to} className="about-journey-link group">
                  <div className="flex items-center justify-between gap-4">
                    <span className="about-journey-number">0{i + 1}</span>
                    <Icon name={journeyLinks[i].icon} className="size-6 text-brand-600" />
                  </div>
                  <h3 className="mt-6 text-2xl leading-tight">{j.stage}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{j.body}</p>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-semibold text-brand-700">
                    {journeyLinks[i].label}<ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="about-contact-title">
        <div className="container-page">
          <Reveal className="about-contact">
            <div className="about-contact-copy">
              <p className="eyebrow">Let's talk greens</p>
              <h2 id="about-contact-title" className="mt-3 text-3xl leading-tight sm:text-4xl">Good things grow<br /><em className="text-brand-700">from a conversation.</em></h2>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">Want to stock our greens, visit the farm or bring a fresh idea to the table? We'd love to hear from you.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary group">Get in touch <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></Link>
                <a href={'mailto:' + site.contact.email} className="btn-secondary">Email us</a>
              </div>
            </div>
            <img src="/images/products/mix-home.webp" alt="Fresh young microgreens growing in small bowls" loading="lazy" width="800" height="800" className="about-contact-photo" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function BotanicalMark() {
  return (
    <svg viewBox="0 0 240 130" className="about-botanical" aria-hidden="true" focusable="false">
      <path className="about-botanical-stem" d="M45 120Q105 110 128 48M128 48Q140 17 175 12M128 48Q100 26 74 34" fill="none" stroke="currentColor" strokeWidth="2" pathLength="1" />
      <path className="about-botanical-leaf" d="M128 48Q139 4 175 12Q177 45 128 48Z" fill="currentColor" fillOpacity=".16" stroke="currentColor" strokeWidth="1.5" />
      <path className="about-botanical-leaf" d="M128 48Q90 57 74 34Q101 9 128 48Z" fill="currentColor" fillOpacity=".16" stroke="currentColor" strokeWidth="1.5" />
      <path className="about-botanical-leaf" d="M105 89Q159 51 183 78Q163 114 105 89Z" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
