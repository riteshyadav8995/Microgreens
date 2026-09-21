export function ProductCardSkeleton() {
  return (
    <div className="card space-y-3 p-6" aria-hidden>
      <div className="skeleton h-3 w-1/3" />
      <div className="skeleton h-6 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
      <div className="skeleton mt-4 h-3 w-2/3" />
      <div className="skeleton h-3 w-full" />
      <div className="flex items-center justify-between border-t border-line pt-4">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-3 w-20" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, className = '' }) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 ${className}`} role="status" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden>
      <div className="skeleton aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-5 w-4/5" />
        <div className="skeleton h-3 w-full" />
      </div>
    </div>
  );
}

export function TextSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-2.5" aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="skeleton h-3.5" style={{ width: `${90 - i * 12}%` }} />
      ))}
    </div>
  );
}
