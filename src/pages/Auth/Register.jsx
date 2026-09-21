import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { rules, validate } from '../../utils/validation';
import FormField from '../../components/common/FormField';
import { Spinner } from '../../components/common/States';
import AuthLayout from './AuthLayout';
import PasswordField from './PasswordField';

export default function Register() {
  usePageMeta('Create an account');
  const { register, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';
  const [values, setValues] = useState({ name: '', email: '', phone: '', password: '', confirm: '', terms: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (user && !loading) return <Navigate to={from} replace />;

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values, {
      name: [rules.required('Full name'), rules.minLength(2, 'Full name')],
      email: [rules.required('Email'), rules.email()],
      phone: [rules.phone()],
      password: [rules.required('Password'), rules.minLength(8, 'Password'), (v) => (/\d/.test(v) && /[a-zA-Z]/.test(v) ? undefined : 'Use letters and at least one number')],
      confirm: [(v, all) => (v === all.password ? undefined : 'Passwords do not match')],
      terms: [(v) => (v ? undefined : 'Please accept the terms to continue')],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    const u = await register(values);
    showToast({ title: `Welcome to Microgreen, ${u.name.split(' ')[0]}!`, description: 'Your demo account is ready.' });
    navigate(from, { replace: true });
  };

  return (
    <AuthLayout title="Create your account" subtitle="Save your address, track orders and reorder favourites." image="/images/farm/packing.webp">
      <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" value={values.name} onChange={set('name')} error={errors.name} required autoComplete="name" className="sm:col-span-2" data-autofocus />
        <FormField label="Email" type="email" value={values.email} onChange={set('email')} error={errors.email} required autoComplete="email" />
        <FormField label="Mobile (optional)" type="tel" value={values.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
        <PasswordField label="Password" value={values.password} onChange={set('password')} error={errors.password} required autoComplete="new-password" hint="At least 8 characters with a number" />
        <PasswordField label="Confirm password" value={values.confirm} onChange={set('confirm')} error={errors.confirm} required autoComplete="new-password" />
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={values.terms} onChange={set('terms')} aria-invalid={errors.terms ? true : undefined} className="mt-0.5 size-4.5 accent-brand-700" />
            <span>I agree to the terms of service and privacy policy, and I'm happy to receive order updates.</span>
          </label>
          {errors.terms && <p className="field-error">{errors.terms}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn-primary btn-lg w-full sm:col-span-2">
          {loading ? <Spinner className="size-5" /> : 'Create account'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" state={location.state} className="font-semibold text-brand-700 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
