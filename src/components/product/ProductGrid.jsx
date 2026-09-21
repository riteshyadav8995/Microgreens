import ProductCard from './ProductCard';

export default function ProductGrid({ products, columns = 'lg:grid-cols-3 xl:grid-cols-4', className = '' }) {
  return (
    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 ${columns} ${className}`}>
      {products.map((p) => (
        <li key={p.id} className="flex">
          <div className="w-full">
            <ProductCard product={p} />
          </div>
        </li>
      ))}
    </ul>
  );
}
