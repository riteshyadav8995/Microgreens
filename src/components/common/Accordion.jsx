import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

/**
 * Accessible accordion. items: [{ id, title, content }].
 * `multiple` lets several panels stay open; otherwise opening one closes the others.
 */
export default function Accordion({ items, multiple = false, defaultOpen = [], className = '' }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const baseId = useId();

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className={`divide-y divide-line rounded-3xl border border-line bg-white ${className}`}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <h3 className="font-sans text-base font-semibold tracking-normal">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-brand-950 transition hover:text-brand-700 sm:px-6"
              >
                <span>{item.title}</span>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border border-line transition duration-300 ${isOpen ? 'rotate-45 border-brand-700 bg-brand-700 text-white' : 'text-brand-700'}`}
                >
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="px-5 pb-5 text-[0.95rem] leading-relaxed text-muted sm:px-6">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
