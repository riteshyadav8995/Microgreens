import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import CartDrawer from '../cart/CartDrawer';
import QuickViewModal from '../product/QuickViewModal';
import ScrollToTop from './ScrollToTop';
import { PageLoader } from './States';
import { site } from '../../config/site';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-brand-900 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      {site.features.shop && <CartDrawer />}
      {site.features.shop && <QuickViewModal />}
    </div>
  );
}
