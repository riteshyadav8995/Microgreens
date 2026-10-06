import ProductCard from './ProductCard';
import Reveal from '../common/Reveal';

export default function ProductGrid({ products, columns = 'lg:grid-cols-3 xl:grid-cols-4', className = '' }) {
  return (
    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 ${columns} ${className}`}>
      {products.map((p, i) => (
        <Reveal as="li" key={p.id} delay={(i % 4) * 70} className="flex min-w-0">
          <div className="w-full">
            <ProductCard product={p} />
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
