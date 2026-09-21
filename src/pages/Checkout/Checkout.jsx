import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Banknote, CreditCard, Info, Landmark, Lock, ShoppingBag, Smartphone } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { checkPincode, placeOrder } from '../../services/api';
import { computeTotals } from '../../utils/cart';
import { formatPrice } from '../../utils/format';
import { storage } from '../../utils/storage';
import { isValidCardNumber, isValidExpiry, patterns, rules, validate } from '../../utils/validation';
import { INDIAN_STATES, site } from '../../config/site';
import FormField from '../../components/common/FormField';
import Breadcrumb from '../../components/common/Breadcrumb';
import CouponForm from '../../components/cart/CouponForm';
import OrderSummary from '../../components/cart/OrderSummary';
import { EmptyState, Spinner } from '../../components/common/States';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', description: 'Google Pay, PhonePe, Paytm & more', icon: Smartphone },
  { id: 'card', label: 'Credit / Debit card', description: 'Visa, Mastercard, RuPay', icon: CreditCard },
  { id: 'netbanking', label: 'Net banking', description: 'All major Indian banks', icon: Landmark },
  { id: 'cod', label: 'Cash on delivery', description: 'Pay when your greens arrive', icon: Banknote },
];
const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Bank of Baroda', 'Punjab National Bank', 'Yes Bank'];

function deliveryDates(count = 4) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      id: d.toISOString().slice(0, 10),
      top: i === 0 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short' }),
      bottom: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    };
  });
}

const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

function Section({ step, title, children }) {
  return (
    <section className="card p-5 sm:p-7" aria-labelledby={`co-${step}`}>
      <h2 id={`co-${step}`} className="flex items-center gap-3 text-2xl">
        <span className="grid size-8 place-items-center rounded-full bg-brand-700 font-sans text-sm font-bold text-white">{step}</span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function Checkout() {
  usePageMeta('Checkout');
  const { items, couponCode, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const dates = useMemo(() => deliveryDates(), []);

  const saved = storage.get('address', {});
  const [values, setValues] = useState({
    name: saved.name || user?.name || '',
    phone: saved.phone || user?.phone || '',
    email: saved.email || user?.email || '',
    line1: saved.line1 || '',
    line2: saved.line2 || '',
    city: saved.city || '',
    state: saved.state || '',
    pincode: saved.pincode || '',
    date: dates[0].id,
    slot: site.delivery.slots[0].id,
    instructions: '',
    payment: 'upi',
    upi: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    bank: '',
    saveAddress: true,
  });
  const [errors, setErrors] = useState({});
  const [pinStatus, setPinStatus] = useState(null);
  const [placing, setPlacing] = useState(false);

  const totals = computeTotals(items, couponCode, { paymentMethod: values.payment });
  const set = (key, transform = (v) => v) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : transform(e.target.value);
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const verifyPincode = async (pin = values.pincode) => {
    if (!patterns.pincode.test(pin)) return null;
    setPinStatus({ loading: true });
    const res = await checkPincode(pin);
    setPinStatus(res);
    if (res.serviceable && !values.city) setValues((s) => ({ ...s, city: res.city === 'Delhi NCR' ? '' : res.city }));
    return res;
  };

  if (!items.length && !placing) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to check out yet"
          titleAs="h1"
          description="Your cart is empty. Add some fresh greens and come back here."
          action={{ to: '/shop', label: 'Shop microgreens' }}
          className="card"
        />
      </div>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const paymentRules = {
      upi: { upi: [rules.required('UPI ID'), rules.pattern(patterns.upi, 'Enter a valid UPI ID, e.g. name@okbank')] },
      card: {
        cardNumber: [rules.required('Card number'), (v) => (isValidCardNumber(v) ? undefined : 'Enter a valid card number')],
        cardName: [rules.required('Name on card')],
        cardExpiry: [rules.required('Expiry'), (v) => (isValidExpiry(v) ? undefined : 'Enter a valid future expiry (MM/YY)')],
        cardCvv: [rules.required('CVV'), rules.pattern(/^\d{3,4}$/, 'Enter a 3 or 4 digit CVV')],
      },
      netbanking: { bank: [rules.required('Bank')] },
      cod: {},
    }[values.payment];

    const errs = validate(values, {
      name: [rules.required('Full name'), rules.minLength(2, 'Full name')],
      phone: [rules.required('Mobile number'), rules.phone()],
      email: [rules.required('Email'), rules.email()],
      line1: [rules.required('Address')],
      city: [rules.required('City')],
      state: [rules.required('State')],
      pincode: [rules.required('Pincode'), rules.pincode()],
      ...paymentRules,
    });

    if (!errs.pincode) {
      const res = pinStatus?.serviceable != null && !pinStatus.loading ? pinStatus : await verifyPincode();
      if (res && !res.serviceable) errs.pincode = "Sorry, we don't deliver to this pincode yet";
    }

    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = formRef.current?.querySelector('[aria-invalid="true"]');
      first?.focus();
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast({ title: 'Please check the highlighted fields', variant: 'error' });
      return;
    }

    setPlacing(true);
    if (values.saveAddress) {
      const { name, phone, email, line1, line2, city, state, pincode } = values;
      storage.set('address', { name, phone, email, line1, line2, city, state, pincode });
    }
    const slot = site.delivery.slots.find((s) => s.id === values.slot);
    const date = dates.find((d) => d.id === values.date);
    const paymentLabel = PAYMENT_METHODS.find((m) => m.id === values.payment).label;
    const paymentDetail =
      values.payment === 'card'
        ? `•••• ${values.cardNumber.replace(/\D/g, '').slice(-4)}`
        : values.payment === 'upi'
          ? values.upi
          : values.payment === 'netbanking'
            ? values.bank
            : 'Pay on delivery';

    const order = await placeOrder({
      items,
      totals,
      customer: { name: values.name, phone: values.phone, email: values.email },
      address: { line1: values.line1, line2: values.line2, city: values.city, state: values.state, pincode: values.pincode },
      delivery: { date: values.date, dateLabel: `${date.top}, ${date.bottom}`, slot: `${slot.label} (${slot.time})`, instructions: values.instructions },
      payment: { method: values.payment, label: paymentLabel, detail: paymentDetail },
    });
    clearCart();
    navigate(`/checkout/success/${order.id}`, { replace: true });
  };

  return (
    <div className="bg-cream-100/60">
      <div className="container-page py-8 sm:py-12">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-4xl sm:text-5xl">Checkout</h1>
          <p className="flex items-center gap-2 text-sm text-muted">
            <Lock className="size-4 text-brand-600" aria-hidden /> Secure checkout
          </p>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-turmeric-400/50 bg-turmeric-100 p-4 text-sm text-turmeric-700" role="note">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            <strong>Demo checkout:</strong> no real payment is taken and no order is sent to our farm. Your order is saved on this device only.
          </p>
        </div>

        <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
          <div className="space-y-6">
            <Section step={1} title="Contact details">
              {!user && (
                <p className="mb-5 text-sm text-muted">
                  Have an account?{' '}
                  <Link to="/login" state={{ from: '/checkout' }} className="font-semibold text-brand-700 hover:underline">
                    Log in
                  </Link>{' '}
                  for faster checkout.
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Full name" value={values.name} onChange={set('name')} error={errors.name} required autoComplete="name" className="sm:col-span-2" />
                <FormField
                  label="Mobile number"
                  type="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={set('phone')}
                  error={errors.phone}
                  required
                  autoComplete="tel"
                  placeholder="98765 43210"
                  hint="For delivery updates"
                />
                <FormField label="Email" type="email" value={values.email} onChange={set('email')} error={errors.email} required autoComplete="email" />
              </div>
            </Section>

            <Section step={2} title="Delivery address">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Flat, house no., building"
                  value={values.line1}
                  onChange={set('line1')}
                  error={errors.line1}
                  required
                  autoComplete="address-line1"
                  className="sm:col-span-2"
                />
                <FormField label="Area, street, landmark" value={values.line2} onChange={set('line2')} autoComplete="address-line2" className="sm:col-span-2" />
                <FormField
                  label="Pincode"
                  inputMode="numeric"
                  maxLength={6}
                  value={values.pincode}
                  onChange={(e) => {
                    set('pincode', (v) => v.replace(/\D/g, ''))(e);
                    setPinStatus(null);
                  }}
                  onBlur={() => verifyPincode()}
                  error={errors.pincode}
                  required
                  autoComplete="postal-code"
                  hint={
                    pinStatus?.loading
                      ? 'Checking delivery…'
                      : pinStatus?.serviceable
                        ? `✓ We deliver to ${pinStatus.city}`
                        : pinStatus && !pinStatus.serviceable
                          ? "We don't deliver here yet"
                          : `We deliver in ${site.delivery.zones.map((z) => z.city).join(', ')}`
                  }
                />
                <FormField label="City" value={values.city} onChange={set('city')} error={errors.city} required autoComplete="address-level2" />
                <FormField as="select" label="State" value={values.state} onChange={set('state')} error={errors.state} required autoComplete="address-level1" className="sm:col-span-2">
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </FormField>
              </div>
              <label className="mt-5 flex items-center gap-3 text-sm">
                <input type="checkbox" checked={values.saveAddress} onChange={set('saveAddress')} className="size-4.5 accent-brand-700" />
                Save this address for next time
              </label>
            </Section>

            <Section step={3} title="Delivery slot">
              <fieldset>
                <legend className="label">Delivery date</legend>
                <div className="grid grid-cols-4 gap-2">
                  {dates.map((d) => (
                    <label
                      key={d.id}
                      className={`cursor-pointer rounded-2xl border-2 p-3 text-center transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-600 ${
                        values.date === d.id ? 'border-brand-600 bg-brand-50' : 'border-line bg-white hover:border-brand-300'
                      }`}
                    >
                      <input type="radio" name="date" value={d.id} checked={values.date === d.id} onChange={set('date')} className="sr-only" />
                      <span className="block text-xs font-semibold text-muted">{d.top}</span>
                      <span className="block font-semibold text-brand-950">{d.bottom}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="mt-5">
                <legend className="label">Time slot</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {site.delivery.slots.map((s) => (
                    <label
                      key={s.id}
                      className={`cursor-pointer rounded-2xl border-2 p-3 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-600 ${
                        values.slot === s.id ? 'border-brand-600 bg-brand-50' : 'border-line bg-white hover:border-brand-300'
                      }`}
                    >
                      <input type="radio" name="slot" value={s.id} checked={values.slot === s.id} onChange={set('slot')} className="sr-only" />
                      <span className="block font-semibold text-brand-950">{s.label}</span>
                      <span className="block text-xs text-muted">{s.time}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <FormField
                as="textarea"
                label="Delivery instructions (optional)"
                value={values.instructions}
                onChange={set('instructions')}
                placeholder="E.g. leave with security, call on arrival"
                className="mt-5 [&_textarea]:min-h-20"
              />
            </Section>

            <Section step={4} title="Payment">
              <fieldset>
                <legend className="sr-only">Payment method</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-600 ${
                        values.payment === m.id ? 'border-brand-600 bg-brand-50' : 'border-line bg-white hover:border-brand-300'
                      }`}
                    >
                      <input type="radio" name="payment" value={m.id} checked={values.payment === m.id} onChange={set('payment')} className="sr-only" />
                      <m.icon className="mt-0.5 size-5 text-brand-600" aria-hidden />
                      <span>
                        <span className="block font-semibold text-brand-950">{m.label}</span>
                        <span className="block text-xs text-muted">{m.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 animate-fade-in" key={values.payment}>
                {values.payment === 'upi' && (
                  <FormField label="UPI ID" value={values.upi} onChange={set('upi', (v) => v.trim())} error={errors.upi} required placeholder="yourname@okhdfcbank" autoComplete="off" />
                )}
                {values.payment === 'card' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Card number"
                      inputMode="numeric"
                      value={values.cardNumber}
                      onChange={set('cardNumber', formatCard)}
                      error={errors.cardNumber}
                      required
                      autoComplete="cc-number"
                      placeholder="4111 1111 1111 1111"
                      className="sm:col-span-2"
                    />
                    <FormField label="Name on card" value={values.cardName} onChange={set('cardName')} error={errors.cardName} required autoComplete="cc-name" className="sm:col-span-2" />
                    <FormField label="Expiry (MM/YY)" inputMode="numeric" value={values.cardExpiry} onChange={set('cardExpiry', formatExpiry)} error={errors.cardExpiry} required autoComplete="cc-exp" placeholder="08/29" />
                    <FormField
                      label="CVV"
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={values.cardCvv}
                      onChange={set('cardCvv', (v) => v.replace(/\D/g, ''))}
                      error={errors.cardCvv}
                      required
                      autoComplete="cc-csc"
                    />
                  </div>
                )}
                {values.payment === 'netbanking' && (
                  <FormField as="select" label="Choose your bank" value={values.bank} onChange={set('bank')} error={errors.bank} required>
                    <option value="">Select bank</option>
                    {BANKS.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </FormField>
                )}
                {values.payment === 'cod' && (
                  <p className="rounded-2xl bg-cream-100 p-4 text-sm text-muted">Please keep exact change ready. UPI on delivery is also accepted by our delivery partners.</p>
                )}
              </div>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" aria-labelledby="co-summary">
            <div className="card space-y-5 p-6">
              <h2 id="co-summary" className="text-2xl">
                Order summary
              </h2>
              <ul className="max-h-72 space-y-4 overflow-y-auto pr-1">
                {items.map((i) => (
                  <li key={i.key} className="flex items-center gap-3">
                    <span className="relative shrink-0">
                      <img src={i.image} alt="" className="size-14 rounded-xl object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-brand-800 text-[0.65rem] font-bold text-white">{i.qty}</span>
                    </span>
                    <span className="min-w-0 flex-1 text-sm">
                      <span className="block truncate font-medium text-brand-950">{i.name}</span>
                      <span className="text-xs text-muted">{i.variantLabel}</span>
                    </span>
                    <span className="text-sm font-semibold">{formatPrice(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <CouponForm />
              <OrderSummary totals={totals} />
              <button type="submit" disabled={placing} className="btn-primary btn-lg w-full">
                {placing ? (
                  <>
                    <Spinner className="size-5" /> Placing order…
                  </>
                ) : (
                  <>
                    <Lock className="size-4" aria-hidden /> Place order · {formatPrice(totals.total)}
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted">By placing this order you agree to our terms. Demo only — no payment is taken.</p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
