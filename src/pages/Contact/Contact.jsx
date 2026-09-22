import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleAlert, CircleCheck, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { submitContactForm } from '../../services/api';
import { rules, validate } from '../../utils/validation';
import { site } from '../../config/site';
import PageHeader from '../../components/common/PageHeader';
import FormField from '../../components/common/FormField';
import SocialIcon from '../../components/common/SocialIcons';
import { Spinner } from '../../components/common/States';

// Show the "still sending" note after this long.
const SLOW_AFTER_MS = 6000;

const TOPICS = [
  'General enquiry',
  ...(site.features.shop ? ['Order support'] : ['Buying microgreens']),
  'Wholesale / cafés & restaurants',
  'Farm visit',
  'Feedback',
];
const EMPTY = { name: '', email: '', phone: '', topic: TOPICS[0], orderId: '', message: '', _honey: '' };

export default function Contact() {
  usePageMeta('Contact Us', 'Questions about an order, wholesale or farm visits? Call, WhatsApp or write to Microgreen India.');
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle' }); // idle | sending | success | error
  const [slow, setSlow] = useState(false);

  // Reassure people if sending takes a while, instead of showing a silent spinner.
  useEffect(() => {
    if (status.state !== 'sending') return undefined;
    setSlow(false);
    const t = setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    return () => clearTimeout(t);
  }, [status.state]);

  // Pre-filled fallbacks so a failed send never loses what the visitor typed.
  const fallbackText = [
    `Hi ${site.name}, this is ${values.name || '…'}${values.phone ? ` (${values.phone})` : ''}.`,
    `Topic: ${values.topic}`,
    '',
    values.message,
  ].join('\n');
  const whatsappFallback = `${site.contact.whatsappHref}?text=${encodeURIComponent(fallbackText)}`;
  // Email fallback goes to the real inbox (the displayed contact email is still sample data).
  const emailFallback = `mailto:${site.contactForm.fallbackEmail}?subject=${encodeURIComponent(`${values.topic} — ${values.name}`)}&body=${encodeURIComponent(fallbackText)}`;

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values, {
      name: [rules.required('Name')],
      email: [rules.required('Email'), rules.email()],
      phone: [rules.phone()],
      message: [rules.required('Message'), rules.minLength(10, 'Message')],
    });
    setErrors(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setStatus({ state: 'sending' });
    try {
      await submitContactForm(values);
      setStatus({ state: 'success' });
      setValues(EMPTY);
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  };

  const channels = [
    { icon: Phone, title: 'Call us', value: site.contact.phone, href: site.contact.phoneHref },
    { icon: 'whatsapp', title: 'WhatsApp', value: 'Chat with us', href: site.contact.whatsappHref, external: true },
    { icon: Mail, title: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Clock, title: 'Hours', value: site.contact.hours },
  ];

  return (
    <>
      <PageHeader
        title="We'd love to hear from you"
        eyebrow="Contact us"
        description={
          site.features.shop
            ? 'Questions about an order, bulk orders for your café, or just want to talk greens? Reach out — a real person will reply.'
            : 'Want to buy microgreens, order in bulk for your café, visit the farm or just talk greens? Reach out — a real person will reply.'
        }
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <div className="container-page py-12 sm:py-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => {
            const content = (
              <>
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  {typeof c.icon === 'string' ? <SocialIcon name={c.icon} className="size-6" /> : <c.icon className="size-6" aria-hidden />}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{c.title}</span>
                  <span className="block font-semibold break-words text-brand-950">{c.value}</span>
                </span>
              </>
            );
            return (
              <li key={c.title}>
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    className="card flex h-full items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="card flex h-full items-center gap-4 p-5">{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <section aria-labelledby="form-title" className="card p-6 sm:p-9">
            <h2 id="form-title" className="text-3xl">
              Send us a message
            </h2>
            <p className="mt-2 text-muted">We usually reply within one working day.</p>

            {status.state === 'success' ? (
              <div className="mt-8 rounded-3xl bg-brand-50 p-8 text-center" role="status">
                <CircleCheck className="mx-auto size-14 text-brand-600" aria-hidden />
                <h3 className="mt-4 text-2xl">Message sent — thank you!</h3>
                <p className="mt-2 text-muted">We've received your message and will get back to you soon.</p>
                <button type="button" onClick={() => setStatus({ state: 'idle' })} className="btn-secondary mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                {/* Honeypot for bots — hidden from people and screen readers */}
                <div aria-hidden className="absolute -left-[9999px]">
                  <label>
                    Leave this empty
                    <input type="text" tabIndex={-1} autoComplete="off" value={values._honey} onChange={set('_honey')} />
                  </label>
                </div>
                <FormField label="Your name" value={values.name} onChange={set('name')} error={errors.name} required autoComplete="name" />
                <FormField label="Email" type="email" value={values.email} onChange={set('email')} error={errors.email} required autoComplete="email" />
                <FormField label="Phone (optional)" type="tel" value={values.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" placeholder="98765 43210" />
                <FormField as="select" label="Topic" value={values.topic} onChange={set('topic')}>
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </FormField>
                {values.topic === 'Order support' && (
                  <FormField label="Order ID (optional)" value={values.orderId} onChange={set('orderId')} placeholder="MG12345678" className="sm:col-span-2" />
                )}
                <FormField
                  as="textarea"
                  label="Message"
                  value={values.message}
                  onChange={set('message')}
                  error={errors.message}
                  required
                  placeholder="How can we help?"
                  className="sm:col-span-2"
                />
                {status.state === 'error' && (
                  <div role="alert" className="rounded-2xl bg-red-50 p-4 text-sm text-red-700 sm:col-span-2">
                    <p className="flex items-start gap-2">
                      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden /> {status.message}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 pl-6">
                      <a href={whatsappFallback} target="_blank" rel="noreferrer noopener" className="btn-secondary btn-sm">
                        <SocialIcon name="whatsapp" className="size-4" /> Send on WhatsApp
                      </a>
                      <a href={emailFallback} className="btn-secondary btn-sm">
                        <Mail className="size-4" aria-hidden /> Send by email
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <button type="submit" disabled={status.state === 'sending'} className="btn-primary btn-lg">
                    {status.state === 'sending' ? (
                      <>
                        <Spinner className="size-5" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" aria-hidden /> Send message
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted" aria-live="polite">
                    {status.state === 'sending' && slow
                      ? 'Still sending… please keep this page open.'
                      : "We'll only use your details to reply to you."}
                  </p>
                </div>
              </form>
            )}
          </section>

          <aside className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              <iframe
                title={`Map showing ${site.contact.mapQuery}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&output=embed`}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex gap-3 p-5">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                <div>
                  <p className="font-semibold text-brand-950">Find us</p>
                  <p className="text-sm text-muted">{site.contact.address}</p>
                  <p className="mt-1 text-xs text-muted">Visits by appointment only.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-brand-900 p-6 text-cream-100">
              <h2 className="text-2xl text-white">Quick answers</h2>
              <p className="mt-2 text-sm text-cream-100/75">{site.features.shop ? 'Delivery areas, storage tips, payments and refunds — most questions are answered in our FAQs.' : 'What microgreens are, how to store and use them — most questions are answered in our FAQs.'}</p>
              <Link to="/faq" className="btn-accent mt-5">
                Read the FAQs
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
