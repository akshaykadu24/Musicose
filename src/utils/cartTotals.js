// Shared price calculations for the cart and checkout pages

export const COUPON_CODE = "MUSICOSE30";
export const COUPON_PERCENT = 30;

// The applied coupon is remembered for this browser tab only
const COUPON_KEY = "musicoseCoupon";

export const isCouponSaved = () => sessionStorage.getItem(COUPON_KEY) === COUPON_CODE;
export const saveCoupon = () => sessionStorage.setItem(COUPON_KEY, COUPON_CODE);
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

export const getCartTotals = (items = [], couponApplied = false) => {
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
  const couponDiscount = couponApplied ? (subtotal * COUPON_PERCENT) / 100 : 0;
  const total = subtotal - couponDiscount;

  return {
    itemCount,
    subtotal,
    mrpTotal,
    productDiscount,
    couponDiscount,
    total,
    totalSaving: productDiscount + couponDiscount,
  };
};
