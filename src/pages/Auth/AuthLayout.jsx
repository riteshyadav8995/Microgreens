import { Info } from 'lucide-react';
import { LogoMark } from '../../components/common/Logo';

export default function AuthLayout({ title, subtitle, children, image = '/images/farm/harvest.webp' }) {
  return (
    <div className="container-page py-10 sm:py-16">
      <div className="card mx-auto grid max-w-5xl overflow-hidden lg:grid-cols-2">
        <div className="relative isolate hidden flex-col justify-end p-10 text-white lg:flex">
          <img src={image} alt="" className="absolute inset-0 -z-10 size-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950/90 via-brand-950/40 to-brand-950/10" aria-hidden />
          <p className="font-display text-3xl leading-snug">“Small greens, big difference to everyday meals.”</p>
          <p className="mt-3 text-sm text-white/75">Save favourites, check out faster and reorder in a tap.</p>
        </div>
        <div className="p-6 sm:p-10">
          <LogoMark className="size-11" />
          <h1 className="mt-6 text-3xl sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
          <p className="mt-5 flex items-start gap-2 rounded-2xl bg-turmeric-100 p-3 text-xs text-turmeric-700" role="note">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            Demo sign-in: accounts are stored on this device only and passwords are never saved.
          </p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
