import Breadcrumb from './Breadcrumb';

/** Inner-page header. With `image` it becomes a photo banner; otherwise a soft cream band. */
export default function PageHeader({ title, eyebrow, description, breadcrumb, image, children }) {
  if (image) {
    return (
      <section className="relative isolate overflow-hidden bg-brand-950">
        <img src={image} alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-55" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950 via-brand-950/60 to-brand-950/10" />
        <div className="container-page py-20 sm:py-28 lg:py-32">
          {breadcrumb && (
            <Breadcrumb
              items={breadcrumb}
              className="mb-6 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/70 [&_span[aria-current]]:text-white"
            />
          )}
          {eyebrow && <p className="eyebrow mb-4 text-brand-300">{eyebrow}</p>}
          <h1 className="max-w-3xl animate-fade-up text-4xl text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl animate-fade-up text-lg text-white/80 [animation-delay:120ms]">{description}</p>}
          {children}
        </div>
      </section>
    );
  }

  return (
    // No overflow-hidden here: it would clip dropdowns (e.g. search suggestions) rendered in `children`.
    // z-20 keeps those dropdowns above the page content that follows.
    <section className="relative z-20 border-b border-line/60 bg-cream-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <LeafDecor />
      </div>
      <div className="container-page relative py-10 sm:py-14">
        {breadcrumb && <Breadcrumb items={breadcrumb} className="mb-5" />}
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>}
        {children}
      </div>
    </section>
  );
}

function LeafDecor() {
  return (
    <svg className="pointer-events-none absolute -top-10 -right-10 size-72 text-brand-200/50" viewBox="0 0 200 200" aria-hidden>
      <path fill="currentColor" d="M100 190C100 110 140 60 190 40c-10 80-40 130-90 150Z" />
      <path fill="currentColor" opacity=".6" d="M96 190C96 130 60 90 10 80c10 60 40 100 86 110Z" />
    </svg>
  );
}
