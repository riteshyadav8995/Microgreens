import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { useAsync } from '../../hooks/useAsync';
import { getProductsByIds } from '../../services/api';
import SectionHeading from '../common/SectionHeading';
import ProductGrid from './ProductGrid';

/** Shows up to 4 recently viewed products, optionally excluding the current one. */
export default function RecentlyViewed({ excludeId, className = '' }) {
  const { ids } = useRecentlyViewed();
  const visible = ids.filter((id) => id !== excludeId).slice(0, 4);
  const key = visible.join(',');
  const { data } = useAsync(() => getProductsByIds(visible), [key]);

  if (!visible.length || !data?.length) return null;

  return (
    <section className={className} aria-labelledby="recently-viewed">
      <SectionHeading id="recently-viewed" eyebrow="Pick up where you left off" title="Recently viewed" />
      <ProductGrid products={data} />
    </section>
  );
}
