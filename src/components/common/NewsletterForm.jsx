import { useId, useState } from 'react';
import { ArrowRight, CircleCheck } from 'lucide-react';
import { subscribeNewsletter } from '../../services/api';
import { isEmail } from '../../utils/validation';
import { Spinner } from './States';

export default function NewsletterForm({ dark = false, className = '' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [error, setError] = useState('');
  const id = useId();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setStatus('loading');
    await subscribeNewsletter(email.trim().toLowerCase());
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <p role="status" className={`flex items-center gap-2 text-sm font-medium ${dark ? 'text-brand-200' : 'text-brand-700'} ${className}`}>
        <CircleCheck className="size-5" aria-hidden /> You're on the list! Look out for microgreen tips and updates.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className={`flex gap-2 rounded-full p-1.5 ${dark ? 'bg-white/10 ring-1 ring-white/15' : 'bg-white ring-1 ring-line'}`}>
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-w-0 flex-1 bg-transparent px-4 text-sm focus:outline-none ${dark ? 'text-white placeholder:text-white/50' : 'text-ink placeholder:text-muted/70'}`}
        />
        <button type="submit" disabled={status === 'loading'} className="btn-accent btn-sm shrink-0 px-5 py-2.5">
          {status === 'loading' ? <Spinner className="size-4" /> : <>Subscribe <ArrowRight className="size-4" aria-hidden /></>}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className={`mt-2 px-4 text-xs font-medium ${dark ? 'text-red-300' : 'text-red-600'}`}>
          {error}
        </p>
      )}
    </form>
  );
}
