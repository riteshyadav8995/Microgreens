import { useState } from 'react';
import { CalendarDays, CircleCheck, PauseCircle, Truck } from 'lucide-react';
import { subscriptionPlans } from '../../data/content';
import { joinSubscriptionWaitlist } from '../../services/api';
import { isEmail } from '../../utils/validation';
import { formatPrice } from '../../utils/format';
import { storage } from '../../utils/storage';
import { Spinner } from '../common/States';

/** Weekly Fresh Greens — concept UI only (BRD §7). Collects waitlist interest locally. */
export default function SubscriptionSection() {
  const existing = storage.get('waitlist', null);
  const [plan, setPlan] = useState(existing?.planId || 'weekly-family');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(existing ? 'success' : 'idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setStatus('loading');
    await joinSubscriptionWaitlist(plan, email.trim().toLowerCase());
    setStatus('success');
  };

  return (
    <section className="section relative overflow-hidden bg-brand-900 text-cream-100" aria-labelledby="sub-title">
      <div className="absolute -bottom-40 -left-20 size-[30rem] rounded-full bg-brand-600/30 blur-3xl" aria-hidden />
      <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <span className="badge bg-turmeric-400 text-brand-950">Coming soon</span>
          <h2 id="sub-title" className="mt-4 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Weekly Fresh Greens
          </h2>
          <p className="mt-4 text-lg text-cream-100/75">
            A box of seasonal microgreens at your door every week. Choose a size, skip any week and change varieties anytime.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              [CalendarDays, 'Pick your delivery day'],
              [PauseCircle, 'Pause, skip or cancel anytime'],
              [Truck, 'Free delivery on every box'],
            ].map(([I, text]) => (
              <li key={text} className="flex items-center gap-3">
                <I className="size-5 text-brand-300" aria-hidden /> {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] bg-white p-6 text-ink shadow-soft sm:p-8">
          {status === 'success' ? (
            <div className="py-8 text-center" role="status">
              <CircleCheck className="mx-auto size-14 text-brand-500" aria-hidden />
              <h3 className="mt-4 text-2xl">You're on the waitlist!</h3>
              <p className="mt-2 text-muted">We'll email you as soon as Weekly Fresh Greens launches in your city.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <fieldset>
                <legend className="text-lg font-semibold text-brand-950">Choose your box</legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {subscriptionPlans.map((p) => (
                    <label
                      key={p.id}
                      className={`relative cursor-pointer rounded-2xl border-2 p-4 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-600 ${
                        plan === p.id ? 'border-brand-600 bg-brand-50' : 'border-line hover:border-brand-300'
                      }`}
                    >
                      <input type="radio" name="plan" value={p.id} checked={plan === p.id} onChange={() => setPlan(p.id)} className="sr-only" />
                      {p.popular && <span className="badge absolute -top-2.5 right-3 bg-beet-500 text-white">Popular</span>}
                      <span className="block font-semibold text-brand-950">{p.name}</span>
                      <span className="mt-1 block font-display text-2xl text-brand-800">
                        {formatPrice(p.price)}
                        <span className="font-sans text-xs text-muted">/week</span>
                      </span>
                      <span className="mt-1 block text-xs text-muted">{p.description}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? 'waitlist-error' : undefined}
                  className={`input ${error ? 'input-error' : ''}`}
                />
                <button type="submit" className="btn-primary shrink-0" disabled={status === 'loading'}>
                  {status === 'loading' ? <Spinner className="size-4" /> : 'Join the waitlist'}
                </button>
              </div>
              {error && (
                <p id="waitlist-error" className="field-error">
                  {error}
                </p>
              )}
              <p className="mt-3 text-xs text-muted">No payment needed. We'll only email you about the launch.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
