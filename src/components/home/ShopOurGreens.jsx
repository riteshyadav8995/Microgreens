import { useAsync } from '../../hooks/useAsync';
import { site } from '../../config/site';
import { getCategories } from '../../services/api';
import SectionHeading from '../common/SectionHeading';
import CategoryCard from '../product/CategoryCard';
import Reveal from '../common/Reveal';

export default function ShopOurGreens() {
  const { data: categories, loading } = useAsync(getCategories, []);

  return (
    <section className="section" aria-labelledby="shop-greens-title">
      <div className="container-page">
        <SectionHeading
          id="shop-greens-title"
          eyebrow="Meet our greens"
          title="Now meet the varieties"
          description="Mild, peppery, nutty or desi — every category has its own taste, colour and harvest time."
          link={{ to: '/shop', label: site.features.shop ? 'Shop all products' : 'See all varieties' }}
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-6">
          {loading
            ? Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton min-h-56 rounded-3xl" />)
            : categories.map((c, i) => (
                <Reveal key={c.id} delay={i * 60}>
                  <CategoryCard category={c} />
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
