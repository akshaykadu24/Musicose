// Shared price calculations for the cart and checkout pages

// Each coupon unlocks once the cart value (after product discounts) reaches minCart
export const COUPONS = [
  { code: "MUSICOSE10", percent: 10, minCart: 1000 },
  { code: "MUSICOSE20", percent: 20, minCart: 2000 },
  { code: "MUSICOSE30", percent: 30, minCart: 3000 },
  { code: "MUSICOSE50", percent: 50, minCart: 5000 },
];

export const findCoupon = (code = "") =>
  COUPONS.find((coupon) => coupon.code === code.trim().toUpperCase()) || null;

export const isCouponEligible = (coupon, cartValue) => Boolean(coupon) && cartValue >= coupon.minCart;

// The applied coupon is remembered for this browser tab only
const COUPON_KEY = "musicoseCoupon";

export const getSavedCouponCode = () => sessionStorage.getItem(COUPON_KEY) || "";
export const saveCoupon = (code) => sessionStorage.setItem(COUPON_KEY, code);
export const clearCoupon = () => sessionStorage.removeItem(COUPON_KEY);

export const formatPrice = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;

// Delivery address saved on the checkout page
export const ADDRESS_KEY = "musicoseAddress";
export const getSavedAddress = () => {
  try {
    return JSON.parse(sessionStorage.getItem(ADDRESS_KEY));
  } catch (error) {
    return null;
  }
};

// Last placed order, shown on the thank-you page
export const ORDER_KEY = "musicoseLastOrder";

export const getCartTotals = (items = [], couponCode = "") => {
  let itemCount = 0;
  let subtotal = 0;
  let mrpTotal = 0;

  items.forEach((item) => {
    const quantity = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    const mrp = Math.max(Number(item.price2) || 0, price);

    itemCount += quantity;
    subtotal += price * quantity;
    mrpTotal += mrp * quantity;
  });

  const productDiscount = mrpTotal - subtotal;
  // A saved coupon only counts while the cart still qualifies for it
  const savedCoupon = findCoupon(couponCode);
  const coupon = isCouponEligible(savedCoupon, subtotal) ? savedCoupon : null;
  const couponDiscount = coupon ? (subtotal * coupon.percent) / 100 : 0;
  const total = subtotal - couponDiscount;

  return {
    itemCount,
    subtotal,
    mrpTotal,
    productDiscount,
    coupon,
    couponDiscount,
    total,
    totalSaving: productDiscount + couponDiscount,
  };
};
