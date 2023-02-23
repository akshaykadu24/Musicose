import axios from "axios";
import { ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID_FAILURE, GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./action.types";


const getUserProfile = (id) => (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  return axios
    .get(`/users/profile/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: res.data });
      console.log(res.data);
    })
    .catch((e) => {
      dispatch({ type: GET_USER_PROFILE_FAILURE, payload: e });
      console.log(e);
    });
};


const getProductById = (id) => (dispatch) => {
  dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
  return axios
    .get(`/products/getById/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: e });
      console.log(e);
    });
};


const getProducts = () => (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  return( 
    axios.get(`/products`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: GET_PRODUCTS_FAILURE, payload: e });
      console.log(e);
    }));
};


const getUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });

  return axios
    .get(`/users`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_USERS_FAILURE });
      console.log(err);
    });
};


const addProduct = (product) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  return( 
    axios({
      method:"POST",
      url:"http://localhost:8080/adminProduct/create",
      data:product,

      headers: {
        "Content-Type":"application/json",
        "Authorization": JSON.parse(localStorage.getItem("token")),

      },
    })
    .then((res) => {
      console.log(res)
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.msg });
      console.log("inside action file:", res);
    })
    .catch((err) => {
      dispatch({ type: ADD_PRODUCT_FAILURE, payload: err });
    }));
};


const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  return axios
    .delete(`/products/delete/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((r) => {
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: DELETE_PRODUCT_FAILURE, payload: e });
    });
};


const updateProduct = (id, payload) => (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  return axios
    .patch(`/products/update/${id}`, payload,{
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((r) => {
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: e });
    });
};


const deleteUser = (id) => (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  return axios
    .delete(`/users/delete/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((r) => {
      dispatch({ type: DELETE_USER_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: DELETE_USER_FAILURE, payload: e });
    });
};


export {
  getUserProfile,
  getProducts,
  getUsers,
  addProduct,
  deleteProduct,
  updateProduct,
  deleteUser,
  getProductById,
};
