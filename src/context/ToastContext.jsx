import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: <CircleCheck className="size-5 text-brand-500" aria-hidden />,
  error: <CircleAlert className="size-5 text-red-500" aria-hidden />,
  info: <Info className="size-5 text-turmeric-500" aria-hidden />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const showToast = useCallback(
    ({ title, description, variant = 'success', action, duration = 3500 }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((list) => [...list.slice(-2), { id, title, description, variant, action }]);
      timers.current.set(id, setTimeout(() => dismiss(id), duration));
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ showToast, dismiss }), [showToast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.variant === 'error' ? 'alert' : 'status'}
            className="pointer-events-auto flex w-full max-w-sm animate-slide-up items-start gap-3 rounded-2xl bg-brand-950 p-4 text-white shadow-soft"
          >
            <span className="mt-0.5 shrink-0">{ICONS[t.variant]}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description && <p className="mt-0.5 text-sm text-white/70">{t.description}</p>}
              {t.action && (
                <button
                  type="button"
                  onClick={() => {
                    t.action.onClick();
                    dismiss(t.id);
                  }}
                  className="mt-2 text-sm font-semibold text-turmeric-400 underline-offset-4 hover:underline"
                >
                  {t.action.label}
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="-m-1 rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Dismiss notification"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
