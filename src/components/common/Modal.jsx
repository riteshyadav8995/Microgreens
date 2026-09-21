import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';

/** Centered dialog. On phones it becomes a bottom sheet. */
export default function Modal({ open, onClose, title, labelledBy, children, size = 'max-w-3xl', hideTitle = false }) {
  const ref = useDialog(open, onClose);
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade-in bg-brand-950/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy || 'modal-title'}
        tabIndex={-1}
        className={`relative max-h-[92vh] w-full ${size} animate-slide-up overflow-y-auto rounded-t-3xl bg-white shadow-soft sm:rounded-3xl`}
      >
        {!labelledBy && (
          <h2 id="modal-title" className={hideTitle ? 'sr-only' : 'px-6 pt-6 pr-14 text-2xl'}>
            {title}
          </h2>
        )}
        <button
          type="button"
          onClick={onClose}
          className="icon-btn absolute top-3 right-3 z-10 bg-white/90 shadow-sm backdrop-blur"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
