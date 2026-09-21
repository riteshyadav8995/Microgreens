const words = [
  ['Methi', 'मेथी'],
  ['Dhania', 'धनिया'],
  ['Sarson', 'सरसों'],
  ['Mooli', 'मूली'],
  ['Chaulai', 'चौलाई'],
  ['Suva', 'सोआ'],
  ['Sunflower', 'सूरजमुखी'],
  ['Matar', 'मटर'],
  ['Gehun ke jware', 'गेहूं के ज्वारे'],
];

/** India-focused positioning band with a slow marquee of familiar greens. */
export default function IndiaStrip() {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {words.map(([en, hi]) => (
        <li key={en} className="flex items-center gap-3 whitespace-nowrap">
          <span className="font-display text-2xl text-cream-50 italic sm:text-3xl">{en}</span>
          <span className="hindi text-lg text-brand-300" lang="hi">
            {hi}
          </span>
          <svg viewBox="0 0 20 20" className="ml-6 size-4 text-turmeric-400" aria-hidden>
            <path fill="currentColor" d="M10 0c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="overflow-hidden bg-brand-900 py-6" aria-label="Familiar Indian greens, grown as microgreens">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
