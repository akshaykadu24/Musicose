import axios from "axios";
import { CART_ERROR, CART_LOADING, GET_CART } from "./cart.types";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: JSON.parse(localStorage.getItem("token")),
});

export const getCartItems = () => async (dispatch) => {
  if (!localStorage.getItem("token")) {
    dispatch({ type: GET_CART, payload: { products: [] } });
    return;
  }

  dispatch({ type: CART_LOADING });

  try {
    // The backend returns only the logged-in user's cart
    const response = await axios.get(
      `${process.env.REACT_APP_MUSICOSE_API}/cart`,
      { headers: getHeaders() }
    );
    const products = Array.isArray(response.data.products) ? response.data.products : [];

    dispatch({ type: GET_CART, payload: { products } });
  } catch (error) {
    dispatch({ type: CART_ERROR });
  }
};

export const addCart = (item) => async (dispatch) => {
  dispatch({ type: CART_LOADING });

  try {
    await axios.post(
      `${process.env.REACT_APP_MUSICOSE_API}/cart/create/${item._id}`,
      item,
      { headers: getHeaders() }
    );
    await dispatch(getCartItems());
  } catch (error) {
    dispatch({ type: CART_ERROR });
  }
};

export const deleteCart = (id) => async (dispatch) => {
  dispatch({ type: CART_LOADING });

  try {
    await axios.delete(
      `${process.env.REACT_APP_MUSICOSE_API}/cart/delete/${id}`,
      { headers: getHeaders() }
    );
    await dispatch(getCartItems());
  } catch (error) {
    dispatch({ type: CART_ERROR });
  }
};

export const updateCart = (id, quantity) => async (dispatch) => {
  dispatch({ type: CART_LOADING });

  try {
    await axios.patch(
      `${process.env.REACT_APP_MUSICOSE_API}/cart/update/${id}`,
      { quantity },
      { headers: getHeaders() }
    );
    await dispatch(getCartItems());
  } catch (error) {
    dispatch({ type: CART_ERROR });
  }
};

// Removes every item from the logged-in user's cart. Returns true on success.
export const clearCart = () => async (dispatch, getState) => {
  dispatch({ type: CART_LOADING });
  const api = process.env.REACT_APP_MUSICOSE_API;

  try {
    await axios.delete(`${api}/cart/clear`, { headers: getHeaders() });
  } catch (error) {
    // Older backends (like the deployed one) don't have /cart/clear yet.
    // In that case, remove the items one by one with the existing delete route.
    if (error.response?.status !== 404) {
      dispatch({ type: CART_ERROR });
      return false;
    }

    try {
      const items = getState().cart.cart.products || [];
      await Promise.all(
        items.map((item) =>
          axios.delete(`${api}/cart/delete/${item._id}`, { headers: getHeaders() })
        )
      );
    } catch (deleteError) {
      dispatch({ type: CART_ERROR });
      return false;
    }
  }

  dispatch({ type: GET_CART, payload: { products: [] } });
  return true;
};
