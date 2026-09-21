import { useId, useState } from 'react';
import { CircleAlert, CircleCheck, MapPin } from 'lucide-react';
import { checkPincode } from '../../services/api';
import { isPincode } from '../../utils/validation';
import { storage } from '../../utils/storage';
import { Spinner } from '../common/States';

export default function PincodeChecker() {
  const id = useId();
  const [pincode, setPincode] = useState(() => storage.get('pincode', ''));
  const [status, setStatus] = useState({ state: 'idle' });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isPincode(pincode)) {
      setStatus({ state: 'invalid' });
      return;
    }
    setStatus({ state: 'loading' });
    const result = await checkPincode(pincode);
    storage.set('pincode', pincode);
    setStatus({ state: 'done', ...result });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-cream-50 p-4" noValidate>
      <label htmlFor={id} className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-950">
        <MapPin className="size-4 text-brand-600" aria-hidden /> Check delivery
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6-digit pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          aria-describedby={`${id}-result`}
          className="input py-2.5"
        />
        <button type="submit" className="btn-secondary shrink-0 px-5 py-2.5" disabled={status.state === 'loading'}>
          {status.state === 'loading' ? <Spinner className="size-4" /> : 'Check'}
        </button>
      </div>
      <div id={`${id}-result`} aria-live="polite" className="text-sm">
        {status.state === 'invalid' && (
          <p className="field-error">
            <CircleAlert className="size-3.5" aria-hidden /> Please enter a valid 6-digit pincode.
          </p>
        )}
        {status.state === 'done' &&
          (status.serviceable ? (
            <p className="mt-2 flex items-center gap-1.5 font-medium text-brand-700">
              <CircleCheck className="size-4" aria-hidden /> Delivering to {status.city} · {status.eta}
            </p>
          ) : (
            <p className="mt-2 text-muted">
              Sorry, we don't deliver to {pincode} yet. We're expanding soon — subscribe to our newsletter for updates.
            </p>
          ))}
      </div>
    </form>
  );
}
