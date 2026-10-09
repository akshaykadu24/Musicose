import { CART_ERROR, CART_LOADING, GET_CART } from "./cart.types";

const initialState = {
  loading: false,
  error: false,
  cart: { products: [] },
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CART_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_CART:
      return {
        ...state,
        loading: false,
        error: false,
        cart: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;