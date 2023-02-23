import * as types from "./actionTypes";
import axios from "axios";


const getUserProfile = (id) => (dispatch) => {
  dispatch({ type: types.GET_USER_PROFILE_REQUEST });
  return axios
    .get(`/users/profile/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.GET_USER_PROFILE_SUCCESS, payload: res.data });
      console.log(res.data);
    })
    .catch((e) => {
      dispatch({ type: types.GET_USER_PROFILE_FAILURE, payload: e });
      console.log(e);
    });
};


const getProductById = (id) => (dispatch) => {
  dispatch({ type: types.GET_PRODUCT_BY_ID_REQUEST });
  return axios
    .get(`/products/getById/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.GET_PRODUCT_BY_ID_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_PRODUCT_BY_ID_FAILURE, payload: e });
      console.log(e);
    });
};


const getProducts = () => (dispatch) => {
  dispatch({ type: types.GET_PRODUCTS_REQUEST });
  return( 
    axios.get(`/products`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_PRODUCTS_FAILURE, payload: e });
      console.log(e);
    }));
};


const getUsers = () => (dispatch) => {
  dispatch({ type: types.GET_USERS_REQUEST });

  return axios
    .get(`/users`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({ type: types.GET_USERS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_USERS_FAILURE });
      console.log(err);
    });
};


const addProduct = (product) => (dispatch) => {
  dispatch({ type: types.ADD_PRODUCT_REQUEST });
  return( 
    axios({
      method:"POST",
      url:"http://localhost:8080/products/create",
      data:product,

      headers: {
        "Content-Type":"application/json",
        "Authorization": localStorage.getItem("token"),

      },
    })
    .then((res) => {
      console.log(res)
      // dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.msg });
      console.log("inside action file:", r);
    })
    .catch((e) => {
      dispatch({ type: types.ADD_PRODUCT_FAILURE, payload: e });
    }));
};


const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });
  return axios
    .delete(`/products/delete/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((r) => {
      dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: e });
    });
};


const updateProduct = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_PRODUCT_REQUEST });
  return axios
    .patch(`/products/update/${id}`, payload,{
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((r) => {
      dispatch({ type: types.UPDATE_PRODUCT_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.UPDATE_PRODUCT_FAILURE, payload: e });
    });
};


const deleteUser = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_USER_REQUEST });
  return axios
    .delete(`/users/delete/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((r) => {
      dispatch({ type: types.DELETE_USER_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: types.DELETE_USER_FAILURE, payload: e });
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
