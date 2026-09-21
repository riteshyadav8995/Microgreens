import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { ArrowRight } from 'lucide-react';
import { useQuickView } from '../../context/QuickViewContext';
import Modal from '../common/Modal';
import ProductGallery from './ProductGallery';
import ProductRating from './ProductRating';
import PurchasePanel from './PurchasePanel';

export default function QuickViewModal() {
  const { product, closeQuickView } = useQuickView();

  return (
    <Modal open={Boolean(product)} onClose={closeQuickView} labelledBy="quickview-title" size="max-w-4xl">
      {product && (
        <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />
          <div className="flex flex-col">
            <p className="hindi text-sm text-brand-600" lang="hi">
              {product.hindiName}
            </p>
            <h2 id="quickview-title" className="mt-1 pr-10 text-3xl">
              {product.name}
            </h2>
            {site.features.ratings && <ProductRating rating={product.rating} count={product.reviewCount} className="mt-2" />}
            <p className="mt-4 text-muted">{product.shortDescription}</p>
            <p className="mt-3 text-sm">
              <span className="font-semibold text-brand-900">Taste: </span>
              <span className="text-muted">{product.taste}</span>
            </p>
            <div className="mt-6">
              <PurchasePanel key={product.id} product={product} onAdded={closeQuickView} />
            </div>
            <Link
              to={`/product/${product.id}`}
              onClick={closeQuickView}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              View full details <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
}
