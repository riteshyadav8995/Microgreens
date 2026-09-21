import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../utils/storage';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => storage.get('wishlist', []));
  const { showToast } = useToast();

  useEffect(() => storage.set('wishlist', ids), [ids]);

  const has = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (product) => {
      const exists = ids.includes(product.id);
      setIds((list) => (exists ? list.filter((x) => x !== product.id) : [product.id, ...list]));
      showToast({
        title: exists ? 'Removed from wishlist' : 'Saved to wishlist',
        description: product.name,
        variant: exists ? 'info' : 'success',
      });
    },
    [ids, showToast],
  );

  const add = useCallback((id) => setIds((list) => (list.includes(id) ? list : [id, ...list])), []);
  const remove = useCallback((id) => setIds((list) => list.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(() => ({ ids, count: ids.length, has, toggle, add, remove, clear }), [ids, has, toggle, add, remove, clear]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
