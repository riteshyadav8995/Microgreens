import { usePageMeta } from '../../hooks/usePageMeta';
import Breadcrumb from '../../components/common/Breadcrumb';
import ProductFinder from '../../components/home/ProductFinder';

export default function FindMyMicrogreen() {
  usePageMeta('Find My Microgreen', 'Answer three quick questions about taste, meals and experience to find the microgreens that suit you.');
  return (
    <div className="bg-cream-100">
      <div className="container-page pt-8">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Find My Microgreen' }]} />
      </div>
      <ProductFinder standalone />
    </div>
  );
}
