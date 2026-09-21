import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';

/** Slide-in side panel used by the cart, mobile menu and mobile filters. */
export default function Drawer({ open, onClose, title, side = 'right', children, footer, width = 'max-w-md' }) {
  const ref = useDialog(open, onClose);
  if (!open) return null;

  const position = side === 'right' ? 'right-0 animate-slide-in-right' : 'left-0 animate-slide-in-left';

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 animate-fade-in bg-brand-950/45 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
        className={`absolute inset-y-0 ${position} flex w-full ${width} flex-col bg-cream-50 shadow-soft`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="drawer-title" className="text-xl">
            {title}
          </h2>
          <button type="button" onClick={onClose} className="icon-btn" aria-label={`Close ${title}`}>
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="border-t border-line bg-white px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
