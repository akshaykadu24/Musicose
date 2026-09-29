import axios from "axios";
import { CART_ERROR, CART_LOADING, GET_CART } from "./cart.types";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: JSON.parse(localStorage.getItem("token")),
});

export const getCartItems = (userId) => async (dispatch) => {
  dispatch({ type: CART_LOADING });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_MUSICOSE_API}/cart`,
      { headers: getHeaders() }
    );
    const savedUserId = JSON.parse(localStorage.getItem("user"));
    const currentUserId = userId || savedUserId;
    const products = currentUserId
      ? response.data.products.filter((item) => item.user === currentUserId)
      : [];

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