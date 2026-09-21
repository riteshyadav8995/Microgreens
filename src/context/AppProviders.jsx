import { ToastProvider } from './ToastContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { QuickViewProvider } from './QuickViewContext';

export default function AppProviders({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <QuickViewProvider>{children}</QuickViewProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
