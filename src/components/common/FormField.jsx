import { useId } from 'react';
import { CircleAlert } from 'lucide-react';

/**
 * Label + control + error message with the right aria wiring.
 * Pass `as="select" | "textarea"` or a custom `render` for inputs with adornments.
 */
export default function FormField({ label, error, hint, as = 'input', className = '', required, children, render, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;
  const controlProps = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    required,
    className: `input ${error ? 'input-error' : ''} ${as === 'textarea' ? 'min-h-32 resize-y' : ''}`,
    ...props,
  };

  let control;
  if (render) control = render(controlProps);
  else if (as === 'select') control = <select {...controlProps}>{children}</select>;
  else if (as === 'textarea') control = <textarea {...controlProps} />;
  else control = <input {...controlProps} />;

  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {required && <span className="text-beet-500"> *</span>}
      </label>
      {control}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field-error">
          <CircleAlert className="size-3.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
