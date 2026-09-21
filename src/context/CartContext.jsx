import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { storage } from '../utils/storage';
import { computeTotals, couponError, findCoupon } from '../utils/cart';
import { effectivePrice } from '../utils/product';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
export const MAX_QTY = 10;

const lineKey = (productId, variantId) => `${productId}:${variantId}`;

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { line } = action;
      const existing = state.items.find((i) => i.key === line.key);
      const items = existing
        ? state.items.map((i) => (i.key === line.key ? { ...i, qty: Math.min(MAX_QTY, i.qty + line.qty) } : i))
        : [...state.items, line];
      return { ...state, items };
    }
    case 'update':
      return {
        ...state,
        items: state.items.map((i) => (i.key === action.key ? { ...i, qty: Math.max(1, Math.min(MAX_QTY, action.qty)) } : i)),
      };
    case 'remove':
      return { ...state, items: state.items.filter((i) => i.key !== action.key) };
    case 'clear':
      return { items: [], couponCode: null };
    case 'coupon':
      return { ...state, couponCode: action.code };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    storage.get('cart', { items: [], couponCode: null }),
  );
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => storage.set('cart', state), [state]);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback(
    (product, variant, qty = 1, { silent = false } = {}) => {
      const v = variant ?? product.variants[0];
      dispatch({
        type: 'add',
        line: {
          key: lineKey(product.id, v.id),
          productId: product.id,
          variantId: v.id,
          name: product.name,
          hindiName: product.hindiName,
          image: product.images[0],
          variantLabel: v.label,
          price: effectivePrice(v),
          mrp: v.price,
          qty,
        },
      });
      if (!silent) {
        showToast({
          title: 'Added to cart',
          description: `${product.name} · ${v.label}${qty > 1 ? ` × ${qty}` : ''}`,
          action: { label: 'View cart', onClick: () => setDrawerOpen(true) },
        });
      }
    },
    [showToast],
  );

  const updateQty = useCallback((key, qty) => dispatch({ type: 'update', key, qty }), []);

  const removeItem = useCallback(
    (key) => {
      const line = state.items.find((i) => i.key === key);
      dispatch({ type: 'remove', key });
      if (line) {
        showToast({
          title: 'Removed from cart',
          description: line.name,
          variant: 'info',
          action: { label: 'Undo', onClick: () => dispatch({ type: 'add', line }) },
        });
      }
    },
    [state.items, showToast],
  );

  const clearCart = useCallback(() => dispatch({ type: 'clear' }), []);

  /** Returns an error string, or undefined when the coupon was applied. */
  const applyCoupon = useCallback(
    (code) => {
      const coupon = findCoupon(code);
      const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);
      const error = couponError(coupon, subtotal);
      if (error) return error;
      dispatch({ type: 'coupon', code: coupon.code });
      showToast({ title: `${coupon.code} applied`, description: coupon.description });
      return undefined;
    },
    [state.items, showToast],
  );

  const removeCoupon = useCallback(() => dispatch({ type: 'coupon', code: null }), []);

  const totals = useMemo(() => computeTotals(state.items, state.couponCode), [state.items, state.couponCode]);

  const value = useMemo(
    () => ({
      items: state.items,
      couponCode: state.couponCode,
      totals,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [state, totals, addItem, updateQty, removeItem, clearCart, applyCoupon, removeCoupon, isDrawerOpen, openDrawer, closeDrawer],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
