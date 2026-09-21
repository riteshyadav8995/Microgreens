import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({ eyebrow, title, description, align = 'left', link, spacing = 'mb-10 sm:mb-12', className = '', id }) {
  const centered = align === 'center';
  return (
    <div className={`flex flex-col gap-4 ${spacing} ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'} ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={id} className="text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
      </div>
      {link && (
        <Link to={link.to} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
          {link.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </div>
  );
}
