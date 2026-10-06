import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { site } from '../../config/site';

const slides = [
  {
    eyebrow: site.secondaryTagline, title: 'Small Greens.', accent: 'Big Nutrition.',
    description: 'Young edible vegetables and herbs, picked just after their first leaves open. Discover fresh flavours, colour and crunch for everyday food.',
    to: '/what-are-microgreens', cta: 'What are microgreens?', secondaryTo: '/shop', secondaryCta: 'Explore our greens',
    image: '/images/products/broccoli-1.webp', imageAlt: 'Broccoli microgreens with young green leaves', caption: 'Young leaves. Fresh flavour.',
  },
  {
    eyebrow: 'From seed to harvest', title: 'A tiny seed.', accent: 'A fresh beginning.',
    description: 'Follow the journey from sowing to young leaves. Explore all nine growing steps, with harvest usually in 7–21 days depending on the variety.',
    to: '/how-we-grow', cta: 'See how we grow', secondaryTo: '/our-farm', secondaryCta: 'Explore our farm',
    image: '/images/farm/seedlings.webp', imageAlt: 'Young seedlings growing in trays', caption: 'A little care, from seed to leaf.',
  },
  {
    eyebrow: 'Made for everyday Indian meals', title: 'Everyday food.', accent: 'A fresh little twist.',
    description: 'A handful on dal, chaat, wraps or rice bowls. Rinse gently just before eating and add at the end for a fresh finish.',
    to: '/how-to-eat', cta: 'Find ways to eat them', secondaryTo: '/find-my-microgreen', secondaryCta: 'Find my microgreen',
    image: '/images/hero/hero-bowl.webp', imageAlt: 'Fresh microgreens falling into a bowl', caption: 'A fresh finish for your plate.',
  },
];

export default function HeroSlider() {
  const frameRef = useRef(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => { if (media.matches) setPlaying(false); };
    const onVisibility = () => setHidden(document.hidden);
    // Size the banner to the space below the actual navigation, including zoom.
    const measure = () => {
      const top = frameRef.current.getBoundingClientRect().top + window.scrollY;
      frameRef.current.style.setProperty('--hero-top', `${Math.max(0, top)}px`);
    };
    measure();
    const header = document.querySelector('header');
    const resize = new ResizeObserver(measure);
    if (header) resize.observe(header);
    window.addEventListener('resize', measure);
    media.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(frameRef.current);
    return () => {
      resize.disconnect();
      observer.disconnect();
      window.removeEventListener('resize', measure);
      media.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const autoplay = playing && !focused && visible && !hidden;
  useEffect(() => {
    if (!autoplay) return undefined;
    const timer = setInterval(() => setActive((current) => (current + 1) % slides.length), 2000);
    return () => clearInterval(timer);
  }, [autoplay]);

  return (
    <div
      ref={frameRef} className={`hero-banner hero-scene-${active}`}
      role="region" aria-roledescription="carousel" aria-label="Discover microgreens, growing and meal ideas"
      onFocus={(event) => setFocused(!event.target.closest('[data-animation-control]'))}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div className="hero-orbs" aria-hidden="true">
        <span className="hero-orbit" />
      </div>
      <div className="container-page hero-panels">
        {slides.map((slide, i) => (
          <div key={slide.title} className={`hero-panel ${i === active ? 'is-active' : ''}`} inert={i !== active} aria-hidden={i !== active} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
            <div className="hero-copy">
              <p className="hero-eyebrow">{slide.eyebrow}</p>
              <h1 className="hero-headline">{slide.title}<br /><em>{slide.accent}</em></h1>
              <p className="hero-description">{slide.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={slide.to} className="btn btn-light group">{slide.cta}<ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></Link>
                <Link to={slide.secondaryTo} className="btn border border-white/40 bg-white/5 text-white hover:bg-white/15">{slide.secondaryCta}</Link>
              </div>
            </div>
            <figure className="hero-visual">
              <div className="hero-leaf-frame">
                <img src={slide.image} alt={slide.imageAlt} width="800" height="800" fetchPriority={i === 0 ? 'high' : 'auto'} />
              </div>
              <figcaption>{slide.caption}</figcaption>
            </figure>
          </div>
        ))}
      </div>
      <div className="container-page hero-banner-footer">
        <div className="flex items-center gap-2" aria-hidden="true">
          {slides.map((slide, i) => <span key={slide.title} className={`hero-indicator ${i === active ? 'is-active' : ''}`} />)}
          <span className="ml-2 text-xs font-medium text-white/65">0{active + 1} / 03</span>
        </div>
        <button type="button" data-animation-control onClick={() => setPlaying((current) => !current)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} className="grid size-10 place-items-center rounded-full border border-white/25 bg-white/5 text-white transition hover:bg-white/15">
          {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
        </button>
      </div>
      <span className="sr-only" aria-live={autoplay ? 'off' : 'polite'} aria-atomic="true">Slide {active + 1} of 3: {slides[active].title} {slides[active].accent}</span>
    </div>
  );
}
