import { site } from '../config/site';

export const findCoupon = (code) =>
  site.coupons.find((c) => c.code.toUpperCase() === String(code || '').trim().toUpperCase());

/** Returns an error message if the coupon can't apply to this subtotal, otherwise undefined. */
export function couponError(coupon, subtotal) {
  if (!coupon) return 'This coupon code is not valid';
  if (subtotal < coupon.minOrder) return `Add items worth ₹${coupon.minOrder - subtotal} more to use ${coupon.code}`;
  return undefined;
}

/**
 * All cart money maths in one place. Line items store a price snapshot, which is what a
 * real cart API would return too.
 */
export function computeTotals(items, couponCode, { paymentMethod } = {}) {
  const { freeDeliveryThreshold, deliveryFee, codFee } = site.delivery;
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const mrpTotal = items.reduce((sum, i) => sum + (i.mrp ?? i.price) * i.qty, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const coupon = couponCode ? findCoupon(couponCode) : null;
  const invalidReason = couponCode ? couponError(coupon, subtotal) : undefined;
  const activeCoupon = coupon && !invalidReason ? coupon : null;

  let couponDiscount = 0;
  if (activeCoupon?.type === 'percent') {
    couponDiscount = Math.min(Math.round((subtotal * activeCoupon.value) / 100), activeCoupon.maxDiscount ?? Infinity);
  } else if (activeCoupon?.type === 'flat') {
    couponDiscount = Math.min(activeCoupon.value, subtotal);
  }

  const qualifiesFreeDelivery = subtotal >= freeDeliveryThreshold || activeCoupon?.type === 'delivery';
  const delivery = itemCount === 0 || qualifiesFreeDelivery ? 0 : deliveryFee;
  const cod = paymentMethod === 'cod' ? codFee : 0;
  const total = Math.max(0, subtotal - couponDiscount + delivery + cod);

  return {
    itemCount,
    subtotal,
    mrpTotal,
    productSavings: mrpTotal - subtotal,
    coupon: activeCoupon,
    couponInvalidReason: invalidReason,
    couponDiscount,
    delivery,
    codFee: cod,
    total,
    freeDeliveryRemaining: Math.max(0, freeDeliveryThreshold - subtotal),
    freeDeliveryProgress: Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100)),
  };
}
