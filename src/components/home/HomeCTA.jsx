import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function HomeCTA() {
  return (
    <section className="section bg-brand-900 text-cream-100" aria-labelledby="cta-title">
      <div className="container-page text-center">
        <SectionHeading
          id="cta-title"
          eyebrow="What's Next?"
          title="Start Your Microgreen Journey"
          description="Ready to bring fresh, nutritious microgreens to your table? Explore our varieties, learn new recipes, or come see how we grow them."
          align="center"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/shop" className="btn-primary group text-brand-950">
            View All Products <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
          </Link>
          <Link to="/how-to-eat" className="btn-secondary text-brand-950 bg-cream-100 hover:bg-cream-200">
            Learn How to Use
          </Link>
          <Link to="/our-farm" className="btn-secondary text-brand-950 bg-turmeric-400 hover:bg-turmeric-500">
            Plan a Farm Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
