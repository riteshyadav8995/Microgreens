import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Main image with thumbnails, arrows, keyboard support and a hover zoom on desktop. */
export default function ProductGallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });
  const count = images.length;
  const go = (i) => setIndex((i + count) % count);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({ active: true, x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div
      className="flex flex-col-reverse gap-3 lg:flex-row"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      {count > 1 && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto lg:w-20 lg:flex-col" role="tablist" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1} of ${count}`}
              onClick={() => setIndex(i)}
              className={`size-18 shrink-0 overflow-hidden rounded-2xl border-2 transition lg:size-20 ${i === index ? 'border-brand-700' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <img src={src} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div
        className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-3xl bg-cream-100"
        onMouseMove={onMove}
        onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
      >
        <img
          key={images[index]}
          src={images[index]}
          alt={`${name} — image ${index + 1} of ${count}`}
          fetchPriority="high"
          className="size-full animate-fade-in object-cover transition-transform duration-200"
          style={zoom.active ? { transform: 'scale(1.6)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous image" className="icon-btn absolute top-1/2 left-3 -translate-y-1/2 bg-white/90 shadow-sm">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next image" className="icon-btn absolute top-1/2 right-3 -translate-y-1/2 bg-white/90 shadow-sm">
              <ChevronRight className="size-5" />
            </button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-950/60 px-3 py-1 text-xs font-medium text-white" aria-hidden>
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
