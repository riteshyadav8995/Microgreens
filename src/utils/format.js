const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatPrice = (value) => inr.format(Math.round(value || 0));

export const formatDate = (iso, options = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(iso).toLocaleDateString('en-IN', options);

export const pluralize = (count, singular, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;

export const formatMinutes = (minutes) => {
  if (!minutes) return '0 min';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} hr ${m} min` : `${h} hr`;
};

const FRACTIONS = [
  [0.25, '¼'],
  [0.33, '⅓'],
  [0.5, '½'],
  [0.67, '⅔'],
  [0.75, '¾'],
];

/** Formats recipe quantities: 1.5 → "1½", 0.33 → "⅓", 7.2 → "7". */
export const formatQuantity = (qty) => {
  if (qty == null) return '';
  if (qty >= 10) return String(Math.round(qty));
  const whole = Math.floor(qty);
  const rest = qty - whole;
  const match = FRACTIONS.find(([v]) => Math.abs(v - rest) < 0.06);
  if (rest < 0.06) return String(whole || qty.toFixed(1));
  if (match) return `${whole || ''}${match[1]}`;
  return String(Math.round(qty * 10) / 10);
};

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
