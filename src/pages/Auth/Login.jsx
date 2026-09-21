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

export default function Login() {
  usePageMeta('Log in');
  const { login, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (user && !loading) return <Navigate to={from} replace />;

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values, {
      email: [rules.required('Email'), rules.email()],
      password: [rules.required('Password'), rules.minLength(6, 'Password')],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    const u = await login(values);
    showToast({ title: `Welcome back, ${u.name.split(' ')[0]}!` });
    navigate(from, { replace: true });
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to see your orders and saved greens.">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <FormField label="Email" type="email" value={values.email} onChange={set('email')} error={errors.email} required autoComplete="email" data-autofocus />
        <PasswordField label="Password" value={values.password} onChange={set('password')} error={errors.password} required autoComplete="current-password" />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="size-4 accent-brand-700" /> Remember me
          </label>
          <button
            type="button"
            onClick={() => showToast({ title: 'Password reset', description: 'In the full version we would email you a reset link.', variant: 'info' })}
            className="font-medium text-brand-700 hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
          {loading ? <Spinner className="size-5" /> : 'Log in'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        New to Microgreen?{' '}
        <Link to="/register" state={location.state} className="font-semibold text-brand-700 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
