export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  // Indian mobile numbers: 10 digits starting 6–9, optional +91 / 0 prefix.
  phone: /^(?:\+?91[\s-]?|0)?[6-9]\d{9}$/,
  pincode: /^[1-9]\d{5}$/,
  upi: /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/,
};

export const isEmail = (v) => patterns.email.test(String(v).trim());
export const isPhone = (v) => patterns.phone.test(String(v).replace(/\s/g, ''));
export const isPincode = (v) => patterns.pincode.test(String(v).trim());

/**
 * Tiny rule-based validator.
 * rules: { field: [(value, values) => errorMessage | undefined, ...] }
 */
export function validate(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, checks]) => {
    for (const check of checks) {
      const message = check(values[field] ?? '', values);
      if (message) {
        errors[field] = message;
        break;
      }
    }
  });
  return errors;
}

export const rules = {
  required: (label) => (v) => (String(v).trim() ? undefined : `${label} is required`),
  email: () => (v) => (!v || isEmail(v) ? undefined : 'Enter a valid email address'),
  phone: () => (v) => (!v || isPhone(v) ? undefined : 'Enter a valid 10-digit mobile number'),
  pincode: () => (v) => (!v || isPincode(v) ? undefined : 'Enter a valid 6-digit pincode'),
  minLength: (n, label) => (v) => (String(v).trim().length >= n ? undefined : `${label} must be at least ${n} characters`),
  pattern: (re, message) => (v) => (!v || re.test(String(v).trim()) ? undefined : message),
};

/** Luhn check for card-number UI validation (no real payment happens). */
export function isValidCardNumber(value) {
  const digits = String(value).replace(/\D/g, '');
  if (digits.length < 12 || digits.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

export function isValidExpiry(value) {
  const match = /^(\d{2})\s*\/\s*(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);
  return endOfMonth >= new Date();
}
